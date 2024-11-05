interface Window {
    fbAsyncInit: () => void;
    FB: {
      init: (options: any) => void;
      login: (callback: (response: any) => void, options?: any) => void;
      api: (path: string, callback: (response: any) => void) => void;
    };
  }