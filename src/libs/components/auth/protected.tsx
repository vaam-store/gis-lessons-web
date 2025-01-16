import { useLoginAuth } from '@mod/auth';
import { PropsWithChildren, useCallback, useEffect } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

export function ProtectedRoute({ children }: PropsWithChildren) {
  const { isAuthenticated, isLoading } = useLoginAuth();
  const navigate = useNavigate();
  const toLogin = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    navigate({
      pathname: '/login',
      search: createSearchParams({
        redirect: window.location.pathname,
      }).toString(),
    });
  }, [navigate]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      toLogin();
    }
  }, [isLoading, isAuthenticated, toLogin]);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!isAuthenticated) {
    return <>Redirecting...</>;
  }

  return <>{children}</>;
}
