<template>
  <AppLoader v-if="loading"></AppLoader>
  <AppPage back title="Заявка" v-else-if="request">
    <p><strong>Имя владельца</strong>: {{ request.fio }}</p>
    <p><strong>Телефон владельца</strong>: {{ request.phone }}</p>
    <p><strong>Сумма</strong>: {{ currency(request.amount) }}</p>
    <p><strong>Cтатус</strong>: <AppStatus :type="request.status" /></p>

    <div class="form-control">
      <label for="status">Статус</label>
      <select id="status" v-model="status">
        <option value="done">Завершён</option>
        <option value="canceled">Отменён</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>

    <button class="btn danger" @click="remove">Удалить</button>
    <button class="btn primary" @click="update" :disabled="!hasChanges">
      Обновить
    </button>
  </AppPage>
  <h3 class="text-white text-center" v-else>Заявки с {{ id }} нет.</h3>
</template>
<script>
import AppPage from "../components/ui/AppPage.vue";
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import AppLoader from "../components/ui/AppLoader.vue";
import AppStatus from "../components/ui/AppStatus.vue";
import currency from "../utils/currency";

export default {
  components: { AppPage, AppLoader, AppStatus },
  setup() {
    const loading = ref(true);
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const request = ref({});
    const status = ref();
    const id = route.params.id;

    onMounted(async () => {
      loading.value = true;
      request.value = await store.dispatch("request/loadOne", id);
      status.value = request.value.status;
      loading.value = false;
      console.log(request.value);
    });

    const remove = async () => {
      await store.dispatch("request/remove", id);
      router.push("/");
    };

    const update = async () => {
      const data = { ...request.value, status: status.value, id };
      await store.dispatch("request/update", data);
      request.value.status = status.value;
    };

    const hasChanges = computed(() => request.value.status != status.value);
    return {
      loading,
      request,
      id,
      currency,
      remove,
      status,
      hasChanges,
      update,
    };
  },
};
</script>
