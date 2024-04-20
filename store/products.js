export const state = () => ({
  products: null
})

export const getters = {
  products: state => state.products
}

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
  }
}

export const actions = {
  async getProducts({ commit }) {
    return await this.$axios.get('/products', {params: this.$router.currentRoute.query})
    .then(response => {
      commit('SET_PRODUCTS', response.data.products)   
      return response.data.products;
    })
    .catch(error => {
      return error.response.data;
    });
  }
}

