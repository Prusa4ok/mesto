import { Card } from './card.js';
import { FormValidator } from './form-validator.js';
import { modalAction } from '../utils/utils.js'
import {
	validationSettings, initialCards, popupFormAddCard, popupAddCard, popupEditName, cardsList, popupButtonsClose,
	popups, buttonOpenPopupAddCard, popupButtonEdit, popupFormEdit
} from '../utils/constants.js'

const validateAddForm = new FormValidator(validationSettings, popupFormAddCard);
validateAddForm.enableValidation();

const validateEditForm = new FormValidator(validationSettings, popupEditName);
validateEditForm.enableValidation();

initialCards.forEach(card => {
	const startCard = new Card(card.name, card.link);
	cardsList.append(startCard.getCardElement(card.link, card.name));
});

popupButtonsClose.forEach(item => item.addEventListener('click', item => modalAction.closePopup(item.target.closest('.popup'))));
popups.forEach(item => item.addEventListener('click', modalAction.closePopupOverlay))
buttonOpenPopupAddCard.addEventListener('click', () => modalAction.openPopup(popupAddCard));
popupButtonEdit.addEventListener('click', () => modalAction.openPopup(popupEditName));
popupFormAddCard.addEventListener('submit', modalAction.createPopupAddCard);
popupFormEdit.addEventListener('submit', modalAction.savePopupEditName);