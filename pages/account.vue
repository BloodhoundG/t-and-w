<script setup lang="ts">
import { useUsers } from '~/stores/users';

const usersStore = useUsers();

const { jsonData } = storeToRefs(usersStore);

// Объект хранит ключи заголовков и их значения на русском
const tableHeaders = {
    id: 'ID',
    status: 'Статус',
    date_created: 'Дата',
    name: 'Название продукта',
    cost: 'Цена продукта',
    is_sale: 'Акция',
};

// Текущий выбранный фильтр
const currentTableDataFilter = ref(Object.keys(tableHeaders)[0]);

// Активность фильтра по дате
const dateSortFilter = ref(false);

// Имитация получения запроса, как указано в задании
const { data: tableData } = await useAsyncData<IProduct[]>('tableData', async () => {
    return fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка запроса');
            }

            return JSON.parse(jsonData.value);
        })
        .catch(error => console.error(error));
});

// Порядок сортировки
const sortOrder = ref<'asc' | 'desc'>('asc');

// Вычисляемое значение, которое возвращает отсортированные данные таблицы
const sortTableData = computed(() => {
    // Если данные не пришли после запроса вернуть пустой массив
    if (!tableData.value) return [];

    // Создание копии массива, чтобы не работать с реактивными данными внутри computed
    const data = [...tableData.value];

    // Сортировка по выбранному фильтру
    data.sort((a, b) => {
        const typedKey = currentTableDataFilter.value as keyof IProduct;
        const valueA = a[typedKey];
        const valueB = b[typedKey];

        if (valueA === undefined || valueB === undefined) {
            return 0;
        }

        let comparison = 0;

        if (typeof valueA === 'number' && typeof valueB === 'number') {
            comparison = valueA - valueB;
        } else if (typeof valueA === 'string' && typeof valueB === 'string') {
            comparison = valueA.localeCompare(valueB);
        } else if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
            comparison = valueA === valueB ? 0 : valueA ? 1 : -1;
        }

        return sortOrder.value === 'asc' ? comparison : -comparison;
    });

    // Дополнительная сортировка по дате
    if (dateSortFilter.value) {
        data.sort((a, b) => {
            const valueA = a.date_created;
            const valueB = b.date_created;

            if (valueA && valueB) {
                const comparison = Date.parse(valueA) - Date.parse(valueB);

                return sortOrder.value === 'asc' ? comparison : -comparison;
            }

            return 0;
        });
    }

    return data;
});

// Вычисляемое значение доступных селектов фильтра с исключением даты,
// так как за сортировку по дате будет отвечать отдельное поле
const selectItems = computed(() => {
    const { date_created, ...otherHeaders } = tableHeaders;

    return otherHeaders;
});

definePageMeta({
    middleware: 'auth',
});
</script>

<template>
    <div class="page-account">
        <div class="container">
            <h1>Аккаунт</h1>

            <div class="page-account__table-wrapper">
                <div class="page-account__filters-wrapper">
                    <div class="page-account__filters">
                        <label class="page-account__date-filter">
                            Сортировать по дате
                            <input v-model="dateSortFilter" type="checkbox" />
                        </label>

                        <select class="page-account__attribute-filter" v-model="currentTableDataFilter">
                            <option v-for="(header, key, index) in selectItems" :key="index" :value="key">
                                {{ header }}
                            </option>
                        </select>
                    </div>

                    <select class="page-account__sort-filter" v-model="sortOrder">
                        <option value="asc">А-Б</option>
                        <option value="desc">Б-А</option>
                    </select>
                </div>

                <table class="page-account__table">
                    <thead>
                        <tr>
                            <th v-for="(header, index) in tableHeaders" :key="index">{{ header }}</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="item in sortTableData" :key="item.id">
                            <td>{{ item.id }}</td>
                            <td>{{ item.status }}</td>
                            <td>{{ item.date_created }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.cost }}</td>
                            <td>{{ item.is_sale ? 'АКЦИЯ!!!' : 'Без акции' }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.page-account {
    z-index: 1;
    padding: 30px 0;

    &__filters-wrapper {
        display: flex;
        justify-content: center;
        gap: 10px;
        padding: 10px 20px 30px;
    }

    &__sort-filter {
        padding: 15px;
        background: #01a268;
        border: none;
        border-radius: 5px;
        color: #fff;
        outline: none;
        cursor: pointer;

        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
    }

    &__date-filter {
        display: flex;
        align-items: center;
        gap: 10px;
        min-height: 40px;
        padding: 5px 10px;
        background: #01a268;
        border-radius: 5px;
        user-select: none;
        cursor: pointer;
    }

    &__attribute-filter {
        position: relative;
        padding: 5px 10px;
        min-height: 40px;
        background: #01a268;
        border: none;
        border-radius: 5px;
        color: #fff;
        outline: none;
        cursor: pointer;

        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;

        &::before {
            content: 'qwe';
            position: absolute;
            width: 100px;
            height: 100px;
            background: red;
        }
    }

    &__filters {
        display: grid;
        gap: 5px;
    }

    &__table {
        width: 100%;
        border-collapse: collapse;

        thead {
            th {
                padding: 15px;
                border: 1px solid #fff;
                background: #01a268;
            }
        }

        tbody {
            tr:nth-child(even) {
                background: #7cffd07f;
            }

            td {
                padding: 15px;
                text-align: center;
                border: 1px solid #fff;
            }
        }
    }
}
</style>
