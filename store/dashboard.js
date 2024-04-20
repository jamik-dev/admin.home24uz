export const state = () => ({
  dashboard: null
})

export const getters = {
  dashboard: state => state.dashboard
}

export const mutations = {
  SET_DASHBOARD(state, dashboard) {
    state.dashboard = dashboard;
  }
}

export const actions = {
  async getDashboard({ commit }) {
    console.log(this.$router.currentRoute)
    return await this.$axios.get('/dashboard', {params: this.$router.currentRoute.query})
      .then(response => {
        commit('SET_DASHBOARD', response.data)   
        return response.data;
      })
      .catch(error => {
        return error.response.data;
      });
  }
}

