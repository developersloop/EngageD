import { createApp, provide, h } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Quasar } from "quasar";

import "./styles/quasar.scss";
import iconSet from "quasar/icon-set/fontawesome-v5.js";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";

import { DefaultApolloClient } from "@vue/apollo-composable";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { vue3Debounce } from "vue-debounce";

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  cache,
  uri: "https://rickandmortyapi.com/graphql",
});

createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
})
  .use(Quasar, {
    config: {},
    plugins: {},
    iconSet,
  })
  .use(store)
  .use(router)
  .directive("debounce", vue3Debounce({ lock: true }))
  .mount("#app");
