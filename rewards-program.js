// Rewards Program JavaScript

let userRewards = {
    totalPoints: 2450,
    level: 'Eco Warrior',
    streak: 7,
    impactScore: 156,
    weeklyTrend: 120,
    referrals: 3,
    bonusPoints: 450,
    lifetimeValue: 225
};

// Load saved rewards data
function loadRewardsData() {
    const saved = localStorage.getItem('zerowaste_rewards_data');
    if (saved) {
        userRewards = { ...userRewards, ...JSON.parse(saved) };
    }
    updateRewardsDisplay();
}

// Save rewards data
function saveRewardsData() {
    localStorage.setItem('zerowaste_rewards_data', JSON.stringify(userRewards));
}

// Update rewards display
function updateRewardsDisplay() {
    document.getElementById('totalPoints').textContent = userRewards.totalPoints.toLocaleString();
    
    // Update level progress
    updateLevelProgress();
    
    // Update activity counters
    updateActivityCounters();
}

// Update level progress
function updateLevelProgress() {
    const levelRequirements = {
        'Green Starter': { min: 0, max: 999 },
        'Eco Warrior': { min: 1000, max: 4999 },
        'Planet Guardian': { min: 5000, max: 9999 },
        'Earth Champion': { min: 10000, max: Infinity }
    };
    
    const currentLevel = levelRequirements[userRewards.level];
    const progress = ((userRewards.totalPoints - currentLevel.min) / (currentLevel.max - currentLevel.min)) * 100;
    
    // Update progress bars
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        if (bar.closest('.level-progress')) {
            bar.style.width = Math.min(progress, 100) + '%';
        }
    });
}

// Complete quick action
function completeAction(actionType) {
    let pointsEarned = 0;
    let actionMessage = '';
    
    switch (actionType) {
        case 'photo':
            pointsEarned = 50;
            actionMessage = '📸 Photo challenge completed! Great recycling setup!';
            break;
        case 'quiz':
            pointsEarned = 25;
            actionMessage = '🎯 Daily quiz completed! You got 4/5 questions right!';
            break;
        case 'invite':
            pointsEarned = 100;
            actionMessage = '👥 Friend invitation sent! You\'ll get bonus points when they join!';
            break;
        case 'review':
            pointsEarned = 75;
            actionMessage = '📝 Review submitted! Thank you for the feedback!';
            break;
    }
    
    // Apply streak multiplier
    if (userRewards.streak >= 7) {
        pointsEarned = Math.floor(pointsEarned * 2);
        actionMessage += ' 🔥 Streak bonus applied!';
    }
    
    // Update points
    userRewards.totalPoints += pointsEarned;
    saveRewardsData();
    updateRewardsDisplay();
    
    // Show notification
    showNotification(`🎉 +${pointsEarned} points earned! ${actionMessage}`, 'success');
    
    // Disable button temporarily
    const buttons = document.querySelectorAll('.action-btn');
    buttons.forEach(btn => {
        if (btn.onclick && btn.onclick.toString().includes(actionType)) {
            btn.textContent = 'Completed!';
            btn.disabled = true;
            btn.style.background = '#4caf50';
            
            setTimeout(() => {
                btn.textContent = getActionButtonText(actionType);
                btn.disabled = false;
                btn.style.background = '';
            }, 3000);
        }
    });
    
    // Check for level up
    checkLevelUp();
}

// Get action button text
function getActionButtonText(actionType) {
    const buttonTexts = {
        photo: 'Complete',
        quiz: 'Start Quiz',
        invite: 'Invite',
        review: 'Write'
    };
    return buttonTexts[actionType];
}

// Redeem reward
function redeemReward(rewardId) {
    const rewardCosts = {
        'voucher-500': 1000,
        'coffee': 200,
        'eco-kit': 800,
        'book': 600,
        'tree-planting': 1500,
        'facility-tour': 300,
        'ocean-cleanup': 500,
        'education': 750
    };
    
    const cost = rewardCosts[rewardId];
    
    if (!cost) {
        showNotification('❌ Invalid reward selected', 'error');
        return;
    }
    
    if (userRewards.totalPoints < cost) {
        showNotification(`❌ Insufficient points! You need ${cost - userRewards.totalPoints} more points.`, 'error');
        return;
    }
    
    // Deduct points
    userRewards.totalPoints -= cost;
    saveRewardsData();
    updateRewardsDisplay();
    
    // Show success message
    const rewardNames = {
        'voucher-500': '₹500 Shopping Voucher',
        'coffee': 'Coffee Shop Voucher',
        'eco-kit': 'Eco-Friendly Kit',
        'book': 'Sustainability Book',
        'tree-planting': 'Tree Planting Experience',
        'facility-tour': 'Recycling Facility Tour',
        'ocean-cleanup': 'Ocean Cleanup Donation',
        'education': 'Education Support Donation'
    };
    
    showNotification(`🎁 ${rewardNames[rewardId]} redeemed successfully! Check your email for details.`, 'success');
    
    // Add to activity timeline
    addActivity('redeemed', `${rewardNames[rewardId]} claimed`, -cost);
}

