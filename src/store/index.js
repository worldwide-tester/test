import Vue from 'vue'
import Vuex from 'vuex'
var axios = require('axios');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authEndpoint: 'https://examen.avirato.com/auth/login',
    endpoint: 'https://examen.avirato.com',
    token: null,

    users: [],
  },


  mutations: {
    setToken(state, val) {
      state.token = val;
    },
    clearToken(state, val) {
      state.token = null;
    },
    setEndpoint(state, val) {
      state.endpoint = val;
      console.log("Endpoint set to " + val)
    },
    /****************************/
    /****** Users mutations *****/
    /****************************/
    clearUsersList(state) {
      state.users = [];
    },
    addUser(state, val) {
      state.users.push(val);
    },
    setUserList(state, val) {
      state.users = val;
    },
  },

  actions: {
    setToken({ commit}, value) {
      commit('setToken', value);
    },
    clearToken({ commit}) {
      commit('clearToken');
    },
    setEndpoint({ commit}, value) {
      commit('setEndpoint', value);
    },
    /****************************/
    /****** Users actions *******/
    /****************************/
    clearUsersList({ commit}) {
      commit('clearUsersList');
    },
    async getUsers({ commit, state }) {
      const response = await axios.default.get(state.endpoint+'/client/get', getAuthToken(state.token));
      if(response.status == 200) {
        const users = response.data;

        commit('setUserList', users);

      } else {
        console.error(response);
      }
    },
    async getUser({ commit, state }, id) {
      const response = await axios.default.get(state.endpoint+'/client/get/one/'+id, getAuthToken(state.token));
      if(response.status == 200) {
        console.log(response)
      } else {
        console.error(response);
      }
    },
    async searchUser({ commit, state }, search) {
      if (search == "" || search == null || search == undefined)
        this.dispatch("getUsers");

      const response = await axios.default.get(state.endpoint+'/client/get/search/?search='+search, getAuthToken(state.token));
      if(response.status == 200) {
        const users = response.data;

        commit('setUserList', users);

        console.log(response)
      } else {
        console.error(response);
      }
    },
    async addUser({ commit, state }, newUserJson) {
      const response = await axios.default.post(state.endpoint+'/client/post', newUserJson, getAuthToken(state.token));
      if(response.status == 201) {
        console.log("User added", response);
        this.dispatch("getUsers");
      } else {
        console.error(response);
      }
    },
    async updateUser( {commit, state}, userJson) {
      const response = await axios.default.put(state.endpoint+'/client/put', userJson, getAuthToken(state.token));
      if(response.status == 200) {
        console.log("User updated", response);
        this.dispatch("getUsers");
      } else {
        console.error(response);
      }    
    },
    async deleteUser( {commit, state}, id) {
      try {
        const response = await axios.default.delete(state.endpoint+'/client/delete/'+id, {}, getAuthToken(state.token));
        if(response.status == 200) {
          console.log("User deleted", response)
          return {status: 200};
        } else {
          console.error(response);
          return {status: response.status};
        }      
      } catch (err) {
        console.error("Problem with deleting user petition", err);
        return {status: 404};
      }
    },

  },
  modules: {
  }
})

function getAuthToken(token) {
  return {
    headers: { Authorization: `Bearer ${token}` }
  };
}