// Filter panel JS

// Get elements
const filterPanel = document.getElementById('filter-panel');
const filterIcon = document.getElementById('filter-icon');
const closeFilterBtn = document.getElementById('close-filter');
const backdrop = document.querySelector('.filter-panel-backdrop');

// Store selected filters
let filters = {
    search: '',
    include: [],
    exclude: [],
    dietaryPreferences: [],
    palette: []
};


// Filter Funcitonality
document.addEventListener('DOMContentLoaded', () => {
    // Text fields for ingredient filters
    const includeInput = document.getElementById('includeInput');
    const excludeInput = document.getElementById('excludeInput');
    const activeFiltersContainer = document.getElementById('active-filters');
    const dietaryButtons = document.querySelectorAll('.filter-dietary');
    const paletteButtons = document.querySelectorAll('.filter-palette');

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
        filterTag.innerHTML = `
            <span>${type}: ${value}</span>
            <button class="remove-filter" data-type="${type}" data-value="${value}">&times;</button>`;

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
        } else if (type === 'Palette') {
            filters.palette = filters.palette.filter(item => item !== value);
        } else if (type === 'Dietary Preferences') {
            filters.dietaryPreferences = filters.dietaryPreferences.filter(item => item !== value);
        }

        // Remove the active state from the corresponding button
        const buttons = document.querySelectorAll(`[data-value="${value}"]`);
        buttons.forEach(button => {
            button.classList.remove('active'); // Remove the active class from the button
        });
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

    // Event listeners for dietary buttons
    dietaryButtons.forEach(button => {
        button.addEventListener('click', (e) => handleButtonToggle(e.target, 'dietaryPreferences', "Dietary Preferences"));
    });

    paletteButtons.forEach(button => {
        button.addEventListener('click', (e) => handleButtonToggle(e.target, 'palette', "Palette"));
    });

    // Function to handle button toggle
    function handleButtonToggle(button, filterType, description) {
        const value = button.dataset.value; // Get the value from the button's data attribute

        if (button.classList.contains('active')) {
            // If it's active, remove it from the filter
            filters[filterType] = filters[filterType].filter(item => item !== value);
            button.classList.remove('active');

            // Remove the filter tag from the UI
            const filterTags = activeFiltersContainer.querySelectorAll('.filter-tag');
            filterTags.forEach(tag => {
                if (tag.innerText.includes(value)) {
                    tag.remove(); // Remove the corresponding filter tag
                }
            });
        } else {
            // If it's not active, add it to the filter
            filters[filterType].push(value);
            button.classList.add('active');

            // Add filter tag to UI
            addFilterTag(description, value);
        }

        applyFilters(); // Call apply filters after the change
    }


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
        if (filters.search && !item.name.toLowerCase().includes(filters.search.toLowerCase()) &&
            !item.description.toLowerCase().includes(filters.search.toLowerCase())) {
            return false;
        }
        // Dietary Preferences filter
        if (filters.dietaryPreferences.length > 0) {
            // Split the dietary preferences string into an array
            const itemDietaryPreferences = item.dietaryPreferences.split(',').map(pref => pref.trim());
            // Check if all selected dietary preferences are included in the item's dietary preferences
            if (!filters.dietaryPreferences.every(pref => itemDietaryPreferences.includes(pref))) {
                return false;
            }
        }

        // Palette filter
        if (filters.palette.length > 0) {
            const itemPalette = item.palette.split(',').map(palette => palette.trim());
            if (!filters.palette.every(palette => itemPalette.includes(palette))) {
                return false;
            }
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
    setupPopupListeners();
    setupAddToCartButtons()

}

function openFilterMenu() {
    console.log("Opening filter menu");
    const modal = document.getElementById('filter-modal');
    const closeButton = document.getElementById('close-filter');

    // Show the modal
    modal.style.display = 'flex';
    
    // close modal when button clicked
    closeButton.onclick = function () {
        modal.style.display = 'none';
    }

    // close modal when clicked outside of the modal
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }

    }
}