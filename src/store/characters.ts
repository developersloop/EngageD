/* eslint-disable prettier/prettier */

const state = {
  characters: [],
  loading: false,
  error: false
};
const mutations = {
  SET_CHARACTERS(state: any, payload: any) {
    state.loading = payload.loading
    state.error = payload.error
  }
};
const actions = {};
const getters = {
  getCharacters: (state: any) => state.characters,
  loading: (state: any) => state.loading,
  error: (state: any) => state.error
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
