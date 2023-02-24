<template>
  <div
    class="characters-fun"
    :class="!result?.characters.results.length ? '-empty' : ''"
  >
    <div v-show="result?.characters.results.length" class="search">
      <q-input v-model="search" label="Digite o nome do personagem" />
    </div>
    <div v-if="loading">Carregando...</div>
    <div v-if="error">Tente novamente mais tarde :(</div>
    <div v-if="!result?.characters.results.length && !loading && !error">
      Não existe cards disponiveis
    </div>
    <div
      v-else
      class="scrollable"
      :class="!result?.characters.results.length ? '-no__scrollable' : ''"
    >
      <div
        class="card"
        v-for="(character, index) in result?.characters?.results"
        :key="index"
      >
        <card :card="character" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted, computed } from "vue";
import Card from "./Card.vue";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";

const CHARACTERS_QUERY = gql`
  query Characters {
    characters {
      results {
        id
        name
        image
      }
    }
    episodesByIds(ids: [1, 2]) {
      id
    }
  }
`;
export default defineComponent({
  name: "ListPersonagens",
  components: {
    Card,
  },
  setup() {
    const { result, loading, error } = useQuery(CHARACTERS_QUERY);

    console.log(result);
    let search = ref("");

    return {
      result,
      search,
      loading,
      error,
    };
  },
});
</script>

<style lang="scss">
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
