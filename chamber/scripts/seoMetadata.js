// seoMetadata.js
(function() {
    // Wrap your SEO metadata logic here
    const seoMetadata = {
        title: 'Harare Metropolitan Chamber of Commerce',
        description: 'Official website of the Harare Metropolitan Chamber of Commerce',
        // Add more metadata as needed
    };

    // Function to update metadata
    function updateMetadata() {
        document.title = seoMetadata.title;
        
        // Update or create description meta tag
        let descMeta = document.querySelector('meta[name="description"]');
        if (!descMeta) {
            descMeta = document.createElement('meta');
            descMeta.name = 'description';
            document.head.appendChild(descMeta);
        }
        descMeta.content = seoMetadata.description;
    }

    // Run on DOM load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateMetadata);
    } else {
        updateMetadata();
    }
})();