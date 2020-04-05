import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loader: false,
    snackbar: {
      state: false,
      color: "",
      content: ""
    },
    selectedTheme: "Dark",
    themes: {
      Light: {
        navColor: "#f7f7f7",
        toolbarColor: "#f7f7f7",
        backColor: "#e0e4eb",
        cardColor: "#F5F5F5"
      },
      Dark: {
        navColor: "#2f3136",
        toolbarColor: "#36393f",
        backColor: "#36393f",
        cardColor: "#2f3136"
      },
      Cosmic: {
        navColor: "#323159",
        toolbarColor: "#323159",
        backColor: "#1b1d36",
        cardColor: "#323159"
      }
    },
    games: []
  },
  getters: {
    getSnack: state => state.snackbar,
    getThemes: state => Object.keys(state.themes),
    getColor: state => {
      return state.themes[state.selectedTheme];
    }
  },
  mutations: {
    SET_LOADER: (state, payload) => {
      state.loader = payload;
    },
    CREATE_SNACKBAR(state, payload) {
      state.snackbar.state = true;
      state.snackbar.color = payload.color;
      state.snackbar.content = payload.content;
    },
    SET_THEME(state, payload) {
      window.localStorage.setItem("theme", payload);
      state.selectedTheme = payload;
    },
    SET_GAMES(state, payload) {
      state.games = payload;
    }
  },
  actions: {
    getGames: ({ commit }) => {
      commit("SET_LOADER", true);
      axios.get("http://starlord.hackerearth.com/TopSellingGames").then(res => {
        console.log(res);
        commit("SET_GAMES", res.data);
        commit("SET_LOADER", false);
      });
    }
  },
  modules: {}
});
