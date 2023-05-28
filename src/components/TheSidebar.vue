<template>
  <div class="sidebar" v-if="sidebar">
    <span class="sidebar-close" @click="close">&times;</span>

    <div class="sidebar-content">Какоето сообщение</div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    const store = useStore();

    const sidebar = computed(() => store.state.sidebar);

    const close = () => {
      store.commit("closeSidebar");
    };

    return { store, close, sidebar };
  },
};
</script>
