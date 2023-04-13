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
    this._buttonLike = this._element.querySelector(".elements__like-button");
    const isLikedByUser = this._likes.some((like) => like._id === this._userId);
    if (isLikedByUser) {
      this._buttonLike.classList.add("elements__like-button_active");
    }
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
      .addEventListener("click", () => {
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
    this._element.remove();
    this._element = null;
  }
}
