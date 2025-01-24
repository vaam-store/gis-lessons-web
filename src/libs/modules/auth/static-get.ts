import { authStore } from '@mod/auth/store.ts';
import { getProjectEnvVariables } from '@mod/env';
import { get } from 'idb-keyval';
import { User } from 'oidc-client-ts';

const { envVariables } = getProjectEnvVariables();

export async function getUserStatic(): Promise<User | null> {
  const authority = envVariables.VITE_OIDC_ISSUER;
  const clientId = envVariables.VITE_OIDC_CLIENT_ID;
  const oidcStorage = await get<string>(
    `oidc.user:${authority}:${clientId}`,
    authStore,
  );
  if (!oidcStorage) {
    return null;
  }

  return User.fromStorageString(oidcStorage);
}
