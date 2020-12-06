import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import axios from "axios";
import qs from "querystring";

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    authorization: null,
  },
  mutations: {
    authorization(state, data) {
      state.authorization = data;
    },
  },
  actions: {
    async GetToken({ commit }) {
      const config = {
        headers: {
          Accept: "application/x-www-form-urlencoded",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      const oauth = {
        grant_type: "client_credentials",
        client_id: "5a1c4b94d2453a8232bc343594ce44be",
        client_secret: "ff69b3f05f46ec05118523a0e99808a5",
      };

      await axios
        .post("/token", qs.stringify(oauth), config)
        .then((res) => {
          console.log(res);
          let data = `Bearer ${res.data.access_token}`;
          commit("authorization", data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {},
});
