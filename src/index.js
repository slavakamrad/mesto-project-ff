import "./pages/index.css";

import { openPopup, closePopup } from "./components/modal";
import { addCards, likeCard, deleteCard } from "./components/card";

import {
  getInitialCards,
  getUserData,
  addUserData,
  addNewCard,
} from "./components/api";

const placesList = document.querySelector(".places__list");

const popupAddCard = document.querySelector(".popup_type_new-card");
const formAddCard = popupAddCard.querySelector(".popup__form");
const cardName = formAddCard.querySelector(".popup__input_type_card-name");
const cardLink = formAddCard.querySelector(".popup__input_type_url");

const popupImage = document.querySelector(".popup_type_image");
const contentPopupImage = popupImage.querySelector(
  ".popup__content_content_image"
);
const picturePopupImage = contentPopupImage.querySelector(".popup__image");
const imageCaption = contentPopupImage.querySelector(".popup__caption");

const popupEditprofile = document.querySelector(".popup_type_edit");
const contentEditProfile = popupEditprofile.querySelector(".popup__content");
const formEditProfile = contentEditProfile.querySelector(".popup__form");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__avatar");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupUpdateAvatar = document.querySelector(".popup_type_new-avatar")
const addCardButton = document.querySelector(".profile__add-button");
const avatarUpdateButton = document.querySelector(".profile__update-avatar")

nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

const closePopupButtons = document.querySelectorAll(".popup__close");

// Закрытие всех модальных окон
closePopupButtons.forEach((button) => {
  button.addEventListener("click", (evt) => {
    const popup = evt.target.closest(".popup");
    closePopup(popup);
  });
});

// EventListener открытия попапа редактирования профиля
avatarUpdateButton.addEventListener("click", () => {
  
  openPopup(popupUpdateAvatar);
});

// EventListener открытия попапа обновления аватара
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEditprofile);
});

// EventListener открытия попапа картинки
placesList.addEventListener("click", (evt) => {
  const popupImg = evt.target.closest(".card__image");
  if (!popupImg) return;
  openImagePopup(popupImg.alt, popupImg.src);
});

// EventListener для открытие попапа добавления карточки
addCardButton.addEventListener("click", () => {
  formAddCard.reset();
  openPopup(popupAddCard);
});

// EventListener для отправки формы редактирования профиля
formEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  addUserData(nameInput.value, jobInput.value)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileAvatar.src = userDataValue.avatar;

      closePopup(popupEditprofile);
    })
    .catch((err) => {
      console.log(err);
    });
});

// EventListener для отправка формы добавления карточки
formAddCard.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const item = {
    name: cardName.value,
    link: cardLink.value,
  };
  addNewCard(item.name, item.link)
    .then((item) => {
      const card = addCards(item, userData, deleteCard, likeCard, openImagePopup);
      placesList.prepend(card);
      formAddCard.reset();
      closePopup(popupAddCard);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Функция открытия попапа с изображением
function openImagePopup(name, link) {
  picturePopupImage.src = link;
  picturePopupImage.alt = name;
  imageCaption.textContent = name;
  openPopup(popupImage);
}

Promise.all([getUserData(), getInitialCards()])
  .then(([userData, initialCards]) => {
    userData = { ...userData }; 
    // Заполнение профиля данными о пользователе
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.src = userData.avatar;
  
    // Загрузка всех карточек, которые есть в API
    initialCards.forEach((item) => {
      placesList.append(addCards(item, userData, deleteCard, likeCard, openImagePopup));
    });
  })
  .catch((err) => {
    console.log(err);
  });
