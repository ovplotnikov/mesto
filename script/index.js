import Card from './Card.js';
import FormValidator from './FormValidator.js';


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
const popupFormSubmitButton = document.querySelector('.popup__save-button');

// Массив с первоначальными карточками
const initialElements = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


// Шаблон карточки
// const template = document
//   .querySelector("#elements-template")
//   .content.querySelector(".elements__item");
  


// Список карточек
const elementsList = document.querySelector(".elements__list");


// Функция создания карточки

function createCard(data, templateSelector) {
  const card = new Card(data, templateSelector);
  const cardElement = card.generateCard();
  return cardElement;
}



// Функция отрисовки начальных карточек
function renderElements() {
  initialElements.forEach((item) => {
    const cardElement = createCard(item, ".elements-template");
    elementsList.prepend(cardElement);
  });
}




renderElements();


// Функция закрытия попапов
function closePopups() {
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
             event.target.classList.contains('popup_type_edit-profile') ||
             event.target.classList.contains('popup_type_add-card') ||
             event.target.classList.contains('popup_type_image')) {
    closePopups();
  }
});


// Функция редактирования профиля
function handleFormEditProfileSubmit (evt) {
  evt.preventDefault(); 
  profileName.textContent = popupFormInputName.value;
  profileAbout.textContent = popupFormInputAbout.value;
  closePopups();
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
  closePopups();
}



function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    closePopups();
  }
}


// Слушатель события на кнопку Submit добавления карточки
document.getElementById('popup__form_type_add-card')
    .addEventListener('submit', handleAddCardFormSubmit);
