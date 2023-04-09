import "./index.css";
// Импорты
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {
  validationConfig,
  initialElements,
  popupFormInputName,
  popupFormInputAbout,
  ButtonEditProfile,
  ButtonAddCard,
  FormAddCard,
} from "../utils/constants.js";

// Создаем экземпляр класса UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
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

// Создаем экземпляр класса Section для рендеринга карточек
const cardsSection = new Section(
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
cardsSection.renderItems();

// Обработчики отправки формы
function handleFormEditProfileSubmit(formData) {
  userInfo.setUserInfo({
    name: formData.name,
    about: formData.about,
  });
  popupEditProfileInstance.close();
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
  cardsSection.addItem(element);
  validators[FormAddCard.name].toggleButtonState();
  popupAddCardInstance.close();
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
ButtonEditProfile.addEventListener("click", () => {
  popupEditProfileInstance.open();
  const currentUserInfo = userInfo.getUserInfo();
  popupFormInputName.value = currentUserInfo.name;
  popupFormInputAbout.value = currentUserInfo.about;
});

ButtonAddCard.addEventListener("click", () => {
  popupAddCardInstance.open();
});
