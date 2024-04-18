export const state = () => ({
  user: null
})

export const mutations = {
  SET_AUTH_TOKEN(_, token) {
    localStorage.setItem('token', token);
  },
  SET_USER(state, user) {
    state.user = user;
  },
  DELETE_USER_AND_TOKEN(state) {
    state.user = null;
    localStorage.removeItem('token');
  }
}

export const actions = {
  async authLogin({ commit }, form) {
    return await this.$axios.post('/auth/login', form)
      .then(response => {
        if(response.status === 200) {
          commit('SET_AUTH_TOKEN', response.data.token)   
          return response.data;
        }
        return response.data;
      })
      .catch(error => {
        return error.response.data;
      });
  },
  async authMe({ commit }) {
    return await this.$axios.post('/auth/me')
      .then(response => {
        if(response.status === 200) {
          commit('SET_USER', response.data.user)   
          return response.data.user;
        }
        return response.data;
      })
      .catch(error => {
        return error.response.data;
      });
  },
  async authLogout({ commit }) {
    return await this.$axios.post('/auth/logout')
      .then(response => {
        commit('DELETE_USER_AND_TOKEN')   
        return response.data;
      })
      .catch(error => {
        return error.response.data;
      });
  }
}

export const namespaced = true;