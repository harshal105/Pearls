const menuItems = [
    {
        section: 'Specials',
        name: 'Mushroom Pizza',
        description: 'A savory medley of sautéed mushrooms, melted mozzarella, and rich marinara sauce on a crispy, golden crust. \
        Topped with a sprinkle of fresh herbs for a perfectly earthy and flavorful bite',
        ingredients: 'sautéed mushrooms, mozzarella, marinara, garlic, parsley, milk, whole wheat flour',
        price: 22.99, // change
        imageUrl: 'food-images/pizza.png'
    },
    {
        section: 'Specials',
        name: 'Tomato Bisque',
        description: 'Some yummy description',
        ingredients: 'Tomatoes, garlic, basil, cream, garlic bread',
        price: 18.99, // change
        imageUrl: 'food-images/tomato-soup.png'
    },
    {
        section: 'Specials',
        name: 'Grilled Chicken Picatta',
        description: 'Some yummy description',
        ingredients: 'Chicken breast, penne, lemon butter, capers, parsley',
        price: 21.99, //change
        imageUrl: 'food-images/chicken-pasta.png'
    },
    {
        section: 'Specials',
        name: 'Ahi Tuna Poke Bowl',
        description: 'Some yummy description',
        ingredients: 'ingredient, ingredient, ingredient, ingredient, ingredient',
        price: 21.99, //change
        imageUrl: 'food-images/tuna-poke.png'
    },
    {
        section: 'Appetizers',
        name: 'Calamari',
        description: 'Some yummy description',
        ingredients: 'ingredient, ingredient, ingredient, ingredient, ingredient',
        price: 21.99, //change
        imageUrl: 'food-images/calamari.png'
    },
    {
        section: 'Appetizers',
        name: 'Truffle Fries',
        description: 'Some yummy description',
        ingredients: 'ingredient, ingredient, ingredient, ingredient, ingredient',
        price: 21.99, //change
        imageUrl: 'food-images/fries.png'
    },
    // Gotta add more menu items 
];


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
// function generatePopupContent(item) {
//     return `
//         <img src="${item.imageUrl}" alt="${item.name}">
//         <div class="popup-info">
//             <h3>${item.name}</h3>
//             <p>${item.description}</p>
//             <h4>Ingredients</h4>
//             <p>${item.ingredients}</p>
//             <div class="price-add">
//                 <span class="price">${item.price}</span>
//                 <button class="add-btn">+</button>
//             </div>
//         </div>
//     `;
// }

// Dynamically insert the menu items into the DOM
function displayMenuItems() {

    // Containers for each section
    const specialsMenu = document.querySelector('#specials .menu-items');
    const appetizerMenu = document.querySelector('#appetizers .menu-items');
    // Add the rest

    // Loop through each menu item
    menuItems.forEach((item, index) => {
        // Generate the HTML for the menu item
        const menuItemHTML = generateMenuItem(item, index);

        // Append the item to the correct section based on the item's section property
        if (item.section === 'Specials') {
            specialsMenu.innerHTML += menuItemHTML;
        } else if (item.section === 'Appetizers') {
            appetizerMenu.innerHTML += menuItemHTML;
        }
        // Add more else-if bocks for the other sections
    });

}

// Handle pop-up functionality
// function setupPopupListeners() {
//     document.querySelectorAll('.open-popup').forEach(button => {
//         button.addEventListener('click', (e) => {
//             e.preventDefault();
//             const itemId = button.getAttribute('data-item');  // Get the item index
//             const itemData = menuItems[itemId];  // Get the corresponding item data
            
//             const popup = document.getElementById('dynamic-popup');
//             const popupContent = popup.querySelector('.popup-content');
            
//             // Inject the generated content into the pop-up
//             popupContent.innerHTML = `
//                 <span class="close-popup">&times;</span>
//                 ${generatePopupContent(itemData)}
//             `;
            
//             // Show the pop-up
//             popup.classList.add('show');
            
//             // Add close functionality
//             popup.querySelector('.close-popup').addEventListener('click', () => {
//                 popup.classList.remove('show');
//             });
//         });
//     });
// }

// Initialize the menu and pop-up functionality
document.addEventListener('DOMContentLoaded', () => {
    displayMenuItems();  // Display all menu items
    setupPopupListeners();  // Set up the pop-up functionality
});

// // Close the popup if the user clicks outside the content
// window.addEventListener('click', (e) => {
//     if (e.target.classList.contains('popup')) {
//         e.target.classList.remove('show');
//     }
// });