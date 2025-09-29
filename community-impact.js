// Community Impact JavaScript

// Regional impact data
const regionData = {
    delhi: {
        name: 'Delhi NCR',
        communities: 15,
        households: 4500,
        wasteReduced: '1,200 tons',
        energyGenerated: '3,400 kWh',
        jobsCreated: 85,
        highlights: [
            'First smart waste management hub in Sector 15, Noida',
            '78% waste reduction achieved in 6 months',
            'National Clean India Award winner',
            '15 recycling centers operational'
        ]
    },
    mumbai: {
        name: 'Mumbai',
        communities: 8,
        households: 2800,
        wasteReduced: '850 tons',
        energyGenerated: '2,100 kWh',
        jobsCreated: 52,
        highlights: [
            'Largest waste-to-energy project in Andheri',
            'Partnership with 25 housing societies',
            '90% citizen participation rate',
            'Model slum waste management program'
        ]
    },
    bangalore: {
        name: 'Bangalore',
        communities: 12,
        households: 3200,
        wasteReduced: '980 tons',
        energyGenerated: '2,800 kWh',
        jobsCreated: 68,
        highlights: [
            'Tech hub employee engagement program',
            'University partnerships for research',
            'Electronic waste recycling center',
            'Green corridor development'
        ]
    },
    pune: {
        name: 'Pune',
        communities: 6,
        households: 1800,
        wasteReduced: '520 tons',
        energyGenerated: '1,400 kWh',
        jobsCreated: 35,
        highlights: [
            'Student volunteer program with 500+ participants',
            'Organic waste composting initiative',
            'Smart bin IoT integration pilot',
            'Community garden development'
        ]
    },
    chennai: {
        name: 'Chennai',
        communities: 4,
        households: 1200,
        wasteReduced: '340 tons',
        energyGenerated: '950 kWh',
        jobsCreated: 22,
        highlights: [
            'Coastal cleanup and plastic recycling',
            'Traditional community engagement approach',
            'Micro-enterprise development for women',
            'Beach waste collection program'
        ]
    }
};

// Success stories data
const successStories = {
    sector15: {
        title: 'Sector 15, Noida: From Waste Crisis to Model Community',
        location: 'Sector 15, Noida, Uttar Pradesh',
        timeframe: 'January 2024 - July 2024 (6 months)',
        challenge: `Sector 15 was facing a severe waste management crisis. With 1,200 households generating over 45 tons of waste monthly, overflowing bins, irregular collection, and lack of segregation had turned the area into an unhygienic neighborhood. Residents complained of foul odors, pest problems, and health issues.`,
        solution: `ZeroWasteX implemented a comprehensive waste management transformation:
        
        **Phase 1: Community Engagement (Month 1)**
        - Door-to-door awareness campaigns reaching 1,200 households
        - Training workshops for 500+ residents on waste segregation
        - Formation of 12 neighborhood volunteer groups
        
        **Phase 2: Infrastructure Setup (Month 2-3)**
        - Installation of 45 smart bins with IoT sensors
        - Setup of community composting center
        - Deployment of 3 electric collection vehicles
        
        **Phase 3: System Implementation (Month 4-6)**
        - Daily collection with optimized routes
        - Real-time monitoring through mobile app
        - Rewards program for consistent participation`,
        results: [
            '78% reduction in total waste generation',
            '95% household participation in segregation',
            '₹2.5 lakh monthly cost savings for RWA',
            '25 local jobs created',
            'Zero waste-to-landfill achievement',
            '3,400 kWh clean energy generated'
        ],
        recognition: [
            'Clean India Award 2024 - Best Residential Community',
            'Featured in National Geographic India',
            'Model site for government delegations',
            'Case study for urban planning institutes'
        ],
        testimonial: {
            quote: "ZeroWasteX didn't just solve our waste problem - they transformed our entire community. Children now compete to segregate waste properly, and we've become a model for surrounding areas.",
            author: "Mrs. Sunita Sharma",
            designation: "RWA President, Sector 15"
        }
    }
};

// Initialize counters animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = formatNumber(target) + getNumberSuffix(counter.id);
                clearInterval(timer);
            } else {
                counter.textContent = formatNumber(Math.floor(current)) + getNumberSuffix(counter.id);
            }
        }, 30);
    });
}

// Format numbers for display
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

