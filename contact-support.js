// Contact Support JavaScript

// Support categories data
const supportCategories = {
    account: {
        title: 'Account & Profile Support',
        description: 'Get help with login, profile settings, and account management',
        avgResponse: '2 minutes',
        commonIssues: [
            'Password reset',
            'Profile update issues',
            'Account verification',
            'Login problems'
        ]
    },
    collection: {
        title: 'Collection & Pickup Support',
        description: 'Assistance with waste collection schedules and pickup requests',
        avgResponse: '15 minutes',
        commonIssues: [
            'Missed collection',
            'Schedule changes',
            'Emergency pickup',
            'Collection feedback'
        ]
    },
    rewards: {
        title: 'Rewards & Points Support',
        description: 'Help with points, redemptions, and rewards program',
        avgResponse: '5 minutes',
        commonIssues: [
            'Points not credited',
            'Redemption issues',
            'Reward delivery',
            'Tier upgrades'
        ]
    },
    technical: {
        title: 'Technical Support',
        description: 'Solutions for app issues, bugs, and technical problems',
        avgResponse: '10 minutes',
        commonIssues: [
            'App crashes',
            'Website errors',
            'Sync problems',
            'Feature not working'
        ]
    },
    billing: {
        title: 'Billing & Payment Support',
        description: 'Assistance with payments, billing, and financial queries',
        avgResponse: '30 minutes',
        commonIssues: [
            'Payment failures',
            'Billing disputes',
            'Refund requests',
            'Plan changes'
        ]
    },
    education: {
        title: 'Training & Education Support',
        description: 'Help with courses, certifications, and learning modules',
        avgResponse: '1 hour',
        commonIssues: [
            'Course access',
            'Certificate issues',
            'Progress tracking',
            'Content problems'
        ]
    }
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
    initializeFAQ();
    initializeChatWidget();
    setupResourceButtons();
});

// Select support category
function selectCategory(categoryKey) {
    const category = supportCategories[categoryKey];
    if (category) {
        // Scroll to contact form
        document.querySelector('.contact-form-section').scrollIntoView({ 
            behavior: 'smooth' 
        });
        
        // Pre-select category in form
        document.getElementById('category').value = categoryKey;
        
        // Show notification
        showNotification(`📋 ${category.title} selected. Average response time: ${category.avgResponse}`, 'info');
    }
}

// Initialize contact form
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission();
    });
    
    // File upload handling
    const fileInput = document.getElementById('attachment');
    const fileUpload = document.querySelector('.file-upload');
    
    fileUpload.addEventListener('click', () => fileInput.click());
    
    fileUpload.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.borderColor = '#2196f3';
        this.style.background = '#f3f9ff';
    });
    
    fileUpload.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.style.borderColor = '#e0e0e0';
        this.style.background = 'white';
    });
    
    fileUpload.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = '#e0e0e0';
        this.style.background = 'white';
        
        const files = e.dataTransfer.files;
        fileInput.files = files;
        updateFileDisplay(files);
    });
    
    fileInput.addEventListener('change', function() {
        updateFileDisplay(this.files);
    });
}

// Update file display
function updateFileDisplay(files) {
    const uploadText = document.querySelector('.file-upload-text');
    
    if (files.length > 0) {
        const fileNames = Array.from(files).map(f => f.name).join(', ');
        uploadText.innerHTML = `
            <span class="upload-icon">✅</span>
            <span>${files.length} file(s) selected: ${fileNames}</span>
        `;
    } else {
        uploadText.innerHTML = `
            <span class="upload-icon">📎</span>
            <span>Click to attach files or drag and drop</span>
        `;
    }
}

// Handle form submission
function handleFormSubmission() {
    const submitBtn = document.querySelector('.submit-btn');
    const btnText = document.querySelector('.btn-text');
    const btnLoading = document.querySelector('.btn-loading');
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    
    // Simulate form submission
    setTimeout(() => {
        // Reset form
        document.getElementById('contactForm').reset();
        updateFileDisplay([]);
        
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        
        // Show success message
        showNotification('✅ Support request submitted successfully! We\'ll get back to you within 24 hours.', 'success');
        
        // Generate ticket number
        const ticketNumber = 'ZWX-' + Math.random().toString(36).substr(2, 8).toUpperCase();
        
        setTimeout(() => {
            showNotification(`🎫 Your support ticket number is: ${ticketNumber}. Save it for reference.`, 'info');
        }, 2000);
        
    }, 2000);
}

// Initialize FAQ functionality
function initializeFAQ() {
    const categoryBtns = document.querySelectorAll('.faq-category-btn');
    const categoryContents = document.querySelectorAll('.faq-category-content');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update active content
            categoryContents.forEach(content => {
                content.classList.remove('active');
                if (content.dataset.category === category) {
                    content.classList.add('active');
                }
            });
        });
    });
}

