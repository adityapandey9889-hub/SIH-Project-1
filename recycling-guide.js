
// Recycling Guide JavaScript

// Database of recyclable items
const recyclingDatabase = {
    'plastic bottle': {
        category: 'Plastic',
        recyclable: true,
        instructions: 'Remove cap, rinse clean, and place in recycling bin',
        prepSteps: ['Remove label if possible', 'Empty completely', 'Rinse with water', 'Remove cap'],
        recyclingCode: 1,
        tip: 'Plastic bottles can be recycled into new bottles, clothing, or carpeting!'
    },
    'cardboard': {
        category: 'Paper',
        recyclable: true,
        instructions: 'Flatten boxes, remove tape, and place in paper recycling',
        prepSteps: ['Remove all tape and labels', 'Flatten completely', 'Keep dry'],
        tip: 'Cardboard can be recycled 5-7 times before fibers become too short!'
    },
    'battery': {
        category: 'Hazardous',
        recyclable: true,
        instructions: 'Take to designated battery collection point - never in regular bins',
        prepSteps: ['Do not damage', 'Keep terminals covered', 'Store in cool, dry place'],
        tip: 'Batteries contain valuable metals that can be recovered and reused!'
    },
    'glass': {
        category: 'Glass',
        recyclable: true,
        instructions: 'Remove caps, rinse clean, and place in glass recycling bin',
        prepSteps: ['Remove all caps and lids', 'Rinse thoroughly', 'Remove labels if required'],
        tip: 'Glass can be recycled endlessly without losing quality!'
    },
    'newspaper': {
        category: 'Paper',
        recyclable: true,
        instructions: 'Keep dry and place in paper recycling bin',
        prepSteps: ['Remove plastic bags', 'Keep clean and dry', 'Bundle if required'],
        tip: 'Old newspapers can become new newsprint in just 7 days!'
    }
};

