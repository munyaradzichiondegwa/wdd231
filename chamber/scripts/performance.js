// Implement performance monitoring
class PerformanceMonitor {
    static mark(name) {
        performance.mark(`${name}-start`);
    }

    static measure(name) {
        performance.mark(`${name}-end`);
        performance.measure(name, `${name}-start`, `${name}-end`);
    }

    static logPerformance() {
        const entries = performance.getEntriesByType('measure');
        entries.forEach(entry => {
            console.log(`${entry.name}: ${entry.duration}ms`);
        });
    }
}

// Prevent WebSocket from blocking bfcache
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('Service Worker registered');
        });
}