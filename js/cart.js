// // clear the cart on refresh
// window.onload = function () {
//     const entries = performance.getEntriesByType("navigation");
//     if (entries.length > 0 && entries[0].type === "reload") {
//         clearCart();
//     }
// }


// Function to load and display cart items
function loadCart() {
    const cartContainer = document.getElementById('cart-items-container');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Clear the container first
    cartContainer.innerHTML = '';

    let totalPrice = 0;
    let totalPriceFinal = 0;
    if (cart.length != 0) {
        // Loop through each item in the cart
        cart.forEach((item, index) => {
            console.log("Rendering item:", item); // Debugging line

            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;

            // Create HTML for each cart item
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
            <h3>${item.name}</h3>
            <p>Price: $${item.price.toFixed(2)}</p>
            <p>Total: $${itemTotal.toFixed(2)}</p>
        `;
            cartContainer.appendChild(itemElement);
        });
    }
    else {
        const totalElement = document.createElement('div');
        totalElement.classList.add('empty-cart-message');
        totalElement.innerHTML = `<p class="empty-cart-message" id="empty-cart-message">The cart is empty.</p>`;
        cartContainer.appendChild(totalElement);
    }

    const taxAmount = totalPrice * 0.05;
    totalPriceFinal = totalPrice + taxAmount;

    const priceDiv = document.querySelector('.price-section');
    if (priceDiv.hasChildNodes()) {
        console.log("Price div has children");

        const subtotalSpan = document.getElementById('subtotal-amt');
        const taxSpan = document.getElementById('tax-amt');
        const totalSpan = document.getElementById('total-amt');

        subtotalSpan.textContent = `$${totalPrice.toFixed(2)}`;
        taxSpan.textContent = `$${taxAmount.toFixed(2)}`;
        totalSpan.textContent = `$${totalPriceFinal.toFixed(2)}`;
    } else {
        const totalElement = document.createElement('div');
        totalElement.classList.add('totalAndTax');
        totalElement.innerHTML = `
        <div class="line-item">
            <span class="label">Subtotal</span>
            <span class="dots"></span>
            <span class="amount" id="subtotal-amt">$${totalPrice.toFixed(2)}</span>
        </div>
        <div class="line-item">
            <span class="label">GST(5%)</span>
            <span class="dots"></span>
            <span class="amount" id="tax-amt">$${taxAmount.toFixed(2)}</span>
        </div>
        <div class="line-item">
            <span class="label">Total</span>
            <span class="dots"></span>
            <span class="amount" id="total-amt">$${totalPriceFinal.toFixed(2)}</span>
        </div>
        `;

        priceDiv.appendChild(totalElement);
    }

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
        // window.location.href = "checkout.html";
    }
}

function placeOrder() {
    console.log("Placing order");
}