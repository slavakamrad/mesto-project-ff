// Конфигурация подключения к API
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-37",
  headers: {
    authorization: "8d811435-456e-4d70-85d0-1653bb60ada6",
    "Content-Type": "application/json",
  },
};

// Проверка ответа сервера 
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
} 

// Экспортируемая функция получения карточек из API
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
};

// Экспортируемая функция получения данных о пользователе из API
export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then(checkResponse);
};

// Экспортируемая функция обновления данных о пользователе в API
export const addUserData = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ name, about }),
  }).then(checkResponse);
};

// Экспортируемая функция обновления аватара
export const updateAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar }),
  }).then(checkResponse);
};

// Экспортируемая функция добавления новой карточки в API
export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ name, link }),
  }).then(checkResponse);
};

// Экспортируемая функция удаление карточки из API
export const cardDelete = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};

// Экспортируемая функция добавления like карточки 
export const like = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
};

// Экспортируемая функция удаление like карточки
export const dislike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};