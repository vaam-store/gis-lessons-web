import { useLoginAuth } from '@mod/auth';
import { useCallback } from 'react';
import { Button } from 'react-daisyui';
import { LogIn, LogOut } from 'react-feather';
import { useTranslation } from 'react-i18next';

interface LoginButtonProps {
  responsive?: boolean;
}

export default function LoginButton({ responsive = true }: LoginButtonProps) {
  const auth = useLoginAuth();
  const { i18n, t } = useTranslation('auth');
  const toggle = useCallback(async () => {
    if (auth.isLoading) {
      return;
    }

    if (auth.isAuthenticated) {
      await auth.signoutRedirect();
    } else {
      await auth.signinRedirect({
        redirect_uri: window.location.href,
        extraQueryParams: {
          ui_locales: i18n.language,
        },
      });
    }
  }, [auth, i18n]);

  return (
    <Button
      shape='circle'
      variant='outline'
      responsive={responsive}
      title={t(auth.isAuthenticated ? 'logout' : 'login')}
      color={auth.isAuthenticated ? 'error' : 'success'}
      onClick={toggle}
      disabled={auth.isLoading}>
      {auth.isAuthenticated ? <LogOut /> : <LogIn />}
    </Button>
  );
}
