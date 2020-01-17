export const state = () => ({
  firstName: null,
  lastName: null,
  phoneNumber: null,
  email: null
});

export const getters = {
  firstName(state) {
    return state.firstName || '';
  },
  lastName(state) {
    return state.lastName || '';
  },
  phoneNumber(state) {
    return state.phoneNumber || '';
  },
  email(state) {
    return state.email || '';
  }
};

export const mutations = {
  SET_FIRST_NAME(state, firstName) {
    state.firstName = firstName;
  },
  SET_LAST_NAME(state, lastName) {
    state.lastName = lastName;
  },
  SET_PHONE_NUMBER(state, phoneNumber) {
    state.phoneNumber = phoneNumber;
  },
  SET_EMAIL(state, email) {
    state.email = email;
  },
  RESET_STATE(state) {
    state.firstName = null;
    state.lastName = null;
    state.phoneNumber = null;
    state.email = null;
  }
};

export const actions = {
  setFirstName({ commit }, firstName) {
    commit('SET_FIRST_NAME', firstName);
  },
  setLastName({ commit }, lastName) {
    commit('SET_LAST_NAME', lastName);
  },
  setPhoneNumber({ commit }, phoneNumber) {
    commit('SET_PHONE_NUMBER', phoneNumber);
  },
  setEmail({ commit }, email) {
    commit('SET_EMAIL', email);
  },
  resetState({ commit }) {
    commit('RESET_STATE');
  },
  saveProfile({ getters }, vueComp) {
    return new Promise((resolve, reject) => {
      vueComp.$axios
        .post('/save-profile', {
          data: getters
        })
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((error) => reject(error));
    });
  }
};
