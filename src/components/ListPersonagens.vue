<template>
  <div
    class="characters-fun"
    :class="!resultado?.characters.results.length ? '-empty' : ''"
  >
    <div class="search">
      <q-input
        v-model="search"
        label="Digite o nome do personagem"
        v-debounce:1000ms="searched"
      />
    </div>
    <div v-if="loader">Carregando...</div>
    <div v-if="err">Tente novamente mais tarde :(</div>
    <div v-if="!resultado?.characters.results.length && !loader && !err">
      Não existe cards disponiveis
    </div>
    <div
      v-else
      class="scrollable"
      :class="!resultado?.characters.results.length ? '-no__scrollable' : ''"
    >
      <div
        class="card"
        v-for="(character, index) in resultado?.characters?.results"
        :key="index"
      >
        <card :card="character" />
      </div>
    </div>
    <q-pagination
      style="margin: 20px"
      v-model="page"
      :max-pages="6"
      :max="max"
      direction-links
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onBeforeMount,
  computed,
  watchEffect,
} from "vue";
import Card from "./Card.vue";
import gql from "graphql-tag";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { useQuery, provideApolloClient } from "@vue/apollo-composable";

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  cache,
  uri: "https://rickandmortyapi.com/graphql",
});
export default defineComponent({
  name: "ListPersonagens",
  components: {
    Card,
  },
  setup() {
    let search = ref("");
    let resul = ref();
    let load = ref();
    let wrong = ref();
    let page = ref(1);

    watchEffect(() => {
      if (Number.isNaN(page.value)) page.value = 1;
      if (page.value) fetchCharacters(search?.value, page.value);
    });
    function searched() {
      page.value = 1;
      fetchCharacters(search?.value, page.value);
    }
    function fetchCharacters(
      term: string | any = "",
      page: string | number = 0
    ) {
      let query = gql`
        query Characters {
          characters(page: ${page}, filter: { name: "${term}" }) {
            info {
              pages
            }
            results {
              id
              name
              image
            }
          }
        }
      `;
      const { result, loading, error } = provideApolloClient(apolloClient)(() =>
        useQuery(query)
      );
      resul.value = result;
      load.value = loading;
      wrong.value = error;
    }
    onBeforeMount(() => {
      fetchCharacters();
    });

    let resultado = computed(() => {
      return resul.value.value;
    });

    let err = computed(() => {
      return wrong.value.value;
    });

    let loader = computed(() => {
      return load.value.value;
    });

    let max = computed(() => {
      return !search.value ? 42 : resul?.value?.value?.characters?.info?.pages;
    });
    return {
      resultado,
      search,
      loader,
      err,
      page,
      max,
      searched,
    };
  },
});
</script>

<style lang="scss" scoped>
.characters-fun {
  width: unset;
  display: flex;
  align-items: center;

  @media (max-width: 1023.99px) {
    flex-flow: column nowrap;
    overflow-x: scroll;
  }

  @media (min-width: 1024px) {
    flex-flow: column;
  }

  > .search {
    @media (max-width: 1920px) {
      width: -webkit-fill-available;
    }
    @media (min-width: 1024px) {
      margin: 0 100px;
    }
  }

  &.-empty {
    @media (max-width: 1023.99px) {
      width: -webkit-fill-available;
    }

    @media (min-width: 1024px) {
      width: 40vw;
    }
  }
  > .scrollable {
    height: 100vh;
    overflow: scroll;

    @media (max-width: 1023.99px) {
      width: inherit;
    }
    &.-no__scrollable {
      overflow: hidden;
      height: inherit;
    }

    @media (min-width: 1024px) {
      overflow: hidden;
      height: inherit;
      display: flex;
      justify-content: center;
      flex-flow: row wrap;
      > .card {
        padding: 1px 20px 11px 0;
      }
    }
  }
}
</style>
