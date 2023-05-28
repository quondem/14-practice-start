<template>
  <AppLoader v-if="loading" />
  <AppPage title="Список заявок" v-else>
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>
    <RequestFilter v-model="filter" />
    <RequestTable :requests="requests"></RequestTable>

    <teleport to="body">
      <AppModal v-if="modal" title="Создать заявку" @close="modal = false">
        <RequestModal @created="modal = false"></RequestModal>
      </AppModal>
    </teleport>
  </AppPage>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import AppPage from "../components/ui/AppPage.vue";
import RequestTable from "../components/request/RequestTable.vue";
import AppModal from "../components/ui/AppModal.vue";
import RequestModal from "../components/request/RequestModal.vue";
import AppLoader from "../components/ui/AppLoader.vue";
import RequestFilter from "../components/request/RequestFilter.vue";

export default {
  components: {
    AppPage,
    RequestTable,
    AppModal,
    RequestModal,
    AppLoader,
    RequestFilter,
  },
  setup() {
    const store = useStore();
    const modal = ref(false);
    const loading = ref(false);
    const filter = ref({});

    const requests = computed(() =>
      store.getters["request/requests"]
        .filter((request) => {
          if (filter.value.name) {
            return request.fio.includes(filter.value.name);
          }
          return request;
        })
        .filter((request) => {
          if (filter.value.status) {
            return request.status == filter.value.status;
          }
          return request;
        })
    );

    onMounted(async () => {
      loading.value = true;
      await store.dispatch("request/load");
      loading.value = false;
    });

    return { modal, requests, loading, filter };
  },
};
</script>
