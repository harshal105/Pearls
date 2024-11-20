 // clear the cart on refresh
 window.onload = function () {
     const entries = performance.getEntriesByType("navigation");
     if (entries.length > 0 && entries[0].type === "reload") {
         clearCart();
     }
 }


// Function to load and display cart items
function loadCart() {
    const cartContainer = document.getElementById('cart-items-container');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Clear the container first
    cartContainer.innerHTML = '';

    let totalPrice = 0;
    let totalPriceFinal = 0;
    if (cart.length != 0) {

        const orderedItems = [];
        const notOrderedItems = [];
        
        // Loop through each item in the cart
        cart.forEach((item, index) => {        
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;
        
            // Separate ordered and not-ordered items
            if (item.isOrdered) {
                orderedItems.push({ item, itemTotal, index });
            } else {
                notOrderedItems.push({ item, itemTotal, index });
            }
            console.log("Rendering item:", item, "Index: ", index); // Debugging line
        });
        if (orderedItems.length > 0) {
            const titleElement = document.createElement('div');
            titleElement.innerHTML = "<h3>Already Ordered:</h3>";
            cartContainer.appendChild(titleElement);
        
            orderedItems.forEach(({ item, itemTotal }) => {
                const orderedItemElem = document.createElement('div');
                orderedItemElem.classList.add('totalAndTax');
                orderedItemElem.innerHTML = `
                    <div class="ordered-item">
                        <span class="label">${item.name}</span>
                        <span class="orderedDots"></span>
                        <span class="amount">$${itemTotal.toFixed(2)}</span>
                    </div>
                `;
                cartContainer.appendChild(orderedItemElem);
            });
            
            // Add a line separator
            const separator = document.createElement('hr');
            separator.classList.add('separator');
            cartContainer.appendChild(separator);
        }
        notOrderedItems.forEach(({ item, itemTotal, index }) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <button class="remove-btn" data-index="${index}">
                    <img src="icons/delete-icon.png" alt="Remove Item" class="remove-icon">
                </button>
                <div class="quantity-controls">
                    <button class="minus-btn" data-index="${index}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="plus-btn" data-index="${index}">+</button>
                </div>
                <div class="item-details">
                    <div class="line-item">
                        <span class="label">${item.name}</span>
                        <span class="dots"></span>
                        <span class="amount">$${itemTotal.toFixed(2)}</span>
                    </div>
                </div>
            `;
            cartContainer.appendChild(itemElement);
        });
        
        const taxAmount = totalPrice * 0.05;
        const totalElement = document.createElement('div');
        totalElement.classList.add('totalAndTax');
        totalElement.innerHTML = `
        <div class="line-item">
    <span class="label">Subtotal</span>
        <span class="dots"></span>
        <span class="amount">$${totalPrice.toFixed(2)}</span>
    </div>
    <div class="line-item">
        <span class="label">GST(5%)</span>
        <span class="dots"></span>
        <span class="amount">$${taxAmount.toFixed(2)}</span>
    </div>
    `;
        cartContainer.appendChild(totalElement);
        totalPriceFinal = totalPrice + taxAmount;
    }
    else {
        const totalElement = document.createElement('div');
        totalElement.classList.add('empty-cart-message');
        totalElement.innerHTML = `<p class="empty-cart-message" id="empty-cart-message">The cart is empty.</p>`;
        cartContainer.appendChild(totalElement);
    }
    // Display the total price
    document.getElementById('total-price').innerText = `Total: $${totalPriceFinal.toFixed(2)}`;

    // Attach event listeners to each remove button
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.closest('.remove-btn').getAttribute('data-index');
            removeFromCart(index);
        });
    });

    // Add event listeners to quantity buttons
    const minusButtons = document.querySelectorAll('.minus-btn');
    const plusButtons = document.querySelectorAll('.plus-btn');

    minusButtons.forEach(button => {
        button.addEventListener('click', function () {
            const itemIndex = this.getAttribute('data-index');
            updateQuantity(itemIndex, -1); // Decrease quantity by 1
        });
    });

    plusButtons.forEach(button => {
        button.addEventListener('click', function () {
            const itemIndex = this.getAttribute('data-index');
            updateQuantity(itemIndex, 1); // Increase quantity by 1
        });
    });
}

function updateQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (change === -1 && cart[index].quantity > 1) {
        cart[index].quantity -= 1; // Decrease quantity if more than 1
    } else if (change === 1) {
        cart[index].quantity += 1; // Increase quantity
    }

    // Update local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Reload the cart to reflect changes
    loadCart();
}

// Function to remove an item from the cart by its index
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    loadCart(); // Reload the cart display
}

function clearCart() {
    console.log("Clearing cart");
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Run loadCart function when the page loads
document.addEventListener('DOMContentLoaded', loadCart);

function confirmOrder() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length == 0) { return; }

    const modal = document.getElementById("confirm-order-modal");
    const closeButton = document.querySelector(".close-button");
    const editOrderButton = document.getElementById("edit-order");

    const confirmOrderButton = document.getElementById("confirm-order");

    // Show the modal
    modal.style.display = "flex";

    // Close the modal when the close button is clicked
    closeButton.onclick = function () {
        modal.style.display = "none";
    }

    // Close the modal when clicking outside of the modal content
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    editOrderButton.onclick = function () {
        modal.style.display = "none";
    }

    confirmOrderButton.onclick = function () {
        placeOrder();
        // redirect to place order page
        window.location.href = "checkout.html";
    }
}

function placeOrder() {
    console.log("Placing order");
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter((item, index) => {
        if (!item.isOrdered) {
            // Find an existing ordered version of the same item
            const existingItem = cart.find(cartItem => cartItem.id === item.id && cartItem.isOrdered);
            if (existingItem) {
                existingItem.quantity += item.quantity;
                return false;
            } else {
                item.isOrdered = true;
                return true;
            }
        }
        return true;
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log("Order placed successfully:", cart);
}