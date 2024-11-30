import { clearCart, confirmOrder } from './cart.js';
import { createPopup, displayMenuItems, addToCart } from './index.js';
import { openFilterMenu } from './filter.js';
import { removeSearch } from './search.js';

let popupTimeout;

// attach stuff to global scope
window.createPopup = createPopup;
window.displayMenuItems = displayMenuItems;
window.openFilterMenu = openFilterMenu;
window.addToCart = addToCart;
window.confirmOrder = confirmOrder;
window.callServerPopup = callServerPopup;
window.removeSearch = removeSearch;

// clear the cart on refresh
window.onload = function () {
    const entries = performance.getEntriesByType("navigation");
    if (entries.length > 0 && entries[0].type === "reload") {
        clearCart();
    }
}

// clear cart when tab closed 
// means the cart is empty when the user comes back
window.onbeforeunload = clearCart;

function createCallServerPopup(message) {
    // Remove existing pop-up if any
    const existingPopup = document.getElementById('call-server-popup');
    if (existingPopup) {
        existingPopup.remove();
        removeBackgroundOverlay();
        clearTimeout(popupTimeout);
    }

    // Create the background overlay
    const overlay = document.createElement('div');
    overlay.id = 'background-overlay';
    overlay.className = 'background-overlay';
    document.body.appendChild(overlay);

    // Create the pop-up container
    const popup = document.createElement('div');
    popup.id = 'call-server-popup';
    popup.className = 'call-server-popup';

    // Add content to the pop-up
    popup.innerHTML = `
        <div class="call-server-popup-content">
            <p>${message}</p>
            <button id="cancel-call-server-btn">Cancel Call Server</button>
        </div>
    `;

    // Add the pop-up to the body
    document.body.appendChild(popup);

    // Add event listener for "Cancel Call Server"
    const cancelBtn = document.getElementById('cancel-call-server-btn');
    cancelBtn.addEventListener('click', () => {
        popup.remove();
        removeBackgroundOverlay();
        clearTimeout(popupTimeout);
    });

    // Auto-dismiss pop-up after 5 seconds
    popupTimeout = setTimeout(() => {
        popup.remove();
        removeBackgroundOverlay();
    }, 5000);
}

function callServerPopup() {
    createCallServerPopup('Please wait, a server is on the way!');
}

function removeBackgroundOverlay() {
    const overlay = document.getElementById('background-overlay');
    if (overlay) overlay.remove();
}
