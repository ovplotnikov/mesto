
let popupEditProfile = document.querySelector('.popup_type_edit-profile');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let popupFormInputName = document.querySelector('.popup__input_value_name');
let popupFormInputAbout = document.querySelector('.popup__input_value_about');
let popupAddCard = document.querySelector('.popup_type_add-card');


addEventListener('click', (event) => {
  if (event.target.classList.contains('profile__edit-button')) {
    popupEditProfile.classList.add('popup_opened');
    popupFormInputName.value = profileName.textContent;
    popupFormInputAbout.value = profileAbout.textContent;
  }
});

addEventListener('click', (event) => {
  if (event.target.classList.contains('profile__add-button')) {
    popupAddCard.classList.add('popup_opened');
  }
});

addEventListener('click', (event) => {
  if (event.target.classList.contains('popup__close-button')) {
    popupEditProfile.classList.remove('popup_opened');
    popupAddCard.classList.remove('popup_opened');
  }
  else if (event.target.classList.contains('popup_type_edit-profile')) {
    popupEditProfile.classList.remove('popup_opened');
  }
  else if (event.target.classList.contains('popup_type_add-card')) {
    popupAddCard.classList.remove('popup_opened');
  }

});

let formElement = document.querySelector('.popup__form');
function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent  = popupFormInputName.value;
    profileAbout.textContent = popupFormInputAbout.value;

    popupEditProfile.classList.remove('popup_opened');
}

formElement.addEventListener('submit', handleFormSubmit);

