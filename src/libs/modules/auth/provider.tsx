import { getProjectEnvVariables } from '@mod/env';
import { WebStorageStateStore } from 'oidc-client-ts';
import { PropsWithChildren } from 'react';
import { AuthProvider, AuthProviderProps } from 'react-oidc-context';

const { envVariables } = getProjectEnvVariables();

const onSigninCallback = (): void => {
  window.history.replaceState({}, document.title, window.location.pathname);
};

const onRemoveUser = (): void => {
  window. location. pathname = "";
}

const oidcConfig: AuthProviderProps = {
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  authority: envVariables.VITE_OIDC_ISSUER,
  client_id: envVariables.VITE_OIDC_CLIENT_ID,
  client_secret: envVariables.VITE_OIDC_CLIENT_SECRET,
  redirect_uri: window.location.origin,
  silent_redirect_uri: window.location.origin + '/silent-sso.html',
  response_type: 'code',
  scope: envVariables.VITE_OIDC_SCOPES,
  extraQueryParams: {
    ui_locales: window.navigator.language,
  },
  automaticSilentRenew: true,
  children: null,
  onSigninCallback: onSigninCallback,
  onRemoveUser: onRemoveUser,
  popupWindowFeatures: {
    toolbar: false,
    menubar: false,
    location: false,
    scrollbars: false,
    status: false,
  },
};

export default function Provider({ children }: PropsWithChildren) {
  return <AuthProvider {...oidcConfig}>{children}</AuthProvider>;
}
