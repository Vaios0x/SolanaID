// Content script - runs in webpage context
console.log('SolanaID Content Script loaded');

interface InterceptConfig {
  sessionId: string;
  platform: string;
  targetUrls: string[];
  extractors: {
    username: (doc: Document) => string | null;
    profileData: (doc: Document) => any;
  };
}

class ContentInterceptor {
  private config: InterceptConfig | null = null;
  private transcriptData: Uint8Array[] = [];

  constructor() {
    this.setupMessageListener();
    this.injectInterceptor();
  }

  private setupMessageListener() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === 'START_INTERCEPT') {
        this.startIntercepting(message.sessionId, message.platform);
        sendResponse({ status: 'intercepting' });
      }
      return true;
    });
  }

  private injectInterceptor() {
    // Inject script that can intercept network requests
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('injected.js');
    (document.head || document.documentElement).appendChild(script);
    script.remove();

    // Listen for intercepted data from injected script
    window.addEventListener('message', (event) => {
      if (event.source !== window) return;
      
      if (event.data.type === 'TLS_DATA_INTERCEPTED') {
        this.handleInterceptedData(event.data.data);
      }
    });
  }

  private startIntercepting(sessionId: string, platform: string) {
    this.config = {
      sessionId,
      platform,
      targetUrls: this.getTargetUrls(platform),
      extractors: this.getExtractors(platform),
    };

    // Extract current page data
    const username = this.config.extractors.username(document);
    const profileData = this.config.extractors.profileData(document);

    console.log('Extracted data:', { username, profileData });

    // Notify injected script to start intercepting
    window.postMessage({
      type: 'START_TLS_INTERCEPT',
      config: {
        sessionId,
        targetUrls: this.config.targetUrls,
      },
    }, '*');
  }

  private getTargetUrls(platform: string): string[] {
    switch (platform) {
      case 'linkedin':
        return [
          'https://www.linkedin.com/voyager/api/me',
          'https://www.linkedin.com/voyager/api/identity/profiles',
        ];
      case 'github':
        return [
          'https://api.github.com/user',
          'https://github.com/api/v3/user',
        ];
      case 'twitter':
        return [
          'https://api.twitter.com/1.1/account/verify_credentials.json',
          'https://twitter.com/i/api/1.1/account/settings.json',
        ];
      case 'google':
        return [
          'https://www.googleapis.com/oauth2/v1/userinfo',
          'https://www.googleapis.com/plus/v1/people/me',
        ];
      default:
        return [];
    }
  }

  private getExtractors(platform: string) {
    switch (platform) {
      case 'linkedin':
        return {
          username: (doc: Document) => {
            const nameElement = doc.querySelector('.text-heading-xlarge');
            return nameElement?.textContent?.trim() || null;
          },
          profileData: (doc: Document) => {
            return {
              name: doc.querySelector('.text-heading-xlarge')?.textContent?.trim(),
              headline: doc.querySelector('.text-body-medium')?.textContent?.trim(),
            };
          },
        };
      
      case 'github':
        return {
          username: (doc: Document) => {
            const usernameElement = doc.querySelector('[itemprop="additionalName"]');
            return usernameElement?.textContent?.trim() || null;
          },
          profileData: (doc: Document) => {
            return {
              username: doc.querySelector('[itemprop="additionalName"]')?.textContent?.trim(),
              name: doc.querySelector('[itemprop="name"]')?.textContent?.trim(),
            };
          },
        };

      case 'twitter':
        return {
          username: (doc: Document) => {
            const usernameElement = doc.querySelector('[data-testid="UserName"]');
            return usernameElement?.textContent?.trim().replace('@', '') || null;
          },
          profileData: (doc: Document) => {
            return {
              username: doc.querySelector('[data-testid="UserName"]')?.textContent?.trim(),
              displayName: doc.querySelector('[data-testid="UserDisplayName"]')?.textContent?.trim(),
            };
          },
        };

      case 'google':
        return {
          username: (doc: Document) => {
            const emailElement = doc.querySelector('[data-email]');
            return emailElement?.getAttribute('data-email') || null;
          },
          profileData: (doc: Document) => {
            return {
              email: doc.querySelector('[data-email]')?.getAttribute('data-email'),
            };
          },
        };

      default:
        return {
          username: () => null,
          profileData: () => ({}),
        };
    }
  }

  private handleInterceptedData(data: Uint8Array) {
    this.transcriptData.push(data);

    // After collecting sufficient data, send to background for proof generation
    if (this.transcriptData.length >= 5) { // Arbitrary threshold
      const combinedData = this.combineTranscriptData();
      
      chrome.runtime.sendMessage({
        type: 'GENERATE_PROOF',
        sessionId: this.config?.sessionId,
        transcriptData: Array.from(combinedData),
      });
    }
  }

  private combineTranscriptData(): Uint8Array {
    const totalLength = this.transcriptData.reduce((sum, arr) => sum + arr.length, 0);
    const combined = new Uint8Array(totalLength);
    
    let offset = 0;
    for (const data of this.transcriptData) {
      combined.set(data, offset);
      offset += data.length;
    }
    
    return combined;
  }
}

// Initialize content interceptor
const interceptor = new ContentInterceptor();
