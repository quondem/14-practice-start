<template>
  <form class="card" @submit="onSubmit">
    <h1>Войти в систему</h1>

    <div :class="['form-control', { invalid: eError }]">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" @blur="eBlur" />
      <small v-if="eError">{{ eError }}</small>
    </div>

    <div :class="['form-control', { invalid: pError }]">
      <label for="password">Пароль</label>
      <input type="password" id="password" v-model="password" @blur="pBlur" />
      <small v-if="pError">{{ pError }}</small>
    </div>

    <button
      class="btn primary"
      type="submit"
      @click="use"
      :disabled="isSubmitting || tooManyAttempts"
    >
      Войти
    </button>
    <div class="text-danger" v-if="tooManyAttempts">
      Слишком много попыток
    </div>

    <div class="form-control">
      <p>
        Ещё нет аккаунта?<router-link to="register"
          >Зарегистрироваться</router-link
        >
      </p>
    </div>
  </form>
</template>
<script>
import { useLoginForm } from "@/use/login-form.js";
import { useRoute } from "vue-router";
import error from "../utils/error";
import { dispatch, useStore } from "vuex";

export default {
  setup() {
    const route = useRoute();
    const store = useStore();

    console.log(route.query);
    if (route.query.message) {
      store.dispatch("setMessage", {
        value: error(route.query.message),
        type: "warning",
      });
    }

    return { ...useLoginForm() };
  },
};
</script>
