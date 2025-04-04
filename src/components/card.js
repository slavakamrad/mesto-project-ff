import { openImageModal } from './modal'

const cardTemplate = document.querySelector("#card-template").content;
export const placesList = document.querySelector(".places__list");

export function deleteCard(card) {
  card.remove();
}

export function addCards(item, deleteCard) {
  console.log(item)
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
  return card;
};