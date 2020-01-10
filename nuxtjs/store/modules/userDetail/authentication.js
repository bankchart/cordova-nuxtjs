export const state = () => ({
  accessToken: null,
  userName: null,
  email: null,
  firstName: null,
  lastName: null,
  displayName: null,
  profileImageSrc: null
});

export const getters = {
  currentAccessToken(state) {
    return state.accessToken || 'Access Token is Empty.';
  }
};

export const mutations = {
  SET_ACCESS_TOKEN(state, data) {
    state.accessToken = data;
  }
};

export const actions = {
  setAccessToken({ commit }, token) {
    commit('SET_ACCESS_TOKEN', (token || '').trim());
  }
};
