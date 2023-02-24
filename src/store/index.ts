import { createStore } from "vuex";
import characters from "./characters";

export default createStore({
  modules: {
    characters,
  },
});
