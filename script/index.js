// Импорты
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from './PopupWithImage.js';
import { validationConfig, initialElements } from "./constants.js";

// переменные для попапов
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const popupFormInputName = document.querySelector(".popup__input_value_name");
const popupFormInputAbout = document.querySelector(".popup__input_value_about");

// Функция создания карточки
function createCard(data, templateSelector) {
  const card = new Card(data, templateSelector);
  const cardElement = card.generateCard();
  return cardElement;
}

// Создание экземпляра класса Section для отрисовки карточек
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

// Вызов метода renderItems для рендеринга исходных элементов.
elementsSection.renderItems();

// Обработчики сабмита форм
function handleFormEditProfileSubmit(formData) {
  profileName.textContent = formData.name;
  profileAbout.textContent = formData.about;
}

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

// Создание экземпляров класса PopupWithForm для каждого попапа
const popupEditProfileInstance = new PopupWithForm(".popup_type_edit-profile", handleFormEditProfileSubmit);
const popupAddCardInstance = new PopupWithForm(".popup_type_add-card", handleAddCardFormSubmit);
const popupImageInstance = new PopupWithImage(".popup_type_image");

// Установка слушателей событий для экземпляров класса PopupWithForm
popupEditProfileInstance.setEventListeners();
popupAddCardInstance.setEventListeners();
popupImageInstance.setEventListeners();

const validators = {};

// Функция включения валидации форм
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(config, formElement);
    formValidator.enableValidation();
    validators[formElement.getAttribute("name")] = formValidator;
  });
}

enableValidation(validationConfig);

// Слушатель события на кнопки открытия попапов
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("profile__edit-button")) {
    popupEditProfileInstance.open();
    popupFormInputName.value = profileName.textContent;
    popupFormInputAbout.value = profileAbout.textContent;
  } else if (event.target.classList.contains("profile__add-button")) {
  popupAddCardInstance.open();
  } else if (event.target.classList.contains("elements__image")) {
  popupImageInstance.open({
  src: event.target.src,
  caption: event.target.alt,
  });
  }
  });
