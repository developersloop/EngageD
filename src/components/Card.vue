<template>
  <q-card class="my-card">
    <img :src="card?.image" />
    <q-card-section class="section">
      <div class="text-h6">{{ card?.name }}t</div>
      <div class="text-subtitle2" @click="$router.push('/details-character')">
        Ver detalhes
      </div>
    </q-card-section>
    <q-card-section class="q-pt-none"> </q-card-section>
  </q-card>
</template>

<script lang="ts">
import stateInterface from "@/interfaces/state";
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "Card",
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  setup() {
    let state: stateInterface = reactive({
      card: {},
    });
  },
});
</script>
<style lang="scss" scoped>
.my-card {
  margin-top: 14px;
  @media (min-width: 1024px) {
    width: 300px;
  }

  > .section {
    .text-subtitle2 {
      color: #00b4ff;
      cursor: pointer;
    }
  }
}
</style>
