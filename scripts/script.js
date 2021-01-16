import { Card } from './Card.js';
import { modalAction } from '../utils/utils.js'
import {
	initialCards,
	popupFormAddCard,
	popupAddCard,
	popupEditName,
	cardsList,
	popupButtonsClose,
	popups,
	buttonOpenPopupAddCard,
	popupButtonEdit,
	popupFormEdit,
	popupCardLink,
	popupCardName,
} from '../utils/constants.js'

initialCards.forEach(card => {
	const startCard = new Card(card.name, card.link);
	cardsList.append(startCard.getCardElement(card.link, card.name));
});


const addCard = (link, name) => {
	const newCard = modalAction.createCard(link, name);
	cardsList.prepend(newCard.getCardElement(newCard.name, newCard.link));
}

const createPopupAddCard = evt => {
	evt.preventDefault();
	addCard(popupCardLink.value, popupCardName.value);
	popupCardLink.value = '';
	popupCardName.value = '';
	modalAction.closePopup(popupAddCard);
}

popupButtonsClose.forEach(item => item.addEventListener('click', item => modalAction.closePopup(item.target.closest('.popup'))));
popups.forEach(item => item.addEventListener('click', modalAction.closePopupOverlay))
popupFormAddCard.addEventListener('submit', createPopupAddCard);
popupFormEdit.addEventListener('submit', modalAction.savePopupEditName);

popupButtonEdit.addEventListener('click', () => {
	modalAction.openPopup(popupEditName);
	modalAction.activateValidation(popupEditName);
});

buttonOpenPopupAddCard.addEventListener('click', () => {
	modalAction.openPopup(popupAddCard);
	modalAction.activateValidation(popupAddCard);
});
