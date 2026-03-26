'use client';

import { useEffect } from 'react';

const PerformanceMonitor = () => {
  useEffect(() => {
    // Only run in development or when explicitly enabled
    if (process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_PERFORMANCE_MONITOR === 'true') {
      
      // Monitor Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
          if (entry.entryType === 'first-input') {
            console.log('FID:', entry.processingStart - entry.startTime);
          }
          if (entry.entryType === 'layout-shift') {
            if (!entry.hadRecentInput) {
              console.log('CLS:', entry.value);
            }
          }
        }
      });

      try {
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
      } catch (e) {
        // Fallback for browsers that don't support all entry types
        console.log('Performance monitoring partially supported');
      }

      // Monitor page load performance
      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0];
          if (navigation) {
            console.log('Page Load Metrics:', {
              'DNS Lookup': navigation.domainLookupEnd - navigation.domainLookupStart,
              'TCP Connect': navigation.connectEnd - navigation.connectStart,
              'Request': navigation.responseStart - navigation.requestStart,
              'Response': navigation.responseEnd - navigation.responseStart,
              'DOM Processing': navigation.domContentLoadedEventEnd - navigation.responseEnd,
              'Total Load Time': navigation.loadEventEnd - navigation.fetchStart,
            });
          }

          // Check for unused JavaScript
          const resources = performance.getEntriesByType('resource');
          const jsResources = resources.filter(r => r.name.includes('.js'));
          console.log(`JavaScript Resources: ${jsResources.length} files loaded`);

          // Check bundle sizes
          const totalJsSize = jsResources.reduce((total, resource) => {
            return total + (resource.transferSize || 0);
          }, 0);
          console.log(`Total JavaScript Size: ${(totalJsSize / 1024 / 1024).toFixed(2)} MB`);
        }, 0);
      });

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;
