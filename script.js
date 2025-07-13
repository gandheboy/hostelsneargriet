
// Mock hostel data
const mockHostels = [
    {
        id: 1,
        name: "Sky View Hostel",
        distance: "0.5 km",
        gender: "Co-ed",
        rating: 4.8,
        isRecommended: true,
        facilities: ["Wifi", "CCTV", "Mess", "Laundry", "Gym", "Power Backup"],
        pricing: {
            "2 Sharing": 8000,
            "3 Sharing": 6500,
            "4 Sharing": 5200
        },
        images: [
            "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop"
        ]
    },
    {
        id: 2,
        name: "Green Valley Residence",
        distance: "1.2 km",
        gender: "Male",
        rating: 4.6,
        isRecommended: false,
        facilities: ["Wifi", "Security", "Mess", "Study Room"],
        pricing: {
            "2 Sharing": 7500,
            "3 Sharing": 6000,
            "4 Sharing": 4800
        },
        images: [
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop"
        ]
    },
    {
        id: 3,
        name: "Urban Nest",
        distance: "0.8 km",
        gender: "Female",
        rating: 4.9,
        isRecommended: true,
        facilities: ["Wifi", "CCTV", "Mess", "Laundry", "Study Room", "Power Backup"],
        pricing: {
            "2 Sharing": 8500,
            "3 Sharing": 7000,
            "4 Sharing": 5500
        },
        images: [
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&h=400&fit=crop"
        ]
    }
];

// Global variables
let filteredHostels = [...mockHostels];

// DOM elements
const toggleFiltersBtn = document.getElementById('toggleFilters');
const filterPanel = document.getElementById('filterPanel');
const hostelGrid = document.getElementById('hostelGrid');
const hostelCount = document.getElementById('hostelCount');
const noResults = document.getElementById('noResults');
const hostelModal = document.getElementById('hostelModal');
const modalContent = document.getElementById('modalContent');
const backButton = document.getElementById('backButton');
const closeModal = document.getElementById('closeModal');

// Filter elements
const genderFilter = document.getElementById('genderFilter');
const distanceRange = document.getElementById('distanceRange');
const distanceValue = document.getElementById('distanceValue');
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const sharingFilter = document.getElementById('sharingFilter');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    renderHostels();
    lucide.createIcons();
});

// Setup event listeners
function setupEventListeners() {
    // Toggle filters
    toggleFiltersBtn.addEventListener('click', toggleFilters);
    
    // Filter change events
    genderFilter.addEventListener('change', applyFilters);
    distanceRange.addEventListener('input', updateDistanceValue);
    distanceRange.addEventListener('change', applyFilters);
    priceRange.addEventListener('input', updatePriceValue);
    priceRange.addEventListener('change', applyFilters);
    sharingFilter.addEventListener('change', applyFilters);
    
    // Modal events
    backButton.addEventListener('click', closeHostelModal);
    closeModal.addEventListener('click', closeHostelModal);
    hostelModal.addEventListener('click', function(e) {
        if (e.target === hostelModal) {
            closeHostelModal();
        }
    });
}

// Toggle filters panel
function toggleFilters() {
    filterPanel.classList.toggle('hidden');
}

// Update distance value display
function updateDistanceValue() {
    distanceValue.textContent = distanceRange.value;
}

// Update price value display
function updatePriceValue() {
    priceValue.textContent = priceRange.value;
}

// Apply filters
function applyFilters() {
    const genderValue = genderFilter.value;
    const maxDistance = parseFloat(distanceRange.value);
    const maxPrice = parseInt(priceRange.value);
    const sharingValue = sharingFilter.value;
    
    filteredHostels = mockHostels.filter(hostel => {
        // Gender filter
        if (genderValue !== 'all' && hostel.gender.toLowerCase() !== genderValue.toLowerCase()) {
            return false;
        }
        
        // Distance filter
        const hostelDistance = parseFloat(hostel.distance.split(' ')[0]);
        if (hostelDistance > maxDistance) {
            return false;
        }
        
        // Price filter
        const prices = Object.values(hostel.pricing);
        const hasAffordableOption = prices.some(price => price <= maxPrice);
        if (!hasAffordableOption) {
            return false;
        }
        
        // Sharing type filter
        if (sharingValue !== 'all') {
            const sharingKey = `${sharingValue} Sharing`;
            if (!hostel.pricing[sharingKey]) {
                return false;
            }
        }
        
        return true;
    });
    
    renderHostels();
}

