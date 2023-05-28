<template>
  <div class="container">
    <AppMessage></AppMessage>
    <router-view></router-view>
  </div>
</template>

<script>
import AppMessage from "../components/ui/AppMessage.vue";
export default {
  components: { AppMessage },
  setup(props) {},
};
</script>
