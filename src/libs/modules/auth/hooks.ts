import { useAuth } from 'react-oidc-context';

export function useLoginAuth() {
  return useAuth();
}
