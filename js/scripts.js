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
            </div>
        <div class="item-action">
                <p>${item.description}</p>
                <button class="add-btn">+</button>
            </div>
        </div>
    `;
}

// Function to generate pop-up
function generatePopupContent(item, index) {
    return `
        <!-- Modal Structure -->
        <div class="modal" id="myModal">
            <div class="modal-content popup-container">    
                <!-- Left Section: Image and Ingredients -->
                <div class="img-left-div">
                    <img src="${item.imageUrl}" alt="${item.name}" class="popup-image">
                </div>
                <div class="dish-description">
                    <h2>${item.name}</h2>
                    <h3>$${item.price}</h3>
                    <p class="dish-description-paragraph">${item.description}</p>
                </div>  
            </div>
            <div class="ingredients-div">
                <h3>Ingredients</h3>
                <p>${item.ingredients}</p>
            </div>
        </div> 
    `;
}

// Dynamically insert the menu items into the DOM
function displayMenuItems(items) {

    // Containers for each section
    const specialsMenu = document.querySelector('#specials .menu-items');
    const appetizerMenu = document.querySelector('#appetizers .menu-items');
    const entréesMenu = document.querySelector('#entrées .menu-items');
    const dessertsMenu = document.querySelector('#desserts .menu-items');
    const drinksMenu = document.querySelector('#drinks .menu-items');

    specialsMenu.innerHTML = '';
    entréesMenu.innerHTML = '';
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
        }else if (item.section === 'Entrées') {
            entréesMenu.innerHTML += menuItemHTML;
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
            const itemId = button.getAttribute('data-item');
            const itemData = JSON.parse(localStorage.getItem('menuItems'))[itemId];
            
            const popup = document.getElementById('dynamic-popup');
            const popupContent = popup.querySelector('.popup-content');
            
            popupContent.innerHTML = `
                <span class="close-popup">&times;</span>
                ${generatePopupContent(itemData, itemId)}
            `;
            
            popup.classList.add('show');

            const addToCartBtn = popup.querySelector('.add-btn');
            addToCartBtn.addEventListener('click', () => {
                const quantityDropdown = popup.querySelector(`#itemCount-${itemId}`);
                const selectedQuantity = parseInt(quantityDropdown.value, 10);
                addToCart(itemId, selectedQuantity);
                popup.classList.remove('show');
            });
        });
    });

    // Attach the close-popup listener once, using event delegation
    document.getElementById('dynamic-popup').addEventListener('click', (e) => {
        if (e.target.classList.contains('close-popup')) {
            e.target.closest('.popup').classList.remove('show');
        }
    });
}



// Creates a dropdown menu
function createQuantityDropdown(itemId) {
    let dropdownHTML = `
        <select id="itemCount-${itemId}">
    `;
    for (let i = 1; i <= 9; i++) {
        dropdownHTML += `<option value="${i}">${i}</option>`;
    }
    dropdownHTML += '</select>';
    return dropdownHTML;
}

// Initialize menu items and pop-up functionality
document.addEventListener('DOMContentLoaded', fetchMenuItems);

// Close the popup if the user clicks outside the content
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup')) {
        e.target.classList.remove('show');
    }
});

// Function to highlight the active section in the navbar
function highlightActiveSection(navbarSelector, offset = 200) { // Default offset of 200px
    const navbar = document.querySelector(navbarSelector);
    const links = document.querySelectorAll('.nav-links a'); // Get all navigation links
    const sections = document.querySelectorAll('section'); // Get all sections

    function handleScroll() {
        let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop; // Get the top position of the section
            const sectionHeight = section.clientHeight; // Get the height of the section

            if (
                scrollPosition >= sectionTop - offset && 
                scrollPosition < sectionTop + sectionHeight - offset
            ) {
                links.forEach((link) => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    window.addEventListener('scroll', handleScroll);
}


// Call the function with the selector of your navbar
highlightActiveSection('nav');

//Adding stuff to cart functionality

// Initialize the cart in localStorage if it doesn't already exist
function initializeCart() {
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
}

// Function to add an item to the cart
function addToCart(itemId, quantityNum) {
    // Get the current cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart'));

    // Find the item in the menuItems by its ID
    const menuItems = JSON.parse(localStorage.getItem('menuItems'));
    const item = menuItems[itemId];

    // Check if item exists before proceeding
    if (!item) {
        console.error(`Item with ID ${itemId} not found in menuItems.`);
        return; // Exit if item is undefined
    }

    // Check if the item is already in the cart
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        // If it's already in the cart, increase the quantity
        existingItem.quantity += quantityNum;
    } else {
        // If it's not in the cart, add it with the quantity given
        cart.push({ ...item, quantity: quantityNum });
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    console.log(`Added ${item.quantity} ${item.name} to cart.`, cart); // Log the updated cart for debugging
}

// Attach the addToCart function to the add button in each menu item
function setupAddToCartButtons() {
    document.querySelectorAll('.add-btn').forEach((button, index) => {
        button.addEventListener('click', () => addToCart(index, 1));
    });
}

// Modify fetchMenuItems to call setupAddToCartButtons after displaying menu items
function fetchMenuItems() {
    fetch('js/menuItems.json')
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('menuItems', JSON.stringify(data));
            displayMenuItems(data);
            setupPopupListeners();
            setupAddToCartButtons(); // Set up the add-to-cart buttons
        })
        .catch(error => console.error('Error loading menu items:', error));
}

// Initialize the cart when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeCart();
    fetchMenuItems();
});

function updateCartCount() {
    // Get the current cart from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    // Calculate the total count by summing up the quantity of each cart item
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    // Update the badge with the current count
    const cartBadge = document.getElementById('cart-count-badge');
    cartBadge.textContent = cartCount;

    // Hide the badge if there are no items in the cart
    cartBadge.style.display = cartCount > 0 ? 'inline' : 'none';
}

// Initialize the cart counterwhen the page loads
document.addEventListener('DOMContentLoaded', updateCartCount);

// Select the help icon and the message span
const helpIcon = document.getElementById('help-icon');
const helpMessage = document.getElementById('help-message');

// Add an event listener to the help icon
helpIcon.addEventListener('click', () => {
    // Show the message when clicked
    helpMessage.style.display = 'inline';
    // Hide the message after 6 seconds
    setTimeout(() => {
        helpMessage.style.display = 'none';
    }, 6000);
});