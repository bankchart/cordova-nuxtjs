export const state = () => ({
  permissions: []
});

export const getters = {
  userPermissions(state) {
    return state.permissions || [];
  }
};

export const mutations = {
  SET_PERMISSIONS(state, data) {
    state.permissions = data;
  }
};

export const actions = {
  setPermissions({ commit }, permissions) {
    commit(
      'SET_PERMISSIONS',
      (permissions || []).filter(() => true)
    );
  },
  async loadUserPermissions({ commit }, app) {
    app.store.dispatch('session/setLoadingStatus', 'loading');
    const currentLogged = 'modules/userDetail/authentication/currentLogged';
    await setTimeout(async () => {
      await app.$axios
        .post('/auth')
        .then((res) => {
          app.store.dispatch('session/setLoadingStatus', 'success');
          app.store.dispatch(
            'modules/userDetail/authentication/setLogged',
            true
          );
          const data = res.data.data;
          commit('SET_PERMISSIONS', data.permissions);
        })
        .catch((error) => {
          app.store.dispatch('session/setLoadingStatus', 'fail');
          app.store.dispatch('modules/userDetail/authentication/resetState');
          if (error.response) {
            const data = error.response.data;
            if (!data.success && data.error.errorCode === 'B0001') {
              app.router.push('/login');
            }
          }
        });
    }, 2000);
  }
};
