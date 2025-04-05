import { addCards, deleteCard } from "./card";
import { placesList } from "./card";

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  modal.removeEventListener('click', handleOverlayClick);
  document.removeEventListener('keydown', handleEscape);
}

function openModal(modal) {
  modal.classList.add("popup_is-opened");
  modal.addEventListener('click', handleOverlayClick);
  document.addEventListener('keydown', handleEscape);
}

export function openProfileEditModal(evt) {
  const modal = document.querySelector(".popup.popup_type_edit");
  const button = modal.querySelector(".popup__close");
  openModal(modal);
  button.addEventListener('click', () => closeModal(modal));
}

export function openAddCardModal(evt) {
  const modal = document.querySelector(".popup.popup_type_new-card");
  const popupForm = modal.querySelector(".popup__form");
  const button = modal.querySelector(".popup__close");
  const cardName = popupForm.querySelector('.popup__input_type_card-name');
  const link = popupForm.querySelector('.popup__input_type_url');  
  openModal(modal);
  button.addEventListener('click', () => closeModal(modal));
  popupForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const item = {
      name: cardName.value,
      link: link.value
    };
    placesList.append(addCards(item, deleteCard));
    closeModal(modal);
    popupForm.reset();
  });
}

export function openImageModal(evt) {
  const modal = document.querySelector(".popup.popup_type_image");
  const content = modal.querySelector(".popup__content_content_image");
  const button = content.querySelector(".popup__close");
  const image = content.querySelector(".popup__image");
  image.src = evt.target.src;
  image.alt = evt.target.alt;
  const imageCaption = content.querySelector(".popup__caption");
  imageCaption.textContent = image.alt;
  openModal(modal);
  button.addEventListener('click', () => closeModal(modal));
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");
    if (openedModal) closeModal(openedModal);
  }
}

function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}