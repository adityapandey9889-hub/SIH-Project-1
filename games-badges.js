// Games & Badges JavaScript

let gameStats = {
    gamesPlayed: 0,
    badgesEarned: 1, // Welcome badge
    totalScore: 0,
    playerRank: 47,
    earnedBadges: ['welcome'],
    dailyStreak: 1
};

let currentGame = null;
let gameTimer = null;

// Load saved stats
function loadGameStats() {
    const saved = localStorage.getItem('zerowaste_game_stats');
    if (saved) {
        gameStats = { ...gameStats, ...JSON.parse(saved) };
    }
    updateStatsDisplay();
    updateBadgeFilters();
}

// Save stats
function saveGameStats() {
    localStorage.setItem('zerowaste_game_stats', JSON.stringify(gameStats));
}

// Update stats display
function updateStatsDisplay() {
    document.getElementById('gamesPlayed').textContent = gameStats.gamesPlayed;
    document.getElementById('badgesEarned').textContent = gameStats.badgesEarned;
    document.getElementById('totalScore').textContent = gameStats.totalScore.toLocaleString();
    document.getElementById('playerRank').textContent = '#' + gameStats.playerRank;
}

// Countdown timer for daily challenge
function updateCountdown() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const diff = tomorrow - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('countdownTimer').textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Start daily challenge
function startDailyChallenge() {
    showNotification('🔥 Daily Challenge Started! Sort items quickly to earn bonus rewards!', 'success');
    startGame('sorting', true);
}

// Start a game
function startGame(gameType, isDaily = false) {
    const gameData = getGameData(gameType);
    
    document.getElementById('gameTitle').textContent = gameData.title;
    document.getElementById('gameArea').innerHTML = gameData.content;
    document.getElementById('gameScore').textContent = '0';
    document.getElementById('gameActionBtn').textContent = 'Start Game';
    document.getElementById('gameActionBtn').onclick = () => playGame(gameType, isDaily);
    
    currentGame = { type: gameType, isDaily, score: 0, started: false };
    document.getElementById('gameModal').style.display = 'block';
}

