#!/bin/bash

# Birthday Website Deployment Script for VPS
# Run this script on your VPS to manually deploy the application

set -e

echo "🎉 Starting Birthday Website Deployment 🎂"

# Configuration
REPO_URL="https://github.com/yourusername/your-repo-name.git"  # Update this
PROJECT_DIR="$HOME/birthday-website"
CONTAINER_NAME="birthday-fun-app"
IMAGE_NAME="birthday-website"
PORT="3000"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

echo_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

echo_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

echo_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo_error "Git is not installed. Please install Git first."
    exit 1
fi

# Create project directory if it doesn't exist
echo_info "Setting up project directory..."
mkdir -p "$PROJECT_DIR"
cd "$PROJECT_DIR"

# Clone or update repository
if [ -d ".git" ]; then
    echo_info "Updating existing repository..."
    git pull origin main || git pull origin master
else
    echo_info "Cloning repository..."
    git clone "$REPO_URL" .
fi

echo_success "Repository updated successfully!"

# Stop and remove existing container
echo_info "Stopping existing application..."
docker stop "$CONTAINER_NAME" 2>/dev/null || echo_warning "Container was not running"
docker rm "$CONTAINER_NAME" 2>/dev/null || echo_warning "Container did not exist"

# Remove old image
echo_info "Removing old Docker image..."
docker rmi "$IMAGE_NAME" 2>/dev/null || echo_warning "Image did not exist"

# Build new Docker image
echo_info "Building new Docker image..."
docker build -t "$IMAGE_NAME" .

echo_success "Docker image built successfully!"

# Run new container
echo_info "Starting new application container..."
docker run -d \
    --name "$CONTAINER_NAME" \
    -p "$PORT:$PORT" \
    --restart unless-stopped \
    "$IMAGE_NAME"

echo_success "Container started successfully!"

# Check if container is running
sleep 5
if docker ps | grep -q "$CONTAINER_NAME"; then
    echo_success "🎉 Birthday website is now running!"
    echo_info "📍 Access it at: http://localhost:$PORT"
    echo_info "🐳 Container name: $CONTAINER_NAME"
    echo_info "📊 Check logs with: docker logs $CONTAINER_NAME"
else
    echo_error "Failed to start container. Check logs with: docker logs $CONTAINER_NAME"
    exit 1
fi

# Clean up unused Docker resources
echo_info "Cleaning up unused Docker resources..."
docker system prune -f

echo_success "🎂 Deployment completed successfully! 🎉"
echo_info "🌐 Your birthday website is ready to celebrate!"

# Show running containers
echo_info "Currently running containers:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