// Check for level up
function checkLevelUp() {
    const levelThresholds = [
        { name: 'Green Starter', min: 0, max: 999 },
        { name: 'Eco Warrior', min: 1000, max: 4999 },
        { name: 'Planet Guardian', min: 5000, max: 9999 },
        { name: 'Earth Champion', min: 10000, max: Infinity }
    ];
    
    const currentLevelIndex = levelThresholds.findIndex(level => level.name === userRewards.level);
    const nextLevel = levelThresholds[currentLevelIndex + 1];
    
    if (nextLevel && userRewards.totalPoints >= nextLevel.min) {
        userRewards.level = nextLevel.name;
        saveRewardsData();
        
        showNotification(`🏆 Level Up! You're now a ${nextLevel.name}! Enjoy enhanced benefits!`, 'level');
        
        // Add to activity timeline
        addActivity('level', `Promoted to ${nextLevel.name}`, 'Bonus unlocked');
    }
}

// Add activity to timeline
function addActivity(type, description, value) {
    // This would typically add to a backend or local storage
    // For demo, we'll just show the notification
    console.log(`Activity added: ${type} - ${description} - ${value}`);
}

// Copy referral link
function copyReferralLink() {
    const linkInput = document.querySelector('.link-input');
    linkInput.select();
    linkInput.setSelectionRange(0, 99999); // For mobile devices
    
    try {
        document.execCommand('copy');
        showNotification('🔗 Referral link copied to clipboard!', 'success');
    } catch (err) {
        showNotification('❌ Failed to copy link. Please copy manually.', 'error');
    }
}

// Filter rewards
function setupRewardFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const rewardCards = document.querySelectorAll('.reward-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            // Filter cards
            rewardCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Update activity counters (simulate real-time updates)
function updateActivityCounters() {
    // Simulate some random updates
    setInterval(() => {
        // Randomly update trend indicator
        if (Math.random() > 0.7) {
            const trendIndicator = document.querySelector('.trend-indicator');
            const currentValue = parseInt(trendIndicator.textContent.match(/\d+/)[0]);
            const newValue = currentValue + Math.floor(Math.random() * 10);
            trendIndicator.innerHTML = `↗️ +${newValue} this week`;
        }
    }, 30000); // Update every 30 seconds
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    const colors = {
        success: '#4caf50',
        error: '#f44336',
        info: '#2196f3',
        level: '#ff6b35',
        warning: '#ff9800'
    };
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: colors[type] || colors.info,
        color: 'white',
        padding: '15px 25px',
        borderRadius: '12px',
        zIndex: '3000',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease',
        maxWidth: '350px',
        fontSize: '0.95rem',
        fontWeight: '600',
        lineHeight: '1.4'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    const delay = type === 'level' ? 5000 : 4000;
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, delay);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadRewardsData();
    setupRewardFilters();
    
    // Animate progress bars on load
    setTimeout(() => {
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
            const targetWidth = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 500);
        });
    }, 1000);
    
    // Add CSS for animations
    const animationStyles = `
        <style>
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .reward-card {
            animation: fadeIn 0.5s ease;
        }
        
        .notification {
            backdrop-filter: blur(10px);
        }
        
        .action-btn:disabled {
            cursor: not-allowed;
            opacity: 0.8;
        }
        
        .tier-progress .progress-bar {
            background: rgba(255, 215, 0, 0.2);
        }
        
        .tier-progress .progress-fill {
            background: linear-gradient(90deg, #ff6b35, #ffd700);
        }
        
        .activity-timeline {
            position: relative;
        }
        
        .activity-timeline::before {
            content: '';
            position: absolute;
            left: 40px;
            top: 0;
            bottom: 0;
            width: 2px;
            background: linear-gradient(to bottom, #ff6b35, #ffd700, #ff6b35);
            opacity: 0.3;
        }
        
        .social-share .share-btn:hover {
            transform: translateY(-2px) scale(1.05);
        }
        
        .referral-graphic {
            animation: referralPulse 4s ease-in-out infinite;
        }
        
        @keyframes referralPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
        }
        
        .offer-timer {
            animation: timerBlink 2s ease-in-out infinite;
        }
        
        @keyframes timerBlink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
        }
        
        .dashboard-card {
            backdrop-filter: blur(15px);
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }
        
        .reward-badge {
            animation: badgeBounce 2s ease-in-out infinite;
        }
        
        @keyframes badgeBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', animationStyles);
    
    // Show welcome message for first-time users
    if (!localStorage.getItem('zerowaste_rewards_welcome')) {
        setTimeout(() => {
            showNotification('🌟 Welcome to ZeroWasteX Rewards! Start earning points by completing eco-friendly actions!', 'info');
            localStorage.setItem('zerowaste_rewards_welcome', 'true');
        }, 2000);
    }
});

// Handle special offers
document.addEventListener('DOMContentLoaded', function() {
    const offerBtns = document.querySelectorAll('.offer-btn');
    
    offerBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const offerCard = this.closest('.offer-card');
            const offerTitle = offerCard.querySelector('h3').textContent;
            
            if (this.textContent.includes('Activate')) {
                showNotification(`🔥 ${offerTitle} activated! You'll now earn double points!`, 'success');
                this.textContent = 'Activated!';
                this.disabled = true;
                this.style.background = '#4caf50';
            } else if (this.textContent.includes('Claim')) {
                showNotification(`🎁 ${offerTitle} claimed successfully!`, 'success');
                userRewards.totalPoints -= 800;
                userRewards.totalPoints += 500; // Bonus points from bundle
                saveRewardsData();
                updateRewardsDisplay();
            } else if (this.textContent.includes('Continue')) {
                showNotification(`🏃‍♂️ Keep up your streak! You're doing great!`, 'info');
            }
        });
    });
});
