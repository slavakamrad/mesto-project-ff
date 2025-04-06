import { addCards, deleteCard } from "./card";
import { placesList } from "./card";


const modalEditprofile = document.querySelector(".popup.popup_type_edit");
const modalAddCard = document.querySelector(".popup.popup_type_new-card");
const modalImage = document.querySelector(".popup.popup_type_image");

const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;


function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  modal.removeEventListener('click', handleOverlayClick);
  document.removeEventListener('keydown', handleEscape);
};

function openModal(modal) {
  modal.classList.add("popup_is-opened");
  modal.addEventListener('click', handleOverlayClick);
  document.addEventListener('keydown', handleEscape);
};

function handleFormEditprofileSubmit(evt) {
  evt.preventDefault(); 
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(modalEditprofile);
};

formElement.addEventListener('submit', handleFormEditprofileSubmit); 

export function openProfileEditModal(evt) {  
  const button = modalEditprofile.querySelector(".popup__close");
  openModal(modalEditprofile);
  button.addEventListener('click', () => closeModal(modalEditprofile));
};

export function openAddCardModal(evt) { 
  const popupForm = modalAddCard.querySelector(".popup__form");
  const button = modalAddCard.querySelector(".popup__close");
  const cardName = popupForm.querySelector('.popup__input_type_card-name');
  const link = popupForm.querySelector('.popup__input_type_url');  
  openModal(modalAddCard);
  button.addEventListener('click', () => closeModal(modalAddCard));
  popupForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const item = {
      name: cardName.value,
      link: link.value
    };
    // placesList.append(addCards(item, deleteCard));

    const card = addCards(item, deleteCard);
    placesList.prepend(card);

    closeModal(modalAddCard);
    popupForm.reset();
  });
};

export function openImageModal(evt) {
 
  const content = modalImage.querySelector(".popup__content_content_image");
  const button = content.querySelector(".popup__close");
  const image = content.querySelector(".popup__image");
  image.src = evt.target.src;
  image.alt = evt.target.alt;
  const imageCaption = content.querySelector(".popup__caption");
  imageCaption.textContent = image.alt;
  openModal(modalImage);
  button.addEventListener('click', () => closeModal(modalImage));
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");
    if (openedModal) closeModal(openedModal);
  };
};

function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  };
};
 