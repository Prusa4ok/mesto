import { Card } from './Card.js';
import { FormValidator } from '../scripts/Form-Validator.js';
import { modalAction } from '../utils/utils.js'
import {
	validationSettings,
	initialCards,
	popupFormAddCard,
	popupAddCard,
	popupEditName,
	cardsList,
	popupButtonsClose,
	popupButtonEdit,
	popups,
	popupFormEdit,
	popupCardLink,
	popupCardName,
	buttonOpenPopupAddCard,
	profileName,
	popupName,
	popupDescription,
	profileDescription

} from '../utils/constants.js'

const validateAddForm = new FormValidator(validationSettings, popupFormAddCard);
validateAddForm.enableValidation();

const validateEditForm = new FormValidator(validationSettings, popupEditName);
validateEditForm.enableValidation();

const addCard = (link, name) => {
	const newCard = createCard(link, name);
	cardsList.prepend(newCard.getCardElement(newCard.name, newCard.link));
}

const deleteImputsValueAddCard = () => {
	popupAddCard.querySelectorAll('.popup__input').forEach(input => input.value = '');
}

const createPopupAddCard = evt => {
	evt.preventDefault();
	addCard(popupCardLink.value, popupCardName.value);
	deleteImputsValueAddCard();
	modalAction.closePopup(popupAddCard);
}

const createCard = (link, name) => {
	const newCard = new Card(link, name);
	return newCard;
}

initialCards.forEach(card => {
	const startCard = createCard(card.name, card.link);
	cardsList.append(startCard.getCardElement(card.link, card.name));
});

const fillEditProfileForm = () => {
	popupName.value = profileName.textContent;
	popupDescription.value = profileDescription.textContent;
}

const savePopupEditName = evt => {
	evt.preventDefault();
	profileName.textContent = popupName.value;
	profileDescription.textContent = popupDescription.value;
	modalAction.closePopup(popupEditName);
}

popupButtonsClose.forEach(item => item.addEventListener('click', item => modalAction.closePopup(item.target.closest('.popup'))));
popups.forEach(item => item.addEventListener('click', modalAction.closePopupOverlay))
popupFormAddCard.addEventListener('submit', createPopupAddCard);

popupFormEdit.addEventListener('submit', evt => {
	savePopupEditName(evt);
});

popupButtonEdit.addEventListener('click', () => {
	validateEditForm.enableValidation();
	fillEditProfileForm();
	modalAction.openPopup(popupEditName);
})

buttonOpenPopupAddCard.addEventListener('click', () => {
	modalAction.openPopup(popupAddCard);
	deleteImputsValueAddCard();
	validateAddForm.enableValidation();
});