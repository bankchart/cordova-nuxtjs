export default ({ app, store }) => {
  store.dispatch('nuxtClientInit', app);
};
