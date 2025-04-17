// Save data to localStorage under a specified key
export function saveToLocalStorage(key, data) {
    // Convert the data to a JSON string before storing
    localStorage.setItem(key, JSON.stringify(data));
}

// Retrieve data from localStorage using a key
export function getFromLocalStorage(key) {
    // Get the stored string
    const storedData = localStorage.getItem(key);
    // Parse it back to JavaScript object if found, otherwise return null
    return storedData ? JSON.parse(storedData) : null;
}
