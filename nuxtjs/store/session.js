export const state = () => ({
  version: process.env.version || 'Undefined web version.',
  languages: ['th', 'en'],
  loadingStatus: null,
  defaultLoadingStatus: 'idle',
  authorizePages: ['#/schedule', '#/sample-form']
});

export const getters = {
  currentLoadingStatus(state) {
    return state.loadingStatus || state.defaultLoadingStatus;
  }
};

export const mutations = {
  SET_LOADING_STATUS(state, data) {
    state.loadingStatus = data;
  }
};

export const actions = {
  setLoadingStatus({ commit }, status) {
    commit('SET_LOADING_STATUS', status);
  }
};
