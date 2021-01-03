const page = document.querySelector('.page');
const popupButtonEdit = page.querySelector('.button_type_edit');
const popups = page.querySelectorAll('.popup');
const popupAddCard = page.querySelector('.popup_type_addCard');
const popupEditName = page.querySelector('.popup__editName');
const popupFormEdit = page.querySelector('.popup__container_type_edit');
const popupFormAddCard = page.querySelector('.popup__container_type_addCard');
const popupButtonAddCard = page.querySelector('.button_type_add');
const popupButtonsClose = page.querySelectorAll('.popup__close');
const cardsList = page.querySelector('.cards__list');
const popupName = page.querySelector('.popup__input_adding_name');
const popupDescription = page.querySelector('.popup__input_adding_description');
const popupCardName = page.querySelector('.popup__input_adding_cardName');
const popupCardLink = page.querySelector('.popup__input_adding_cardLink');
const profileDescription = page.querySelector('.profile__description');
const profileName = page.querySelector('.profile__name');
const popupGallery = page.querySelector('.popup_type_gallery');

const initialCards = [
	{
		name: 'Архыз',
		link: 'images/card-arhyz.jpg'
	},
	{
		name: 'Челябинская область',
		link: 'images/card-chelyabinsk-obl.jpg'
	},
	{
		name: 'Иваново',
		link: 'images/card-ivanovo.jpg'
	},
	{
		name: 'Камчатка',
		link: 'images/card-kamchatka.jpg'
	},
	{
		name: 'Холмогорский район',
		link: 'images/card-kholmogorskiy.jpg'
	},
	{
		name: 'Байкал',
		link: 'images/card-baykal.jpg'
	}
];

const validationSettings = {
	formSelector: '.popup__container',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_type_disabled',
	inputErrorClass: 'popup__input_type_error',
	closeErrorClass: 'popup__msgError_type_close',
}

import { Card } from './card.js';
import { FormValidator } from './validate.js';

export const modalAction = {
	determinGalleryItems: el => {
		const currentCard = el.target.closest('.card');
		const cardDescription = currentCard.querySelector('.card__description').textContent;
		const popupImg = popupGallery.querySelector('.popup__img');
		const popupDesc = popupGallery.querySelector('.popup__desc');
		popupImg.src = el.target.src;
		popupImg.alt = cardDescription;
		popupDesc.textContent = cardDescription;
		modalAction.openPopup(popupGallery);
	},

	openPopup: el => {
		el.classList.add('popup_type_open');
		document.addEventListener('keydown', modalAction.closePopupEsc);
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

	addCard: (link, name) => {
		const newCard = new Card(link, name);
		cardsList.prepend(newCard.getCardElement(newCard.name, newCard.link));
	},

	savePopupEditName: evt => {
		evt.preventDefault();
		profileName.textContent = popupName.value;
		profileDescription.textContent = popupDescription.value;
		modalAction.closePopup(popupEditName);
	}
}

const validateAddForm = new FormValidator(validationSettings, popupFormAddCard);
validateAddForm.enableValidation();

const validateEditForm = new FormValidator(validationSettings, popupEditName);
validateEditForm.enableValidation();

initialCards.forEach(card => {
	const startCard = new Card(card.name, card.link);
	cardsList.append(startCard.getCardElement(card.link, card.name));
	popups.forEach(item => item.addEventListener('click', modalAction.closePopupOverlay));
	popupButtonsClose.forEach(item => item.addEventListener('click', item => modalAction.closePopup(item.target.closest('.popup'))));
});

popupButtonAddCard.addEventListener('click', () => modalAction.openPopup(popupAddCard));
popupButtonEdit.addEventListener('click', () => modalAction.openPopup(popupEditName));
popupFormAddCard.addEventListener('submit', modalAction.createPopupAddCard);
popupFormEdit.addEventListener('submit', modalAction.savePopupEditName);