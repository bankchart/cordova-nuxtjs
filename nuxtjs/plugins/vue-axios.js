import axios from 'axios';

export default (ctx, inject) => {
  const userAuthen = 'modules/userDetail/authentication';
  const httpCaller = axios.create({
    baseURL: process.env.baseUrl,
    timeout: process.env.timeout
  });
  httpCaller.interceptors.request.use((config) => {
    const tokenStore = ctx.store.getters[`${userAuthen}/currentAccessToken`];
    const tokenCookie = ctx.app.$utilities.getCookie('token');
    if (tokenCookie !== tokenStore) {
      if (tokenCookie) {
        ctx.store.dispatch(`${userAuthen}/setAccessToken`, tokenCookie);
      } else {
        ctx.app.$utilities.setCookie('token', tokenStore);
      }
    }
    config.headers = {
      token: ctx.store.getters[`${userAuthen}/currentAccessToken`],
      version: ctx.store.state.session.version
    };
    return config;
  });
  inject('axios', httpCaller);
};
