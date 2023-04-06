// Импорты
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import { validationConfig, initialElements } from "../utils/constants.js";

// Создаем экземпляр класса UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about"
});

// Переменные для popups
const popupFormInputName = document.querySelector(".popup__input_value_name");
const popupFormInputAbout = document.querySelector(".popup__input_value_about");

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

// Создаем экземпляр класса Section для рендеринга карточек
const elementsSection = new Section(
  {
    items: initialElements,
    renderer: (item) => {
      const cardElement = createCard(item, ".elements-template");
      return cardElement;
    },
  },
  ".elements__list"
);

// Вызываем метод renderItems для рендеринга исходных элементов.
elementsSection.renderItems();

// Обработчики отправки формы
function handleFormEditProfileSubmit(formData) {
  userInfo.setUserInfo({
    name: formData.name,
    about: formData.about
  });
}

// Функция обработки отправки формы добавления карточки
function handleAddCardFormSubmit(formData) {
  const element = createCard(
    {
      name: formData.name,
      link: formData.link,
    },
    ".elements-template"
  );
  elementsSection.addItem(element);
}

// Создаем экземпляры класса PopupWithForm для каждого всплывающего окна.
const popupEditProfileInstance = new PopupWithForm(".popup_type_edit-profile", handleFormEditProfileSubmit);
const popupAddCardInstance = new PopupWithForm(".popup_type_add-card", handleAddCardFormSubmit);
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
    validators[formElement.getAttribute("name")] = formValidator;
  });
}

enableValidation(validationConfig);

// Слушатели событий для кнопок для открытия popups
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("profile__edit-button")) {
    popupEditProfileInstance.open();
    const currentUserInfo = userInfo.getUserInfo();
    popupFormInputName.value = currentUserInfo.name;
    popupFormInputAbout.value = currentUserInfo.about;
  } else if (event.target.classList.contains("profile__add-button")) {
    popupAddCardInstance.open();
  }
});