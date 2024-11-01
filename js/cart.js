// Function to load and display cart items
function loadCart() {
    const cartContainer = document.getElementById('cart-items-container');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Clear the container first
    cartContainer.innerHTML = '';

    let totalPrice = 0;

    // Loop through each item in the cart
    cart.forEach((item, index) => {
        console.log("Rendering item:", item); // Check if each item, including "Tomato Bisque," appears here

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
                <h3>${item.name}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Total: $${itemTotal.toFixed(2)}</p>
            </div>
        `;
        cartContainer.appendChild(itemElement);
    });

    // Display the total price
    const totalPriceElement = document.getElementById('total-price');
    totalPriceElement.innerHTML = `<h3>Total Price: $${totalPrice.toFixed(2)}</h3>`;

     // Attach event listeners to each remove button
     document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.closest('.remove-btn').getAttribute('data-index');
            removeFromCart(index);
        });
    });
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
