<template>
  <div
    class="characters-fun"
    :class="!resultado?.characters.results.length ? '-empty' : ''"
  >
    <div v-show="resultado?.characters.results.length" class="search">
      <q-input
        v-model="search"
        label="Digite o nome do personagem"
        v-debounce:1000ms="teste"
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
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  onMounted,
  onBeforeMount,
  computed,
  watchEffect,
} from "vue";
import Card from "./Card.vue";
import gql from "graphql-tag";
import { useQuery, useLazyQuery } from "@vue/apollo-composable";

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

    function teste() {
      const a = gql`
        query Characters {
          characters {
            results {
              id
              name
              image
            }
          }
        }
      `;

      useQuery(a, {
        variables: {
          searcText: search,
        },
      });
    }
    onBeforeMount(() => {
      const { result, loading, error } = useQuery(gql`
        query Characters {
          characters {
            results {
              id
              name
              image
            }
          }
        }
      `);
      resul.value = result;
      load.value = loading;
      wrong.value = error;
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

    return {
      resultado,
      search,
      loader,
      err,
      teste,
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
