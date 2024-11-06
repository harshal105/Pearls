function callHelp() {
    // Select the help icon and the message span
    const helpIcon = document.getElementById('help-icon');
    const helpMessage = document.getElementById('help-message');

    // Show the message when clicked
    helpMessage.style.display = 'inline';
    // Hide the message after 6 seconds
    setTimeout(() => {
        helpMessage.style.display = 'none';
    }, 6000);

}