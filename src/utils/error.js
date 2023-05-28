const ERROR_CODES = {
    EMAIL_NOT_FOUND: 'Неверный email',
    INVALID_PASSWORD: 'Неверный пароль',
    auth: 'Вы не авторизованы',
    INVALID_EMAIL: 'Некорректный email'
}

export default function error(code) {
    return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка'
}