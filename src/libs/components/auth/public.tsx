import { useLoginAuth } from '@mod/auth';
import { PropsWithChildren, useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function PublicRoute({ children }: PropsWithChildren) {
  const { isAuthenticated, isLoading } = useLoginAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toLogin = useCallback(() => {
    const redirect = searchParams.get('redirect') || '/courses';
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    navigate({
      pathname: redirect,
    });
  }, [navigate, searchParams]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (isAuthenticated) {
      toLogin();
    }
  }, [isLoading, isAuthenticated, toLogin]);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isAuthenticated) {
    return <>Redirecting...</>;
  }

  return <>{children}</>;
}
