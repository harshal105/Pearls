// Function to load and display cart items
function loadCart() {
    const cartContainer = document.getElementById('cart-items-container');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Clear the container first
    cartContainer.innerHTML = '';

    let totalPrice = 0;

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
            <div class="item-details">
            <div class="quantity-controls">
                    <button class="minus-btn" data-index="${index}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="plus-btn" data-index="${index}">+</button>
                </div>
                <h3>${item.name}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
                <p>Total: $${itemTotal.toFixed(2)}</p>
            </div>
        `;
        cartContainer.appendChild(itemElement);
    });

    // Display the total price
    document.getElementById('total-price').innerText = `Total Price: $${totalPrice.toFixed(2)}`;


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




// Run loadCart function when the page loads
document.addEventListener('DOMContentLoaded', loadCart);

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

function confirmOrder() {
    const modal = document.getElementById("confirm-order-modal");
    const closeButton = document.querySelector(".close-icon");

    // Show the modal
    modal.style.display = "block";

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
}