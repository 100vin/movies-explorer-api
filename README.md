# movies-explorer-api
# Бэкенд дипломной работы курса Веб-разработчик Яндекс.Практикум

## Описание дипломной работы
Сервис, в котором можно найти фильмы по запросу и сохранить в личном кабинете.

## Роуты
1. Аутентификация
- POST /signup — создаёт пользователя с переданными в теле email, password и name
- POST /signin — проверяет переданные в теле почту и пароль и возвращает JWT

2. Пользователи
- GET /users/me — возвращает информацию о пользователе (email и имя)
- PATCH /users/me — обновляет информацию о пользователе (email и имя)

3. Фильмы
- GET /movies — возвращает все сохранённые текущим пользователем фильмы
- POST /movies — создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId 
- DELETE /movies/_id — удаляет сохранённый фильм по id

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

## Данные облачного сервера
IP 84.252.137.116

https://api.diploma.100vin.nomoredomains.club
