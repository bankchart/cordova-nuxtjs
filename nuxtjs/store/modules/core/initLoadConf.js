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
    const tokenKey = 'modules/userDetail/authentication/currentAccessToken';
    await app.$axios.post('/auth').then((res) => {
      console.info(res);
    });
  }
};
