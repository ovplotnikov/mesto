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
  // {
  //   name: 'Карачаевск',
  //   link: './images/kirill-pershin-1088404-unsplash.jpg'
  // },
  // {
  //   name: 'Гора Эльбрус',
  //   link: './images/kirill-pershin-1404681-unsplash.jpg'
  // },
  // {
  //   name: 'Домбай',
  //   link: './images/kirill-pershin-1556355-unsplash.jpg'
  // }
];

const template = document
  .querySelector("#elements-template")
  .content.querySelector(".elements__item");
  
const elementsList = document.querySelector(".elements__list");

// Функция отрисовки начальных карточек
function renderElements () {
  initialElements.forEach((item) => {
    const element = template.cloneNode(true);
    element.querySelector(".elements__title").textContent = item.name;
    element.querySelector(".elements__image").src = item.link;
    element.querySelector(".elements__image").alt = item.name;
    elementsList.append(element);
  });
}

renderElements(); // Вызов функции отрисовки начальных карточек


// Функция работы с лайками
function handleLikeButtons() {
  const likeButtons = document.querySelectorAll(".elements__like-button");
  for (let likeButton of likeButtons) {
    likeButton.addEventListener("click", function() {
      likeButton.classList.toggle("elements__like-button_active");
    });
  }
}

handleLikeButtons(); // Вызов функции работы с лайками


const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const popupFormInputName = document.querySelector('.popup__input_value_name');
const popupFormInputAbout = document.querySelector('.popup__input_value_about');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupImage = document.querySelector('.popup_type_image');

// Функция закрытия попапов
function closePopups() {
  const openedPopup = document.querySelector('.popup_opened');
  openedPopup.classList.remove('popup_opened');
}

// Функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
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
    document.querySelector('.popup__image').src = event.target.src;
    document.querySelector('.popup__image').alt = event.target.alt;
    document.querySelector('.popup__image-title').textContent = event.target.alt;
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
  const element = template.cloneNode(true);
  element.querySelector(".elements__title").textContent = event.target.elements.name.value;
  element.querySelector(".elements__image").src = event.target.elements.link.value;
  element.querySelector(".elements__image").alt = event.target.elements.name.value;
  elementsList.prepend(element);
  event.target.reset();
  closePopups();
  handleLikeButtons(); // Чтобы лайки работали на новых карточках
  handleDeleteButtons(); // Чтобы удалялись новые карточки
}

// Слушатель события на кнопку Submit добавления карточки
document.getElementById('popup__form_type_add-card')
    .addEventListener('submit', handleAddCardFormSubmit);


// Функция удаления карточки
function handleDeleteButtons() {
  let deleteButtons = document.querySelectorAll('.elements__delete-button');
  for (let deleteButton of deleteButtons) {
    deleteButton.addEventListener('click', deleteCard);
     function deleteCard (evt) {
      evt.target.closest('.elements__item').remove();
    }
  }
}

handleDeleteButtons(); // Вызов функции удаления карточки



