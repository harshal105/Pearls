// Fetch menuItems from menuItems.json and display them on the page
function fetchMenuItems() {
    fetch('js/menuItems.json')
        .then(response => response.json())
        .then(data => {
            // Store data in localStorage
            localStorage.setItem('menuItems', JSON.stringify(data));

            // Display items on the page
            displayMenuItems(data); // Use the data from the fetch
            setupPopupListeners();

        })
        .catch(error => console.error('Error loading menu items:', error));
}


// Function to generate menu item HTML
function generateMenuItem(item, index) {
    return `
        <div class="menu-item">
            <a href="#" class="open-popup" data-item="${index}"><img src="${item.imageUrl}" alt="${item.name}"></a>
            <div class="item-info">
                <h3>${item.name}</h3>
                <span class="price">${item.price}</span>
                <p>${item.description}</p>
                <button class="add-btn">+</button>
            </div>
        </div>
    `;
}

// Function to generate pop-up content not done yet
function generatePopupContent(item) {
    return `
        <img src="${item.imageUrl}" alt="${item.name}">
        <div class="popup-info">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <h4>Ingredients</h4>
            <p>${item.ingredients}</p>
            <div class="price-add">
                <span class="price">${item.price}</span>
                <button class="add-btn">+</button>
            </div>
        </div>
    `;
}

// Dynamically insert the menu items into the DOM
function displayMenuItems(items) {

    // Containers for each section
    const specialsMenu = document.querySelector('#specials .menu-items');
    const appetizerMenu = document.querySelector('#appetizers .menu-items');
    const dessertsMenu = document.querySelector('#desserts .menu-items');
    const drinksMenu = document.querySelector('#drinks .menu-items');

    specialsMenu.innerHTML = '';
    appetizerMenu.innerHTML = '';
    dessertsMenu.innerHTML = '';
    drinksMenu.innerHTML = '';

    // Loop through each menu item
    items.forEach((item, index) => {
        // Generate the HTML for the menu item
        const menuItemHTML = generateMenuItem(item, index);

        // Append the item to the correct section based on the item's section property
        if (item.section === 'Specials') {
            specialsMenu.innerHTML += menuItemHTML;
        } else if (item.section === 'Appetizers') {
            appetizerMenu.innerHTML += menuItemHTML;
        } else if (item.section == 'Desserts') {
            dessertsMenu.innerHTML += menuItemHTML;
        } else if (item.section == 'Drinks'){
            drinksMenu.innerHTML += menuItemHTML;
        }
    });

}

// Handle pop-up functionality
function setupPopupListeners() {
    document.querySelectorAll('.open-popup').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const itemId = button.getAttribute('data-item');  // Get the item index
            const itemData = JSON.parse(localStorage.getItem('menuItems'))[itemId];  // Get the corresponding item data
            
            const popup = document.getElementById('dynamic-popup');
            const popupContent = popup.querySelector('.popup-content');
            
            // Inject the generated content into the pop-up
            popupContent.innerHTML = `
                <span class="close-popup">&times;</span>
                ${generatePopupContent(itemData)}
            `;
            
            // Show the pop-up
            popup.classList.add('show');
            
            // Add close functionality
            popup.querySelector('.close-popup').addEventListener('click', () => {
                popup.classList.remove('show');
            });
        });
    });
}

// Initialize menu items and pop-up functionality
document.addEventListener('DOMContentLoaded', fetchMenuItems);

// Close the popup if the user clicks outside the content
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup')) {
        e.target.classList.remove('show');
    }
});