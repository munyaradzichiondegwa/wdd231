class PerformanceMonitor {
    static initMetrics() {
        // Capture and log performance metrics
        window.addEventListener('load', () => {
            const {
                loadTime,
                domInteractive,
                firstContentfulPaint
            } = performance.timing;

            console.log('Page Load Performance:');
            console.log(`Total Load Time: ${loadTime - performance.timing.navigationStart}ms`);
            console.log(`DOM Interactive: ${domInteractive - performance.timing.navigationStart}ms`);
            console.log(`First Contentful Paint: ${firstContentfulPaint}ms`);
        });
    }

    static monitorWebVitals() {
        // Use Web Vitals library or custom implementation
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    console.log(`${entry.name}: ${entry.value}ms`);
                }
            });

            observer.observe({
                type: 'largest-contentful-paint',
                buffered: true
            });
        }
    }
}

// Initialize performance monitoring
PerformanceMonitor.initMetrics();
PerformanceMonitor.monitorWebVitals();