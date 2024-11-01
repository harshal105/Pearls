// Filter panel JS

// Get elements
const filterPanel = document.getElementById('filter-panel');
const filterIcon = document.getElementById('filter-icon');
const closeFilterBtn = document.getElementById('close-filter');
const backdrop = document.querySelector('.filter-panel-backdrop');

// Open the filter panel when the filter icon is clicked
filterIcon.addEventListener('click', () => {
    filterPanel.classList.add('open');
    
    const isOpen = filterPanel.style.display === 'block';
    if (!isOpen) {
        filterPanel.style.display = 'block';
        backdrop.style.display = 'block';
    } else {
        filterPanel.style.display = 'none';
        backdrop.style.display = 'none';
    }
});

backdrop.addEventListener('click', function() {
    document.querySelector('.filter-panel').style.display = 'none';
    this.style.display = 'none';
});

// Close the filter panel when the ">" button is clicked
closeFilterBtn.addEventListener('click', () => {
    filterPanel.classList.remove('open');
    filterPanel.style.display = 'none';
    backdrop.style.display = 'none';
});

// Store selected filters
let filters = {
    search: '',
    include: [],
    exclude: [],

    //TODO: add funcitonality for the buttons
    dietarypPref: [],
    palette: []
};


// Filter Funcitonality
document.addEventListener('DOMContentLoaded', () => {
    // Text fields for ingredient filters
    const includeInput = document.getElementById('includeInput');
    const excludeInput = document.getElementById('excludeInput');
    const activeFiltersContainer = document.getElementById('active-filters');

    // TO DO: Add the Buttons for Dietary Pref and Palette
    // const dietaryPrefButton = document.querySelectorAll('????');
    // const paletteButtons = document.querySelectorAll('???');

    function toggleFilterVisibility() {
        // Show #active-filters only if there are tags
        if (activeFiltersContainer.querySelectorAll('.filter-tag').length > 0) {
            activeFiltersContainer.style.display = 'flex';
        } else {
            activeFiltersContainer.style.display = 'none';
        }
    }

    // Function to create filter tag HTML and add it to active filters section
    function addFilterTag(type, value) {
        const filterTag = document.createElement('span');
        filterTag.className = 'filter-tag';
        filterTag.innerHTML = `${type}: ${value} <button class="remove-filter" data-type="${type}" data-value="${value}">&times;</button>`;
        
        activeFiltersContainer.appendChild(filterTag);
        toggleFilterVisibility();

        // Add event listener to remove filter on button click
        filterTag.querySelector('.remove-filter').addEventListener('click', (e) => {
            removeFilter(type, value);
            filterTag.remove();
            applyFilters();
            toggleFilterVisibility();
        });
    }

    function removeFilter(type, value) {
        if (type === 'Include') {
            filters.include = filters.include.filter(item => item !== value);
        } else if (type === 'Exclude') {
            filters.exclude = filters.exclude.filter(item => item !== value);
        }
    }


    // Listen to ingredient input changes
    includeInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && includeInput.value) {
            const value = includeInput.value.trim().toLowerCase();
            filters.include.push(value); // Add to filters
            addFilterTag('Include', value); // Add to UI
            includeInput.value = ''; // Clear the input
            applyFilters();
        }
    });

    excludeInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && excludeInput.value) {
            const value = excludeInput.value.trim().toLowerCase();
            filters.exclude.push(value); // Add to filters
            addFilterTag('Exclude', value); // Add to UI
            excludeInput.value = ''; // Clear the input
            applyFilters();
        }
    });

    //TODO: Listen to category button clicks

    fetchMenuItems();  // Load and display initial menu items
});

// Helper function to add/remove filter value
function toggleFilter(filterArray, value) {
    if (filterArray.includes(value)) {
        filterArray.splice(filterArray.indexOf(value), 1);
    } else {
        filterArray.push(value);
    }
}

function applyFilters() {
    const menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];
    const filteredItems = menuItems.filter(item => {
        
        //TO DO: filter functionality for the buttons in the filter

        // Search term filtering
        if (filters.search && !item.name.toLowerCase().includes(filters.search.toLowerCase()) &&
            !item.description.toLowerCase().includes(filters.search.toLowerCase())) {
            return false;
        }

        // Include filter
        if (filters.include.length > 0 && !filters.include.every(ing => item.ingredients.toLowerCase().includes(ing))) {
            return false;
        }

        // Exclude filter
        if (filters.exclude.length > 0 && filters.exclude.some(ing => item.ingredients.toLowerCase().includes(ing))) {
            return false;
        }

        return true;  // Item matches all filters
    });

    displayMenuItems(filteredItems);  // Show only filtered items
}
