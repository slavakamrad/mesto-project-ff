import "./pages/index.css";
import { enableValidation, clearValidation } from "./components/validation";
import { openPopup, closePopup } from "./components/modal";
import { addCards, likeCard, deleteCard } from "./components/card";

import {
  getInitialCards,
  getUserData,
  addUserData,
  updateAvatar,
  addNewCard,
  cardDelete,
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
const popupUpdateAvatar = document.querySelector(".popup_type_new-avatar");
const addCardButton = document.querySelector(".profile__add-button");
const avatarUpdateButton = document.querySelector(".profile__update-avatar");
const contentEditAvatar = popupUpdateAvatar.querySelector(".popup__content");
const formEditAvatar = contentEditAvatar.querySelector(".popup__form");
const linkInputAvatar = formEditAvatar.querySelector(".popup__input_type_url");

const popupDeleteCard = document.querySelector(".popup_type_delete");
const popupDeleteCardContent = popupDeleteCard.querySelector(".popup__content");
const popupDeleteCardButton =
  popupDeleteCardContent.querySelector(".popup__button");

const formAddCardButton = formAddCard.querySelector(".popup__button");  
const formEditProfileButton = formEditProfile.querySelector(".popup__button");  
const formEditAvatarButton = formEditAvatar.querySelector(".popup__button");  

let cardToDelete;
let cardIdToDelete;

nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;
 

const closePopupButtons = document.querySelectorAll(".popup__close");
let userData;

// Конфигурация валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Активация валидации
enableValidation(validationConfig);

// 
function renderLoading(button, isLoading) {  
  button.textContent = isLoading ? 'Сохранение...' : 'Сохранить';  
}

// Функция открытия попапа удаления карточки
const openDeletePopup = (card, cardId) => {
  cardToDelete = card;
  cardIdToDelete = cardId;
  openPopup(popupDeleteCard);
};

// Обработчик подтверждения удаления
const handleDeleteConfirm = () => {
   cardDelete(cardIdToDelete)
    .then(() => {
      cardToDelete.remove();
      closePopup(popupDeleteCard);
    })
    .catch((err) => {
      console.log(err);
    });
};

// addEventListener удаления карточки
popupDeleteCardButton.addEventListener("click", handleDeleteConfirm);

// Общий промис для получения данных одновременно о карточкавх и пользователе
Promise.all([getUserData(), getInitialCards()])
  .then(([allUserData, initialCards]) => {
    userData = { ...allUserData };

    // Заполнение профиля данными о пользователе
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.src = userData.avatar;

    // Загрузка всех карточек, которые есть в API
    initialCards.forEach((item) => {
      placesList.append(
        addCards(item, userData, openDeletePopup, likeCard, openImagePopup)
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Закрытие всех модальных окон
closePopupButtons.forEach((button) => {
  button.addEventListener("click", (evt) => {
    const popup = evt.target.closest(".popup");
    closePopup(popup);
  });
});

// EventListener открытия попапа обновления аватара
avatarUpdateButton.addEventListener("click", () => {
  clearValidation(formEditAvatar, validationConfig);
  openPopup(popupUpdateAvatar);
});addCardButton

// EventListener открытия попапа редактирования профиля
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  openPopup(popupEditprofile);
});


// EventListener для открытие попапа добавления карточки
addCardButton.addEventListener("click", () => {
  formAddCard.reset();
  clearValidation(formAddCard, validationConfig);
  openPopup(popupAddCard);
});

// EventListener для отправки формы нового аватара
formEditAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(formEditAvatarButton, true);

  updateAvatar(linkInputAvatar.value)
    .then((data) => {
      profileAvatar.src = data.avatar;
      formEditAvatar.reset();
      closePopup(popupUpdateAvatar);
      
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=>{renderLoading(formEditAvatarButton, false)})
});

// EventListener для отправки формы редактирования профиля
formEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(formEditProfileButton, true);

  addUserData(nameInput.value, jobInput.value)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      // profileAvatar.src = userData.avatar;

      closePopup(popupEditprofile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=>{renderLoading(formEditProfileButton, false)})
});

// EventListener для отправки формы добавления карточки
formAddCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(formAddCardButton, true);
 
  const item = {
    name: cardName.value,
    link: cardLink.value,
  };
  addNewCard(item.name, item.link)
    .then((item) => {
      const card = addCards(
        item,
        userData,
        openDeletePopup,
        likeCard,
        openImagePopup
      );
      placesList.prepend(card);
      formAddCard.reset();

      closePopup(popupAddCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=> {renderLoading(formAddCardButton, false)})
});

// Функция открытия попапа с изображением
function openImagePopup(name, link) {
  picturePopupImage.src = link;
  picturePopupImage.alt = name;
  imageCaption.textContent = name;
  openPopup(popupImage);
}
