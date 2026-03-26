'use client';

import { useEffect } from 'react';
import { registerServiceWorker, preloadCriticalResources } from '@/lib/registerServiceWorker';

const ClientSideOptimizations = () => {
  useEffect(() => {
    // Register service worker for caching
    registerServiceWorker();

    // Preload critical resources
    preloadCriticalResources();

    // Optimize third-party script loading
    const optimizeThirdPartyScripts = () => {
      // Defer BotPenguin script loading until user interaction
      const botPenguinScript = document.getElementById('messenger-widget-b');
      if (botPenguinScript && 'requestIdleCallback' in window) {
        requestIdleCallback(() => {
          botPenguinScript.src = botPenguinScript.src;
        }, { timeout: 5000 });
      }
    };

    // Run optimizations after initial load
    const timeoutId = setTimeout(() => {
      optimizeThirdPartyScripts();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return null; // This component doesn't render anything
};

export default ClientSideOptimizations;
