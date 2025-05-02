import { cardDelete,  like,  dislike } from './api'
const cardTemplate = document.querySelector("#card-template").content;


// Экспортируемая функция для удаления карточки
export function deleteCard(card, id) {   
  cardDelete(id)
  .then(() => {
    card.remove();
  })
  .catch((err) => {
    console.log(err);
  });}


// Экспортируемая функция для лайка карточки
// export function likeCard(evt) {
//   evt.target.classList.toggle("card__like-button_is-active");
// }
export function likeCard(evt, likeButton, likeCount, item, userData) {
  evt.stopPropagation();
  // evt.target.classList.toggle("card__like-button_is-active");
  const existMyLike = item.likes.some((like) => like._id === userData._id);
  const cardLikeFunction = existMyLike ? dislike : like;
  cardLikeFunction(item._id)
    .then((res) => {
      likeButton.classList.toggle("card__like-button_is-active");
      item.likes = res.likes;
      likeCount.textContent = res.likes.length;
    })
    .catch((err) => console.log(err));
}



// Экспортируемая функция для создания карточки
export function addCards(item, userData, deleteCard, likeCard, openImageModal) {
  
  const card = cardTemplate.querySelector(".places__item").cloneNode(true);
  card.querySelector(".card__title").textContent = item.name;
  const cardImage = card.querySelector(".card__image");
  const cardLikeCount = card.querySelector(".like__count"); 
  const likeButton = card.querySelector(".card__like-button");
  
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardLikeCount.textContent = item.likes.length;

  const isMyCard = item.owner._id === userData._id;
  const existMyLike = item.likes.some((like) => like._id === userData._id)
  const cardDeleteButton = card.querySelector(".card__delete-button");
  if (!isMyCard) {
    cardDeleteButton.classList.add("card__delete-button-inactive");
  }  

  if (existMyLike) {
    likeButton.classList.add("card__like-button_is-active");
  }

  card
    .querySelector(".card__delete-button")
    .addEventListener("click", function () {
      deleteCard(card, item._id);
    });
  cardImage.addEventListener("click", function (evt) {
    openImageModal(evt);
  });

  likeButton.addEventListener("click", (evt) => likeCard(evt, likeButton, cardLikeCount, item, userData));

  return card;
}
