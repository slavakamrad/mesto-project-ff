import { openImageModal } from './modal'
import { initialCards } from '../components/cards';
const cardTemplate = document.querySelector("#card-template").content;
export const placesList = document.querySelector(".places__list");

export function deleteCard(card) {
  card.remove();
}

export function likeCard(evt){
  evt.target.classList.toggle('card__like-button_is-active')
}

export function addCards(item, deleteCard, likeCard) {
  const card = cardTemplate.querySelector(".places__item").cloneNode(true);
  card.querySelector(".card__title").textContent = item.name;
  const cardImage = card.querySelector(".card__image");
  cardImage.src = item.link;
  cardImage.alt = item.name;
  card
    .querySelector(".card__delete-button")
    .addEventListener("click", function () {
      deleteCard(card);
    });
  cardImage.addEventListener("click", function (evt){
    openImageModal(evt);
  })

  card.querySelector('.card__like-button').addEventListener("click", likeCard);

  return card;
};

initialCards.forEach((item) => {
  placesList.append(addCards(item, deleteCard, likeCard));
});
