document.addEventListener('DOMContentLoaded', function() {
    // Function to update the count of dog breeds classified
    function updateBreedCount() {
        // Placeholder: Fetch the count from your server or API
        let breedCount = 100; // Example count

        // Update the count on the dashboard
        const breedCountElement = document.getElementById('breed-count');
        if (breedCountElement) {
            breedCountElement.textContent = breedCount;
        }
    }

    // Function to update the count of user interactions
    function updateUserInteractionCount() {
        // Placeholder: Fetch the count from your server or API
        let interactionCount = 150; // Example count

        // Update the count on the dashboard
        const interactionCountElement = document.getElementById('interaction-count');
        if (interactionCountElement) {
            interactionCountElement.textContent = interactionCount;
        }
    }

    // Call the functions to update counts on page load
    updateBreedCount();
    updateUserInteractionCount();

    // Add more interactive functionalities as needed
});
