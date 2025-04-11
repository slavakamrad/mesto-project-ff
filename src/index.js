import "./pages/index.css";

import { openPopup, closePopup } from "./components/modal";
import { addCards, likeCard, deleteCard } from "./components/card";
import { initialCards } from "./components/cards";

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
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

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
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEditprofile);
});

// EventListener для отправка формы добавления карточки
formAddCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const item = {
    name: cardName.value,
    link: cardLink.value,
  };
  const card = addCards(item, deleteCard, likeCard, openImagePopup);
  placesList.prepend(card);
  formAddCard.reset();
  closePopup(popupAddCard);
});

// Функция открытия попапа с изображением
function openImagePopup(name, link) {
  picturePopupImage.src = link;
  picturePopupImage.alt = name;
  imageCaption.textContent = name;
  openPopup(popupImage);
}

// Загрузка всех карточек, которые есть в initialCards
initialCards.forEach((item) => {
  placesList.append(addCards(item, deleteCard, likeCard, openImagePopup));
});
