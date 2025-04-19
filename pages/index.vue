<script setup lang="ts">
import { useUsers } from '~/stores/users';

const usersStore = useUsers();

const { users } = storeToRefs(usersStore);

// Булево значения для отображения ошибки
const isError = ref(false);

// Реактивный объект данных которые вводит пользователь
const authData = ref({
    login: '',
    password: '',
});

// Функция вызывается при клике на кнопку "Войти"
const onAuth = () => {
    // Выполняется поиск объекта пользователя по введённому логину и паролю
    const currentUser = users.value.find(
        user =>
            user.credentials?.username === authData.value.login &&
            user.credentials.passphrase === authData.value.password
    );

    // Если введённые пользователем данные не верные
    if (!currentUser) {
        // Выводится ошибка
        isError.value = true;

        // После задержки ошибка удаляется
        setTimeout(() => {
            isError.value = false;
        }, 2000);

        return;
    }

    // Запись данных в localStorage
    localStorage.setItem('authData', JSON.stringify(authData.value));

    // Перенаправление на страницу аккаунта
    navigateTo('/account');
};

definePageMeta({
    middleware: 'auth',
});
</script>

<template>
    <div class="page-index">
        <div class="container">
            <h1 class="page-index__title">Аутентификация</h1>
            <form class="page-index__form" @submit.prevent="onAuth">
                <label class="page-index__label">
                    Логин :
                    <input v-model="authData.login" type="text" />
                </label>

                <label class="page-index__label">
                    Пароль :
                    <input v-model="authData.password" type="text" />
                </label>

                <button class="page-index__submit" :disabled="isError" type="submit">Войти</button>
            </form>

            <Teleport to="body">
                <Transition name="slide">
                    <div v-if="isError" class="alert">Введены неверные данные авторизации. Попробуйте ещё раз</div>
                </Transition>
            </Teleport>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.page-index {
    z-index: 1;
    padding: 30px 0;

    &__title {
        padding: 0 0 30px;
    }

    &__form {
        display: grid;

        max-width: 250px;
        gap: 10px;
    }

    &__label {
        display: flex;
        justify-content: space-between;
    }

    &__submit {
        padding: 8px 15px;
        border: none;
        border-radius: 15px;
        background: #01a268;
        color: #fff;
        cursor: pointer;
        transition: opacity 0.5s ease;

        &:hover {
            opacity: 0.8;
        }
    }
}

.alert {
    z-index: 2;
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    padding: 20px;
    border-radius: 10px;
    background: #dcdcdc;
    color: #1e1e1e;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
    transform: translate3d(-50%, -20vh, 0);
}
</style>
