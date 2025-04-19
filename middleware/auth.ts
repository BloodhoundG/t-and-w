import { useUsers } from '~/stores/users';

export default defineNuxtRouteMiddleware(to => {
    // Так как далее будет использован localStorage нужно отсечь выполнение кода на стороне сервера
    if (import.meta.client) {
        // Происходит попытка найти данные авторизации пользователя в localStorage
        const authData = localStorage.getItem('authData');

        // Выполнить код если конечный путь перехода '/'
        if (to.path === '/') {
            // Если пользователь ранее был авторизован, то:
            if (authData) {
                // Импортируются данные по всем пользователям
                const usersStore = useUsers();

                const { users } = storeToRefs(usersStore);

                // Парсятся данные авторизации из localStorage
                const userAuthData = JSON.parse(authData);

                // Поиск пользователя по данным из localStorage среди всех существующих пользователей
                const userInDataBase = users.value.find(
                    user =>
                        user.credentials?.username === userAuthData.login &&
                        user.credentials?.passphrase === userAuthData.password
                );

                // Если такой пользователь был найден значит пользователь существует в БД и авторизован
                if (userInDataBase) {
                    // Выполнить переход на страницу аккаунта
                    return navigateTo('/account');
                }
            }
        }

        // Выполнить код если конечный путь перехода '/account' и пользователь не авторизован
        if (to.path === '/account' && !authData) {
            return navigateTo('/');
        }
    }
});
