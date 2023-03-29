// конфигурация валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__error_visible'
};

// константа селектора инпута в форме
const inputElement = document.querySelector('.popup__input');


// // функция включения валидации
// function enableValidation(validationConfig) {
//     const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
//     formList.forEach((formElement) => {
//       formElement.addEventListener('submit', (evt) => {
//         evt.preventDefault();
//       });
//       setEventListeners(formElement, validationConfig);
//     });
// }
  
// // функция установки слушателей событий на форму и инпуты в ней
// function setEventListeners(formElement, validationConfig) {
//     const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
//     const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);
//     toggleButtonState(inputList, submitButton, validationConfig);
//     inputList.forEach((inputElement) => {
//       inputElement.addEventListener('input', () => {
//         checkInputValidity(formElement, inputElement, validationConfig);
//         toggleButtonState(inputList, submitButton, validationConfig);
//       });
//     });
// }
  

// // функция проверки валидности инпута в форме и вывода ошибки
// function checkInputValidity(formElement, inputElement, validationConfig) {
//     if (!inputElement.validity.valid) {
//       showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
//     } else {
//       hideInputError(formElement, inputElement, validationConfig);
//     }
// }
  

// // функция переключения состояния кнопки Submit в форме в зависимости от валидности инпутов
// function toggleButtonState(inputList, buttonElement, validationConfig) {
//     if (hasInvalidInput(inputList)) {
//       buttonElement.classList.add(validationConfig.inactiveButtonClass);
//       buttonElement.disabled = true;
//     } else {
//       buttonElement.classList.remove(validationConfig.inactiveButtonClass);
//       buttonElement.disabled = false;
//     }
// }
  

// // функция проверки валидности инпутов в форме
// function hasInvalidInput(inputList) {
//     return inputList.some((inputElement) => !inputElement.validity.valid);
// }
  

// // функция показа ошибки валидации инпута в форме
// function showInputError(formElement, inputElement, errorMessage, validationConfig) {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.add(validationConfig.inputErrorClass);
//     errorElement.textContent = errorMessage;
//     errorElement.classList.add(validationConfig.errorClass);
// }
  

// // функция скрытия ошибки валидации инпута в форме 
// function hideInputError(formElement, inputElement, validationConfig) {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.remove(validationConfig.inputErrorClass);
//     errorElement.textContent = '';
//     errorElement.classList.remove(validationConfig.errorClass);
// }

// // вызов функции включения валидации на форму
// enableValidation(validationConfig);
  

export default class FormValidator {
    constructor(validationConfig, formElement) {
      this._formElement = formElement;
      this._inputSelector = validationConfig.inputSelector;
      this._submitButtonSelector = validationConfig.submitButtonSelector;
      this._inactiveButtonClass = validationConfig.inactiveButtonClass;
      this._inputErrorClass = validationConfig.inputErrorClass;
      this._errorClass = validationConfig.errorClass;
    }
  
    enableValidation() {
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
    }
  
    _setEventListeners() {
      const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      const submitButton = this._formElement.querySelector(this._submitButtonSelector);
      this._toggleButtonState(inputList, submitButton);
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState(inputList, submitButton);
        });
      });
    }
  
    _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    }
  
    _toggleButtonState(inputList, submitButton) {
      if (this._hasInvalidInput(inputList)) {
        submitButton.classList.add(this._inactiveButtonClass);
        submitButton.disabled = true;
      } else {
        submitButton.classList.remove(this._inactiveButtonClass);
        submitButton.disabled = false;
      }
    }
  
    _hasInvalidInput(inputList) {
      return inputList.some((inputElement) => !inputElement.validity.valid);
    }
  
    _showInputError(inputElement, errorMessage) {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
    }
  
    _hideInputError(inputElement) {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.textContent = '';
      errorElement.classList.remove(this._errorClass);
    }
  }