
// Get the elements
const searchIcon = document.getElementById('search-icon');
const searchContainer = document.getElementById('search-container');
const searchInput = document.getElementById('search-input');
const filterTagsContainer = document.getElementById('filter-tags'); // Assuming you have this for filter tags

// Show the search container when clicking the search icon
searchIcon.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent closing the search container immediately
    searchContainer.style.display = 'block';
    searchInput.focus(); // Focus on the input field for convenience
});

// Hide the search container when clicking outside
document.addEventListener('click', (e) => {
    if (!searchContainer.contains(e.target) && e.target !== searchIcon) {
        searchContainer.style.display = 'none';
    }
});

// Hide the search container on pressing "Escape"
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        searchContainer.style.display = 'none';
    }
});

// Handle search input and add a filter tag when pressing "Enter"
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && searchInput.value.trim() !== '') {
        const searchTerm = searchInput.value.trim();
        
        // Add the search term as a tag in the filter area
        addFilterTag('Search', searchTerm);
        
        // Apply filtering function if necessary
        applyFilters();

        // Clear the input and hide the search container
        searchInput.value = '';
        searchContainer.style.display = 'none';
    }
});

// Function to add a filter tag with "x" for removal
function addFilterTag(type, value) {
    const tag = document.createElement('span');
    tag.className = 'filter-tag';
    tag.textContent = `${type}: ${value}`;

    // Update filters.search if this is a search tag
    if (type === 'Search') {
        filters.search = value;
    }
    
    const removeIcon = document.createElement('button');
    removeIcon.textContent = '×';
    removeIcon.className = 'remove-tag';
    removeIcon.addEventListener('click', () => {
        tag.remove();

        if (type === 'Search') {
            filters.search = '';
        }

        applyFilters();
    });
    
    tag.appendChild(removeIcon);
    filterTagsContainer.appendChild(tag);
    applyFilters();

}
