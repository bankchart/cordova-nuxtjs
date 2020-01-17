export default ({ app, store }) => {
  console.info(app);
  const currentPath = window.location.hash;

  if (currentPath.includes('#/login') && app.$utilities.getCookie('token')) {
    setTimeout(() => {
      store.$router.push('/');
    }, 500);
  } else if (
    store.state.session.authorizePages.includes(currentPath) &&
    !app.$utilities.getCookie('token')
  ) {
    setTimeout(() => {
      store.$router.push('/login');
    }, 500);
  }
};
