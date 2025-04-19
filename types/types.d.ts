/**
 * Интерфейс объекта данных пользователя
 */
interface IUser {
    name?: string;
    surname?: string;
    credentials?: {
        username?: string;
        passphrase?: string;
    };
    active?: boolean;
    created?: string;
    _comment?: string;
}

/**
 * Интерфейс объекта данных продукта
 */
interface IProduct {
    id?: number;
    status?: number;
    date_created?: string;
    name?: string;
    cost?: number;
    is_sale?: boolean;
}
