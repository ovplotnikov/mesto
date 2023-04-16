import "./index.css";
// Импорты
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";
import {
  validationConfig,
  buttonEditAvatar,
  buttonEditProfile,
  buttonAddCard,
} from "../utils/constants.js";
let cardsSection = null;

// Создаем экземпляр класса UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__avatar-image",
});

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-63",
  headers: {
    authorization: "e6623c64-174b-4d47-84f0-e5f6c8e0ba57",
    "Content-Type": "application/json",
  },
});

let userId = null;

// Запрос данных пользователя и карточек с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
    });

    // Создаем экземпляр класса Section для рендеринга карточек
    cardsSection = new Section(
      {
        items: initialCards,
        renderer: (item) => {
          const cardElement = createCard(item, ".elements-template", userId);
          return cardElement;
        },
      },
      ".elements__list"
    );

    // Вызываем метод renderItems для рендеринга исходных элементов.
    cardsSection.renderItems();
  })
  .catch((err) => {
    console.error(`Ошибка при получении данных: ${err}`);
  });

// Функция обработки отправки формы смены аватара
function handleFormChangeAvatarSubmit(evt, formData) {
  const submitButton = evt.submitter;
  const defaultButtonText = submitButton.textContent;

  // Изменяем текст кнопки на «Сохранение...» и блокируем ее
  popupChangeAvatarInstance.setButtonText("Сохранение...");
  submitButton.setAttribute("disabled", "");

  api
    .updateAvatar(formData.link)
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        about: userData.about,
        avatar: userData.avatar,
      });
      popupChangeAvatarInstance.close(); // Закрываем попап после успешного обновления аватара
    })
    .catch((err) => {
      console.error(`Ошибка при смене аватара: ${err}`);
    })
    .finally(() => {
      // Восстанавливаем исходный текст кнопки и разблокируем ее
      popupChangeAvatarInstance.setButtonText(defaultButtonText);
      submitButton.removeAttribute("disabled");
    });
}

// Функция для обработки card click
function handleCardClick(name, link) {
  popupImageInstance.open({
    src: link,
    caption: name,
  });
}

// Функция для обработки события лайка карточки
function handleLike(cardId, isLiked) {
  return api.changeLikeCardStatus(cardId, isLiked);
}

// Функция для обработки события удаления карточки
function handleDelete(cardId) {
  return api.deleteCard(cardId);
}

// Функция создания карточки
function createCard(data, templateSelector, userId) {
  const card = new Card(
    data,
    templateSelector,
    handleCardClick,
    handleLike,
    handleDelete,
    userId
  );
  const cardElement = card.generateCard();
  return cardElement;
}

// Функция обработки отправки формы изменения профиля
function handleFormEditProfileSubmit(evt, formData) {
  const userData = { name: formData.name, about: formData.about };
  const submitButton = evt.submitter;
  const defaultButtonText = submitButton.textContent;

  // Изменяем текст кнопки на «Сохранение...» и блокируем ее
  popupEditProfileInstance.setButtonText("Сохранение...");
  submitButton.setAttribute("disabled", "");

  api
    .updateUserInfo(userData)
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        about: userData.about,
        avatar: userData.avatar,
      });
      popupEditProfileInstance.close();
    })
    .catch((err) => {
      console.error(`Ошибка при обновлении профиля: ${err}`);
    })
    .finally(() => {
      // Восстанавливаем исходный текст кнопки и разблокируем ее
      popupEditProfileInstance.setButtonText(defaultButtonText);
      submitButton.removeAttribute("disabled");
    });
}

// Функция обработки отправки формы добавления карточки
function handleAddCardFormSubmit(evt, formData) {
  const submitButton = evt.submitter;
  const defaultButtonText = submitButton.textContent;

  popupAddCardInstance.setButtonText("Сохранение...");
  submitButton.setAttribute("disabled", "");

  api
    .addCard(formData.name, formData.link)
    .then((cardData) => {
      const element = createCard(cardData, ".elements-template", userId);
      cardsSection.addItem(element);
      popupAddCardInstance.close();
    })
    .catch((err) => {
      console.error(`Ошибка при добавлении карточки: ${err}`);
    })
    .finally(() => {
      // Восстанавливаем исходный текст кнопки и разблокируем ее
      popupAddCardInstance.setButtonText(defaultButtonText);
      submitButton.removeAttribute("disabled");
    });
}

// Создаем экземпляры класса PopupWithForm для каждого всплывающего окна.
const popupEditProfileInstance = new PopupWithForm(
  ".popup_type_edit-profile",
  (evt, formData) => handleFormEditProfileSubmit(evt, formData)
);

const popupAddCardInstance = new PopupWithForm(
  ".popup_type_add-card",
  (evt, formData) => handleAddCardFormSubmit(evt, formData)
);

const popupChangeAvatarInstance = new PopupWithForm(
  ".popup_type_change-avatar",
  (evt, formData) => handleFormChangeAvatarSubmit(evt, formData)
);

const popupImageInstance = new PopupWithImage(".popup_type_image");

// Устанавливаем слушатели событий для экземпляров класса PopupWithForm.
popupEditProfileInstance.setEventListeners();
popupAddCardInstance.setEventListeners();
popupChangeAvatarInstance.setEventListeners();
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
buttonEditProfile.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  popupEditProfileInstance.setInputValues({
    name: currentUserInfo.name,
    about: currentUserInfo.about,
  });
  validators[popupEditProfileInstance._form.name].toggleButtonState();
  popupEditProfileInstance.open();
});

buttonAddCard.addEventListener("click", () => {
  validators[popupAddCardInstance._form.name].toggleButtonState();
  popupAddCardInstance.open();
});

buttonEditAvatar.addEventListener("click", () => {
  validators[popupChangeAvatarInstance._form.name].toggleButtonState();
  popupChangeAvatarInstance.open();
});
