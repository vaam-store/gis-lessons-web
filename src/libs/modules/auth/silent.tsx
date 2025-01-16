import { debounce } from 'lodash';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { useAuth } from 'react-oidc-context';

const SilentLogin = memo(function SilentLogin() {
  const auth = useAuth();
  const signInSilent = useMemo(
    () =>
      debounce(async () => {
        if (auth.isLoading) {
          return;
        }

        if (!auth.isAuthenticated) {
          return;
        }

        await auth.signinSilent();
      }, 1000),
    [auth.isLoading, auth.isAuthenticated, auth],
  );

  const callback = useCallback(async () => {
    try {
      await auth.signinSilent();
    } catch (error) {
      console.warn('Failed to silently sign in', error);
    }
  }, [auth]);

  useEffect(() => {
    signInSilent()?.catch(console.warn);
  }, []);

  useEffect(() => {
    auth.events.addAccessTokenExpiring(callback);

    return () => {
      auth.events.removeAccessTokenExpiring(callback);
    };
  }, [callback, auth.events]);
  return null;
});

export default SilentLogin;
