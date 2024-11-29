let popupTimeout;

// Adjust the height of the main container based on the viewport height
// needed to account for keyboard popup on iPad
function adjustHeight() {
    console.debug('Adjusting height...');
    const main = document.getElementById('main');

    const viewportHeight = window.innerHeight;

    main.style.height = `${viewportHeight - 185}px`;
}

window.addEventListener('resize', adjustHeight);
document.addEventListener('DOMContentLoaded', adjustHeight);


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
