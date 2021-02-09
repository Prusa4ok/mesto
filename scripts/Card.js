import { modalAction } from '../utils/utils.js'
import {
	tempCard,
	popupGallery,
	popupImg,
	popupDesc
} from '../utils/constants.js'

export class Card {

	constructor(name, link) {
		this.name = name;
		this.link = link;
	}

	_getTemplate = () => {
		this.card = tempCard.cloneNode(true);
		this.cardImg = this.card.querySelector('.card__img');
		this.cardButtonDelete = this.card.querySelector('.button__delete');
		this.cardButtonLike = this.card.querySelector('.button__like');
	}

	//открытие
	_handleOpen = el => {
		this._fillPopupGallery();
		modalAction.openPopup(el);
	}

	//лайк
	_handleLike = el => {
		el.target.classList.toggle('button__like_type_active');
	}

	//удаление
	_handleDelete = event => {
		event.target.closest('.card').remove();
	}

	//заполнение popup_type_gallery
	_fillPopupGallery = () => {
		let currentCard = event.currentTarget;
		popupImg.src = currentCard.src;
		popupDesc.textContent = currentCard.closest('.card').querySelector('.card__description').textContent;
	}

	//установка слушателей
	_setEventListener = () => {
		this.cardImg.addEventListener('click', () => {
			this._handleOpen(popupGallery)
		});
		this.cardImg.addEventListener('click', modalAction.determinGalleryItems);
		this.cardButtonDelete.addEventListener('click', this._handleDelete);
		this.cardButtonLike.addEventListener('click', this._handleLike);
	}

	//создание карточки
	getCardElement = (link, name) => {
		this._getTemplate();

		this.cardImg.src = link;
		this.cardImg.alt = name;
		this.card.querySelector('.card__description').textContent = name;

		this._setEventListener();

		return this.card;
	}
}
