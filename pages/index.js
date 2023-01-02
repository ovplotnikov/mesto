
let popup = document.querySelector('.popup');

addEventListener('click', (event) => {
  if (event.target.classList.contains('profile__edit-button')) {
    popup.classList.add('popup_opened');
  }
});

addEventListener('click', (event) => {
  if (event.target.classList.contains('popup__close-button')) {
    popup.classList.remove('popup_opened');
  }
});

addEventListener('click', (event) => {
    if (event.target.classList.contains('popup')) {
      popup.classList.remove('popup_opened');
    }
});

let profile__name = document.querySelector('.profile__name');
let profile__about = document.querySelector('.profile__about');

let popup__input_name = document.querySelector('.popup__input_name');
let popup__input_about = document.querySelector('.popup__input_about');

popup__input_name.value = profile__name.textContent;
popup__input_about.value = profile__about.textContent;



let formElement = document.querySelector('.popup__form');
function handleFormSubmit (evt) {
    evt.preventDefault(); 
    // Получите значение полей .popup__input_about и .popup__input_name из свойства value

    let popup__input_name = document.querySelector('.popup__input_name');
    let popup__input_about = document.querySelector('.popup__input_about');

    profile__name.textContent  = popup__input_name.value;
    profile__about.textContent = popup__input_about.value;

    popup.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

