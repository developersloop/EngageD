<template>
  <div class="details-character" v-if="!loading && !error">
    <q-img
      :src="result?.character.image"
      spinner-color="white"
      style="height: 170px; max-width: 300px"
      img-class="my-custom-image"
      class="rounded-borders"
    >
      <div class="absolute-bottom text-subtitle1 text-center">
        {{ result?.character.name }}
      </div>
    </q-img>
    <div class="text-h6">Episodes</div>
    <div class="episodes">
      <q-list
        v-for="(episode, index) in result?.character?.episode"
        :key="index"
      >
        <q-item>
          <q-item-section>
            <q-item-label>{{ episode?.name }}</q-item-label>
            <q-item-label caption>Data: {{ episode?.air_date }}.</q-item-label>
            <q-item-label caption
              >Episodio: {{ episode?.episode }}.</q-item-label
            >
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption class="good" style="display: none"
              >GOOD</q-item-label
            >
            <q-avatar style="display: none">
              <img :src="result?.character.image" />
            </q-avatar>
          </q-item-section>
        </q-item>
        <q-separator spaced inset />
      </q-list>
    </div>
  </div>
  <div v-if="loading && !error" class="loader">Carregando...</div>
  <div v-if="!loading && error" class="error">Tente novament mais tarde :(</div>
</template>
<script>
import { defineComponent } from "vue";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";

const CHAPTER_DETAIL = (id) => {
  return gql`
    query {
      character(id: ${id}) {
        id
        name
        image
				episode {
					id,
					name,
					air_date,
					episode
				}
      }
    }
  `;
};

export default defineComponent({
  name: "editCharacters",
  setup() {
    const params = window.location.pathname.split("/")[2];
    const { result, loading, error } = useQuery(CHAPTER_DETAIL(params));

    return {
      result,
      loading,
      error,
    };
  },
});
</script>
<style lang="scss" scoped>
.details-character {
  width: -webkit-fill-available;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  @media (min-width: 1024px) {
    margin-top: 10px;
  }
  > .q-img {
    height: auto !important;
    @media (min-width: 1024px) {
      display: none;
    }
  }

  > .text-h6 {
    margin-top: 10px;
    color: #00b4ff;
    cursor: pointer;
    @media (min-width: 1024px) {
      font-size: 30px;
    }
  }

  > .episodes {
    @media (min-width: 1024px) {
      width: 50vw !important;
    }
    > .q-list {
      > .q-item {
        > .q-item__section--top {
          > .good {
            @media (max-width: 1023.99px) {
              display: block !important;
            }
          }
          > .q-avatar {
            @media (min-width: 1024px) {
              display: block !important;
            }
          }
        }
      }
    }
  }
}
.loader,
.error {
  height: 100vh;
  display: flex;
  align-items: center;
}
</style>
