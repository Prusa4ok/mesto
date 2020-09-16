const page = document.querySelector('.page');
const edit = page.querySelector('.button_type_edit');
const popupEditName = page.querySelector('.popup_type_editName-close');
const popupAddCard = page.querySelector('.popup_type_addCard-close');
const popupFormEdit = page.querySelector('.popup__container_type_edit');
const popupFormAddCard = page.querySelector('.popup__container_type_addCard');
const popupButtonAddCard = page.querySelector('.button_type_add');
const popupButtonClose = page.querySelectorAll('.popup__close');
const profileName = page.querySelector('.profile__name');
const profileDescription = page.querySelector('.profile__description');
const popupName = page.querySelector('.popup__input_adding_name');
const popupDescription = page.querySelector('.popup__input_adding_description');
const popupCardName = page.querySelector('.popup__input_adding_cardName');
const popupCardLink = page.querySelector('.popup__input_adding_cardLink');
const cardsList = page.querySelector('.cards__list');
const tempCard = page.querySelector('#tempCard').content;

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

const addCard = (link, name) => {
	const card = tempCard.cloneNode(true);

	card.querySelector('.card__img').src = link;
	card.querySelector('.card__description').innerText = name;

	cardsList.append(card);
}

function popupEditNameToggle() {
	popupEditName.classList.toggle('popup_type_editName-close');
	if (popupEditName.classList.contains('popup_type_editName-close')) {
		popupName.value = profileName.textContent;
		popupDescription.value = profileDescription.textContent;
	}
}

const popupAddCardCreate = (evt) => {
	evt.preventDefault();
	addCard(popupCardLink.value, popupCardName.value);
	popupCardLink.value = '';
	popupCardName.value = '';
	popupClose();
}

function popupEditNameSave(evt) {
	evt.preventDefault();
	profileName.textContent = popupName.value;
	profileDescription.textContent = popupDescription.value;
	popupEditName.classList.toggle('popup_type_editName-close');
}

const popupAddCardToggle = () => {
	popupAddCard.classList.toggle('popup_type_addCard-close');
}

const popupClose = () => {
	if (popupAddCard.classList.contains('popup_type_addCard-close')) {
		popupEditName.classList.toggle('popup_type_editName-close');
	} else if (popupEditName.classList.contains('popup_type_editName-close')) {
		popupAddCard.classList.toggle('popup_type_addCard-close');
	}
}

initialCards.forEach(card => addCard(card.link, card.name));

edit.addEventListener('click', popupEditNameToggle);
popupButtonAddCard.addEventListener('click', popupAddCardToggle);

popupButtonClose.forEach(item => item.addEventListener('click', popupClose));

popupFormEdit.addEventListener('submit', popupEditNameSave, false);
popupFormAddCard.addEventListener('submit', popupAddCardCreate, false);