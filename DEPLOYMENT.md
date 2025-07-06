# GitHub Secrets Setup for VPS Deployment

To set up automatic deployment to your VPS, you need to configure these secrets in your GitHub repository:

## Required GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret

Add these secrets:

### `VPS_HOST`
- **Value**: Your VPS IP address or domain name
- **Example**: `192.168.1.100` or `yourserver.com`

### `VPS_USERNAME` 
- **Value**: Your VPS username (usually `root` or your user)
- **Example**: `root` or `ubuntu`

### `VPS_SSH_KEY`
- **Value**: Your private SSH key content
- **How to get**: Run `cat ~/.ssh/id_rsa` on your local machine or generate a new key pair
- **Important**: This should be the PRIVATE key (begins with `-----BEGIN OPENSSH PRIVATE KEY-----`)

### `VPS_PORT`
- **Value**: SSH port (usually 22)
- **Example**: `22`

## Setting up SSH Key (if you don't have one)

1. **On your local machine:**
   ```bash
   ssh-keygen -t rsa -b 4096 -C "github-actions"
   ```

2. **Copy public key to your VPS:**
   ```bash
   ssh-copy-id -i ~/.ssh/id_rsa.pub username@your-vps-ip
   ```

3. **Copy private key for GitHub secret:**
   ```bash
   cat ~/.ssh/id_rsa
   ```

## VPS Requirements

Make sure your VPS has:
- Docker installed
- Git installed
- SSH access enabled
- Port 3000 open (or configure nginx reverse proxy)

## Manual Deployment Commands

If you prefer manual deployment, you can also use these commands on your VPS:

```bash
# Clone the repository
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name

# Build and run with Docker
docker build -t birthday-website .
docker run -d -p 3000:3000 --name birthday-fun-app --restart unless-stopped birthday-website

# Or run with Docker Compose
docker-compose up -d
```

## Nginx Configuration (Optional)

If you want to use a domain name and SSL, create this nginx config:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Then use certbot for SSL:
```bash
sudo certbot --nginx -d yourdomain.com
```