// Render hostels
function renderHostels() {
    hostelCount.textContent = filteredHostels.length;
    
    if (filteredHostels.length === 0) {
        hostelGrid.innerHTML = '';
        noResults.classList.remove('hidden');
        return;
    }
    
    noResults.classList.add('hidden');
    
    hostelGrid.innerHTML = filteredHostels.map((hostel, index) => `
        <div class="hostel-card glass-card rounded-xl overflow-hidden animate-slide-in-up cursor-pointer" 
             style="animation-delay: ${0.3 + index * 0.1}s"
             onclick="openHostelDetails(${hostel.id})">
            <div class="relative">
                <img src="${hostel.images[0]}" alt="${hostel.name}" class="w-full h-48 object-cover">
                ${hostel.isRecommended ? '<span class="absolute top-3 left-3 badge-recommended">Recommended</span>' : ''}
                <span class="absolute top-3 right-3 badge-gender">${hostel.gender}</span>
            </div>
            
            <div class="p-4">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-lg font-semibold text-white">${hostel.name}</h3>
                    <div class="flex items-center">
                        <span class="star-rating mr-1">★</span>
                        <span class="text-sm text-gray-300">${hostel.rating}</span>
                    </div>
                </div>
                
                <div class="flex items-center text-gray-400 text-sm mb-3">
                    <i data-lucide="map-pin" class="w-4 h-4 mr-1"></i>
                    <span>${hostel.distance} from GRIET</span>
                </div>
                
                <div class="mb-3">
                    <div class="flex flex-wrap gap-1">
                        ${hostel.facilities.slice(0, 3).map(facility => 
                            `<span class="facility-pill">${facility}</span>`
                        ).join('')}
                        ${hostel.facilities.length > 3 ? `<span class="facility-pill">+${hostel.facilities.length - 3} more</span>` : ''}
                    </div>
                </div>
                
                <div class="border-t border-gray-700 pt-3">
                    <div class="flex justify-between items-center">
                        <div>
                            <span class="text-xs text-gray-400">Starting from</span>
                            <div class="text-lg font-semibold text-white">₹${Math.min(...Object.values(hostel.pricing))}/month</div>
                        </div>
                        <button class="bg-gradient-to-r from-cyan-400 to-pink-400 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    // Reinitialize Lucide icons
    lucide.createIcons();
}

// Open hostel details modal
function openHostelDetails(hostelId) {
    const hostel = mockHostels.find(h => h.id === hostelId);
    if (!hostel) return;
    
    modalContent.innerHTML = `
        <div class="mb-6">
            <div class="flex items-center justify-between mb-4">
                <div>
                    <h2 class="text-2xl font-bold text-white mb-2">${hostel.name}</h2>
                    <div class="flex items-center text-gray-300">
                        <i data-lucide="map-pin" class="w-4 h-4 mr-1"></i>
                        <span>${hostel.distance} from GRIET</span>
                        <span class="ml-4 flex items-center">
                            <span class="star-rating mr-1">★</span>
                            ${hostel.rating}
                        </span>
                    </div>
                </div>
                <div class="text-right">
                    ${hostel.isRecommended ? '<span class="badge-recommended">Recommended</span>' : ''}
                    <div class="mt-2">
                        <span class="badge-gender">${hostel.gender}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Image Gallery -->
        <div class="mb-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${hostel.images.map(image => `
                    <img src="${image}" alt="${hostel.name}" class="w-full h-48 object-cover rounded-lg">
                `).join('')}
            </div>
        </div>
        
        <!-- Facilities -->
        <div class="mb-6">
            <h3 class="text-lg font-semibold text-white mb-3">Facilities</h3>
            <div class="flex flex-wrap gap-2">
                ${hostel.facilities.map(facility => `
                    <span class="facility-pill">${facility}</span>
                `).join('')}
            </div>
        </div>
        
        <!-- Pricing -->
        <div class="mb-6">
            <h3 class="text-lg font-semibold text-white mb-3">Pricing</h3>
            <div class="pricing-grid">
                ${Object.entries(hostel.pricing).map(([type, price]) => `
                    <div class="pricing-item">
                        <div class="pricing-label">${type}</div>
                        <div class="pricing-amount">₹${price}/month</div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex gap-4">
            <button class="flex-1 bg-gradient-to-r from-cyan-400 to-pink-400 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
                Book Now
            </button>
            <button class="flex-1 border border-gray-600 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Contact Hostel
            </button>
        </div>
    `;
    
    hostelModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Reinitialize Lucide icons
    lucide.createIcons();
}

// Close hostel details modal
function closeHostelModal() {
    hostelModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Smooth scrolling for internal links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
});

// Add loading states and error handling
function showLoading() {
    hostelGrid.innerHTML = `
        <div class="col-span-full text-center py-12">
            <div class="text-4xl mb-4">⏳</div>
            <p class="text-gray-300">Loading hostels...</p>
        </div>
    `;
}

function showError(message) {
    hostelGrid.innerHTML = `
        <div class="col-span-full text-center py-12">
            <div class="text-4xl mb-4">❌</div>
            <p class="text-gray-300">${message}</p>
        </div>
    `;
}

// Initialize with animation delay
setTimeout(() => {
    document.body.classList.add('loaded');
}, 100);
