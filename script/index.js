// Imports
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';
import { validationConfig, initialElements } from "./constants.js";

// Create an instance of the UserInfo class
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about"
});

// Variables for popups
const popupFormInputName = document.querySelector(".popup__input_value_name");
const popupFormInputAbout = document.querySelector(".popup__input_value_about");

// Function to handle card click
function handleCardClick(name, link) {
  popupImageInstance.open({
    src: link,
    caption: name,
  });
}

// Function to create a card
function createCard(data, templateSelector) {
  const card = new Card(data, templateSelector, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

// Create an instance of the Section class for rendering cards
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

// Call the renderItems method for rendering initial elements
elementsSection.renderItems();

// Handlers for form submission
function handleFormEditProfileSubmit(formData) {
  userInfo.setUserInfo({
    name: formData.name,
    about: formData.about
  });
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

// Create instances of the PopupWithForm class for each popup
const popupEditProfileInstance = new PopupWithForm(".popup_type_edit-profile", handleFormEditProfileSubmit);
const popupAddCardInstance = new PopupWithForm(".popup_type_add-card", handleAddCardFormSubmit);
const popupImageInstance = new PopupWithImage(".popup_type_image");

// Set event listeners for instances of the PopupWithForm class
popupEditProfileInstance.setEventListeners();
popupAddCardInstance.setEventListeners();
popupImageInstance.setEventListeners();

const validators = {};

// Function to enable form validation
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(config, formElement);
    formValidator.enableValidation();
    validators[formElement.getAttribute("name")] = formValidator;
  });
}

enableValidation(validationConfig);

// Event listener for buttons to open popups
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
