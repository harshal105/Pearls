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

        // Add event listener to remove filter tag when its close button is clicked
        filterTag.querySelector('.remove-filter').addEventListener('click', () => {
            removeFilter(type, value); // Remove the filter from the array
            filterTag.remove(); // Remove the tag from the UI

            // Uncheck or remove the corresponding checkbox in the filter panel
            const checkbox = document.getElementById(`${type}-${value}`);
            if (checkbox) {
                checkbox.checked = false; // Uncheck the checkbox
                checkbox.parentElement.remove(); // Optionally remove the checkbox
            }

            applyFilters(); // Reapply filters
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
    }

    // Listen to ingredient input changes
    includeInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && includeInput.value) {
            const value = includeInput.value.trim().toLowerCase();
            filters.include.push(value); // Add to filters
            addCheckboxToFilterPanel('Include', value);
            addFilterTag('Include', value); // Add to UI
            includeInput.value = ''; // Clear the input
            applyFilters();
        }
    });

    excludeInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && excludeInput.value) {
            const value = excludeInput.value.trim().toLowerCase();
            filters.exclude.push(value); // Add to filters
            addCheckboxToFilterPanel('Exclude', value); // Add checkbox
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

    function addCheckboxToFilterPanel(type, value) {
        const filterSelectionContainer = type === "Include"
            ? document.querySelector('.filter-include')
            : document.querySelector('.filter-exclude');

        if (document.getElementById(`${type}-${value}`)) {
            return;
        }

        const checkboxContainer = document.createElement('div');
        checkboxContainer.className = 'checkbox-container';

        // Create the checkbox input
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `${type}-${value}`;
        checkbox.value = value;
        checkbox.checked = true; // Default to checked
        checkbox.className = 'filter-checkbox';

        // Create the label for the checkbox
        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = value;

        // Append the checkbox and label to the container
        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(label);
        filterSelectionContainer.appendChild(checkboxContainer);

        checkbox.addEventListener('change', (e) => {
            if (!e.target.checked) {
                // Remove the filter from the filters object
                if (type === "Include") {
                    filters.include = filters.include.filter(item => item !== value);
                } else if (type === "Exclude") {
                    filters.exclude = filters.exclude.filter(item => item !== value);
                }

                removeFilterTag(type, value);
                checkboxContainer.remove();

                applyFilters();
            }
        });
    }


    function removeFilterTag(type, value) {
        const filterTags = activeFiltersContainer.querySelectorAll('.filter-tag');
        filterTags.forEach(tag => {
            if (tag.innerText.includes(`${type}: ${value}`)) {
                tag.remove(); // Remove the tag from the UI
            }
        });
        toggleFilterVisibility();
    }
});


// Helper function to add/remove filter value
function toggleFilterVisibility() {
    const activeFiltersContainer = document.getElementById('active-filters');
    const filterTags = activeFiltersContainer.querySelectorAll('.filter-tag');

    if (filterTags.length > 0) {
        activeFiltersContainer.style.display = 'flex';
    } else {
        activeFiltersContainer.style.display = 'none';
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

    toggleFilterVisibility();
    displayMenuItems(filteredItems);  // Show only filtered items
    setupPopupListeners();
    setupAddToCartButtons()

}

function openFilterMenu() {
    const modal = document.getElementById('filter-modal');
    const closeButton = document.getElementById('close-filter');

    // Show the modal
    modal.style.display = 'flex';
    const main = document.querySelector('main');
    main.style.overflowY = 'hidden';


    // close modal when button clicked
    closeButton.onclick = function () {
        modal.style.display = 'none';

        main.style.overflowY = 'auto';
    }

    // close modal when clicked outside of the modal
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';

            main.style.overflowY = 'auto';
        }

    }
}