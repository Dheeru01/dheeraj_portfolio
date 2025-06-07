
import React, { useEffect } from 'react';

export const JotFormChatbot = () => {
  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.src = 'https://cdn.jotfor.ms/agent/embedjs/019744fb1eec735c8a90cbb1e218ea681ae5/embed.js?skipWelcome=1&maximizable=1';
    script.async = true;

    // Append to body
    document.body.appendChild(script);

    // Cleanup function to remove script when component unmounts
    return () => {
      const existingScript = document.querySelector('script[src*="jotfor.ms"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return null; // This component doesn't render anything visible itself
};
