import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import { computed, watch } from "vue";
import { useStore } from 'vuex';
import { useRouter } from "vue-router";

export function useLoginForm() {
    const router = useRouter()
    const store = useStore()
    const { handleSubmit, isSubmitting, submitCount } = useForm();

    const { value: email, errorMessage: eError, handleBlur: eBlur } = useField(
        "email",
        yup
            .string()
            .trim()
            .required("Введите email")
            .email("Введите Корректный email")
    );

    const {
        value: password,
        errorMessage: pError,
        handleBlur: pBlur,
    } = useField(
        "password",
        yup
            .string()
            .trim()
            .required("Введите пароль")
            .min(6, "Длина должна быть больше 6")
    );

    const tooManyAttempts = computed(() => submitCount.value >= 3);
    function use() {
        console.log(tooManyAttempts.value);
    }

    const onSubmit = handleSubmit(async (val) => {
        try {
            console.log(val)
            await store.dispatch('auth/login', val)
            router.push('/')
        } catch (e) { }
    });

    watch(tooManyAttempts, (val) => {
        if (val) {
            setTimeout(() => (submitCount.value = 0), 1500);
        }
    });

    return {
        email,
        password,
        eError,
        pError,
        eBlur,
        pBlur,
        onSubmit,
        tooManyAttempts,
        isSubmitting,
        submitCount,
        use,
    };
};