// Adjust the height of the main container based on the viewport height
// needed to account for keyboard popup on iPad
function adjustHeight() {
    console.debug('Adjusting height...');
    const main = document.getElementById('main');

    if (!main) return;

    const viewportHeight = window.innerHeight;

    main.style.height = `${viewportHeight - 185}px`;
}

let i = 0;

window.addEventListener('resize', adjustHeight);
document.addEventListener('DOMContentLoaded', adjustHeight);


document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-links a');
    const main = document.querySelector('main');
    const sections = document.querySelectorAll('section');

    let manualOverride = false; // Track if a click has temporarily overridden the scroll logic

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                manualOverride = true;
                main.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth',
                });

                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
                setTimeout(() => (manualOverride = false), 500);
            }
        });
    });

    // Function to highlight active section during scrolling
    function highlightActiveSection(offset = -100) {
        if (manualOverride) return; // Skip if a click is overriding scroll behavior

        const scrollPosition = main.scrollTop;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - main.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop - offset && scrollPosition < sectionTop + sectionHeight - offset) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    main.addEventListener('scroll', () => highlightActiveSection());

    highlightActiveSection();
});

// Fetch menuItems from menuItems.json and display them on the page
function fetchMenuItems1() {
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
            <img src="${item.imageUrl}" alt="${item.name}" onclick="createPopup(${item.id})">
            <div class="item-info">
                <div class="item-header">
                    <h3>${item.name}</h3>
                    <span class="item-description">
                        ${item.description}
                    </span>  
                </div>
                <div class="item-action">
                    <span class="price">${item.price}</span>
                    <button class="add-button" onclick="addToCart(${item.id}, 1)"></button>
                </div>
            </div>
        </div>
    `;
}

let numberToAdd = 1;


export function createPopup(index) {
    // Get the item from localStorage
    const menuItems = JSON.parse(localStorage.getItem('menuItems'));
    const item = menuItems[index - 1];

    // get main to disable scrolling
    const main = document.querySelector('main');
    main.style.overflowY = 'hidden';

    const modal = document.getElementById('detail-view-popup');
    modal.style.display = 'flex';

    modal.innerHTML = `
        <div class="popup-content">
            <img class="close-icon" alt="" src="icons/close.svg">

            <div class="top-popup-section">
                <div class="img-wrapper"><img class="popup-dish-image" src="${item.imageUrl}" alt="${item.name}"></div>
                <div class="dish-info">
                    <h3>${item.name}</h3>
                    <h4>${item.price}</h4>
                    <p>${item.description}</p>
                </div>
            </div>
            <div class="ingredients">
                <h4>Ingredients</h4>
                <p>${item.ingredients}</p>
            </div>
            <div class="bottom-section">
                <div class="quantity-controls">
                    <button class="minus-btn">-</button>
                    <span class="quantity">${numberToAdd}</span>
                    <button class="plus-btn">+</button>
                </div>
                <button class="add-button" id="modal-add-button"></button>
            </div>
        </div>
    `;

    document.querySelector('.minus-btn').addEventListener('click', decrease);
    document.querySelector('.plus-btn').addEventListener('click', increase);
    document.getElementById('modal-add-button').addEventListener('click', function () {
        console.log('Adding to cart');
        addToCart(item.id, numberToAdd);

        // Close the modal after adding to the cart
        modal.style.display = 'none';
        main.style.overflowY = 'auto';
    });

    // Close the modal when clicking the close icon
    document.querySelector('.close-icon').addEventListener('click', function () {
        modal.style.display = 'none';
        main.style.overflowY = 'auto';
    });

    // Close the modal when clicking outside of the modal content
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            main.style.overflowY = 'auto';
        }
    };
}

function decrease() {
    if (numberToAdd > 1) {
        numberToAdd--;
        document.querySelector('.quantity').textContent = numberToAdd;
    }
}

function increase() {
    numberToAdd++;
    document.querySelector('.quantity').textContent = numberToAdd;
}

// Dynamically insert the menu items into the DOM
export function displayMenuItems(items) {

    // Containers for each section
    const specialsMenu = document.querySelector('#specials .menu-items');
    const appetizerMenu = document.querySelector('#appetizers .menu-items');
    const entréesMenu = document.querySelector('#entrées .menu-items');
    const dessertsMenu = document.querySelector('#desserts .menu-items');
    const drinksMenu = document.querySelector('#drinks .menu-items');

    if (!specialsMenu || !appetizerMenu || !entréesMenu || !dessertsMenu || !drinksMenu) {
        // console.error('Menu sections not found.');
        return;
    }

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
        } else if (item.section === 'Entrées') {
            entréesMenu.innerHTML += menuItemHTML;
        } else if (item.section == 'Desserts') {
            dessertsMenu.innerHTML += menuItemHTML;
        } else if (item.section == 'Drinks') {
            drinksMenu.innerHTML += menuItemHTML;
        }
    });

    setupPopupListeners();
}

// Handle pop-up functionality
export function setupPopupListeners() {
    document.querySelectorAll('.open-popup').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = button.getAttribute('data-item-id');
            const items = JSON.parse(localStorage.getItem('menuItems'));

            const itemData = items.find(item => item.id == itemId);
            if (!itemData) {
                console.error('Item not found:', itemId);
                return;
            }

            const popup = document.getElementById('dynamic-popup');
            const popupContent = popup.querySelector('.popup-content');

            // Inject the generated content into the pop-up
            popupContent.innerHTML = `
                <span class="close-popup">&times;</span>
                ${generatePopupContent(itemData, itemId)}
            `;

            popup.classList.add('show');

            // Attach addToCart functionality
            const addToCartBtn = popup.querySelector('.add-btn');
            addToCartBtn.addEventListener('click', () => {
                console.log("hi");
                const quantityDropdown = popup.querySelector(`#itemCount-${itemId}`);
                const selectedQuantity = parseInt(quantityDropdown.value, 10)
                addToCart(itemId, selectedQuantity);

                // Close the popup
                popup.classList.remove('show');
            });

            // Close popup functionality
            popup.querySelector('.close-popup').addEventListener('click', () => {
                popup.classList.remove('show');
            });
        });
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
function highlightActiveSection(offset = 200) { // Default offset of 200px
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

highlightActiveSection();

//Adding stuff to cart functionality

// Initialize the cart in localStorage if it doesn't already exist
function initializeCart() {
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
}

// Function to add an item to the cart
export function addToCart(itemId, quantityNum) {
    console.log(`Adding item ${itemId} to cart with quantity ${quantityNum}`);

    // Get the current cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];  // Initialize with an empty array if cart is null

    // Find the item in the menuItems by its ID
    const menuItems = JSON.parse(localStorage.getItem('menuItems'));
    const item = menuItems.find(item => item.id == itemId);  // Find item by ID

    // Check if item exists before proceeding
    if (!item) {
        console.error(`Item with ID ${itemId} not found in menuItems.`);
        return; // Exit if item is undefined
    }

    // Check if the item is already in the cart
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem && !existingItem.isOrdered) {
        // If it's already in the cart and hasnt been ordered, increase the quantity
        existingItem.quantity += quantityNum;
    } else {
        // If it's not in the cart, add it with the quantity
        cart.push({ ...item, quantity: quantityNum, isOrdered: false });
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    animateCartIcon();
    console.log(`Added ${quantityNum} ${item.name} to cart.`, cart); // Log the updated cart for debugging
}



// Attach the addToCart function to the add button in each menu item
export function setupAddToCartButtons() {
    // Listen for clicks on Add to Cart buttons within the menu
    document.querySelectorAll('.add-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = button.getAttribute('data-item-id');  // Get the item ID
            const quantityNum = 1;  // Default quantity is 1 for the main menu

            // Call the addToCart function for the item
            addToCart(itemId, quantityNum);
        });
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

export function updateCartCount() {
    // Get the current cart from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    // Calculate the total count by summing up the quantity of each cart item
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    // Update the badge with the current count
    const cartBadge = document.getElementById('cart-count-badge');
    if (!cartBadge) return;
    cartBadge.textContent = cartCount;

    // Hide the badge if there are no items in the cart
    cartBadge.style.display = cartCount > 0 ? 'inline' : 'none';
}

// Initialize the cart counter when the page loads
document.addEventListener('DOMContentLoaded', updateCartCount);

function animateCartIcon() {
    const cartIcon = document.querySelector('.cart-container');
    // Add the animation class
    cartIcon.classList.add('cart-bounce');
    // Remove the animation class after the animation completes
    cartIcon.addEventListener('animationend', () => {
        cartIcon.classList.remove('cart-bounce');
    }, { once: true });
}