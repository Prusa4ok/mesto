export const page = document.querySelector('.page');
export const popupAddCard = page.querySelector('.popup_type_addCard');
export const popupFormAddCard = page.querySelector('.popup__container_type_addCard');
export const popupEditName = page.querySelector('.popup_type_editName');
export const cardsList = page.querySelector('.cards__list');
export const popupButtonsClose = page.querySelectorAll('.popup__close');
export const popups = page.querySelectorAll('.popup');
export const buttonOpenPopupAddCard = page.querySelector('.button_type_add');
export const popupButtonEdit = page.querySelector('.button_type_edit');
export const popupFormEdit = page.querySelector('.popup__container_type_edit');
export const tempCard = page.querySelector('#tempCard').content;
export const popupGallery = page.querySelector('.popup_type_gallery');
export const popupName = page.querySelector('.popup__input_adding_name');
export const profileName = page.querySelector('.profile__name');
export const popupDescription = page.querySelector('.popup__input_adding_description');
export const profileDescription = page.querySelector('.profile__description');
export const popupCardLink = page.querySelector('.popup__input_adding_cardLink');
export const popupCardName = page.querySelector('.popup__input_adding_cardName');

export const initialCards = [
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

export const validationSettings = {
	formSelector: '.popup__container',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_type_disabled',
	inputErrorClass: 'popup__input_type_error',
	closeErrorClass: 'popup__msgError_type_close',
}