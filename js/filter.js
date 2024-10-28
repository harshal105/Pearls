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