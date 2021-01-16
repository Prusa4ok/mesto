import { modalAction } from '../utils/utils.js'
import { tempCard } from '../utils/constants.js'

export class Card {

	constructor(name, link) {
		this.name = name;
		this.link = link;
	}

	card = tempCard.cloneNode(true);
	cardImg = this.card.querySelector('.card__img');
	cardButtonDelete = this.card.querySelector('.button__delete');
	cardButtonLike = this.card.querySelector('.button__like');

	//открытие
	_handleOpen = el => {
		modalAction.determinGalleryItems(el);
	}

	//лайк
	_handleLike = el => {
		el.target.classList.toggle('button__like_type_active');
	}

	//удаление
	_handleDelete = event => {
		event.target.closest('.card').remove();
	}

	//установка слушателей
	_setEventListener = () => {
		this.cardImg.addEventListener('click', modalAction.determinGalleryItems);
		this.cardButtonDelete.addEventListener('click', this._handleDelete);
		this.cardButtonLike.addEventListener('click', this._handleLike);
	}

	//создание карточки
	getCardElement = (link, name) => {
		this.cardImg.src = link;
		this.cardImg.alt = name;
		this.card.querySelector('.card__description').textContent = name;

		this._setEventListener();

		return this.card;
	}
}