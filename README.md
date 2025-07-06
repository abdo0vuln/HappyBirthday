# Birthday Fun Website 🎉

A delightful and interactive birthday website built with Node.js and Docker! Perfect for celebrating someone special with fun animations, games, and surprises.

## Features ✨

- **Interactive Birthday Cake** 🎂 - Click to blow out candles with smoke effects
- **Balloon Popping Game** 🎈 - Pop colorful balloons to earn points
- **Birthday Wishes** 💌 - Send personalized birthday messages
- **Fun Facts** 🎪 - Learn interesting birthday-related trivia
- **Confetti Animation** 🎊 - Continuous celebration effects
- **Music Player** 🎵 - Play birthday tunes (simulated)
- **Responsive Design** 📱 - Works perfectly on all devices
- **Beautiful UI** 🌈 - Modern gradient design with smooth animations

## Tech Stack 🛠️

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js with Express
- **Containerization**: Docker & Docker Compose
- **Styling**: Custom CSS with animations and gradients
- **Fonts**: Google Fonts (Poppins)

## Quick Start 🚀

### Option 1: Using Docker Compose (Recommended)

1. Make sure you have Docker and Docker Compose installed
2. Clone or download this project
3. Navigate to the project directory:
   ```bash
   cd fun
   ```
4. Run the application:
   ```bash
   docker-compose up --build
   ```
5. Open your browser and go to: `http://localhost:3000`

### Option 2: Using Docker

1. Build the Docker image:
   ```bash
   docker build -t birthday-website .
   ```
2. Run the container:
   ```bash
   docker run -p 3000:3000 birthday-website
   ```
3. Visit: `http://localhost:3000`

### Option 3: Local Development

1. Make sure you have Node.js installed (v18 or higher)
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```
4. Open: `http://localhost:3000`

## Interactive Features 🎮

### 🎂 Birthday Cake
- Click individual candles to blow them out one by one
- Use the "Blow the Candles" button to extinguish all at once
- Watch the smoke effects and celebration animations
- Candles automatically relight after 5 seconds

### 🎈 Balloon Game
- Click on floating balloons to pop them
- Earn random points (1-10) for each balloon popped
- New balloons appear when you've popped them all
- Different colored balloons with realistic floating animation

### 💌 Birthday Wishes
- Write personalized birthday messages
- Submit wishes to the server
- Get confirmation responses
- Triggers celebration effects

### 🎪 Fun Facts
- Click the fact card to learn interesting birthday trivia
- Random facts about birthday traditions worldwide
- Educational and entertaining content

### 🎵 Music & Sound
- Simulated birthday music player
- Visual feedback with dancing cake animation
- Start/stop controls

## Project Structure 📁

```
fun/
├── public/
│   ├── index.html      # Main HTML file
│   ├── styles.css      # All CSS styles and animations
│   └── script.js       # Interactive JavaScript features
├── server.js           # Express server with API endpoints
├── package.json        # Node.js dependencies and scripts
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose setup
└── README.md          # This file
```

## API Endpoints 🔌

- `GET /` - Serves the main birthday website
- `POST /api/wish` - Accepts birthday wishes
- `POST /api/balloon-pop` - Tracks balloon pop events

## Customization 🎨

### Adding More Balloons
Edit the `createBalloons()` function in `script.js` to change:
- Number of balloons
- Colors available
- Animation timing

### Changing Color Theme
Modify the CSS gradient variables in `styles.css`:
- Background gradients
- Button colors
- Animation colors

### Adding More Fun Facts
Extend the `facts` array in the `showRandomFact()` function in `script.js`.

### Music Integration
Replace the simulated music player with real audio by:
1. Adding audio files to the public directory
2. Using the HTML5 Audio API in `script.js`

## Performance Features ⚡

- Lightweight and fast loading
- Optimized animations using CSS transforms
- Efficient DOM manipulation
- Responsive design for all screen sizes
- Clean code structure for easy maintenance

## Browser Support 🌐

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Development Tips 💡

1. Use `npm run dev` for hot reloading during development
2. Check browser console for debugging information
3. Modify the port in `server.js` if needed
4. Test responsiveness on different screen sizes

## Docker Configuration 🐳

The application is fully containerized with:
- Multi-stage builds for optimization
- Non-root user for security
- Health checks
- Volume mounting for development
- Network isolation

## Contributing 🤝

Feel free to fork this project and add your own fun features:
- More interactive games
- Sound effects
- Additional animations
- Mobile-specific features
- Social sharing capabilities

## License 📄

This project is open source and available under the MIT License.

## Celebration Time! 🎉

Ready to celebrate? Run the project and enjoy the most fun birthday website ever created! Perfect for:
- Virtual birthday parties
- Surprise celebrations
- Kids' birthday entertainment
- Social media sharing
- Learning web development

Have fun and happy birthday! 🎂✨