// Get game data
function getGameData(gameType) {
    const games = {
        sorting: {
            title: '🗑️ Waste Sorting Master',
            content: `
                <div class="sorting-game">
                    <div class="game-instructions">
                        <h3>🎯 Instructions:</h3>
                        <p>Drag the waste items to the correct bins! You have 60 seconds.</p>
                        <div class="bins-guide">
                            <div class="bin-info">
                                <span class="bin-icon">🟢</span>
                                <span>Organic Waste</span>
                            </div>
                            <div class="bin-info">
                                <span class="bin-icon">🔵</span>
                                <span>Recyclable</span>
                            </div>
                            <div class="bin-info">
                                <span class="bin-icon">🔴</span>
                                <span>Hazardous</span>
                            </div>
                        </div>
                    </div>
                    <div class="game-timer">Time: <span id="timer">60</span>s</div>
                    <div class="sorting-area" id="sortingArea">
                        <div class="waste-items" id="wasteItems"></div>
                        <div class="bins">
                            <div class="bin organic" data-type="organic">
                                <div class="bin-icon">🟢</div>
                                <div class="bin-label">Organic</div>
                            </div>
                            <div class="bin recyclable" data-type="recyclable">
                                <div class="bin-icon">🔵</div>
                                <div class="bin-label">Recyclable</div>
                            </div>
                            <div class="bin hazardous" data-type="hazardous">
                                <div class="bin-icon">🔴</div>
                                <div class="bin-label">Hazardous</div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        quiz: {
            title: '🧠 Eco Knowledge Quiz',
            content: `
                <div class="quiz-game">
                    <div class="quiz-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" id="quizProgress"></div>
                        </div>
                        <span id="questionCounter">Question 1 of 10</span>
                    </div>
                    <div class="quiz-question-area" id="quizQuestionArea">
                        <h3>Ready to test your environmental knowledge?</h3>
                        <p>Answer 10 questions correctly to earn points and badges!</p>
                    </div>
                </div>
            `
        },
        race: {
            title: '🏃‍♂️ Recycling Race',
            content: `
                <div class="race-game">
                    <div class="race-instructions">
                        <h3>🏁 Get Ready to Race!</h3>
                        <p>Collect recyclable items while avoiding trash! Use arrow keys to move.</p>
                        <div class="race-controls">
                            <div class="control-key">←</div>
                            <div class="control-key">→</div>
                            <div class="control-key">↑</div>
                            <div class="control-key">↓</div>
                        </div>
                    </div>
                    <div class="race-track" id="raceTrack">
                        <div class="player" id="racePlayer">🏃‍♂️</div>
                    </div>
                </div>
            `
        },
        composting: {
            title: '🌱 Composting Simulator',
            content: `
                <div class="compost-game">
                    <div class="compost-instructions">
                        <h3>🌱 Build Your Compost!</h3>
                        <p>Layer organic materials correctly to create perfect compost!</p>
                    </div>
                    <div class="compost-bin" id="compostBin">
                        <div class="bin-layers" id="binLayers"></div>
                    </div>
                    <div class="material-options" id="materialOptions">
                        <div class="material" data-type="brown">🍂 Brown Materials</div>
                        <div class="material" data-type="green">🥬 Green Materials</div>
                        <div class="material" data-type="water">💧 Water</div>
                    </div>
                </div>
            `
        },
        monster: {
            title: '👾 Waste Monster Hunt',
            content: `
                <div class="monster-game">
                    <div class="monster-instructions">
                        <h3>⚔️ Battle Pollution Monsters!</h3>
                        <p>Defeat monsters by correctly identifying waste types!</p>
                    </div>
                    <div class="battle-area" id="battleArea">
                        <div class="monster" id="monster">👾</div>
                        <div class="hero" id="hero">🦸‍♂️</div>
                        <div class="waste-weapon" id="wasteWeapon">🗑️</div>
                    </div>
                </div>
            `
        },
        city: {
            title: '🏗️ Clean City Builder',
            content: `
                <div class="city-game">
                    <div class="city-instructions">
                        <h3>🏗️ Build Your Eco City!</h3>
                        <p>Place recycling centers, parks, and clean energy sources strategically!</p>
                    </div>
                    <div class="city-grid" id="cityGrid"></div>
                    <div class="building-tools" id="buildingTools">
                        <div class="tool" data-type="recycling">♻️ Recycling Center</div>
                        <div class="tool" data-type="park">🌳 Park</div>
                        <div class="tool" data-type="solar">☀️ Solar Panel</div>
                        <div class="tool" data-type="wind">💨 Wind Turbine</div>
                    </div>
                </div>
            `
        }
    };
    
    return games[gameType] || {
        title: 'Game',
        content: '<p>Game content coming soon!</p>'
    };
}

// Play game
function playGame(gameType, isDaily) {
    if (!currentGame.started) {
        currentGame.started = true;
        document.getElementById('gameActionBtn').textContent = 'Playing...';
        document.getElementById('gameActionBtn').disabled = true;
        
        // Start game logic based on type
        switch (gameType) {
            case 'sorting':
                startSortingGame(isDaily);
                break;
            case 'quiz':
                startQuizGame(isDaily);
                break;
            default:
                // For demo purposes, simulate game completion
                setTimeout(() => {
                    completeGame(Math.floor(Math.random() * 1000) + 500, isDaily);
                }, 3000);
        }
    }
}

// Start sorting game
function startSortingGame(isDaily) {
    const wasteItems = [
        { emoji: '🍌', type: 'organic', name: 'Banana Peel' },
        { emoji: '🥤', type: 'recyclable', name: 'Soda Can' },
        { emoji: '🔋', type: 'hazardous', name: 'Battery' },
        { emoji: '🍎', type: 'organic', name: 'Apple Core' },
        { emoji: '📄', type: 'recyclable', name: 'Paper' },
        { emoji: '🧴', type: 'recyclable', name: 'Plastic Bottle' },
        { emoji: '💡', type: 'hazardous', name: 'Light Bulb' },
        { emoji: '🥕', type: 'organic', name: 'Carrot Peel' }
    ];
    
    let currentItems = [...wasteItems].sort(() => Math.random() - 0.5).slice(0, 6);
    let score = 0;
    let timeLeft = isDaily ? 120 : 60; // Double time for daily challenge
    
    // Display items
    const wasteItemsContainer = document.getElementById('wasteItems');
    wasteItemsContainer.innerHTML = '';
    
    currentItems.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'waste-item';
        itemDiv.draggable = true;
        itemDiv.innerHTML = `<span class="item-emoji">${item.emoji}</span><span class="item-name">${item.name}</span>`;
        itemDiv.dataset.type = item.type;
        itemDiv.dataset.index = index;
        
        itemDiv.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', item.type);
            e.dataTransfer.setData('index', index);
        });
        
        wasteItemsContainer.appendChild(itemDiv);
    });
    
    // Setup bins
    const bins = document.querySelectorAll('.bin');
    bins.forEach(bin => {
        bin.addEventListener('dragover', (e) => {
            e.preventDefault();
            bin.classList.add('drag-over');
        });
        
        bin.addEventListener('dragleave', () => {
            bin.classList.remove('drag-over');
        });
        
        bin.addEventListener('drop', (e) => {
            e.preventDefault();
            bin.classList.remove('drag-over');
            
            const itemType = e.dataTransfer.getData('text/plain');
            const itemIndex = e.dataTransfer.getData('index');
            const binType = bin.dataset.type;
            
            if (itemType === binType) {
                score += isDaily ? 20 : 10; // Double points for daily challenge
                document.getElementById('gameScore').textContent = score;
                document.querySelector(`[data-index="${itemIndex}"]`).remove();
                showFeedback('Correct! +' + (isDaily ? 20 : 10) + ' points', 'success');
                
                // Check if all items sorted
                if (wasteItemsContainer.children.length === 0) {
                    completeGame(score + (timeLeft * 2), isDaily); // Bonus for time left
                }
            } else {
                showFeedback('Wrong bin! Try again', 'error');
                score = Math.max(0, score - 5);
                document.getElementById('gameScore').textContent = score;
            }
        });
    });
    
    // Timer
    const timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            completeGame(score, isDaily);
        }
    }, 1000);
}

// Start quiz game
function startQuizGame(isDaily) {
    const questions = [
        {
            question: "Which bin should plastic bottles go in?",
            options: ["Organic", "Recyclable", "Hazardous"],
            correct: 1
        },
        {
            question: "How long does it take for plastic to decompose?",
            options: ["1 year", "10 years", "500+ years"],
            correct: 2
        },
        {
            question: "What percentage of waste can typically be recycled?",
            options: ["25%", "50%", "75%"],
            correct: 2
        },
        {
            question: "Which is the best way to reduce waste?",
            options: ["Reuse items", "Recycle everything", "Buy more"],
            correct: 0
        }
    ];
    
    let currentQuestion = 0;
    let score = 0;
    let correctAnswers = 0;
    
    function showQuestion() {
        if (currentQuestion >= questions.length) {
            const finalScore = correctAnswers * (isDaily ? 50 : 25);
            completeGame(finalScore, isDaily);
            return;
        }
        
        const q = questions[currentQuestion];
        const progressPercent = (currentQuestion / questions.length) * 100;
        
        document.getElementById('quizProgress').style.width = progressPercent + '%';
        document.getElementById('questionCounter').textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
        
        document.getElementById('quizQuestionArea').innerHTML = `
            <div class="question">
                <h3>${q.question}</h3>
                <div class="quiz-options">
                    ${q.options.map((option, index) => 
                        `<button class="quiz-option" onclick="selectQuizAnswer(${index}, ${q.correct})">${option}</button>`
                    ).join('')}
                </div>
            </div>
        `;
    }
    
    window.selectQuizAnswer = function(selected, correct) {
        const options = document.querySelectorAll('.quiz-option');
        options.forEach((opt, index) => {
            opt.disabled = true;
            if (index === correct) {
                opt.classList.add('correct');
            } else if (index === selected && selected !== correct) {
                opt.classList.add('incorrect');
            }
        });
        
        if (selected === correct) {
            correctAnswers++;
            score += isDaily ? 50 : 25;
            document.getElementById('gameScore').textContent = score;
            showFeedback('Correct!', 'success');
        } else {
            showFeedback('Incorrect. The correct answer is highlighted.', 'error');
        }
        
        setTimeout(() => {
            currentQuestion++;
            showQuestion();
        }, 2000);
    };
    
    showQuestion();
}

// Complete game
function completeGame(finalScore, isDaily) {
    currentGame.score = finalScore;
    
    // Update stats
    gameStats.gamesPlayed++;
    gameStats.totalScore += finalScore;
    
    if (isDaily) {
        gameStats.totalScore += finalScore; // Double points for daily challenge
        showNotification('🎉 Daily Challenge Complete! Double points earned!', 'success');
    }
    
    // Check for badge achievements
    checkBadgeAchievements();
    
    // Save stats
    saveGameStats();
    updateStatsDisplay();
    
    // Show completion message
    document.getElementById('gameArea').innerHTML = `
        <div class="game-complete">
            <div class="completion-icon">🎉</div>
            <h3>Game Complete!</h3>
            <div class="final-score">Final Score: ${finalScore}</div>
            ${isDaily ? '<div class="bonus-message">🔥 Daily Challenge Bonus Applied!</div>' : ''}
            <div class="rewards-earned">
                <h4>Rewards Earned:</h4>
                <div class="reward-list">
                    <div class="reward-item">⭐ ${finalScore} Points</div>
                    ${finalScore > 500 ? '<div class="reward-item">🏅 High Score Badge</div>' : ''}
                    ${isDaily ? '<div class="reward-item">🔥 Daily Champion Badge</div>' : ''}
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('gameActionBtn').textContent = 'Play Again';
    document.getElementById('gameActionBtn').disabled = false;
    document.getElementById('gameActionBtn').onclick = () => {
        closeGame();
        startGame(currentGame.type, isDaily);
    };
}

// Check badge achievements
function checkBadgeAchievements() {
    const badges = [];
    
    // First game badge
    if (gameStats.gamesPlayed === 1 && !gameStats.earnedBadges.includes('firstGame')) {
        badges.push('firstGame');
        gameStats.earnedBadges.push('firstGame');
        gameStats.badgesEarned++;
    }
    
    // High score badge
    if (currentGame.score > 500 && !gameStats.earnedBadges.includes('highScore')) {
        badges.push('highScore');
        gameStats.earnedBadges.push('highScore');
        gameStats.badgesEarned++;
    }
    
    // Game master badge
    if (gameStats.gamesPlayed >= 10 && !gameStats.earnedBadges.includes('gameMaster')) {
        badges.push('gameMaster');
        gameStats.earnedBadges.push('gameMaster');
        gameStats.badgesEarned++;
    }
    
    // Show new badge notifications
    badges.forEach(badge => {
        setTimeout(() => {
            showBadgeEarned(badge);
        }, 1000);
    });
}

// Show badge earned notification
function showBadgeEarned(badgeType) {
    const badgeNames = {
        firstGame: 'First Game Master',
        highScore: 'High Score Champion',
        gameMaster: 'Game Master'
    };
    
    showNotification(`🏆 New Badge Earned: ${badgeNames[badgeType]}!`, 'badge');
}

// Close game
function closeGame() {
    document.getElementById('gameModal').style.display = 'none';
    currentGame = null;
    if (gameTimer) {
        clearInterval(gameTimer);
        gameTimer = null;
    }
}

// Badge filters
function updateBadgeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const badgeCards = document.querySelectorAll('.badge-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            badgeCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category.includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Leaderboard tabs
function setupLeaderboardTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Here you would load different leaderboard data
            showNotification(`Loading ${btn.dataset.tab} leaderboard...`, 'info');
        });
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: type === 'success' ? '#4caf50' : 
                   type === 'error' ? '#f44336' :
                   type === 'badge' ? '#ffd700' : '#2196f3',
        color: 'white',
        padding: '15px 25px',
        borderRadius: '10px',
        zIndex: '3000',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Show feedback in game
function showFeedback(message, type) {
    const feedback = document.createElement('div');
    feedback.className = `game-feedback ${type}`;
    feedback.textContent = message;
    feedback.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        z-index: 1000;
        font-weight: bold;
    `;
    
    document.getElementById('gameArea').appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 1500);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadGameStats();
    updateBadgeFilters();
    setupLeaderboardTabs();
    
    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Add game styles
    const gameStyles = `
        <style>
        .sorting-game { text-align: center; }
        .game-instructions { margin-bottom: 20px; }
        .bins-guide { display: flex; justify-content: center; gap: 20px; margin: 15px 0; }
        .bin-info { display: flex; align-items: center; gap: 8px; font-weight: 600; }
        .bin-icon { font-size: 1.2rem; }
        .game-timer { font-size: 1.2rem; font-weight: bold; margin: 15px 0; color: #667eea; }
        .sorting-area { margin-top: 20px; }
        .waste-items { display: flex; flex-wrap: wrap; gap: 15px; justify-content: center; margin-bottom: 30px; min-height: 80px; }
        .waste-item { background: #f8f9fa; padding: 15px; border-radius: 10px; cursor: move; border: 2px dashed #ddd; display: flex; flex-direction: column; align-items: center; gap: 5px; min-width: 100px; }
        .waste-item:hover { background: #e9ecef; }
        .item-emoji { font-size: 2rem; }
        .item-name { font-size: 0.9rem; font-weight: 600; }
        .bins { display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; }
        .bin { width: 120px; height: 120px; border: 3px solid #ddd; border-radius: 15px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; transition: all 0.3s ease; }
        .bin.organic { border-color: #4caf50; }
        .bin.recyclable { border-color: #2196f3; }
        .bin.hazardous { border-color: #f44336; }
        .bin.drag-over { background: #e3f2fd; transform: scale(1.05); }
        .bin-icon { font-size: 2rem; }
        .bin-label { font-weight: 600; font-size: 0.9rem; }
        .quiz-game { text-align: center; }
        .quiz-progress { margin-bottom: 30px; }
        .progress-bar { width: 100%; height: 8px; background: #e9ecef; border-radius: 4px; overflow: hidden; margin-bottom: 10px; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, #667eea, #764ba2); transition: width 0.3s ease; }
        .quiz-options { display: flex; flex-direction: column; gap: 15px; margin-top: 20px; }
        .quiz-option { padding: 15px 25px; background: #f8f9fa; border: 2px solid #ddd; border-radius: 10px; cursor: pointer; font-size: 1rem; font-weight: 600; transition: all 0.3s ease; }
        .quiz-option:hover { background: #e9ecef; }
        .quiz-option.correct { background: #4caf50; color: white; border-color: #4caf50; }
        .quiz-option.incorrect { background: #f44336; color: white; border-color: #f44336; }
        .game-complete { text-align: center; padding: 30px; }
        .completion-icon { font-size: 4rem; margin-bottom: 20px; }
        .final-score { font-size: 2rem; font-weight: bold; color: #667eea; margin: 20px 0; }
        .bonus-message { color: #ff6b6b; font-weight: bold; margin: 10px 0; }
        .reward-list { display: flex; flex-direction: column; gap: 10px; margin-top: 15px; }
        .reward-item { background: #e6f3ff; color: #667eea; padding: 10px 20px; border-radius: 20px; font-weight: 600; }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', gameStyles);
});
