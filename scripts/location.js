document.addEventListener("DOMContentLoaded", () => {
    // Select location info and image elements
    const locationName = document.getElementById("location-name");
    const locationImage = document.getElementById("location-image");

    // Set location name (Harare, Zimbabwe)
    locationName.textContent = "Harare, Zimbabwe";

    // Function to set the image dynamically
    function setLocationImage(imageURL) {
        if (imageURL) {
            locationImage.src = imageURL;  // Set the image source to the provided URL
        }
    }

    // Set the image path from the images folder (e.g., "harare.jpg" is the image file)
    const harareImageURL = "images/harare.jpg";  // Adjust to your actual image filename and path
    
    // Set the image dynamically
    setLocationImage(harareImageURL);
});
