export { NotFoundError } from './NotFoundError.js';
export { ConflictError } from './ConflictError.js';
export { ForbiddenError } from './ForbiddenError.js';
export { BadRequestError } from './BadRequestError.js';
export { UnauthorizedError } from './UnauthorizedError.js';

export const notUniqueErrorCode = 11000;

export const errMessages = {
  app: {
    notURL: 'Некорректный формат ссылки',
    notEmail: 'Некорректный адрес электронной почты',
    pageNotFound: 'Страница не найдена',
    unauthorized: 'Необходима авторизация',
    unknown: 'Неизвестная ошибка',
    rateLimit: 'Превышен лимит запросов с вашего адреса',
  },
  user: {
    notFound: 'Пользователь не найден',
    conflict: 'Пользователь с такой почтой уже существует',
    incorrect: 'Неправильная почта или пароль',
    badRequest: 'Некорректные данные для пользователя',
  },
  movie: {
    notFound: 'Фильм не найден',
    forbidden: 'Отсутствуют права доступа к фильму',
    badRequest: 'Некорректные данные для фильма',
  },
};
