// Citizen Training JavaScript

let userProgress = {
    completedModules: 0,
    totalPoints: 0,
    unlockedModules: [1], // Module 1 starts unlocked
    completedQuizzes: []
};

// Load saved progress from localStorage
function loadProgress() {
    const saved = localStorage.getItem('zerowaste_training_progress');
    if (saved) {
        userProgress = JSON.parse(saved);
    }
    updateProgressDisplay();
}

// Save progress to localStorage
function saveProgress() {
    localStorage.setItem('zerowaste_training_progress', JSON.stringify(userProgress));
}

// Update progress display
function updateProgressDisplay() {
    document.getElementById('userProgress').textContent = userProgress.completedModules;
    document.getElementById('userPoints').textContent = userProgress.totalPoints;
    
    const percentage = Math.round((userProgress.completedModules / 8) * 100);
    document.getElementById('overallPercentage').textContent = percentage + '%';
    document.getElementById('overallProgressBar').style.width = percentage + '%';
    
    // Update module states
    updateModuleStates();
    updateAchievements();
}

// Update module lock states
function updateModuleStates() {
    const modules = document.querySelectorAll('.module-card');
    
    modules.forEach((module, index) => {
        const moduleNum = index + 1;
        const isUnlocked = userProgress.unlockedModules.includes(moduleNum);
        const isCompleted = userProgress.completedModules >= moduleNum;
        
        if (isCompleted) {
            module.classList.remove('locked', 'unlocked');
            module.classList.add('completed');
            module.querySelector('.status-icon').textContent = '✅';
            module.querySelector('.progress-fill').style.width = '100%';
            module.querySelector('.start-module-btn').textContent = 'Completed';
            module.querySelector('.start-module-btn').disabled = true;
        } else if (isUnlocked) {
            module.classList.remove('locked', 'completed');
            module.classList.add('unlocked');
            module.querySelector('.status-icon').textContent = '🔓';
            module.querySelector('.start-module-btn').disabled = false;
            module.querySelector('.start-module-btn').textContent = 'Start Learning';
        } else {
            module.classList.remove('unlocked', 'completed');
            module.classList.add('locked');
            module.querySelector('.status-icon').textContent = '🔒';
            module.querySelector('.start-module-btn').disabled = true;
        }
    });
}

// Start a training module
function startModule(moduleNumber) {
    const moduleData = getModuleContent(moduleNumber);
    
    document.getElementById('modalTitle').textContent = moduleData.title;
    document.getElementById('modalBody').innerHTML = moduleData.content;
    document.getElementById('completeBtn').onclick = () => completeModule(moduleNumber);
    
    document.getElementById('trainingModal').style.display = 'block';
}

// Get module content
function getModuleContent(moduleNumber) {
    const modules = {
        1: {
            title: 'Module 1: Waste Classification Basics',
            content: `
                <div class="module-lesson">
                    <h3>🗑️ Understanding Waste Categories</h3>
                    <p>Proper waste classification is the foundation of effective waste management. Let's learn the main categories:</p>
                    
                    <div class="lesson-section">
                        <h4>1. Organic Waste (Wet Waste)</h4>
                        <ul>
                            <li>Kitchen scraps and food leftovers</li>
                            <li>Vegetable peels and fruit waste</li>
                            <li>Garden clippings and leaves</li>
                            <li>Biodegradable materials</li>
                        </ul>
                    </div>
                    
                    <div class="lesson-section">
                        <h4>2. Recyclable Waste (Dry Waste)</h4>
                        <ul>
                            <li>Paper, cardboard, and newspapers</li>
                            <li>Plastic bottles and containers</li>
                            <li>Glass bottles and jars</li>
                            <li>Metal cans and foils</li>
                        </ul>
                    </div>
                    
                    <div class="lesson-section">
                        <h4>3. Hazardous Waste</h4>
                        <ul>
                            <li>Batteries and electronic devices</li>
                            <li>Chemical containers</li>
                            <li>Medical waste</li>
                            <li>Paint and solvents</li>
                        </ul>
                    </div>
                    
                    <div class="quiz-section">
                        <h4>✅ Quick Check:</h4>
                        <p><strong>Question:</strong> Where should you dispose of banana peels?</p>
                        <div class="quiz-options">
                            <button class="quiz-option" onclick="selectAnswer(this, true)">Organic waste bin</button>
                            <button class="quiz-option" onclick="selectAnswer(this, false)">Recyclable waste bin</button>
                            <button class="quiz-option" onclick="selectAnswer(this, false)">Hazardous waste bin</button>
                        </div>
                        <div class="quiz-feedback" id="quizFeedback"></div>
                    </div>
                </div>
            `
        },
        // Add more modules as needed
    };
    
    return modules[moduleNumber] || {
        title: `Module ${moduleNumber}`,
        content: `<p>Module ${moduleNumber} content will be available soon!</p>`
    };
}

