<template>
  <the-navbar />
  <TheSidebar />
  <div class="container with-nav">
    <app-message></app-message>
    <router-view></router-view>
  </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar";
import TheSidebar from "@/components/TheSidebar";
import AppMessage from "../components/ui/AppMessage.vue";

export default {
  components: { TheNavbar, AppMessage, TheSidebar },
};
</script>
