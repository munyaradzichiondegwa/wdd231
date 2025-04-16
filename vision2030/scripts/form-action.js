document.addEventListener('DOMContentLoaded', function() {
    const feedbackDataDiv = document.getElementById('feedback-data');
    const urlParams = new URLSearchParams(window.location.search);

    let dataHTML = '<ul>';
    dataHTML += `<li><strong>Name:</strong> ${urlParams.get('name') || 'N/A'}</li>`;
    dataHTML += `<li><strong>Email:</strong> ${urlParams.get('email') || 'N/A'}</li>`;
    dataHTML += `<li><strong>Subject:</strong> ${urlParams.get('subject') || 'N/A'}</li>`;
    dataHTML += `<li><strong>Message:</strong> ${urlParams.get('message') || 'N/A'}</li>`;

    const subscribeValue = urlParams.get('subscribe');
    const subscribeStatus = subscribeValue === 'yes' ? 'Subscribed' : 'Not Subscribed';
    dataHTML += `<li><strong>Subscription:</strong> ${subscribeStatus}</li>`;

    dataHTML += '</ul>';

    feedbackDataDiv.innerHTML = dataHTML;
});