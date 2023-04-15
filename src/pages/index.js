import "./index.css";
// Импорты
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";
import {
  validationConfig,
  buttonEditAvatar,
  popupFormInputName,
  popupFormInputAbout,
  buttonEditProfile,
  buttonAddCard,
  formAddCard,
  buttonSave,
  formChangeAvatar,
  cohortId,
} from "../utils/constants.js";
let cardsSection = null;

// Создаем экземпляр класса UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__avatar-image",
});

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-63",
  headers: {
    authorization: "e6623c64-174b-4d47-84f0-e5f6c8e0ba57",
    "Content-Type": "application/json",
  },
});

let userId = null;

api.getUserInfo().then((userData) => {
  userId = userData._id;
  userInfo.setUserInfo({
    name: userData.name,
    about: userData.about,
    avatar: userData.avatar,
  });
});

// Функция обработки отправки формы смены аватара
function handleFormChangeAvatarSubmit(formData) {
  console.log("URL-адрес аватара:", formData.link);
  api
    .updateAvatar(formData.link)
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        about: userData.about,
        avatar: userData.avatar,
      });
      popupChangeAvatarInstance.close(); // Закрываем попап после успешного обновления аватара
    })
    .catch((err) => {
      console.error(`Ошибка при смене аватара: ${err}`);
    });
}

// Создаем экземпляр класса PopupWithForm для смены аватара.
const popupChangeAvatarInstance = new PopupWithForm(
  ".popup_type_change-avatar",
  handleFormChangeAvatarSubmit
);

// Устанавливаем слушатели событий для экземпляра класса PopupWithForm (смены аватара).
popupChangeAvatarInstance.setEventListeners();

// Функция для обработки card click
function handleCardClick(name, link) {
  popupImageInstance.open({
    src: link,
    caption: name,
  });
}

// Функция создания карточки
function createCard(data, templateSelector, userId) {
  const card = new Card(data, templateSelector, handleCardClick, api, userId);
  const cardElement = card.generateCard();
  return cardElement;
}

api.getInitialCards().then((initialCards) => {
  // Создаем экземпляр класса Section для рендеринга карточек
  cardsSection = new Section(
    {
      items: initialCards,
      renderer: (item) => {
        const cardElement = createCard(item, ".elements-template", userId);
        return cardElement;
      },
    },
    ".elements__list"
  );

  // Вызываем метод renderItems для рендеринга исходных элементов.
  cardsSection.renderItems();
});

// Обработчики отправки формы
function handleFormEditProfileSubmit(formData) {
  const userData = { name: formData.name, about: formData.about };
  const defaultButtonText = popupEditProfileInstance
    .getPopupElement()
    .querySelector(".popup__save-button").textContent;

  // Изменяем текст кнопки на «Сохранение...»
  popupEditProfileInstance.setButtonText("Сохранение...");

  api
    .updateUserInfo(userData)
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        about: userData.about,
        avatar: userData.avatar,
      });
      popupEditProfileInstance.close();
    })
    .catch((err) => {
      console.error(`Ошибка при обновлении профиля: ${err}`);
    })
    .finally(() => {
      // Восстанавливаем исходный текст кнопки
      popupEditProfileInstance.setButtonText(defaultButtonText);
    });
}

// Функция обработки отправки формы добавления карточки
function handleAddCardFormSubmit(formData) {
  const defaultButtonText = popupAddCardInstance
    .getPopupElement()
    .querySelector(".popup__save-button").textContent;

  popupAddCardInstance.setButtonText("Сохранение...");
  api
    .addCard(formData.name, formData.link)
    .then((cardData) => {
      const element = createCard(cardData, ".elements-template", userId);
      cardsSection.addItem(element);
      popupAddCardInstance.close();
      validators[formAddCard.name].toggleButtonState();
    })
    .catch((err) => {
      console.error(`Ошибка при добавлении карточки: ${err}`);
    })
    .finally(() => {
      // Восстанавливаем исходный текст кнопки
      popupAddCardInstance.setButtonText(defaultButtonText);
    });
}

// Создаем экземпляры класса PopupWithForm для каждого всплывающего окна.
const popupEditProfileInstance = new PopupWithForm(
  ".popup_type_edit-profile",
  handleFormEditProfileSubmit
);
const popupAddCardInstance = new PopupWithForm(
  ".popup_type_add-card",
  handleAddCardFormSubmit
);
const popupImageInstance = new PopupWithImage(".popup_type_image");

// Устанавливаем слушатели событий для экземпляров класса PopupWithForm.
popupEditProfileInstance.setEventListeners();
popupAddCardInstance.setEventListeners();
popupImageInstance.setEventListeners();

const validators = {};

// Функция для включения валидации формы
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(config, formElement);
    formValidator.enableValidation();
    validators[formElement.name] = formValidator;
  });
}

enableValidation(validationConfig);

// Находим кнопки на странице

// Слушатели событий для кнопок для открытия popups
buttonEditProfile.addEventListener("click", () => {
  popupEditProfileInstance.open();
  const currentUserInfo = userInfo.getUserInfo();
  popupFormInputName.value = currentUserInfo.name;
  popupFormInputAbout.value = currentUserInfo.about;
});

buttonAddCard.addEventListener("click", () => {
  popupAddCardInstance.open();
});

buttonEditAvatar.addEventListener("click", () => {
  validators[formChangeAvatar.name].toggleButtonState();
  popupChangeAvatarInstance.open();
});
