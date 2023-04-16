import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._confirmButton = this._popup.querySelector(".popup__save-button");
  }

  open(handleConfirm) {
    this._handleConfirm = handleConfirm;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", (event) => {
      event.preventDefault();
      this._handleConfirm();
      this._confirmButton.setAttribute("disabled", ""); // Добавьте эту строку для блокировки кнопки
    });
  }

  close() {
    super.close();
    this._confirmButton.removeAttribute("disabled"); // Удалите атрибут disabled при закрытии попапа
  }
}
