export const state = () => ({
  accessToken: null,
  userName: null,
  email: null,
  firstName: null,
  lastName: null,
  displayName: null,
  profileImageSrc: null,
  logged: false
});

export const getters = {
  currentAccessToken(state) {
    return state.accessToken;
  }
};

export const mutations = {
  SET_ACCESS_TOKEN(state, data) {
    state.accessToken = data;
  },
  RESET_STATE(state) {
    state = {
      accessToken: null,
      userName: null,
      email: null,
      firstName: null,
      lastName: null,
      displayName: null,
      profileImageSrc: null,
      logged: false
    };
  }
};

export const actions = {
  setAccessToken({ commit }, token) {
    commit('SET_ACCESS_TOKEN', (token || '').trim());
  },
  login(ctx, data) {
    data.vueComp.$store.dispatch('session/setLoadingStatus', 'loading');
    return new Promise((resolve, reject) => {
      data.vueComp.$axios
        .post('/login', {
          data: { user: data.user }
        })
        .then((res) => {
          setTimeout(() => {
            data.vueComp.$store.dispatch('session/setLoadingStatus', 'success');
            resolve(res.data);
          }, 2000);
        })
        .catch((error) => {
          data.vueComp.$store.dispatch(
            'modules/userDetail/authentication/resetState'
          );
          setTimeout(() => {
            data.vueComp.$store.dispatch('session/setLoadingStatus', 'error');
            data.vueComp.$utilities.deleteCookie('token');
            reject(error);
          }, 2000);
        });
    });
  },
  resetState({ commit }) {
    commit('RESET_STATE');
  }
};
