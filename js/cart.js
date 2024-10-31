// Function to load and display cart items
function loadCart() {
    const cartContainer = document.getElementById('cart-items-container');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Clear the container first
    cartContainer.innerHTML = '';

    let totalPrice = 0;

    // Loop through each item in the cart
    cart.forEach(item => {
        console.log("Rendering item:", item); // Check if each item, including "Tomato Bisque," appears here

        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        // Create HTML for each cart item
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price.toFixed(2)}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Total: $${itemTotal.toFixed(2)}</p>
        `;
        cartContainer.appendChild(itemElement);
    });

    // Display the total price
    const totalPriceElement = document.getElementById('total-price');
    totalPriceElement.innerHTML = `<h3>Total Price: $${totalPrice.toFixed(2)}</h3>`;
}

// Run loadCart function when the page loads
document.addEventListener('DOMContentLoaded', loadCart);
