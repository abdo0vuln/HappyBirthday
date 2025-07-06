// ======================================
// ULTIMATE BIRTHDAY WEBSITE JAVASCRIPT
// ======================================

document.addEventListener('DOMContentLoaded', function() {
    let score = 0;
    let streak = 0;
    let level = 1;
    let musicPlaying = false;
    let currentTheme = 'cosmic';
    let gameState = {
        powerUps: {
            multiply: false,
            rainbow: false,
            freeze: false
        },
        multiplyTimer: 0,
        rainbowTimer: 0,
        freezeTimer: 0
    };
    
    // Initialize the ultimate birthday experience
    init();
    
    function init() {
        createMagicalBackground();
        createAdvancedConfetti();
        create3DBalloons();
        setupPremiumEventListeners();
        showWelcomeSpectacle();
        createCosmicParticles();
        initializeEqualizer();
        create3DCandles();
        setupGameModal();
    }
    
    // Create magical starfield background
    function createMagicalBackground() {
        const starsContainer = document.getElementById('stars-container');
        const floatingShapes = document.querySelector('.floating-shapes');
        
        // Create twinkling stars
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 2 + 's';
            star.style.animationDuration = (Math.random() * 3 + 1) + 's';
            starsContainer.appendChild(star);
        }
        
        // Create floating shapes
        setInterval(() => {
            const shape = document.createElement('div');
            shape.className = 'floating-shape';
            shape.style.left = Math.random() * 100 + '%';
            shape.style.width = shape.style.height = (Math.random() * 30 + 10) + 'px';
            shape.style.animationDuration = (Math.random() * 15 + 10) + 's';
            floatingShapes.appendChild(shape);
            
            setTimeout(() => {
                if (shape.parentNode) {
                    shape.parentNode.removeChild(shape);
                }
            }, 25000);
        }, 3000);
    }
    
    // Advanced confetti system
    function createAdvancedConfetti() {
        const confettiContainer = document.getElementById('confetti-container');
        
        setInterval(() => {
            for (let i = 0; i < 8; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.animationDelay = Math.random() * 2 + 's';
                confetti.style.animationDuration = (Math.random() * 4 + 3) + 's';
                
                // Random colors and shapes
                const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#fd79a8', '#6c5ce7'];
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                
                confettiContainer.appendChild(confetti);
                
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 7000);
            }
        }, 400);
    }
    
    // Create spectacular fireworks
    function createFireworks(x = null, y = null) {
        const fireworksContainer = document.getElementById('fireworks-container');
        const centerX = x || Math.random() * window.innerWidth;
        const centerY = y || Math.random() * window.innerHeight * 0.5;
        
        for (let i = 0; i < 20; i++) {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = centerX + 'px';
            firework.style.top = centerY + 'px';
            
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#fd79a8', '#6c5ce7'];
            firework.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            const angle = (i / 20) * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            
            firework.style.setProperty('--end-x', Math.cos(angle) * distance + 'px');
            firework.style.setProperty('--end-y', Math.sin(angle) * distance + 'px');
            
            fireworksContainer.appendChild(firework);
            
            setTimeout(() => {
                if (firework.parentNode) {
                    firework.parentNode.removeChild(firework);
                }
            }, 1000);
        }
    }
    
    // Create premium 3D balloons
    function create3DBalloons() {
        const balloonsContainer = document.getElementById('balloons-container');
        const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange', 'cyan'];
        
        balloonsContainer.innerHTML = '';
        
        const balloonCount = Math.min(12 + level * 2, 20);
        
        for (let i = 0; i < balloonCount; i++) {
            const balloon = document.createElement('div');
            balloon.className = `balloon-3d ${colors[Math.floor(Math.random() * colors.length)]}`;
            balloon.addEventListener('click', popPremiumBalloon);
            
            // Add random animation delay
            balloon.style.animationDelay = Math.random() * 2 + 's';
            
            balloonsContainer.appendChild(balloon);
        }
    }
    
    // Premium balloon popping with effects
    function popPremiumBalloon(event) {
        const balloon = event.target;
        if (balloon.classList.contains('popped')) return;
        
        balloon.classList.add('popped');
        
        // Calculate points with multipliers
        let basePoints = Math.floor(Math.random() * 15) + 5;
        let points = basePoints;
        
        if (gameState.powerUps.multiply) {
            points *= 2;
            balloon.classList.add('double-points');
        }
        
        score += points;
        streak++;
        
        // Level up system
        if (score >= level * 100) {
            level++;
            showSpectacularMessage(`🎉 LEVEL UP! Welcome to Level ${level}! 🎉`, 'success');
            createFireworks();
        }
        
        updateGameStats();
        
        // Create premium pop effect
        createPremiumPopEffect(balloon, points);
        
        // Get balloon position for fireworks
        const rect = balloon.getBoundingClientRect();
        createFireworks(rect.left + rect.width / 2, rect.top + rect.height / 2);
        
        // API call
        fetch('/api/balloon-pop', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ points, level, streak })
        })
        .then(response => response.json())
        .then(data => console.log('Balloon pop response:', data))
        .catch(error => console.error('Error:', error));
        
        // Remove balloon with advanced animation
        setTimeout(() => {
            if (balloon.parentNode) {
                balloon.parentNode.removeChild(balloon);
            }
            
            // Check if all balloons are popped
            const remainingBalloons = document.querySelectorAll('.balloon-3d:not(.popped)');
            if (remainingBalloons.length === 0) {
                setTimeout(() => {
                    create3DBalloons();
                    showSpectacularMessage('� New balloon wave incoming! 🎈', 'success');
                    createCelebrationStorm();
                }, 1000);
            }
        }, 600);
    }
    
    // Create premium pop effect
    function createPremiumPopEffect(balloon, points) {
        const rect = balloon.getBoundingClientRect();
        
        // Points display
        const pointsDisplay = document.createElement('div');
        pointsDisplay.textContent = `+${points}`;
        pointsDisplay.style.position = 'fixed';
        pointsDisplay.style.left = rect.left + rect.width / 2 + 'px';
        pointsDisplay.style.top = rect.top + 'px';
        pointsDisplay.style.color = '#FFD700';
        pointsDisplay.style.fontSize = '2rem';
        pointsDisplay.style.fontWeight = 'bold';
        pointsDisplay.style.pointerEvents = 'none';
        pointsDisplay.style.zIndex = '1001';
        pointsDisplay.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.8)';
        pointsDisplay.style.animation = 'points-float 2s ease-out forwards';
        
        document.body.appendChild(pointsDisplay);
        
        // Multiple explosion particles
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = rect.left + rect.width / 2 + 'px';
            particle.style.top = rect.top + rect.height / 2 + 'px';
            particle.style.width = '6px';
            particle.style.height = '6px';
            particle.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1001';
            
            const angle = (i / 15) * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            particle.style.animation = `particle-explode 1s ease-out forwards`;
            particle.style.setProperty('--end-x', endX + 'px');
            particle.style.setProperty('--end-y', endY + 'px');
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1000);
        }
        
        setTimeout(() => {
            if (pointsDisplay.parentNode) {
                pointsDisplay.parentNode.removeChild(pointsDisplay);
            }
        }, 2000);
    }
    
    // Update game statistics
    function updateGameStats() {
        document.getElementById('score').textContent = score;
        document.getElementById('streak').textContent = streak;
        document.getElementById('level').textContent = level;
    }
    
    // Setup premium event listeners
    function setupPremiumEventListeners() {
        // Enhanced candle interactions
        document.getElementById('blow-candles').addEventListener('click', blowAllCandles);
        
        // Premium wish system
        document.getElementById('send-wish').addEventListener('click', sendMagicalWish);
        
        // Character counter
        const wishInput = document.getElementById('wish-input');
        const charCount = document.getElementById('char-count');
        wishInput.addEventListener('input', function() {
            charCount.textContent = this.value.length;
        });
        
        // Enhanced music controls
        document.getElementById('play-music').addEventListener('click', playCosmicMusic);
        document.getElementById('stop-music').addEventListener('click', stopMusic);
        document.getElementById('change-theme').addEventListener('click', changeTheme);
        
        // Power-up buttons
        document.querySelectorAll('.power-up-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                activatePowerUp(this.dataset.power);
            });
        });
        
        // 3D Candle interactions
        document.querySelectorAll('.candle-3d').forEach(candle => {
            candle.addEventListener('click', function() {
                blowSingleCandle(this);
            });
        });
        
        // Game cards
        document.querySelectorAll('.game-card').forEach(card => {
            card.addEventListener('click', function() {
                openGame(this.dataset.game);
            });
        });
        
        // 3D title letter interactions
        document.querySelectorAll('.letter').forEach(letter => {
            letter.addEventListener('click', function() {
                createLetterExplosion(this);
            });
        });
    }
    
    // Premium candle blowing with spectacular effects
    function blowAllCandles() {
        const flames = document.querySelectorAll('.flame-3d');
        const candles = document.querySelectorAll('.candle-3d');
        
        flames.forEach((flame, index) => {
            setTimeout(() => {
                flame.style.display = 'none';
                createPremiumSmoke(candles[index]);
                createSparkles(candles[index]);
            }, index * 300);
        });
        
        setTimeout(() => {
            showSpectacularMessage('🎂 Make a wish! The birthday magic is activated! ✨', 'success');
            createCelebrationStorm();
            createFireworks();
        }, 1500);
        
        // Relight candles after 8 seconds with ceremony
        setTimeout(() => {
            flames.forEach((flame, index) => {
                setTimeout(() => {
                    flame.style.display = 'block';
                    createRelightEffect(candles[index]);
                }, index * 200);
            });
            showSpectacularMessage('🕯️ The magical candles have reignited! Blow them out again! 🕯️', 'info');
        }, 8000);
    }
    
    // Single candle interaction
    function blowSingleCandle(candle) {
        const flame = candle.querySelector('.flame-3d');
        if (flame.style.display === 'none') return;
        
        flame.style.display = 'none';
        createPremiumSmoke(candle);
        createSparkles(candle);
        
        const remainingFlames = document.querySelectorAll('.flame-3d[style=""], .flame-3d:not([style])');
        if (remainingFlames.length === 0) {
            setTimeout(() => {
                showSpectacularMessage('🎂 All candles blown! Your wish is traveling to the stars! ✨', 'success');
                createCelebrationStorm();
                createFireworks();
            }, 500);
        }
    }
    
    // Create premium smoke effect
    function createPremiumSmoke(candle) {
        for (let i = 0; i < 5; i++) {
            const smoke = document.createElement('div');
            smoke.textContent = '💨';
            smoke.style.position = 'absolute';
            smoke.style.top = '-30px';
            smoke.style.left = '50%';
            smoke.style.transform = 'translateX(-50%)';
            smoke.style.fontSize = '1.5rem';
            smoke.style.animation = `smoke-rise-premium ${2 + i * 0.5}s ease-out forwards`;
            smoke.style.animationDelay = i * 0.2 + 's';
            smoke.style.pointerEvents = 'none';
            smoke.style.opacity = '0.8';
            
            candle.appendChild(smoke);
            
            setTimeout(() => {
                if (smoke.parentNode) {
                    smoke.parentNode.removeChild(smoke);
                }
            }, 3000 + i * 500);
        }
    }
    
    // Create sparkles around candles
    function createSparkles(candle) {
        for (let i = 0; i < 10; i++) {
            const sparkle = document.createElement('div');
            sparkle.textContent = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.top = Math.random() * 60 - 30 + 'px';
            sparkle.style.left = Math.random() * 60 - 30 + 'px';
            sparkle.style.fontSize = '1rem';
            sparkle.style.animation = 'sparkle-twinkle 2s ease-out forwards';
            sparkle.style.animationDelay = Math.random() * 1 + 's';
            sparkle.style.pointerEvents = 'none';
            
            candle.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 3000);
        }
    }
    
    // Send magical wish with portal effect
    function sendMagicalWish() {
        const wishInput = document.getElementById('wish-input');
        const wishText = wishInput.value.trim();
        
        if (!wishText) {
            showSpectacularMessage('Please write a magical wish first! 💌', 'error');
            return;
        }
        
        if (wishText.length < 10) {
            showSpectacularMessage('Your wish should be at least 10 characters long! ✨', 'error');
            return;
        }
        
        // Create wish sending animation
        createWishPortalEffect();
        
        fetch('/api/wish', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: wishText })
        })
        .then(response => response.json())
        .then(data => {
            const responseDiv = document.getElementById('wish-response');
            responseDiv.innerHTML = `<i class="fas fa-star"></i> ${data.message} <i class="fas fa-star"></i>`;
            responseDiv.className = 'wish-response-premium success';
            responseDiv.style.display = 'block';
            
            wishInput.value = '';
            document.getElementById('char-count').textContent = '0';
            
            createCelebrationStorm();
            createFireworks();
            
            setTimeout(() => {
                responseDiv.style.display = 'none';
            }, 6000);
        })
        .catch(error => {
            console.error('Error:', error);
            showSpectacularMessage('Oops! The wish portal is temporarily down. Try again! 😅', 'error');
        });
    }
    
    // Create wish portal effect
    function createWishPortalEffect() {
        const portal = document.querySelector('.portal-ring');
        portal.style.animation = 'portal-activate 2s ease-in-out';
        
        setTimeout(() => {
            portal.style.animation = 'portal-spin 10s linear infinite';
        }, 2000);
    }
    
    // Activate power-ups
    function activatePowerUp(powerType) {
        if (gameState.powerUps[powerType]) return;
        
        gameState.powerUps[powerType] = true;
        
        switch (powerType) {
            case 'multiply':
                gameState.multiplyTimer = 10;
                showSpectacularMessage('🔥 2X POINTS ACTIVATED! 🔥', 'success');
                document.querySelectorAll('.balloon-3d').forEach(b => b.classList.add('double-points'));
                break;
            case 'rainbow':
                gameState.rainbowTimer = 15;
                showSpectacularMessage('🌈 RAINBOW MODE ACTIVATED! 🌈', 'success');
                document.body.classList.add('rainbow-mode');
                break;
            case 'freeze':
                gameState.freezeTimer = 8;
                showSpectacularMessage('❄️ TIME FREEZE ACTIVATED! ❄️', 'success');
                document.querySelectorAll('.balloon-3d').forEach(b => b.classList.add('frozen'));
                break;
        }
        
        // Start power-up countdown
        const powerUpInterval = setInterval(() => {
            if (gameState[powerType + 'Timer'] > 0) {
                gameState[powerType + 'Timer']--;
            } else {
                deactivatePowerUp(powerType);
                clearInterval(powerUpInterval);
            }
        }, 1000);
    }
    
    // Deactivate power-ups
    function deactivatePowerUp(powerType) {
        gameState.powerUps[powerType] = false;
        
        switch (powerType) {
            case 'multiply':
                document.querySelectorAll('.balloon-3d').forEach(b => b.classList.remove('double-points'));
                break;
            case 'rainbow':
                document.body.classList.remove('rainbow-mode');
                break;
            case 'freeze':
                document.querySelectorAll('.balloon-3d').forEach(b => b.classList.remove('frozen'));
                break;
        }
    }
    
    // Enhanced music system
    function playCosmicMusic() {
        if (musicPlaying) return;
        
        musicPlaying = true;
        showSpectacularMessage('🎵 Cosmic Birthday Symphony is now playing! 🎵', 'success');
        
        const playBtn = document.getElementById('play-music');
        playBtn.style.background = 'linear-gradient(45deg, #2ecc71, #27ae60)';
        playBtn.innerHTML = '<i class="fas fa-music"></i><span>Music Playing...</span>';
        
        // Activate equalizer
        document.querySelectorAll('.eq-bar').forEach((bar, index) => {
            bar.style.animationDelay = index * 0.1 + 's';
        });
        
        // Create sound waves
        createSoundWaves();
        
        // Add dancing animation to cake
        const cake = document.getElementById('birthday-cake');
        cake.style.animation = 'cake-dance-premium 1.5s ease-in-out infinite';
    }
    
    function stopMusic() {
        if (!musicPlaying) return;
        
        musicPlaying = false;
        showSpectacularMessage('⏹️ Music stopped. Thanks for the cosmic dance! 🎶', 'info');
        
        const playBtn = document.getElementById('play-music');
        playBtn.style.background = 'var(--secondary-gradient)';
        playBtn.innerHTML = '<i class="fas fa-play"></i><span>Play Birthday Symphony</span>';
        
        // Stop sound waves
        document.getElementById('sound-waves').innerHTML = '';
        
        // Reset cake animation
        const cake = document.getElementById('birthday-cake');
        cake.style.animation = 'cake-levitate 4s ease-in-out infinite';
    }
    
    // Create sound waves visualization
    function createSoundWaves() {
        const soundWavesContainer = document.getElementById('sound-waves');
        soundWavesContainer.innerHTML = '';
        
        for (let i = 0; i < 20; i++) {
            const wave = document.createElement('div');
            wave.className = 'sound-wave';
            wave.style.animationDelay = i * 0.1 + 's';
            wave.style.animationDuration = (Math.random() * 0.5 + 1) + 's';
            soundWavesContainer.appendChild(wave);
        }
    }
    
    // Change theme system
    function changeTheme() {
        const themes = ['cosmic', 'sunset', 'ocean', 'forest', 'galaxy'];
        const currentIndex = themes.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        currentTheme = themes[nextIndex];
        
        applyTheme(currentTheme);
        showSpectacularMessage(`🎨 Theme changed to ${currentTheme.toUpperCase()}! 🎨`, 'success');
    }
    
    // Apply different themes
    function applyTheme(theme) {
        const root = document.documentElement;
        
        switch (theme) {
            case 'sunset':
                root.style.setProperty('--cosmic-gradient', 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 25%, #fecfef 50%, #ff9a9e 75%, #ff8a80 100%)');
                break;
            case 'ocean':
                root.style.setProperty('--cosmic-gradient', 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #89f7fe 50%, #66a6ff 75%, #667eea 100%)');
                break;
            case 'forest':
                root.style.setProperty('--cosmic-gradient', 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #a8e6cf 50%, #88d8a3 75%, #667eea 100%)');
                break;
            case 'galaxy':
                root.style.setProperty('--cosmic-gradient', 'linear-gradient(135deg, #2c3e50 0%, #34495e 25%, #9b59b6 50%, #8e44ad 75%, #2c3e50 100%)');
                break;
            default:
                root.style.setProperty('--cosmic-gradient', 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #667eea 100%)');
        }
    }
    
    // Create spectacular celebration storm
    function createCelebrationStorm() {
        const celebrationEmojis = ['🎉', '🎊', '✨', '🎈', '🎁', '🎂', '🥳', '🌟', '💫', '🎆', '🎇'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const emoji = document.createElement('div');
                emoji.textContent = celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)];
                emoji.style.position = 'fixed';
                emoji.style.left = Math.random() * window.innerWidth + 'px';
                emoji.style.top = '-50px';
                emoji.style.fontSize = (Math.random() * 2 + 1) + 'rem';
                emoji.style.pointerEvents = 'none';
                emoji.style.zIndex = '1002';
                emoji.style.animation = `celebration-storm ${3 + Math.random() * 2}s linear forwards`;
                
                document.body.appendChild(emoji);
                
                setTimeout(() => {
                    if (emoji.parentNode) {
                        emoji.parentNode.removeChild(emoji);
                    }
                }, 5000);
            }, i * 100);
        }
    }
    
    // Create cosmic particles around fact planet
    function createCosmicParticles() {
        const cosmicContainer = document.querySelector('.cosmic-particles');
        if (!cosmicContainer) return;
        
        setInterval(() => {
            const particle = document.createElement('div');
            particle.className = 'cosmic-particle';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
            cosmicContainer.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 10000);
        }, 2000);
    }
    
    // Initialize equalizer animation
    function initializeEqualizer() {
        const eqBars = document.querySelectorAll('.eq-bar');
        eqBars.forEach((bar, index) => {
            bar.style.animationDelay = index * 0.1 + 's';
            bar.style.height = '20px';
        });
    }
    
    // Enhanced show message with spectacular effects
    function showSpectacularMessage(message, type = 'success') {
        const messageDiv = document.createElement('div');
        messageDiv.innerHTML = message;
        messageDiv.style.position = 'fixed';
        messageDiv.style.top = '20px';
        messageDiv.style.left = '50%';
        messageDiv.style.transform = 'translateX(-50%)';
        messageDiv.style.background = type === 'error' ? 
            'linear-gradient(45deg, #e74c3c, #c0392b)' : 
            type === 'info' ?
            'linear-gradient(45deg, #3498db, #2980b9)' :
            'linear-gradient(45deg, #2ecc71, #27ae60)';
        messageDiv.style.color = 'white';
        messageDiv.style.padding = '20px 40px';
        messageDiv.style.borderRadius = '50px';
        messageDiv.style.zIndex = '1003';
        messageDiv.style.fontSize = '1.2rem';
        messageDiv.style.fontWeight = '600';
        messageDiv.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        messageDiv.style.backdropFilter = 'blur(10px)';
        messageDiv.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        messageDiv.style.animation = 'message-spectacular-enter 0.6s ease-out';
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.style.animation = 'message-spectacular-exit 0.6s ease-out forwards';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 600);
        }, 4000);
    }
    
    // Show welcome spectacular
    function showWelcomeSpectacle() {
        setTimeout(() => {
            showSpectacularMessage('🎉 Welcome to the Ultimate Birthday Universe! 🌟', 'success');
            createFireworks();
        }, 1500);
    }
    
    // Enhanced fun facts with cosmic theme
    window.showRandomFact = function() {
        const facts = [
            "🎂 The birthday song 'Happy Birthday to You' is one of the most recognized songs across the entire galaxy!",
            "🎈 Ancient Greeks placed candles on cakes for Artemis, creating a tradition that spans millennia!",
            "🎁 The most expensive birthday party ever cost $27.2 million - enough to fund a small space mission!",
            "🎊 In some cultures, celebrating your birthday early is considered unlucky - timing is everything!",
            "🎉 The birthday cake tradition dates back to ancient Rome, predating pizza by centuries!",
            "🎪 Medieval people believed evil spirits visited on birthdays - that's why we have protection parties!",
            "🎵 The Hill sisters composed 'Happy Birthday' in 1893, creating an immortal cosmic anthem!",
            "🎂 Some cultures celebrate collective birthdays, making everyone age together on New Year's!",
            "🎈 The world's largest birthday cake weighed 128,000 pounds - heavier than a blue whale's heart!",
            "✨ In many Asian cultures, everyone becomes one year older on New Year's Day - universal birthday magic!",
            "🌟 The tradition of making wishes on birthday candles comes from ancient beliefs about smoke carrying prayers to the heavens!",
            "🎆 Birthday celebrations are found in nearly every culture across Earth - a truly universal human tradition!",
            "🎇 The first birthday parties were actually held to ward off evil spirits attracted to the life-force energy of aging!"
        ];
        
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        document.getElementById('random-fact').innerHTML = randomFact;
        
        // Create planet activation effect
        const planet = document.querySelector('.fact-planet');
        planet.style.animation = 'planet-activate 2s ease-in-out';
        
        setTimeout(() => {
            planet.style.animation = 'planet-rotation 20s linear infinite';
        }, 2000);
        
        createCelebrationStorm();
        createFireworks();
    };
});

