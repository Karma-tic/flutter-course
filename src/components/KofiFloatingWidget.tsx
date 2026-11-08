import React, { useEffect, useState } from 'react';
import { Coffee, ExternalLink } from 'lucide-react';

declare global {
  interface Window {
    kofiWidgetOverlay?: {
      draw: (username: string, config: Record<string, string>) => void;
    };
  }
}

export const KofiFloatingWidget: React.FC = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    // Check if script already exists
    const existingScript = document.getElementById('kofi-widget-script');

    const initWidget = () => {
      try {
        if (window.kofiWidgetOverlay) {
          // Avoid duplicate drawing
          const existingFrame = document.querySelector('.floatingchat-container-wrap');
          if (!existingFrame) {
            window.kofiWidgetOverlay.draw('karmatix', {
              type: 'floating-chat',
              'floating-chat.donateButton.text': 'Support Karmatix ☕',
              'floating-chat.donateButton.background-color': '#2563eb',
              'floating-chat.donateButton.text-color': '#ffffff',
            });
          }
          setScriptLoaded(true);
        }
      } catch (err) {
        console.warn('Ko-fi overlay could not be initialized:', err);
        setScriptError(true);
      }
    };

    if (existingScript) {
      if (window.kofiWidgetOverlay) {
        initWidget();
      } else {
        existingScript.addEventListener('load', initWidget);
      }
      return;
    }

    // Load non-blockingly
    const script = document.createElement('script');
    script.id = 'kofi-widget-script';
    script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      initWidget();
    };

    script.onerror = () => {
      // Ad-blocker or offline fallback
      setScriptError(true);
    };

    // Attach after window loads or immediately if already loaded
    if (document.readyState === 'complete') {
      document.body.appendChild(script);
    } else {
      window.addEventListener('load', () => {
        document.body.appendChild(script);
      });
    }

    // Safety timeout: if script doesn't initialize within 3 seconds, set fallback
    const timeout = setTimeout(() => {
      const widgetExists = document.querySelector('.floatingchat-container-wrap');
      if (!widgetExists && !scriptLoaded) {
        setScriptError(true);
      }
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [scriptLoaded]);

  // If the external script is blocked by an ad-blocker or fails, show an accessible HTML fallback
  if (scriptError && !scriptLoaded) {
    return (
      <aside aria-label="Ko-fi Support Button" className="fixed bottom-5 right-5 z-40 hidden sm:block">
        <a
          href="https://ko-fi.com/karmatix"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Support Karmatix on Ko-fi (opens in new tab)"
          className="group flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
        >
          <Coffee className="h-4 w-4 transition-transform group-hover:rotate-12" />
          <span>Support Karmatix ☕</span>
          <ExternalLink className="h-3 w-3 opacity-70" />
        </a>
      </aside>
    );
  }

  return null;
};
