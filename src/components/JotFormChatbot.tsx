
import React, { useEffect, useState } from 'react';

export const JotFormChatbot = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Only load the chatbot script when explicitly requested
    // This prevents auto-opening on page load
    const loadChatbot = () => {
      if (!isLoaded) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jotfor.ms/agent/embedjs/019744fb1eec735c8a90cbb1e218ea681ae5/embed.js?skipWelcome=1&maximizable=1&autoOpen=false';
        script.async = true;
        document.body.appendChild(script);
        setIsLoaded(true);
      }
    };

    // Add a small delay to prevent immediate loading
    const timer = setTimeout(() => {
      loadChatbot();
    }, 2000);

    return () => {
      clearTimeout(timer);
      const existingScript = document.querySelector('script[src*="jotfor.ms"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [isLoaded]);

  return null; // This component doesn't render anything visible itself
};
