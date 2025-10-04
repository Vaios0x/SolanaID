// Injected script - runs in page context with full access to page's JavaScript

(function() {
  console.log('SolanaID Injected Script loaded');

  let interceptConfig: { sessionId: string; targetUrls: string[] } | null = null;
  const interceptedData: Uint8Array[] = [];

  // Listen for start command from content script
  window.addEventListener('message', (event) => {
    if (event.source !== window) return;
    
    if (event.data.type === 'START_TLS_INTERCEPT') {
      interceptConfig = event.data.config;
      console.log('TLS interception started:', interceptConfig);
      interceptNetworkRequests();
    }
  });

  function interceptNetworkRequests() {
    if (!interceptConfig) return;

    // Override XMLHttpRequest
    const originalXHROpen = XMLHttpRequest.prototype.open;
    const originalXHRSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function(method: string, url: string, ...args: any[]) {
      (this as any)._url = url;
      return originalXHROpen.apply(this, [method, url, ...args]);
    };

    XMLHttpRequest.prototype.send = function(data?: any) {
      const url = (this as any)._url;
      
      if (shouldIntercept(url)) {
        console.log('Intercepting XHR:', url);
        
        this.addEventListener('load', function() {
          if (this.status === 200) {
            const responseData = new TextEncoder().encode(this.responseText);
            interceptedData.push(responseData);
            
            window.postMessage({
              type: 'TLS_DATA_INTERCEPTED',
              data: Array.from(responseData),
            }, '*');
          }
        });
      }
      
      return originalXHRSend.apply(this, [data]);
    };

    // Override fetch
    const originalFetch = window.fetch;
    window.fetch = async function(input: RequestInfo | URL, init?: RequestInit) {
      const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
      
      if (shouldIntercept(url)) {
        console.log('Intercepting fetch:', url);
        
        const response = await originalFetch(input, init);
        const clonedResponse = response.clone();
        
        const text = await clonedResponse.text();
        const responseData = new TextEncoder().encode(text);
        interceptedData.push(responseData);
        
        window.postMessage({
          type: 'TLS_DATA_INTERCEPTED',
          data: Array.from(responseData),
        }, '*');
        
        return response;
      }
      
      return originalFetch(input, init);
    };
  }

  function shouldIntercept(url: string): boolean {
    if (!interceptConfig) return false;
    return interceptConfig.targetUrls.some(targetUrl => url.includes(targetUrl));
  }
})();
