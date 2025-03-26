// error-logger.js
(function() {
    // Capture and log errors
    window.addEventListener('error', function(event) {
        console.error('Uncaught error:', {
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            error: event.error
        });

        // Optional: Send error to your logging service
        // sendErrorToLoggingService(event);
    });

    // Capture unhandled promise rejections
    window.addEventListener('unhandledrejection', function(event) {
        console.error('Unhandled promise rejection:', event.reason);
    });
})();

// comprehensive-error-handler.js
(function() {
    // Image Error Handling
    function handleImageError(event) {
        const img = event.target;
        const defaultPlaceholder = '/images/default-placeholder.webp';
        
        // Check if already tried fallback
        if (img.getAttribute('data-fallback-tried') !== 'true') {
            img.src = defaultPlaceholder;
            img.setAttribute('data-fallback-tried', 'true');
            img.classList.add('image-fallback');
        }
    }

    // Global Error Logging
    function logError(error, context = 'General') {
        console.error(`[${context}] Error:`, error);
        
        // Optional: Send to error tracking service
        // errorTrackingService.log(error, context);
    }

    // Setup Error Handlers
    function initErrorHandling() {
        // Image Error Handling
        document.addEventListener('DOMContentLoaded', () => {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                img.addEventListener('error', handleImageError);
            });
        });

        // Global Error Catching
        window.addEventListener('error', (event) => {
            logError(event.error, 'Global Error Handler');
        });

        // Unhandled Promise Rejections
        window.addEventListener('unhandledrejection', (event) => {
            logError(event.reason, 'Unhandled Promise Rejection');
        });
    }

    // Initialize Error Handling
    initErrorHandling();
})();