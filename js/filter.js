// Filter panel JS

// Get elements
const filterPanel = document.getElementById('filter-panel');
const filterIcon = document.getElementById('filter-icon');
const closeFilterBtn = document.getElementById('close-filter');

// Open the filter panel when the filter icon is clicked
filterIcon.addEventListener('click', () => {
    filterPanel.classList.add('open');
});

// Close the filter panel when the ">" button is clicked
closeFilterBtn.addEventListener('click', () => {
    filterPanel.classList.remove('open');
});

// Store selected filters
let filters = {
    include: '',
    exclude: '',
    dietarypPref: [],
    palette: []
};


document.addEventListener('DOMContentLoaded', () => {
    // Text fields for ingredient filters
    const includeInput = document.getElementById('includeInput'); // Assuming these are the IDs
    const excludeInput = document.getElementById('excludeInput');

    // Buttons for Category and Palette
    // const categoryButtons = document.querySelectorAll('.category-button');
    // const paletteButtons = document.querySelectorAll('.palette-button');


    // Listen to ingredient input changes
    includeInput.addEventListener('input', (e) => {
        filters.include = e.target.value.toLowerCase();
        applyFilters();
    });

    excludeInput.addEventListener('input', (e) => {
        filters.exclude = e.target.value.toLowerCase();
        applyFilters();
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

        // Filter by ingredients in include and exclude
        if (filters.include && !item.ingredients.toLowerCase().includes(filters.include)) {
            return false;
        }
        if (filters.exclude && item.ingredients.toLowerCase().includes(filters.exclude)) {
            return false;
        }

        return true;  // Item matches all filters
    });

    displayMenuItems(filteredItems);  // Show only filtered items
}
