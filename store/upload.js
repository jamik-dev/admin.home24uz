export const state = () => ({
  path: null
})

export const getters = {
  path: state => state.path
}

export const mutations = {
  SET_PATH(state, path) {
    state.path = path
  },
  CLEAR_PATH(state) {
    state.path = null
  }
}

export const actions = {
  async setFile({ commit }, file) {
    const formData = new FormData();
    formData.append('file', file.raw);
    return await this.$axios.post('/files/upload', formData)
    .then(response => {
      commit('SET_PATH', response.data.path)   
      return response.data.path;
    })
    .catch(error => {
      return error.response.data;
    })
  },
}