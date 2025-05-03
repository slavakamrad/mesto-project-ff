// Конфигурация валидации
// export const validationConfig = {
//   formSelector: ".popup__form",
//   inputSelector: ".popup__input",
//   submitButtonSelector: ".popup__button",
//   inactiveButtonClass: "popup__button_disabled",
//   inputErrorClass: "popup__input_type_error",
//   errorClass: "popup__error_visible",
// };

// Функция состояния кнопки
const setButtonState = (buttonElement, validationConfig, isDisabled) => {
  buttonElement.disabled = isDisabled;
  
  if (isDisabled) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

// Открытие сообщения об ошибке валидаци
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}__input-error`
  );
  if (errorElement) {
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
  }
};

// Сокрытие сообщения об ошибке валидаци
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}__input-error`
  );
  if (errorElement) {
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(validationConfig.errorClass);
  }
};

// Проверка поля на валидность
const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.valueMissing) {
    inputElement.validationMessage;
  } else if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

// Проверка наличия невалидных полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Даективация кнопки отправки формы
const toggleButtonState = (inputList, buttonElement, validationConfig) => {

  setButtonState(buttonElement, validationConfig, hasInvalidInput(inputList));
  // if (hasInvalidInput(inputList)) {
  //   buttonElement.disabled = true;
  //   buttonElement.classList.add(validationConfig.inactiveButtonClass);
  // } else {
  //   buttonElement.disabled = false;
  //   buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  // }
};

// EventListeners проверки валидации
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

// Экспортируемая функция включения валидации всех форм
export const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
};

// Экспортируемая функция отключения валидации
export const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  });

  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
};
