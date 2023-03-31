import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { validationConfig, initialElements } from './constants.js';


// переменные для попапов
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const popupFormInputName = document.querySelector('.popup__input_value_name');
const popupFormInputAbout = document.querySelector('.popup__input_value_about');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupImage = document.querySelector('.popup_type_image');
const imagePopup = document.querySelector('.popup__image');
const titleImagePopup = document.querySelector('.popup__image-title');


// Список карточек
const elementsList = document.querySelector(".elements__list");


// Функция создания карточки

function createCard(data, templateSelector) {
  const card = new Card(data, templateSelector);
  const cardElement = card.generateCard();
  return cardElement;
}


// Функция отрисовки начальных карточек
function renderInitialElements() {
  initialElements.forEach((item) => {
    const cardElement = createCard(item, ".elements-template");
    elementsList.prepend(cardElement);
  });
}

renderInitialElements();


// Функция закрытия попапа
function closeOpenedPopup() {
  const openedPopup = document.querySelector('.popup_opened');
  if (!openedPopup) return; 
  openedPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}


// Функция открытия попапов
function openPopup(popup) {

  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}



// Функция включения валидации форм
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(config, formElement);
    formValidator.enableValidation();
  });
}


enableValidation(validationConfig);


// Слушатель события на кнопки открытия попапов
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('profile__edit-button')) {
    openPopup(popupEditProfile);
    popupFormInputName.value = profileName.textContent;
    popupFormInputAbout.value = profileAbout.textContent;
  } else if (event.target.classList.contains('profile__add-button')) {
    openPopup(popupAddCard);
  } else if (event.target.classList.contains('elements__image')) {
    openPopup(popupImage);
    imagePopup.src = event.target.src;
    imagePopup.alt = event.target.alt;
    titleImagePopup.textContent = event.target.alt;
  } else if (event.target.classList.contains('popup__close-button') || 
  (Array.from(event.target.classList).some(className => className.includes('popup_type_')))) {

  closeOpenedPopup(); 
} 
});


// Функция редактирования профиля
function handleFormEditProfileSubmit (evt) {
  evt.preventDefault(); 
  profileName.textContent = popupFormInputName.value;
  profileAbout.textContent = popupFormInputAbout.value;
  closeOpenedPopup();
}


// Слушатель события на кнопку Submit редактирования профиля
document.getElementById('popup__form_type_edit-profile')
.addEventListener('submit', handleFormEditProfileSubmit);




// Функция добавления карточки
function handleAddCardFormSubmit (event) {
  event.preventDefault();
  const element = createCard({
    name: event.target.elements.name.value,
    link: event.target.elements.link.value
  }, ".elements-template");
  elementsList.prepend(element);
  event.target.reset();
  // переключаем кнопку Submit формы добавления карточки в неактивное состояние
  event.submitter.classList.add('popup__save-button_disabled');
  event.submitter.setAttribute('disabled', true);
  closeOpenedPopup();
}


// Функция закрытия попапов по нажатию на Esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    closeOpenedPopup();
  }
}


// Слушатель события на кнопку Submit добавления карточки
document.getElementById('popup__form_type_add-card')
.addEventListener('submit', handleAddCardFormSubmit);
