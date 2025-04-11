// Экспортируемая функция открытия для popup
export function openPopup(modal) {
  modal.classList.add("popup_is-opened");
  modal.addEventListener("click", handleOverlayClick);
  document.addEventListener("keydown", handleEscape);
}

// Экспортируемая функция закрытия для popup
export function closePopup(modal) {
  modal.classList.remove("popup_is-opened");
  modal.removeEventListener("click", handleOverlayClick);
  document.removeEventListener("keydown", handleEscape);
}

// Функция закрытия для popup по кнопке Esc на клавиатуре 
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");
    if (openedModal) closePopup(openedModal);
  }
}

// Функция закрытия для popup по клику на Overlay
function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

