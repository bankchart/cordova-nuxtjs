import axios from 'axios';

export default (ctx, inject) => {
  const currentAccessTokenKey =
    'modules/userDetail/authentication/currentAccessToken';
  const httpCaller = axios.create({
    baseURL: process.env.baseUrl,
    timeout: process.env.timeout
  });
  httpCaller.interceptors.request.use((config) => {
    const tokenStore = ctx.store.getters[currentAccessTokenKey];
    const tokenCookie = ctx.app.$utilities.getCookie('token');
    if (tokenCookie !== tokenStore) {
      if (tokenCookie) {
        ctx.store.dispatch(
          'modules/userDetail/authentication/setAccessToken',
          tokenCookie
        );
      } else {
        ctx.app.$utilities.setCookie('token', tokenStore);
      }
    }
    config.headers = {
      token: ctx.store.getters[currentAccessTokenKey],
      version: ctx.store.state.session.version
    };
    return config;
  });
  inject('axios', httpCaller);
};