// Handle quiz answers
function selectAnswer(button, isCorrect) {
    const options = button.parentNode.querySelectorAll('.quiz-option');
    const feedback = document.getElementById('quizFeedback');
    
    options.forEach(opt => {
        opt.disabled = true;
        if (opt === button) {
            opt.style.background = isCorrect ? '#4caf50' : '#f44336';
            opt.style.color = 'white';
        }
    });
    
    if (isCorrect) {
        feedback.innerHTML = '<p style="color: #4caf50;">✅ Correct! Banana peels are organic waste.</p>';
    } else {
        feedback.innerHTML = '<p style="color: #f44336;">❌ Incorrect. Banana peels should go in the organic waste bin.</p>';
    }
}

// Complete a module
function completeModule(moduleNumber) {
    if (!userProgress.unlockedModules.includes(moduleNumber)) return;
    
    // Mark module as completed
    userProgress.completedModules = Math.max(userProgress.completedModules, moduleNumber);
    
    // Add points based on module
    const points = [100, 150, 200, 175, 225, 300, 180, 500];
    userProgress.totalPoints += points[moduleNumber - 1] || 100;
    
    // Unlock next module
    if (moduleNumber < 8 && !userProgress.unlockedModules.includes(moduleNumber + 1)) {
        userProgress.unlockedModules.push(moduleNumber + 1);
    }
    
    // Save and update display
    saveProgress();
    updateProgressDisplay();
    
    // Close modal
    closeTrainingModal();
    
    // Show completion notification
    showNotification(`🎉 Module ${moduleNumber} completed! +${points[moduleNumber - 1]} points earned!`);
}

// Close training modal
function closeTrainingModal() {
    document.getElementById('trainingModal').style.display = 'none';
}

// Start quick quiz
function startQuickQuiz(type) {
    const quizData = {
        segregation: {
            question: "Which bin should plastic bottles go in?",
            options: ["Organic waste", "Dry/Recyclable waste", "Hazardous waste"],
            correct: 1
        },
        cleaning: {
            question: "Should you clean containers before recycling?",
            options: ["Yes, always", "No, never", "Only sometimes"],
            correct: 0
        },
        hazardous: {
            question: "Where should old batteries be disposed?",
            options: ["Regular trash", "Recycling bin", "Designated collection points"],
            correct: 2
        },
        composting: {
            question: "How long does home composting usually take?",
            options: ["1-2 weeks", "45-60 days", "6 months"],
            correct: 1
        }
    };
    
    const quiz = quizData[type];
    if (quiz) {
        alert(`Quiz: ${quiz.question}\n\nAnswer: ${quiz.options[quiz.correct]}`);
        
        // Add points for quick quiz
        userProgress.totalPoints += 10;
        saveProgress();
        updateProgressDisplay();
        showNotification("Quick quiz completed! +10 points!");
    }
}

// Update achievements
function updateAchievements() {
    const achievements = document.querySelectorAll('.achievement-card');
    
    // First Steps
    if (userProgress.completedModules >= 1) {
        achievements[0].classList.add('unlocked');
        achievements[0].querySelector('.achievement-progress').textContent = '1/1';
    }
    
    // Quick Learner (placeholder logic)
    achievements[1].querySelector('.achievement-progress').textContent = `${Math.min(userProgress.completedModules, 3)}/3`;
    if (userProgress.completedModules >= 3) {
        achievements[1].classList.add('unlocked');
    }
    
    // Knowledge Seeker
    achievements[2].querySelector('.achievement-progress').textContent = `${userProgress.completedModules}/8`;
    if (userProgress.completedModules >= 8) {
        achievements[2].classList.add('unlocked');
    }
    
    // Point Master
    achievements[3].querySelector('.achievement-progress').textContent = `${Math.min(userProgress.totalPoints, 1000)}/1000`;
    if (userProgress.totalPoints >= 1000) {
        achievements[3].classList.add('unlocked');
    }
    
    // Waste Champion
    if (userProgress.completedModules >= 8) {
        achievements[4].classList.add('unlocked');
        achievements[4].querySelector('.achievement-progress').textContent = '1/1';
    }
}

// Show notification
function showNotification(message) {
    // Simple alert for now - could be enhanced with custom notifications
    setTimeout(() => {
        alert(message);
    }, 500);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadProgress();
    
    // Add some demo progress for first visit
    if (userProgress.completedModules === 0 && userProgress.totalPoints === 0) {
        // Could add welcome tutorial here
    }
});

// Add CSS for module lesson styling
const lessonStyles = `
<style>
.module-lesson h3 { color: #1e5d3a; margin-bottom: 15px; }
.module-lesson h4 { color: #2e8b57; margin: 20px 0 10px 0; }
.lesson-section { margin-bottom: 25px; }
.lesson-section ul { padding-left: 20px; }
.lesson-section li { margin-bottom: 5px; line-height: 1.5; }
.quiz-section { background: #f8f9fa; padding: 20px; border-radius: 10px; margin-top: 30px; }
.quiz-options { display: flex; flex-direction: column; gap: 10px; margin: 15px 0; }
.quiz-option { padding: 10px 15px; border: 2px solid #2e8b57; background: white; border-radius: 8px; cursor: pointer; transition: all 0.3s ease; }
.quiz-option:hover { background: #2e8b57; color: white; }
.quiz-feedback { margin-top: 15px; font-weight: 600; }
</style>`;

document.head.insertAdjacentHTML('beforeend', lessonStyles);