// Get appropriate suffix for counter
function getNumberSuffix(id) {
    switch (id) {
        case 'economicValue':
            return 'Cr';
        case 'livesImpacted':
            return '+';
        default:
            return '';
    }
}

// Show region impact details
function showRegionImpact(regionKey) {
    const region = regionData[regionKey];
    const detailsContainer = document.getElementById('regionDetails');
    
    if (region) {
        detailsContainer.innerHTML = `
            <h3>${region.name} Impact Summary</h3>
            <div class="region-stats">
                <div class="region-stat">
                    <span class="stat-label">Communities:</span>
                    <span class="stat-value">${region.communities}</span>
                </div>
                <div class="region-stat">
                    <span class="stat-label">Households:</span>
                    <span class="stat-value">${region.households.toLocaleString()}</span>
                </div>
                <div class="region-stat">
                    <span class="stat-label">Waste Reduced:</span>
                    <span class="stat-value">${region.wasteReduced}</span>
                </div>
                <div class="region-stat">
                    <span class="stat-label">Energy Generated:</span>
                    <span class="stat-value">${region.energyGenerated}</span>
                </div>
                <div class="region-stat">
                    <span class="stat-label">Jobs Created:</span>
                    <span class="stat-value">${region.jobsCreated}</span>
                </div>
            </div>
            <div class="region-highlights">
                <h4>Key Achievements:</h4>
                <ul>
                    ${region.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                </ul>
            </div>
        `;
    }
}

