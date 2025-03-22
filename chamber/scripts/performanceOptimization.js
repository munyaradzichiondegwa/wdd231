import React, { lazy, Suspense } from 'react';

// Code splitting utility
export const lazyLoad = (importFunc) => {
  const LazyComponent = lazy(importFunc);
  
  return (props) => (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

// Performance tracking
export const trackPerformance = () => {
  if (window.performance) {
    const metrics = {
      loadTime: performance.now(),
      resourceList: performance.getEntriesByType('resource')
    };
    
    // Log or send to analytics
    console.log('Performance Metrics:', metrics);
  }
};

// Efficient event handler creator
export const createOptimizedHandler = (callback) => {
  return React.useCallback((event) => {
    // Potential optimization logic
    callback(event);
  }, [callback]);
};