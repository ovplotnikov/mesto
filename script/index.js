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
  },
  {
    name: 'Карачаевск',
    link: './images/kirill-pershin-1088404-unsplash.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/kirill-pershin-1404681-unsplash.jpg'
  },
  {
    name: 'Домбай',
    link: './images/kirill-pershin-1556355-unsplash.jpg'
  }
];

const template = document
  .querySelector("#elements-template")
  .content.querySelector(".elements__item");
  
const elementsList = document.querySelector(".elements__list");

function renderElements () {
  initialElements.forEach((item) => {
    const element = template.cloneNode(true);
    element.querySelector(".elements__title").textContent = item.name;
    element.querySelector(".elements__image").src = item.link;
    element.querySelector(".elements__image").alt = item.name;
    elementsList.append(element);
  });
}

renderElements();

function handleLikeButtons() {
  const likeButtons = document.querySelectorAll(".elements__like-button");
  for (let likeButton of likeButtons) {
    likeButton.addEventListener("click", function() {
      likeButton.classList.toggle("elements__like-button_active");
    });
  }
}

handleLikeButtons();

let popupEditProfile = document.querySelector('.popup_type_edit-profile');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let popupFormInputName = document.querySelector('.popup__input_value_name');
let popupFormInputAbout = document.querySelector('.popup__input_value_about');
let popupAddCard = document.querySelector('.popup_type_add-card');
let popupImage = document.querySelector('.popup_type_image');

function closePopups() {
  popupEditProfile.classList.remove('popup_opened');
  popupAddCard.classList.remove('popup_opened');
  popupImage.classList.remove('popup_opened');
}

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('profile__edit-button')) {
    popupEditProfile.classList.add('popup_opened');
    popupFormInputName.value = profileName.textContent;
    popupFormInputAbout.value = profileAbout.textContent;
  } else if (event.target.classList.contains('profile__add-button')) {
    popupAddCard.classList.add('popup_opened');
  } else if (event.target.classList.contains('elements__image')) {
    document.querySelector('.popup_type_image').classList.add('popup_opened');
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

function handleFormEditProfileSubmit (evt) {
  evt.preventDefault(); 
  profileName.textContent = popupFormInputName.value;
  profileAbout.textContent = popupFormInputAbout.value;
  closePopups();
}

function handleAddCardFormSubmit (evt) {
  evt.preventDefault();
  initialElements.unshift({
    name: document.querySelector('.popup__input_value_place').value,
    link: document.querySelector('.popup__input_value_link').value
  });
  elementsList.innerHTML = '';

  renderElements();
  closePopups();
  handleLikeButtons();
}

function handleDeleteButtons() {
  let deleteButtons = document.querySelectorAll('.elements__delete-button');
  for (let deleteButton of deleteButtons) {
    deleteButton.addEventListener('click', deleteCard);
     function deleteCard (evt) {
      evt.target.closest('.elements__item').remove();
    }
  }
}

handleDeleteButtons();

document.getElementById('popup__form_type_add-card')
    .addEventListener('submit', handleAddCardFormSubmit);


document.getElementById('popup__form_type_edit-profile')
        .addEventListener('submit', handleFormEditProfileSubmit);