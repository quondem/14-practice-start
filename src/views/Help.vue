<template>
  <AppPage back title="Помощь">
    <QuestionItem v-for="(q, idx) in questions" :key="q.title" :question="q" />
  </AppPage>
</template>

<script>
import QuestionItem from "../components/question/QuestionItem.vue";
import AppPage from "../components/ui/AppPage.vue";

export default {
  components: { AppPage, QuestionItem },
  setup() {
    const questions = [
      {
        title: "Что есть в данной системе?",
        text: "Тут есть всё чтобы взаимодействовать с заявками.",
      },
      {
        title: "Как работает авторизация?",
        text: "Авторизация работает через Firebase.",
      },
    ];
    return { questions };
  },
};
</script>
