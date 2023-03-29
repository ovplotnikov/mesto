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