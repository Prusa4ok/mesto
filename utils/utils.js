import {
	popupGallery, popupName, profileName, popupDescription, profileDescription, popupAddCard,
	popupCardLink, popupCardName, cardsList, popupEditName, page
} from '../utils/constants.js'
import { Card } from '../scripts/card.js'

export const modalAction = {
	popupImg: popupGallery.querySelector('.popup__img'),

	popupDesc: popupGallery.querySelector('.popup__desc'),

	determinGalleryItems: el => {
		const currentCard = el.target.closest('.card');
		const cardDescription = currentCard.querySelector('.card__description').textContent;
		modalAction.popupImg.src = el.target.src;
		modalAction.popupImg.alt = cardDescription;
		modalAction.popupDesc.textContent = cardDescription;
		modalAction.openPopup(popupGallery);
	},

	openPopup: el => {
		el.classList.add('popup_type_open');
		document.addEventListener('keydown', modalAction.closePopupEsc);
		modalAction.hideInputsMsgError(el);
		popupName.value = profileName.textContent;
		popupDescription.value = profileDescription.textContent;
		if (el === popupAddCard) {
			modalAction.deleteImputsValueAddCard();
		};
	},

	hideInputsMsgError: el => {
		el.querySelectorAll('.popup__msgError').forEach(msg => {
			if (!msg.classList.contains('popup__msgError_type_close'))
				msg.classList.add('popup__msgError_type_close');
		});
	},

	deleteImputsValueAddCard: () => {
		popupAddCard.querySelectorAll('.popup__input').forEach(input => input.value = '');
	},

	closePopupEsc: evt => {
		if (evt.key === 'Escape') {
			modalAction.closePopup(page.querySelector('.popup_type_open'));
		};
	},

	closePopup: el => {
		el.classList.remove('popup_type_open');
		document.removeEventListener('keydown', modalAction.closePopupEsc);
	},

	closePopupOverlay: evt => {
		if (evt.target.classList.contains('page__popup')) {
			modalAction.closePopup(evt.target);
		}
	},

	createPopupAddCard: evt => {
		evt.preventDefault();
		modalAction.addCard(popupCardLink.value, popupCardName.value);
		popupCardLink.value = '';
		popupCardName.value = '';
		modalAction.closePopup(popupAddCard);
	},

	createCard: (link, name) => {
		const newCard = new Card(link, name);
		return newCard;
	},

	addCard: (link, name) => {
		const newCard = modalAction.createCard(link, name);
		cardsList.prepend(newCard.getCardElement(newCard.name, newCard.link));
	},

	savePopupEditName: evt => {
		evt.preventDefault();
		profileName.textContent = popupName.value;
		profileDescription.textContent = popupDescription.value;
		modalAction.closePopup(popupEditName);
	}
}
