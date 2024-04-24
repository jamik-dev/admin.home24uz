export const state = () => ({
  brands: null
})

export const getters = {
  brands: state => state.brands
}

export const mutations = {
  SET_BRANDS(state, brands) {
    state.brands = brands
  }
}

export const actions = {
  async getBrands({ commit }) {
    return await this.$axios.get('/brands', {params: this.$router.currentRoute.query})
    .then(response => {
      commit('SET_BRANDS', response.data.brands)   
      return response.data.brands;
    })
    .catch(error => {
      return error.response.data;
    });
  },
  async addBrand(_, {name, logo, is_top}) {
    return await this.$axios.post('/brands', {name, logo, is_top})
    .then(response => {
      return response.data;
    })
  },
  async deleteBrand(_, id) {
    return await this.$axios.delete(`/brands/${id}`)
    .then(response => {
      return response.data;
    })
  },
  async updateBrand(_, {id, name, logo, is_top, slug}) {
    return await this.$axios.put(`/brands/${id}`, {name, logo, is_top, slug})
    .then(response => {
      return response.data;
    })
  }
}