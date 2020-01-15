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
    console.info(app);
    app.store.dispatch('session/setLoadingStatus', 'loading');
    await setTimeout(async () => {
      await app.$axios
        .post('/auth')
        .then((res) => {
          app.store.dispatch('session/setLoadingStatus', 'success');
          const data = res.data;
          commit('SET_PERMISSIONS', data.permissions);
        })
        .catch((error) => {
          app.store.dispatch('session/setLoadingStatus', 'fail');
          app.dtore.dispatch('modules/userDetail/authentication/resetState');
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
