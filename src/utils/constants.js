// Переменные для popups

export const buttonEditProfile = document.querySelector(
  ".profile__edit-button"
);
export const buttonAddCard = document.querySelector(".profile__add-button");

export const buttonEditAvatar = document.querySelector(
  ".profile__avatar-overlay"
);

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__error_visible",
};
