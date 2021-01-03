const page = document.querySelector('.page');
const tempCard = page.querySelector('#tempCard').content;

import { modalAction } from './script.js'

export class Card {

	constructor(name, link) {
		this.name = name;
		this.link = link;
	}

	//открытие
	_handleOpen = el => modalAction.determinGalleryItems(el);

	//закрытие
	handleClose = el => modalAction.closePopup;

	//лайк
	_handleLike = el => {
		el.target.classList.toggle('button__like_type_active');
	}

	//удаление
	_handleDelete = event => {
		event.target.closest('.card').remove();
	}

	//создание карточки
	getCardElement = (link, name) => {
		const card = tempCard.cloneNode(true);
		const cardImg = card.querySelector('.card__img');
		const cardButtonDelete = card.querySelector('.button__delete');
		const cardButtonLike = card.querySelector('.button__like');

		cardImg.src = link;
		cardImg.alt = name;
		card.querySelector('.card__description').textContent = name;

		cardImg.addEventListener('click', modalAction.determinGalleryItems);
		cardButtonDelete.addEventListener('click', this._handleDelete);
		cardButtonLike.addEventListener('click', this._handleLike);
		card.addEventListener('click', this._handleOpen);

		return card;
	}
}