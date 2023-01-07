
let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let popupFormInputName = document.querySelector('.popup__form_input_name');
let popupFormInputAbout = document.querySelector('.popup__form_input_about');


addEventListener('click', (event) => {
  if (event.target.classList.contains('profile__edit-button')) {
    popup.classList.add('popup_opened');
    popupFormInputName.value = profileName.textContent;
    popupFormInputAbout.value = profileAbout.textContent;
  }
});

addEventListener('click', (event) => {
  if (event.target.classList.contains('popup__close-button')) {
    popup.classList.remove('popup_opened');
  }
  else if (event.target.classList.contains('popup')) {
    popup.classList.remove('popup_opened');
  }
});


let formElement = document.querySelector('.popup__form');
function handleFormSubmit (evt) {
    evt.preventDefault(); 
    // Получите значение полей .popup__form_input_about и .popup__form_input_name из свойства value

    let popupFormInputName = document.querySelector('.popup__form_input_name');
    let popupFormInputAbout = document.querySelector('.popup__form_input_about');

    profileName.textContent  = popupFormInputName.value;
    profileAbout.textContent = popupFormInputAbout.value;

    popup.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

