export const state = () => ({
  default: 'th',
  current: null
});

export const getters = {
  currentLang(state) {
    return state.current || 'Setup language please.';
  }
};

export const mutations = {
  SET_LANGUAGE(state, data) {
    state.current = data;
  }
};

export const actions = {
  setLanguage({ commit }, lang) {
    commit('SET_LANGUAGE', lang);
  }
};