// Open success story modal
function openStoryModal(storyKey) {
    const story = successStories[storyKey];
    const modal = document.getElementById('storyModal');
    const title = document.getElementById('modalStoryTitle');
    const body = document.getElementById('modalStoryBody');
    
    if (story) {
        title.textContent = story.title;
        body.innerHTML = `
            <div class="full-story">
                <div class="story-meta">
                    <div class="meta-item">
                        <strong>Location:</strong> ${story.location}
                    </div>
                    <div class="meta-item">
                        <strong>Timeframe:</strong> ${story.timeframe}
                    </div>
                </div>
                
                <div class="story-section">
                    <h3>The Challenge</h3>
                    <p>${story.challenge}</p>
                </div>
                
                <div class="story-section">
                    <h3>Our Solution</h3>
                    <div class="solution-content">${story.solution.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</div>
                </div>
                
                <div class="story-section">
                    <h3>Results Achieved</h3>
                    <div class="results-grid">
                        ${story.results.map(result => `
                            <div class="result-item">
                                <span class="result-icon">✅</span>
                                <span class="result-text">${result}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="story-section">
                    <h3>Recognition & Awards</h3>
                    <div class="recognition-list">
                        ${story.recognition.map(item => `
                            <div class="recognition-item">
                                <span class="recognition-icon">🏆</span>
                                <span class="recognition-text">${item}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="story-testimonial">
                    <div class="testimonial-quote">"${story.testimonial.quote}"</div>
                    <div class="testimonial-attribution">
                        <strong>${story.testimonial.author}</strong><br>
                        ${story.testimonial.designation}
                    </div>
                </div>
            </div>
        `;
        modal.style.display = 'block';
    }
}

// Close success story modal
function closeStoryModal() {
    document.getElementById('storyModal').style.display = 'none';
}

// Before/After slider functionality
function initializeSlider() {
    const sliderHandle = document.getElementById('sliderHandle');
    const afterImage = document.querySelector('.after-image');
    let isSliding = false;
    
    if (sliderHandle && afterImage) {
        sliderHandle.addEventListener('mousedown', startSliding);
        document.addEventListener('mousemove', slide);
        document.addEventListener('mouseup', stopSliding);
        
        // Touch events for mobile
        sliderHandle.addEventListener('touchstart', startSliding);
        document.addEventListener('touchmove', slide);
        document.addEventListener('touchend', stopSliding);
    }
    
    function startSliding(e) {
        isSliding = true;
        e.preventDefault();
    }
    
    function slide(e) {
        if (!isSliding) return;
        
        const container = document.querySelector('.slider-container');
        const rect = container.getBoundingClientRect();
        const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const x = clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        
        // Constrain between 0% and 100%
        const clampedPercentage = Math.max(0, Math.min(100, percentage));
        
        // Update slider position
        sliderHandle.style.left = clampedPercentage + '%';
        
        // Update after image clip-path
        afterImage.style.clipPath = `polygon(${clampedPercentage}% 0, 100% 0, 100% 100%, ${clampedPercentage}% 100%)`;
    }
    
    function stopSliding() {
        isSliding = false;
    }
}

// Intersection Observer for animations
function setupAnimationObserver() {
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger counter animation for metrics
                if (entry.target.classList.contains('impact-metrics')) {
                    animateMetrics();
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.metric-category, .story-card, .timeline-item');
    animateElements.forEach(el => observer.observe(el));
}

// Animate metrics on scroll
function animateMetrics() {
    const metricNumbers = document.querySelectorAll('.metric-number');
    
    metricNumbers.forEach(number => {
        const target = parseInt(number.textContent.replace(/[^\d]/g, ''));
        const increment = target / 30;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                number.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                number.textContent = Math.floor(current).toLocaleString();
            }
        }, 50);
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
        maxWidth: '350px',
        fontSize: '0.95rem',
        fontWeight: '600'
    });
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize counter animations after a delay
    setTimeout(() => {
        animateCounters();
    }, 1000);
    
    // Initialize slider
    initializeSlider();
    
    // Setup animation observers
    setupAnimationObserver();
    
    // Close modal when clicking outside
    document.getElementById('storyModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeStoryModal();
        }
    });
    
    
    const optionBtns = document.querySelectorAll('.option-btn, .event-btn');
    optionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const option = this.textContent;
            showNotification(`🎉 Thank you for your interest in "${option}"! We'll contact you soon with details.`, 'success');
        });
    });
    
    
    const animationStyles = `
        <style>
        @keyframes animate-in {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-in {
            animation: animate-in 0.6s ease-out forwards;
        }
        
        .region-stats {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin: 20px 0;
        }
        
        .region-stat {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
        
        .region-stat:last-child {
            border-bottom: none;
        }
        
        .stat-label {
            font-weight: 600;
            color: #1b5e20;
        }
        
        .stat-value {
            font-weight: 700;
            color: #4caf50;
        }
        
        .region-highlights {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 2px solid #e8f5e8;
        }
        
        .region-highlights h4 {
            color: #1b5e20;
            margin-bottom: 15px;
            font-size: 1.1rem;
        }
        
        .region-highlights ul {
            padding-left: 20px;
            list-style-type: none;
        }
        
        .region-highlights li {
            position: relative;
            margin-bottom: 8px;
            padding-left: 25px;
            color: #555;
            line-height: 1.4;
        }
        
        .region-highlights li::before {
            content: '🌟';
            position: absolute;
            left: 0;
            top: 0;
        }
        
        .story-meta {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 25px;
        }
        
        .meta-item {
            margin-bottom: 10px;
            font-size: 0.95rem;
        }
        
        .story-section {
            margin-bottom: 30px;
        }
        
        .story-section h3 {
            color: #1b5e20;
            font-size: 1.4rem;
            margin-bottom: 15px;
            font-weight: 600;
        }
        
        .solution-content {
            line-height: 1.6;
            color: #555;
        }
        
        .results-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }
        
        .result-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px;
            background: #e8f5e8;
            border-radius: 8px;
        }
        
        .result-icon {
            font-size: 1.2rem;
            flex-shrink: 0;
        }
        
        .result-text {
            color: #2e7d32;
            font-weight: 600;
            font-size: 0.95rem;
        }
        
        .recognition-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-top: 15px;
        }
        
        .recognition-item {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 15px;
            background: #fff3e0;
            border-radius: 10px;
            border-left: 4px solid #ff9800;
        }
        
        .recognition-icon {
            font-size: 1.5rem;
            flex-shrink: 0;
        }
        
        .recognition-text {
            color: #e65100;
            font-weight: 600;
        }
        
        .story-testimonial {
            background: linear-gradient(135deg, #e8f5e8, #f1f8e9);
            padding: 25px;
            border-radius: 15px;
            border-left: 5px solid #4caf50;
            margin-top: 25px;
        }
        
        .testimonial-quote {
            font-size: 1.1rem;
            font-style: italic;
            line-height: 1.6;
            color: #2e7d32;
            margin-bottom: 15px;
            position: relative;
        }
        
        .testimonial-quote::before {
            content: '"';
            font-size: 3rem;
            color: #4caf50;
            position: absolute;
            top: -15px;
            left: -10px;
            font-family: serif;
        }
        
        .testimonial-attribution {
            color: #1b5e20;
            font-size: 0.95rem;
            text-align: right;
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', animationStyles);
});
