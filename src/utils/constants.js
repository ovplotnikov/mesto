// Переменные для popups
export const popupFormInputName = document.querySelector(
  ".popup__input_value_name"
);
export const popupFormInputAbout = document.querySelector(
  ".popup__input_value_about"
);
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

export const formAddCard = document
  .querySelector(".popup_type_add-card")
  .querySelector(validationConfig.formSelector);

export const formChangeAvatar = document.querySelector(
  "#popup__form_type_change-avatar"
);

// export const formEditProfile = document
//   .querySelector(".popup_type_edit-profile")
//   .querySelector(validationConfig.formSelector);
