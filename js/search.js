
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
    console.log("Search icon clicked"); // Add this line to confirm the event is firing

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
        addFilterTag(searchTerm);

        // Apply filtering function if necessary
        applyFilters();

        // Clear the input and hide the search container
        searchInput.value = '';
        searchContainer.style.display = 'none';
    }
});

// Function to add a filter tag with "x" for removal
function addFilterTag(value) {
    console.log("searching for: " + value);

    filters.search = value;

    let titleCaseValue = toTitleCase(value);
    filterTagsContainer.innerHTML = `
        <span class="filter-type">Searching:</span>
        <div class="filter-tag">
            <span>${titleCaseValue}</span>
            <button class="remove-tag" onclick="removeSearch()"></button>
        </div>
    `;

    applyFilters();
}

function removeSearch() {
    filterTagsContainer.innerHTML = '';
    filters.search = '';
    applyFilters();
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}