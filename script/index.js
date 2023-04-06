// Импорты
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithImage from './PopupWithImage.js';
import { validationConfig, initialElements } from "./constants.js";

// переменные для попапов
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const popupFormInputName = document.querySelector(".popup__input_value_name");
const popupFormInputAbout = document.querySelector(".popup__input_value_about");
const imagePopup = document.querySelector(".popup__image");
const titleImagePopup = document.querySelector(".popup__image-title");

// Список карточек
const elementsList = document.querySelector(".elements__list");

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

// Создание экземпляров класса Popup для каждого попапа
const popupEditProfileInstance = new Popup(".popup_type_edit-profile");
const popupAddCardInstance = new Popup(".popup_type_add-card");
const popupImageInstance = new PopupWithImage(".popup_type_image");

// Установка слушателей событий для экземпляров класса Popup
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

// Функция редактирования профиля
function handleFormEditProfileSubmit(evt) {
evt.preventDefault();
profileName.textContent = popupFormInputName.value;
profileAbout.textContent = popupFormInputAbout.value;
popupEditProfileInstance.close();
}

// Слушатель события на кнопку Submit редактирования профиля
document
.getElementById("popup__form_type_edit-profile")
.addEventListener("submit", handleFormEditProfileSubmit);

// Функция обработки события Submit формы добавления карточки
function handleAddCardFormSubmit(event) {
  event.preventDefault();
  const element = createCard(
  {
  name: event.target.elements.name.value,
  link: event.target.elements.link.value,
  },
  ".elements-template"
  );
  // Используем метод addItem из экземпляра elementsSection вместо прямого добавления к elementsList
  elementsSection.addItem(element);
  event.target.reset();
  validators[event.target.getAttribute("name")].toggleButtonState();
  
  popupAddCardInstance.close();
  }
  
  // Слушатель события на кнопку Submit добавления карточки
  document
  .getElementById("popup__form_type_add-card")
  .addEventListener("submit", handleAddCardFormSubmit);
  
  