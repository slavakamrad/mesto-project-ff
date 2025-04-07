import "./pages/index.css";
import { placesList } from "./components/card";
import {
  openProfileEditModal,
  openAddCardModal,
  modalAddCard,
  closeModal,
} from "./components/modal";
import { addCards, likeCard, deleteCard } from "./components/card";

const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_new-card");

profileEditButton.addEventListener("click", function (evt) {
  openProfileEditModal(evt);
});

addCardButton.addEventListener("click", function (evt) {
  openAddCardModal(evt);
});

popupAddCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardName = popupAddCard.querySelector(".popup__input_type_card-name");
  const form = popupAddCard.querySelector(".popup__form");
  const link = popupAddCard.querySelector(".popup__input_type_url");
  const item = {
    name: cardName.value,
    link: link.value,
  };

  const card = addCards(item, deleteCard, likeCard);
  placesList.prepend(card);
  form.reset();
  closeModal(popupAddCard);
});