// Add premium CSS animations dynamically
const premiumStyle = document.createElement('style');
premiumStyle.textContent = `
    @keyframes points-float {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        100% { transform: translateY(-100px) scale(1.5); opacity: 0; }
    }
    
    @keyframes particle-explode {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        100% { transform: translate(var(--end-x), var(--end-y)) scale(0); opacity: 0; }
    }
    
    @keyframes smoke-rise-premium {
        0% { transform: translateX(-50%) translateY(0) scale(1); opacity: 0.8; }
        100% { transform: translateX(-50%) translateY(-100px) scale(2); opacity: 0; }
    }
    
    @keyframes sparkle-twinkle {
        0% { transform: scale(0) rotate(0deg); opacity: 1; }
        50% { transform: scale(1) rotate(180deg); opacity: 1; }
        100% { transform: scale(0) rotate(360deg); opacity: 0; }
    }
    
    @keyframes celebration-storm {
        0% { transform: translateY(-50px) rotate(0deg) scale(1); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg) scale(0.5); opacity: 0; }
    }
    
    @keyframes message-spectacular-enter {
        0% { transform: translateX(-50%) translateY(-50px) scale(0.8); opacity: 0; }
        100% { transform: translateX(-50%) translateY(0) scale(1); opacity: 1; }
    }
    
    @keyframes message-spectacular-exit {
        0% { transform: translateX(-50%) translateY(0) scale(1); opacity: 1; }
        100% { transform: translateX(-50%) translateY(-50px) scale(0.8); opacity: 0; }
    }
    
    @keyframes cake-dance-premium {
        0%, 100% { transform: rotate(0deg) scale(1) translateY(0); }
        25% { transform: rotate(3deg) scale(1.05) translateY(-5px); }
        50% { transform: rotate(0deg) scale(1.1) translateY(-10px); }
        75% { transform: rotate(-3deg) scale(1.05) translateY(-5px); }
    }
    
    @keyframes portal-activate {
        0% { transform: rotate(0deg) scale(1); border-width: 3px; }
        50% { transform: rotate(180deg) scale(1.2); border-width: 6px; }
        100% { transform: rotate(360deg) scale(1); border-width: 3px; }
    }
    
    @keyframes planet-activate {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.1); }
        100% { transform: rotate(360deg) scale(1); }
    }
`;
document.head.appendChild(premiumStyle);
