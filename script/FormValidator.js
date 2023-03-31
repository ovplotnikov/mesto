export default class FormValidator {
    constructor(validationConfig, formElement) {
      this._formElement = formElement;
      this._inputSelector = validationConfig.inputSelector;
      this._submitButtonSelector = validationConfig.submitButtonSelector;
      this._inactiveButtonClass = validationConfig.inactiveButtonClass;
      this._inputErrorClass = validationConfig.inputErrorClass;
      this._errorClass = validationConfig.errorClass;
      this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      this._submitButton = this._formElement.querySelector(this._submitButtonSelector);

    }
  
    enableValidation() {
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
    }
  
    _setEventListeners() {
      this._toggleButtonState(this._inputList, this._submitButton);
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState(this._inputList, this._submitButton);
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
  
    _toggleButtonState(inputList, buttonElement) {
      if (this._hasInvalidInput(inputList)) {
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.disabled = true;
      } else {
        buttonElement.classList.remove(this._inactiveButtonClass);
        buttonElement.disabled = false;
      }
    }

  
    _hasInvalidInput(inputList) {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
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