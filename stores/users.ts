import { defineStore } from 'pinia';

export const useUsers = defineStore('usersData', () => {
    const users = ref<IUser[]>([
        {
            name: 'David',
            surname: 'Jones',
            credentials: {
                username: 'david.jones@creds.com',
                passphrase: '52ccca432ab28afd90969084c061b23c',
            },
            active: true,
            created: '03.03.2025 10:00:21',
            _comment: "Пользователь David Jones с логином david.jones@creds.com и паролем '8u3&s-1uda'",
        },
        {
            name: 'Samantha',
            surname: 'Robertson',
            credentials: {
                username: 'sam.robertson@creds.com',
                passphrase: 'cefdd8f05b00320c8ff42f8734f96633',
            },
            active: true,
            created: '03.03.2025 10:28:13',
            _comment: "Пользователь Samantha Robertson с логином sam.robertson@creds.com и паролем '0k91sa639'",
        },
        {
            name: 'Nicholas',
            surname: 'Crew',
            credentials: {
                username: 'nic.crew@creds.com',
                passphrase: '23c2b519b1e2cd4bbaf5f68f58024785',
            },
            active: false,
            created: '01.03.2025 12:56:28',
            _comment: "Пользователь Nicholas Crew с логином nic.crew@creds.com и паролем '1atr48asf03'",
        },
    ]);

    // По заданию требуется создать именно JSON объект как источник данных
    const jsonData = ref(
        JSON.stringify([
            {
                id: 9,
                status: 200,
                date_created: '2013-04-17',
                name: 'Бокорезы',
                cost: 111,
                is_sale: false,
            },
            {
                id: 1,
                status: 200,
                date_created: '2011-04-11',
                name: 'Отвёртка',
                cost: 222,
                is_sale: true,
            },
            {
                id: 8,
                status: 200,
                date_created: '2012-04-17',
                name: 'УШМ',
                cost: 333,
                is_sale: true,
            },
            {
                id: 6,
                status: 200,
                date_created: '2013-01-17',
                name: 'Ватерпас',
                cost: 444,
                is_sale: true,
            },
            {
                id: 4,
                status: 200,
                date_created: '2014-04-17',
                name: 'Дрель',
                cost: 555,
                is_sale: false,
            },
            {
                id: 5,
                status: 200,
                date_created: '2015-04-17',
                name: 'Перфоратор',
                cost: 666,
                is_sale: true,
            },
            {
                id: 3,
                status: 200,
                date_created: '2014-09-11',
                name: 'Отбойник',
                cost: 777,
                is_sale: false,
            },
            {
                id: 7,
                status: 200,
                date_created: '2017-04-17',
                name: 'Шуруповёрт',
                cost: 888,
                is_sale: true,
            },
            {
                id: 2,
                status: 200,
                date_created: '2018-04-17',
                name: 'Импакт',
                cost: 999,
                is_sale: true,
            },
            {
                id: 0,
                status: 200,
                date_created: '2019-04-17',
                name: 'Бетономешалка',
                cost: 1000,
                is_sale: false,
            },
        ])
    );

    return { users, jsonData };
});
