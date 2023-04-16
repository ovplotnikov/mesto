export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleLike,
    handleDelete,
    userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLike = handleLike;
    this._handleDelete = handleDelete;
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
    const elementImage = this._element.querySelector(".elements__image");
    elementImage.src = this._link;
    elementImage.alt = this._name;
    const likeCounter = this._element.querySelector(".elements__like-counter");
    this._setLikesCount(likeCounter, this._likes.length);
    this._setEventListeners();

    const deleteButton = this._element.querySelector(
      ".elements__delete-button"
    );
    if (this._ownerId === this._userId) {
      deleteButton.style.display = "block";
    } else {
      deleteButton.style.display = "none";
    }

    const buttonLike = this._element.querySelector(".elements__like-button");
    if (this._likes.some((like) => like._id === this._userId)) {
      buttonLike.classList.add("elements__like-button_active");
    }

    return this._element;
  }

  _setLikesCount(likeCounter, count) {
    likeCounter.textContent = count;
    likeCounter.dataset.likes = count;
  }

  _setEventListeners() {
    const buttonLike = this._element.querySelector(".elements__like-button");
    buttonLike.addEventListener("click", () => {
      this._handleLikeCard(buttonLike);
    });

    this._element
      .querySelector(".elements__delete-button")
      .addEventListener("click", (event) => {
        event.stopPropagation();
        this._handleDelete(this);
      });

    const elementImage = this._element.querySelector(".elements__image");
    elementImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _handleLikeCard(buttonLike) {
    const isLiked = buttonLike.classList.contains(
      "elements__like-button_active"
    );

    this._handleLike(this._cardId, !isLiked)
      .then((cardData) => {
        buttonLike.classList.toggle("elements__like-button_active");
        const likeCounter = this._element.querySelector(
          ".elements__like-counter"
        );
        this._setLikesCount(likeCounter, cardData.likes.length);
      })
      .catch((err) =>
        console.error(`Ошибка при изменении статуса лайка карточки: ${err}`)
      );
  }

  remove() {
    this._element.remove();
    this._element = null;
  }
}
