export default class Card {
    constructor(data, templateSelector) {
        this._name = data.name; 
        this._link = data.link; 
        this._templateSelector = templateSelector; 
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
        this._element.querySelector('.elements__image').src = this._link;
        this._element.querySelector('.elements__image').alt = this._name;
        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.elements__like-button').addEventListener('click', () => {
            this._handleLikeCard();
        });

        this._element.querySelector('.elements__delete-button').addEventListener('click', () => {
            this._handleDeleteCard();
        });

        this._element.querySelector('.elements__image').addEventListener('click', () => {
            this._handleCardClick();
        });
    }

    _handleLikeCard() {
        this._element.querySelector('.elements__like-button').classList.toggle('elements__like-button_active');
    }

    _handleDeleteCard() {
        this._element.remove();
    }

    _handleCardClick() {
        const popupImage = document.querySelector('.popup_type_image');
        const popupImageTitle = popupImage.querySelector('.popup__image-title');
        const popupImageSrc = popupImage.querySelector('.popup__image');

        popupImageTitle.textContent = this._name;
        popupImageSrc.src = this._link;
        popupImageSrc.alt = this._name;

        openPopup(popupImage);
    }
}