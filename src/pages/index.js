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
  initialElements,
  popupFormInputName,
  popupFormInputAbout,
  buttonEditProfile,
  buttonAddCard,
  formAddCard,
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

api.getUserInfo().then((userData) => {
  userInfo.setUserInfo({
    name: userData.name,
    about: userData.about,
    avatar: userData.avatar,
  });
});

// Функция для обработки card click
function handleCardClick(name, link) {
  popupImageInstance.open({
    src: link,
    caption: name,
  });
}

// Функция создания карточки
function createCard(data, templateSelector) {
  const card = new Card(data, templateSelector, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

api.getInitialCards().then((initialCards) => {
  // Создаем экземпляр класса Section для рендеринга карточек
  cardsSection = new Section(
    {
      items: initialCards,
      renderer: (item) => {
        const cardElement = createCard(item, ".elements-template");
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
  api
    .editUserInfo(formData.name, formData.about)
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
    });
}

// Функция обработки отправки формы добавления карточки
function handleAddCardFormSubmit(formData) {
  api
    .addCard(formData.name, formData.link)
    .then((cardData) => {
      const element = createCard(cardData, ".elements-template");
      cardsSection.addItem(element);
      popupAddCardInstance.close();
      validators[formAddCard.name].toggleButtonState();
    })
    .catch((err) => {
      console.error(`Ошибка при добавлении карточки: ${err}`);
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