// Category details
const categoryDetails = {
    paper: {
        title: 'Paper & Cardboard Recycling',
        icon: '📄',
        description: 'Paper products are among the most recyclable materials, with high recovery rates and multiple reuse possibilities.',
        items: [
            { name: 'Newspapers & Magazines', recyclable: true, note: 'Remove plastic wrapping' },
            { name: 'Office Paper', recyclable: true, note: 'Remove staples and paper clips' },
            { name: 'Cardboard Boxes', recyclable: true, note: 'Flatten and remove tape' },
            { name: 'Paper Bags', recyclable: true, note: 'Remove handles if plastic' },
            { name: 'Books', recyclable: true, note: 'Remove hard covers' },
            { name: 'Pizza Boxes', recyclable: false, note: 'Grease contamination' },
            { name: 'Tissues/Napkins', recyclable: false, note: 'Fibers too short' },
            { name: 'Wax-coated Paper', recyclable: false, note: 'Coating prevents recycling' }
        ],
        tips: [
            'Keep paper dry to maintain fiber quality',
            'Remove all non-paper elements like staples',
            'Flatten boxes to save collection space',
            'Separate different paper grades when possible'
        ]
    },
    plastic: {
        title: 'Plastic Materials Recycling',
        icon: '🥤',
        description: 'Plastic recycling varies by type. Check the recycling code number to determine the best disposal method.',
        items: [
            { name: 'Water Bottles (PET)', recyclable: true, note: 'Code 1 - highly recyclable' },
            { name: 'Milk Jugs (HDPE)', recyclable: true, note: 'Code 2 - excellent recyclability' },
            { name: 'Yogurt Containers', recyclable: true, note: 'Code 5 - check locally' },
            { name: 'Plastic Bags', recyclable: true, note: 'Return to store drop-off' },
            { name: 'Bottle Caps', recyclable: true, note: 'Leave on bottle or separate' },
            { name: 'Styrofoam', recyclable: false, note: 'Code 6 - limited facilities' },
            { name: 'Food-soiled Containers', recyclable: false, note: 'Clean thoroughly first' },
            { name: 'Black Plastic', recyclable: false, note: 'Difficult to sort' }
        ],
        tips: [
            'Look for recycling codes 1, 2, and 5 for best recyclability',
            'Remove caps and lids before recycling',
            'Rinse containers to remove food residue',
            'Never bag recyclables in plastic bags'
        ]
    },
    glass: {
        title: 'Glass Materials Recycling',
        icon: '🍶',
        description: 'Glass is 100% recyclable and can be recycled endlessly without losing purity or quality.',
        items: [
            { name: 'Food Jars', recyclable: true, note: 'Remove lids and rinse' },
            { name: 'Beverage Bottles', recyclable: true, note: 'All colors accepted' },
            { name: 'Wine Bottles', recyclable: true, note: 'Remove corks and foil' },
            { name: 'Cosmetic Jars', recyclable: true, note: 'Clean thoroughly' },
            { name: 'Light Bulbs', recyclable: false, note: 'Special disposal required' },
            { name: 'Window Glass', recyclable: false, note: 'Different melting point' },
            { name: 'Mirror Glass', recyclable: false, note: 'Coating prevents recycling' },
            { name: 'Drinking Glasses', recyclable: false, note: 'Different glass composition' }
        ],
        tips: [
            'Separate by color if required locally',
            'Remove all caps, lids, and corks',
            'Small glass pieces are okay',
            'Broken glass should be wrapped safely'
        ]
    },
    metal: {
        title: 'Metal Objects Recycling',
        icon: '🥫',
        description: 'Metals are highly valuable and recyclable. Aluminum cans can be back on shelves as new cans in 60 days.',
        items: [
            { name: 'Aluminum Cans', recyclable: true, note: 'Rinse and crush to save space' },
            { name: 'Steel Food Cans', recyclable: true, note: 'Remove labels, rinse clean' },
            { name: 'Aluminum Foil', recyclable: true, note: 'Clean off food residue' },
            { name: 'Metal Bottle Caps', recyclable: true, note: 'Put inside aluminum can' },
            { name: 'Small Appliances', recyclable: true, note: 'Take to e-waste center' },
            { name: 'Paint Cans', recyclable: true, note: 'Must be completely empty' },
            { name: 'Aerosol Cans', recyclable: true, note: 'Must be completely empty' },
            { name: 'Scrap Metal', recyclable: true, note: 'Take to scrap metal dealer' }
        ],
        tips: [
            'Rinse food cans to remove residue',
            'Crush cans to save collection space',
            'Keep different metals separate if required',
            'Check for magnetic properties to identify steel'
        ]
    },
    electronics: {
        title: 'Electronics Recycling',
        icon: '📱',
        description: 'E-waste contains valuable materials but also hazardous substances requiring special handling.',
        items: [
            { name: 'Cell Phones', recyclable: true, note: 'Delete personal data first' },
            { name: 'Computers', recyclable: true, note: 'Remove hard drives' },
            { name: 'Tablets', recyclable: true, note: 'Use certified recycler' },
            { name: 'Batteries', recyclable: true, note: 'Special collection required' },
            { name: 'Cables & Wires', recyclable: true, note: 'Valuable copper inside' },
            { name: 'TV Screens', recyclable: true, note: 'Contains hazardous materials' },
            { name: 'Printers', recyclable: true, note: 'Remove ink cartridges first' },
            { name: 'Small Electronics', recyclable: true, note: 'Many contain precious metals' }
        ],
        tips: [
            'Always use certified e-waste recyclers',
            'Remove personal data before recycling',
            'Many retailers offer take-back programs',
            'Check for manufacturer recycling programs'
        ]
    },
    organic: {
        title: 'Organic Waste Composting',
        icon: '🍃',
        description: 'Organic waste can be composted at home or in facilities to create valuable soil amendment.',
        items: [
            { name: 'Fruit & Vegetable Scraps', recyclable: true, note: 'Excellent for composting' },
            { name: 'Coffee Grounds', recyclable: true, note: 'Include paper filters' },
            { name: 'Eggshells', recyclable: true, note: 'Crush for faster decomposition' },
            { name: 'Yard Trimmings', recyclable: true, note: 'Mix with other organics' },
            { name: 'Tea Bags', recyclable: true, note: 'Remove staples if present' },
            { name: 'Meat & Fish', recyclable: false, note: 'Attracts pests in home compost' },
            { name: 'Dairy Products', recyclable: false, note: 'Can cause odors and pests' },
            { name: 'Cooked Foods', recyclable: false, note: 'Use municipal composting' }
        ],
        tips: [
            'Start a home compost bin for kitchen scraps',
            'Mix green and brown materials',
            'Turn compost regularly for faster decomposition',
            'Finished compost is ready in 3-6 months'
        ]
    }
};

