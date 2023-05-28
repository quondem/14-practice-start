<template>
  <div class="breadcrumbs" v-if="back">
    <router-link to="/" class="text-white"
      >Вернуться к списку заявок</router-link
    >
  </div>
  <div class="card">
    <h1 class="card-title">{{ title }} <slot name="header" /></h1>

    <slot />
  </div>
</template>
<script>
export default {
  props: {
    title: {
      required: true,
      type: String,
    },
    back: {
      default: false,
      type: Boolean,
    },
  },
  setup(props) {
    document.title = props.title;
  },
};
</script>
