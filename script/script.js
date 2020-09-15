const page = document.querySelector('.page');
const edit = page.querySelector('.button_type_edit');
const popup = page.querySelector('.popup');
const popupForm = page.querySelector('.popup__container');
const popupButtonClose = page.querySelector('.popup__close');
const popupButtonSave = page.querySelector('.popup__button');
const profileName = page.querySelector('.profile__name');
const profileDescription = page.querySelector('.profile__description');
const popupName = page.querySelector('.popup__input_adding_name');
const popupDescription = page.querySelector('.popup__input_adding_description');
const tempCard = page.querySelector('#tempCard').content;
const cardsList = page.querySelector('.cards__list');

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

const addCards = (link, name) => {
	const autoCard = tempCard.cloneNode(true);

	autoCard.querySelector('.card__img').src = link;
	autoCard.querySelector('.card__description').innerText = name;

	cardsList.append(autoCard);
}

function popupToggle() {
	popup.classList.toggle('popup_js-open-close');
	if (popup.classList.contains('popup_js-open-close')) {
		popupName.value = profileName.textContent;
		popupDescription.value = profileDescription.textContent;
	}
}

function popupSave(evt) {
	evt.preventDefault();
	profileName.textContent = popupName.value;
	profileDescription.textContent = popupDescription.value;
	popup.classList.toggle('popup_js-open-close');
}

initialCards.forEach(card => addCards(card.link, card.name));

edit.addEventListener('click', popupToggle);

popupButtonClose.addEventListener('click', popupToggle);

popupForm.addEventListener('submit', popupSave, false);
