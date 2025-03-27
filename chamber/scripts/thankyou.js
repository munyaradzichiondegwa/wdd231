
const urlParams = new URLSearchParams(window.location.search);
document.getElementById('thankYouFirstName').textContent = urlParams.get('firstName');
document.getElementById('thankYouLastName').textContent = urlParams.get('lastName');
document.getElementById('thankYouEmail').textContent = urlParams.get('email');
document.getElementById('thankYouPhone').textContent = urlParams.get('phone');
document.getElementById('thankYouBusinessName').textContent = urlParams.get('businessName');
document.getElementById('thankYouTimestamp').textContent = urlParams.get('timestamp');