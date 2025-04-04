import { addCards, deleteCard } from "./card";
import { placesList } from "./card";

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}


export function openProfileEditModal(evt) {
  const modal = document.querySelector(".popup.popup_type_edit");
  const content = modal.querySelector(".popup__content");
  const button = content.querySelector(".popup__close");
  modal.classList.add("popup_is-opened");
  button.addEventListener('click', ()=> closeModal(modal))

}

export function openAddCardModal(evt) {
  const modal = document.querySelector(".popup.popup_type_new-card");
  const content = modal.querySelector(".popup__content");
  const button = content.querySelector(".popup__close");
  const popupForm = content.querySelector(".popup__form");
  const popupButton = popupForm.querySelector('.button.popup__button');
  const cardName = popupForm.querySelector('.popup__input.popup__input_type_card-name');
  const link = popupForm.querySelector('.popup__input.popup__input_type_url');
  const item = {link: link.value, name: cardName};
  modal.classList.add("popup_is-opened");
  button.addEventListener('click', ()=> closeModal(modal));

  popupButton.addEventListener('click', (item)=>placesList.append(addCards(item, deleteCard)));
}

export function openImageModal(evt) {
  const modal = document.querySelector(".popup.popup_type_image");
  const content = modal.querySelector(".popup__content.popup__content_content_image");
  const button = content.querySelector(".popup__close");
  const image = content.querySelector(".popup__image");
  image.src = evt.target.src;
  image.alt = evt.target.alt;
  const imageCaption = content.querySelector(".popup__caption");
  imageCaption.textContent = image.alt;
  modal.classList.add("popup_is-opened");
  button.addEventListener('click', ()=> closeModal(modal))
}
