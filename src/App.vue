<template>
  <component :is="`${layout}-layout`" v-if="layout"></component>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import MainLayout from "@/layout/MainLayout";
import AuthLayout from "@/layout/AuthLayout";

export default {
  components: { MainLayout, AuthLayout },
  setup() {
    const route = useRoute();
    return {
      layout: computed(() => route.meta.layout),
    };
  },
};
</script>
