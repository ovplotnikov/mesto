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
    this._confirmButton.addEventListener("click", async (event) => {
      event.preventDefault();
      this._confirmButton.setAttribute("disabled", "");
      try {
        await this._handleConfirm();
      } catch (error) {
        console.error("Error in handleConfirm:", error);
      } finally {
        this._confirmButton.removeAttribute("disabled");
      }
    });
  }

  close() {
    super.close();
  }
}
