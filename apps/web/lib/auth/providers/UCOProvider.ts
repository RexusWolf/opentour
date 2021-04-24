/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default (options: any) => {
  return {
    id: 'uco',
    name: 'Universidad de Cordoba',
    type: 'oauth',
    version: '2.0',
    scope: 'openid profile email',
    params: { grant_type: 'authorization_code' },
    accessTokenUrl:
      'https://identidad.uco.es/simplesaml/module.php/oidc/access_token.php',
    authorizationUrl:
      'https://identidad.uco.es/simplesaml/module.php/oidc/authorize.php?response_type=code',
    profileUrl:
      'https://identidad.uco.es/simplesaml/module.php/oidc/userinfo.php',
    profile: (profile: any) => {
      return {
        id: profile.sub,
        name: profile.sub,
        email: profile.email,
      };
    },
    ...options,
  };
};
