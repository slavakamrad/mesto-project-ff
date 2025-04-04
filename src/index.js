import './pages/index.css';
import { initialCards } from './components/cards';
import { openProfileEditModal, openAddCardModal } from './components/modal'
import {addCards, deleteCard} from './components/card'

const placesList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");



initialCards.forEach((item) => {
  placesList.append(addCards(item, deleteCard));
});


profileEditButton.addEventListener('click', function(evt){
  openProfileEditModal(evt);
});

addCardButton.addEventListener('click', function(evt){
  openAddCardModal(evt);
});