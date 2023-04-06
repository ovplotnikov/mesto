export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name; 
        this._link = data.link; 
        this._templateSelector = templateSelector;
        this._elementImage = null;
        this._likeButton = null;
        this._handleCardClick = handleCardClick;
    }

   _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.elements__item')
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.elements__title').textContent = this._name;
        this._elementImage = this._element.querySelector('.elements__image');
        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        this._likeButton = this._element.querySelector('.elements__like-button');
        this._likeButton.addEventListener('click', () => {
            this._handleLikeCard();
        });

        this._element.querySelector('.elements__delete-button').addEventListener('click', () => {
            this._handleDeleteCard();
        });

        this._elementImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }

    _handleLikeCard() {
        this._likeButton = this._element.querySelector('.elements__like-button');
        this._likeButton.classList.toggle('elements__like-button_active');
    }

    _handleDeleteCard() {
        this._element.remove();
    }
}
