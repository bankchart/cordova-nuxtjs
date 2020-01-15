export default ({ app, store }) => {
  store.dispatch('nuxtClientInit', app);
  store.dispatch('modules/core/initLoadWeb/loadUserPermissions', app);
};
