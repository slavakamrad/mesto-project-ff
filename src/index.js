import './pages/index.css';

import { openProfileEditModal, openAddCardModal } from './components/modal'

const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

profileEditButton.addEventListener('click', function(evt){
  openProfileEditModal(evt);
});

addCardButton.addEventListener('click', function(evt){
  openAddCardModal(evt);
});

