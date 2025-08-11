// Основные настройки приложения
export const APP_CONFIG = {
  APP_NAME: "BookStore",
  API_BASE_URL: "http://localhost:5000/api",
  DEFAULT_BOOK_COVER: "/default-book-cover.jpg",
};

// Категории книг
export const BOOK_CATEGORIES = [
  "Фантастика",
  "Детектив",
  "Роман",
  "Научная литература",
  "Биография",
  "История",
  "Поэзия",
  "Детская литература",
  "Учебная литература",
  "Бизнес",
  "Психология",
  "Фэнтези",
  "Ужасы",
  "Приключения",
  "Классика",
];

// Периоды аренды
export const RENTAL_PERIODS = [
  { value: "2 weeks", label: "2 недели", multiplier: 1 },
  { value: "1 month", label: "1 месяц", multiplier: 2 },
  { value: "3 months", label: "3 месяца", multiplier: 4 },
];

// Роли пользователей
export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
};

// Сообщения об ошибках
export const ERROR_MESSAGES = {
  DEFAULT: "Произошла ошибка. Пожалуйста, попробуйте позже.",
  AUTH: {
    INVALID_CREDENTIALS: "Неверный email или пароль",
    UNAUTHORIZED: "Требуется авторизация",
    FORBIDDEN: "Доступ запрещен",
  },
  BOOKS: {
    NOT_FOUND: "Книга не найдена",
    INVALID_DATA: "Некорректные данные книги",
  },
};

// Сообщения об успешных операциях
export const SUCCESS_MESSAGES = {
  BOOK: {
    ADDED: "Книга успешно добавлена",
    UPDATED: "Книга успешно обновлена",
    DELETED: "Книга успешно удалена",
  },
  AUTH: {
    LOGIN: "Вы успешно авторизованы",
    LOGOUT: "Вы вышли из системы",
    REGISTER: "Регистрация прошла успешно",
  },
};

// Валидация
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 6,
  BOOK: {
    TITLE_MIN_LENGTH: 3,
    AUTHOR_MIN_LENGTH: 2,
    YEAR_MIN: 1900,
    YEAR_MAX: new Date().getFullYear(),
    PRICE_MIN: 0,
    PRICE_MAX: 10000,
  },
};

// Локализация (даты, валюты)
export const LOCALE = {
  CURRENCY: "RUB",
  DATE_FORMAT: "dd.MM.yyyy",
  DATE_TIME_FORMAT: "dd.MM.yyyy HH:mm",
};

// Настройки API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    ME: "/auth/me",
  },
  BOOKS: {
    BASE: "/books",
    SEARCH: "/books/search",
    CATEGORIES: "/books/categories",
  },
  ORDERS: {
    BASE: "/orders",
    USER: "/orders/user",
  },
};

// Дефолтные значения для форм
export const DEFAULT_FORM_VALUES = {
  BOOK: {
    title: "",
    author: "",
    category: "",
    year: new Date().getFullYear(),
    price: 0,
    rentPrice: 0,
    cover: "",
    description: "",
  },
  USER: {
    name: "",
    email: "",
    password: "",
  },
};