export default ({ app, store }) => {
  store.dispatch('nuxtClientInit', app);
  store.dispatch('modules/core/initLoadConf/loadUserPermissions', app);
};
