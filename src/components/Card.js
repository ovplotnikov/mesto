export default class Card {
  constructor(data, templateSelector, handleCardClick, api, userId) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._templateSelector = templateSelector;
    this._elementImage = null;
    this._buttonLike = null;
    this._handleCardClick = handleCardClick;
    this._api = api;
    this._userId = userId;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".elements__title").textContent = this._name;
    this._elementImage = this._element.querySelector(".elements__image");
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._likeCounter = this._element.querySelector(".elements__like-counter");
    this._setLikesCount(this._likes.length);
    this._setEventListeners();

    return this._element;
  }

  _setLikesCount(count) {
    this._likeCounter.textContent = count;
    this._likeCounter.dataset.likes = count;
  }

  _setEventListeners() {
    this._buttonLike = this._element.querySelector(".elements__like-button");
    this._buttonLike.addEventListener("click", () => {
      this._handleLikeCard();
    });

    this._element
      .querySelector(".elements__delete-button")
      .addEventListener("click", (event) => {
        event.stopPropagation();
        this._handleDeleteCard();
      });

    this._elementImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _handleLikeCard() {
    const isLiked = this._buttonLike.classList.contains(
      "elements__like-button_active"
    );

    this._api
      .changeLikeCardStatus(this._cardId, !isLiked)
      .then((cardData) => {
        this._buttonLike.classList.toggle("elements__like-button_active");
        this._setLikesCount(cardData.likes.length);
      })
      .catch((err) =>
        console.error(`Ошибка при изменении статуса лайка карточки: ${err}`)
      );
  }

  _handleDeleteCard() {
    const confirmPopup = document.querySelector("#popup_confirm");
    confirmPopup.classList.add("popup_opened");

    // Добавьте обработчик события на кнопку "Да"
    const confirmButton = confirmPopup.querySelector(".popup__save-button");
    confirmButton.addEventListener("click", (event) => {
      event.preventDefault();
      this._deleteCard();
      confirmPopup.classList.remove("popup_opened");
    });

    // Добавьте обработчик события на кнопку закрытия попапа
    const closeButton = confirmPopup.querySelector(".popup__close-button");
    closeButton.addEventListener("click", () => {
      confirmPopup.classList.remove("popup_opened");
    });
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
}
