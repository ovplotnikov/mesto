import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector("form");
    this._inputList = this._form.querySelectorAll("input");
    this._submitButton = this._popup.querySelector(".popup__save-button");
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setButtonText(text) {
    this._submitButton.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._submitCallback(event, this._getInputValues());
    });
  }

  setInputValues(inputValues) {
    this._inputList.forEach((input) => {
      if (inputValues.hasOwnProperty(input.name)) {
        input.value = inputValues[input.name];
      }
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  getPopupElement() {
    return this._popup;
  }
}