// Search functionality
function searchRecycling() {
    const query = document.getElementById('recyclingSearch').value.toLowerCase().trim();
    if (query) {
        showSearchResults(query);
    }
}

function quickSearch(item) {
    document.getElementById('recyclingSearch').value = item;
    showSearchResults(item.toLowerCase());
}

function showSearchResults(query) {
    const resultsSection = document.getElementById('searchResults');
    const resultsContainer = document.getElementById('resultsContainer');
    
    // Search in database
    const results = [];
    
    // Direct matches
    if (recyclingDatabase[query]) {
        results.push({ item: query, data: recyclingDatabase[query] });
    }
    
    // Partial matches
    Object.keys(recyclingDatabase).forEach(item => {
        if (item.includes(query) && item !== query) {
            results.push({ item, data: recyclingDatabase[item] });
        }
    });
    
    // Display results
    if (results.length > 0) {
        resultsContainer.innerHTML = results.map(result => `
            <div class="result-item">
                <div class="result-header">
                    <h3>${result.item.charAt(0).toUpperCase() + result.item.slice(1)}</h3>
                    <span class="result-category">${result.data.category}</span>
                </div>
                <div class="result-recyclability ${result.data.recyclable ? 'recyclable' : 'not-recyclable'}">
                    ${result.data.recyclable ? '✅ Recyclable' : '❌ Not Recyclable'}
                </div>
                <p class="result-instructions">${result.data.instructions}</p>
                ${result.data.prepSteps ? `
                    <div class="prep-steps">
                        <h4>Preparation Steps:</h4>
                        <ul>
                            ${result.data.prepSteps.map(step => `<li>${step}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                ${result.data.tip ? `<div class="result-tip">💡 <strong>Tip:</strong> ${result.data.tip}</div>` : ''}
            </div>
        `).join('');
        
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <h3>No results found for "${query}"</h3>
                <p>Try searching for common items like "plastic bottle", "cardboard", or "battery".</p>
                <div class="suggestion-tags">
                    ${Object.keys(recyclingDatabase).map(item => 
                        `<button class="search-tag" onclick="quickSearch('${item}')">${item}</button>`
                    ).join('')}
                </div>
            </div>
        `;
        resultsSection.style.display = 'block';
    }
}

// Category modal functionality
function openCategory(categoryType) {
    const modal = document.getElementById('categoryModal');
    const title = document.getElementById('modalCategoryTitle');
    const body = document.getElementById('modalCategoryBody');
    
    const category = categoryDetails[categoryType];
    if (category) {
        title.textContent = category.title;
        body.innerHTML = `
            <div class="category-details">
                <div class="category-intro">
                    <div class="category-large-icon">${category.icon}</div>
                    <p>${category.description}</p>
                </div>
                
                <div class="recyclable-items">
                    <h3>What Can Be Recycled:</h3>
                    <div class="items-list">
                        ${category.items.map(item => `
                            <div class="item-card ${item.recyclable ? 'recyclable' : 'not-recyclable'}">
                                <div class="item-status">
                                    ${item.recyclable ? '✅' : '❌'}
                                </div>
                                <div class="item-info">
                                    <h4>${item.name}</h4>
                                    <p>${item.note}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="category-tips">
                    <h3>Best Practices:</h3>
                    <ul>
                        ${category.tips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        modal.style.display = 'block';
    }
}

function closeCategoryModal() {
    document.getElementById('categoryModal').style.display = 'none';
}

// Find recycling centers
function findCenters() {
    const location = document.getElementById('locationInput').value;
    showNotification(`🔍 Searching for recycling centers near ${location || 'your location'}...`, 'info');
    
    // Simulate search delay
    setTimeout(() => {
        showNotification('📍 Found 3 recycling centers nearby!', 'success');
    }, 2000);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: type === 'success' ? '#4caf50' : 
                   type === 'error' ? '#f44336' : '#2196f3',
        color: 'white',
        padding: '15px 25px',
        borderRadius: '10px',
        zIndex: '3000',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px'
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
    }, 3000);
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Enable search on Enter key
    document.getElementById('recyclingSearch').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchRecycling();
        }
    });
    
    // Close modal when clicking outside
    document.getElementById('categoryModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeCategoryModal();
        }
    });
    
    // Animate recyclability bars on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.bar-fill');
                bars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 500);
                });
            }
        });
    }, observerOptions);
    
    // Observe symbol cards for animation
    document.querySelectorAll('.symbol-card').forEach(card => {
        observer.observe(card);
    });
    
    // Add result styles
    const resultStyles = `
        <style>
        .result-item { 
            background: white; 
            padding: 25px; 
            border-radius: 15px; 
            box-shadow: 0 8px 20px rgba(0,0,0,0.1); 
            border-left: 4px solid #4caf50;
            transition: transform 0.3s ease;
        }
        .result-item:hover { transform: translateY(-3px); }
        .result-header { 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            margin-bottom: 15px; 
        }
        .result-header h3 { 
            color: #1e5d3a; 
            font-size: 1.3rem; 
            margin: 0; 
            font-weight: 600;
        }
        .result-category { 
            background: #e6f3ff; 
            color: #2e8b57; 
            padding: 6px 12px; 
            border-radius: 15px; 
            font-size: 0.85rem; 
            font-weight: 600;
        }
        .result-recyclability { 
            padding: 10px 15px; 
            border-radius: 20px; 
            margin: 15px 0; 
            font-weight: 600;
        }
        .result-recyclability.recyclable { 
            background: #d4edda; 
            color: #155724; 
        }
        .result-recyclability.not-recyclable { 
            background: #f8d7da; 
            color: #721c24; 
        }
        .result-instructions { 
            color: #555; 
            margin: 15px 0; 
            font-size: 1rem; 
            line-height: 1.5;
        }
        .prep-steps { 
            margin: 20px 0; 
            background: #f8f9fa; 
            padding: 15px; 
            border-radius: 10px;
        }
        .prep-steps h4 { 
            color: #2e8b57; 
            margin: 0 0 10px 0; 
            font-size: 1rem;
        }
        .prep-steps ul { 
            margin: 0; 
            padding-left: 20px; 
        }
        .prep-steps li { 
            margin-bottom: 5px; 
            color: #666;
        }
        .result-tip { 
            background: #fff3cd; 
            color: #856404; 
            padding: 15px; 
            border-radius: 10px; 
            margin-top: 15px; 
            border-left: 4px solid #ffc107;
        }
        .no-results { 
            text-align: center; 
            padding: 40px; 
            background: white; 
            border-radius: 20px; 
            box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
        .no-results h3 { 
            color: #1e5d3a; 
            margin-bottom: 15px;
        }
        .suggestion-tags { 
            display: flex; 
            flex-wrap: wrap; 
            gap: 10px; 
            justify-content: center; 
            margin-top: 20px;
        }
        .category-large-icon { 
            font-size: 4rem; 
            text-align: center; 
            margin-bottom: 20px;
        }
        .items-list { 
            display: flex; 
            flex-direction: column; 
            gap: 15px; 
            margin: 20px 0;
        }
        .item-card { 
            display: flex; 
            align-items: center; 
            gap: 15px; 
            padding: 15px; 
            border-radius: 10px; 
            transition: transform 0.3s ease;
        }
        .item-card:hover { transform: translateX(5px); }
        .item-card.recyclable { 
            background: #f0f8f0; 
            border-left: 4px solid #4caf50;
        }
        .item-card.not-recyclable { 
            background: #fef5f5; 
            border-left: 4px solid #f44336;
        }
        .item-status { 
            font-size: 1.5rem; 
            flex-shrink: 0;
        }
        .item-info h4 { 
            margin: 0 0 5px 0; 
            color: #333; 
            font-size: 1.1rem;
        }
        .item-info p { 
            margin: 0; 
            color: #666; 
            font-size: 0.9rem;
        }
        .category-tips { 
            background: #e6f3ff; 
            padding: 20px; 
            border-radius: 15px; 
            margin-top: 30px;
        }
        .category-tips h3 { 
            color: #1e5d3a; 
            margin-bottom: 15px;
        }
        .category-tips ul { 
            padding-left: 20px;
        }
        .category-tips li { 
            margin-bottom: 8px; 
            color: #555;
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', resultStyles);
});
