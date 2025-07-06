const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));
app.use(express.json());

// Route for the main birthday page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint for birthday wishes
app.post('/api/wish', (req, res) => {
    const { message } = req.body;
    console.log('New birthday wish:', message);
    res.json({ 
        success: true, 
        message: 'Thank you for the birthday wish! 🎉',
        wish: message 
    });
});

// API endpoint for balloon pop counter
app.post('/api/balloon-pop', (req, res) => {
    console.log('Balloon popped! 🎈');
    res.json({ 
        success: true, 
        message: 'Pop! Great job! 🎈💥',
        points: Math.floor(Math.random() * 10) + 1
    });
});

app.listen(PORT, () => {
    console.log(`🎂 Birthday website is running on http://localhost:${PORT}`);
    console.log(`🎉 Let's celebrate! 🎉`);
});
