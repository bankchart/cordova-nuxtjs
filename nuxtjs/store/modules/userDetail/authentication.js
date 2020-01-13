export const state = () => ({
  accessToken: null,
  userName: null,
  email: null,
  firstName: null,
  lastName: null,
  displayName: null,
  profileImageSrc: null,
  loginStatus: null,
  defaultLoginStatus: 'idle'
});

export const getters = {
  currentAccessToken(state) {
    return state.accessToken;
  },
  currentLoginStatus(state) {
    return state.loginStatus || state.defaultLoginStatus;
  }
};

export const mutations = {
  SET_ACCESS_TOKEN(state, data) {
    state.accessToken = data;
  },
  SET_LOGIN_STATUS(state, data) {
    state.loginStatus = data;
  }
};

export const actions = {
  setAccessToken({ commit }, token) {
    commit('SET_ACCESS_TOKEN', (token || '').trim());
  },
  login({ commit, state }, data) {
    commit('SET_LOGIN_STATUS', 'loading');
    return new Promise((resolve, reject) => {
      data.vueComp.$axios
        .post('/login', {
          data: { user: data.user }
        })
        .then((res) => {
          setTimeout(() => {
            commit('SET_LOGIN_STATUS', 'success');
            resolve(res.data);
          }, 2000);
        })
        .catch((error) => {
          setTimeout(() => {
            commit('SET_LOGIN_STATUS', 'error');
            reject(error);
          }, 2000);
        });
    });
  }
};
