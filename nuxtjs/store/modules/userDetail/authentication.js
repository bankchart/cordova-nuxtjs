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
  },
  currentLogged(state) {
    return state.logged;
  }
};

export const mutations = {
  SET_LOGGED(state, data) {
    state.logged = data;
  },
  SET_ACCESS_TOKEN(state, data) {
    state.accessToken = data;
  },
  RESET_STATE(state) {
    state.accessToken = null;
    state.userName = null;
    state.email = null;
    state.firstName = null;
    state.lastName = null;
    state.displayName = null;
    state.profileImageSrc = null;
    state.logged = false;
  }
};

export const actions = {
  setLogged({ commit }, logged) {
    commit('SET_LOGGED', typeof logged === 'boolean' ? logged : false);
  },
  setAccessToken({ commit }, token) {
    commit('SET_ACCESS_TOKEN', (token || '').trim());
  },
  login({ commit }, data) {
    data.vueComp.$store.dispatch('session/setLoadingStatus', 'loading');
    return new Promise((resolve, reject) => {
      data.vueComp.$axios
        .post('/login', {
          data: { user: data.user }
        })
        .then((res) => {
          setTimeout(() => {
            commit('SET_LOGGED', true);
            data.vueComp.$store.dispatch('session/setLoadingStatus', 'success');
            resolve(res.data);
          }, 2000);
        })
        .catch((error) => {
          commit('SET_LOGGED', false);
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
