import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';

// help warm up browser to boost performance in Android
export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};
