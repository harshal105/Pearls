function callHelp() {
    const helpMessage = document.getElementById('help-message');

    // Show the message when clicked
    helpMessage.style.display = 'flex';
    // Hide the message after 6 seconds
    setTimeout(() => {
        helpMessage.style.display = 'none';
    }, 6000);

}