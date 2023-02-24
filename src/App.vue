<template>
  <div class="list-personagens">
    <list-personagens></list-personagens>
  </div>
</template>

<script>
import { ref } from "vue";
import ListPersonagens from "./components/ListPersonagens.vue";

export default {
  name: "LayoutDefault",

  components: {
    ListPersonagens,
  },

  setup() {
    return {
      leftDrawerOpen: ref(false),
    };
  },
};
</script>
<style lang="scss">
.list-personagens {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;

  @media (max-width: 1024.99px) {
    padding: 20px;
  }

  @media (min-width: 1025px) {
    height: inherit;
  }
}
</style>
