<template>
  <div class="list-personagens">
    <router-view></router-view>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "LayoutDefault",
  setup() {
    return {
      leftDrawerOpen: ref(false),
    };
  },
};
</script>
<style lang="scss" scoped>
.list-personagens {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;

  @media (max-width: 1024.99px) {
    padding: 20px;
    height: inherit;
    overflow: auto;
  }

  @media (min-width: 1025px) {
    height: inherit;
  }
}
</style>
