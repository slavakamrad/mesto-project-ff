const cardTemplate = document.querySelector("#card-template").content;


// Экспортируемая функция для удаления карточки
export function deleteCard(card) {
  card.remove();
}

// Экспортируемая функция для лайка карточки
export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

// Экспортируемая функция для создания карточки
export function addCards(item, userData, deleteCard, likeCard, openImageModal) {
  const card = cardTemplate.querySelector(".places__item").cloneNode(true);
  card.querySelector(".card__title").textContent = item.name;
  const cardImage = card.querySelector(".card__image");
  const cardLikeCount = card.querySelector(".like__count"); 
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardLikeCount.textContent = item.likes.length;
 
  const isMyCard = item.owner._id === userData._id;
  const cardDeleteButton = card.querySelector(".card__delete-button");
  if (!isMyCard) {
    cardDeleteButton.classList.add("card__delete-button-inactive");
  }  

  card
    .querySelector(".card__delete-button")
    .addEventListener("click", function () {
      deleteCard(card);
    });
  cardImage.addEventListener("click", function (evt) {
    openImageModal(evt);
  });

  card.querySelector(".card__like-button").addEventListener("click", likeCard);

  return card;
}
