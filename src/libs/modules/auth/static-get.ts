import { getProjectEnvVariables } from '@mod/env';
import { User } from 'oidc-client-ts';

const { envVariables } = getProjectEnvVariables();

export function getUserStatic() {
  const authority = envVariables.VITE_OIDC_ISSUER;
  const clientId = envVariables.VITE_OIDC_CLIENT_ID;
  const oidcStorage = localStorage.getItem(
    `oidc.user:${authority}:${clientId}`,
  );
  if (!oidcStorage) {
    return null;
  }

  return User.fromStorageString(oidcStorage);
}
