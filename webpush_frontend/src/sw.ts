export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration> => {
    if ('serviceWorker' in navigator) {
      try {
        const reg = await navigator.serviceWorker.register('/sw.js', { scope: '' });
        console.log('ServiceWorker registration successful with scope: ', reg.scope);
        return reg;
      } catch (error) {
        console.error('ServiceWorker registration failed: ', error);
        throw error; // Rethrow the error to handle it outside
      }
    } else {
      console.log('Service workers aren\'t supported in this browser.');
      throw new Error('Service workers aren\'t supported in this browser.');
    }
  };

export const urlB64ToUint8Array = (base64String: string): Uint8Array => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const uint8Array = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      uint8Array[i] = rawData.charCodeAt(i);
    }
  
    return uint8Array;
  };
  
export  const encodeUint8Array = (array: Uint8Array): string => {
    const binaryString = Array.from(array)
      .map(byte => String.fromCharCode(byte))
      .join('');
    return btoa(binaryString);
  };
  
  export interface WebPushSubscription {
    id?: number; 
    notificationEndPoint: string;
    publicKey: string;
    auth: string;
    userId: number;
  }

export interface WebPushMessage {
    title: string;
    clickTarget: string;
    message: string;
    icon: string;
  }
  