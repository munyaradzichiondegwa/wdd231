// scripts/data-service.js// Exporting an asynchronous function named fetchData that takes a URL as input
export async function fetchData(url) {
    try {
        // Using the Fetch API to request data from the provided URL
        const response = await fetch(url);

        // Check if the HTTP response status is OK (status code 200–299)
        if (!response.ok) {
            // If not, throw an error with the response status
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // If the response is okay, parse the response body as JSON
        const data = await response.json();

        // Return the parsed data so it can be used in other modules
        return data;
    } catch (error) {
        // If any error occurs during fetching or parsing, log it to the console
        console.error('Error fetching data:', error);

        // Rethrow the error so the calling code knows something went wrong
        throw error;
    }
}
