'use client';

import { useEffect } from 'react';
import { registerServiceWorker, preloadCriticalResources } from '@/lib/registerServiceWorker';

const ClientSideOptimizations = () => {
  useEffect(() => {
    // Register service worker for caching
    registerServiceWorker();

    // Preload critical resources
    preloadCriticalResources();

    // Service Worker handles caching
  }, []);

  return null; // This component doesn't render anything
};

export default ClientSideOptimizations;
