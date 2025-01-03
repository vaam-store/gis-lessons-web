import { toastWarn } from '@mod/notification';
import { useEffect } from 'react';

export default function useUpdate() {
  const showShouldUpdate = () => {
    toastWarn('New version', 'Please update your browser!');
  };

  useEffect(() => {
    document.body.addEventListener(
      'plugin_web_update_notice',
      showShouldUpdate,
    );
    return () => {
      document.body.removeEventListener(
        'plugin_web_update_notice',
        showShouldUpdate,
      );
    };
  }, []);

  return null;
}
