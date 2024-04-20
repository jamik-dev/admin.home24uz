export const state = () => ({
  isLoading: false
})

export const getters = {
  isLoading: state => state.isLoading
}

export const mutations = {
  SET_LOADING(state, loading) {
    state.isLoading = loading;
  }
}

