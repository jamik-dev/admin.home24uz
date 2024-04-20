export const state = () => ({
  categories: null
})

export const getters = {
  categories: state => state.categories
}

export const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories
  }
}

export const actions = {
  async getCategories({ commit }) {
    return await this.$axios.get('/categories', {params: this.$router.currentRoute.query})
    .then(response => {
      commit('SET_CATEGORIES', response.data.categories.data)   
      return response.data.categories.data;
    })
    .catch(error => {
      return error.response.data;
    });
  }
}

