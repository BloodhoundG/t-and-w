<script setup lang="ts">
// Булево значения для отображения кнопки "Выйти"
const isAuthorize = ref(false);

// Функция реализует выход из аккаунта
const onClickExitAccount = () => {
    // Удаление из localStore данных авторизации
    localStorage.removeItem('authData');

    // Скрытие кнопки "Выйти"
    isAuthorize.value = false;

    // Редирект на страницу авторизации
    navigateTo('/');
};

// С помощью хука сохраняется отображение кнопки при переходе со страницы авторизации на страницу аккаунта
onUpdated(() => {
    // Если в localStorage есть данные о пользователе
    if (localStorage.getItem('authData')) {
        // Показать кнопку "Выйти"
        isAuthorize.value = true;
    }
});

// С помощью хука сохраняется кнопка "Выйти" при обновлении страницы
onMounted(() => {
    // Если в localStorage есть данные о пользователе
    if (localStorage.getItem('authData')) {
        // Показать кнопку "Выйти"
        isAuthorize.value = true;
    }
});
</script>

<template>
    <div class="layout-default">
        <header class="layout-default__header">
            <div class="container">
                <button v-if="isAuthorize" @click="onClickExitAccount" type="button">Выйти</button>
            </div>
        </header>
        <svg class="layout-default__decorate-curtain" viewBox="0 0 1440 181" xmlns="http://www.w3.org/2000/svg">
            <mask id="path-1-inside-1_414_5526" fill="white"><path d="M0 0H1440V181H0V0Z"></path></mask>
            <path d="M0 0H1440V181H0V0Z" fill="url(#paint0_linear_414_5526)" fill-opacity="0.22"></path>
            <path
                d="M0 2H1440V-2H0V2Z"
                fill="url(#paint1_linear_414_5526)"
                mask="url(#path-1-inside-1_414_5526)"
            ></path>
            <defs>
                <linearGradient
                    id="paint0_linear_414_5526"
                    x1="720"
                    y1="0"
                    x2="720"
                    y2="181"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="currentColor"></stop>
                    <stop offset="1" stop-color="currentColor" stop-opacity="0"></stop>
                </linearGradient>
                <linearGradient
                    id="paint1_linear_414_5526"
                    x1="0"
                    y1="90.5"
                    x2="1440"
                    y2="90.5"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="currentColor" stop-opacity="0"></stop>
                    <stop offset="0.395" stop-color="currentColor"></stop>
                    <stop offset="1" stop-color="currentColor" stop-opacity="0"></stop>
                </linearGradient>
            </defs>
        </svg>
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.layout-default {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #020420ff;
    color: #fff;

    &__decorate-curtain {
        z-index: 1;
        position: absolute;
        top: 4rem;
        color: #00dc82ff;
    }

    &__header {
        > div {
            height: 4rem;

            button {
                display: inline-block;
                padding: 15px 15px;
                height: 100%;
                background: #01a268;
                border: none;
                text-decoration: none;
                color: inherit;
                cursor: pointer;
                transition: opacity 0.5s ease;

                &:hover {
                    opacity: 0.8;
                }
            }
        }
    }
}
</style>
