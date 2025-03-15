const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function deleteCard(card) {
  card.remove();
}

function addCards(item, deleteCard) {
  const card = cardTemplate.querySelector(".places__item").cloneNode(true);
  card.querySelector(".card__title").textContent = item.name;
  card.querySelector(".card__image").src = item.link;
  card
    .querySelector(".card__delete-button")
    .addEventListener("click", function () {
      deleteCard(card);
    });
  return card;
}

initialCards.forEach((item) => {
  placesList.append(addCards(item, deleteCard));
});
