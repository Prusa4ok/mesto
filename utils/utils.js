import {
	validationSettings,
	popupGallery,
	popupName,
	profileName,
	popupDescription,
	profileDescription,
	popupAddCard,
	popupEditName,
	page,
	popupImg,
	popupDesc
} from '../utils/constants.js'
import { Card } from '../scripts/Card.js'
import { FormValidator } from '../scripts/Form-Validator.js';

export const modalAction = {

	determinGalleryItems: el => {
		const currentCard = el.target.closest('.card');
		const cardDescription = currentCard.querySelector('.card__description').textContent;
		popupImg.src = el.target.src;
		popupImg.alt = cardDescription;
		popupDesc.textContent = cardDescription;
		modalAction.openPopup(popupGallery);
	},

	openPopup: el => {
		el.classList.add('popup_type_open');
		document.addEventListener('keydown', modalAction.closePopupEsc);

	},

	activateValidation: el => {
		const validationForm = new FormValidator(validationSettings, el);
		validationForm.enableValidation();
		if (el === popupAddCard) {
			modalAction.deleteImputsValueAddCard();
		};
		modalAction.deleteImputsValueAddCard();
		modalAction.fillingInput();
	},

	fillingInput: () => {
		popupName.value = profileName.textContent;
		popupDescription.value = profileDescription.textContent;
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

	createCard: (link, name) => {
		const newCard = new Card(link, name);
		return newCard;
	},

	savePopupEditName: evt => {
		evt.preventDefault();
		profileName.textContent = popupName.value;
		profileDescription.textContent = popupDescription.value;
		modalAction.closePopup(popupEditName);
	}
}
