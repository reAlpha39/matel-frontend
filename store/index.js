export const state = () => ({
  myString: "",
});

export const mutations = {
  setString(state, newValue) {
    state.myString = newValue;
  },
};

export const actions = {
  updateString({ commit }, newValue) {
    commit("setString", newValue);
  },
};