// Toggle FAQ item
function toggleFAQ(questionElement) {
    const faqItem = questionElement.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQs in the same category
    const categoryContent = questionElement.closest('.faq-category-content');
    categoryContent.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current FAQ
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Initialize chat widget
function initializeChatWidget() {
    const chatInput = document.getElementById('chatInput');
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
    
    // Add initial bot messages
    setTimeout(() => {
        addChatMessage('bot', 'I can help you with common questions. Try asking about "collection schedule" or "points balance".');
    }, 2000);
}

// Open live chat
function openLiveChat() {
    const chatWidget = document.getElementById('chatWidget');
    const chatLauncher = document.getElementById('chatLauncher');
    
    chatWidget.style.display = 'flex';
    chatLauncher.style.display = 'none';
    
    // Add welcome message
    setTimeout(() => {
        addChatMessage('bot', 'Hello! I\'m your ZeroWasteX support assistant. What can I help you with today?');
    }, 500);
}

// Minimize chat
function minimizeChat() {
    const chatWidget = document.getElementById('chatWidget');
    const chatLauncher = document.getElementById('chatLauncher');
    
    chatWidget.style.display = 'none';
    chatLauncher.style.display = 'flex';
}

// Send chat message
function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (message) {
        addChatMessage('user', message);
        chatInput.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            const response = getBotResponse(message);
            addChatMessage('bot', response);
        }, 1000);
    }
}

// Add chat message
function addChatMessage(type, message) {
    const chatBody = document.getElementById('chatBody');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}`;
    
    const avatar = type === 'bot' ? '🤖' : '👤';
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <p>${message}</p>
            <div class="message-time">${time}</div>
        </div>
    `;
    
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Get bot response (simple keyword matching)
function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    if (message.includes('collection') || message.includes('pickup')) {
        return 'Our collection schedules vary by area. You can check your personalized schedule in the mobile app or call +91 98765-43210 for immediate assistance.';
    }
    
    if (message.includes('points') || message.includes('rewards')) {
        return 'You can check your points balance in the Rewards section of your profile. Points are usually credited within 24 hours of completing activities.';
    }
    
    if (message.includes('app') || message.includes('technical')) {
        return 'For technical issues, try restarting the app first. If the problem persists, please describe the specific issue and I can provide more targeted help.';
    }
    
    if (message.includes('account') || message.includes('login')) {
        return 'For account issues, you can reset your password using the "Forgot Password" link on the login page. Need more help? I can connect you with our account specialists.';
    }
    
    if (message.includes('billing') || message.includes('payment')) {
        return 'Billing questions are handled by our finance team. Please email billing@zerowastex.com or call +91 98765-43210 for immediate assistance.';
    }
    
    if (message.includes('hello') || message.includes('hi')) {
        return 'Hello! I\'m here to help. You can ask me about collections, points, account issues, or any other questions about ZeroWasteX services.';
    }
    
    if (message.includes('thank')) {
        return 'You\'re welcome! Is there anything else I can help you with today?';
    }
    
    // Default response
    return 'I understand you need help with that. For detailed assistance, please submit a support request using the form above, or call our support team at +91 98765-43210. They\'ll be able to provide specific guidance for your situation.';
}

// Setup resource buttons
function setupResourceButtons() {
    const resourceBtns = document.querySelectorAll('.resource-btn');
    
    resourceBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const resourceCard = this.closest('.resource-card');
            const resourceTitle = resourceCard.querySelector('h3').textContent;
            
            showNotification(`📚 Opening ${resourceTitle}... This feature will be available soon!`, 'info');
        });
    });
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
        maxWidth: '400px',
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
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, type === 'success' ? 5000 : 4000);
}

// Form validation
function validateForm() {
    const form = document.getElementById('contactForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#f44336';
            isValid = false;
        } else {
            field.style.borderColor = '#e0e0e0';
        }
    });
    
    return isValid;
}

// Auto-resize textarea
document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('message');
    
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 200) + 'px';
    });
});

// Handle contact form real-time validation
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#f44336';
                this.style.backgroundColor = '#fff5f5';
            } else {
                this.style.borderColor = '#e0e0e0';
                this.style.backgroundColor = 'white';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#2196f3';
            this.style.backgroundColor = 'white';
        });
    });
});

// Update launcher notification count
function updateChatNotification() {
    const notification = document.querySelector('.launcher-notification');
    let count = parseInt(notification.textContent);
    
    setInterval(() => {
        if (Math.random() > 0.7) {
            count++;
            notification.textContent = count;
        }
    }, 30000); // Random new messages every 30 seconds
}

// Initialize notification updates
document.addEventListener('DOMContentLoaded', function() {
    updateChatNotification();
});
