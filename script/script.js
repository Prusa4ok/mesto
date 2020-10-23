const page = document.querySelector('.page');
const edit = page.querySelector('.button_type_edit');
const popups = page.querySelectorAll('.popup');
const popupAddCard = page.querySelector('.popup_type_addCard');
const popupEditName = page.querySelector('.popup__editName');
const popupGallery = page.querySelector('.popup_type_gallery');
const popupFormEdit = page.querySelector('.popup__container_type_edit');
const popupFormAddCard = page.querySelector('.popup__container_type_addCard');
const popupButtonAddCard = page.querySelector('.button_type_add');
const popupButtonsClose = page.querySelectorAll('.popup__close');
const popupName = page.querySelector('.popup__input_adding_name');
const popupDescription = page.querySelector('.popup__input_adding_description');
const popupCardName = page.querySelector('.popup__input_adding_cardName');
const popupCardLink = page.querySelector('.popup__input_adding_cardLink');
const profileDescription = page.querySelector('.profile__description');
const profileName = page.querySelector('.profile__name');
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

const handleDelete = event => {
	event.target.closest('.card').remove();
};

const handleLike = el => {
	el.target.classList.toggle('button__like_type_active');
};

// разворачиваем картинку для просмотра
const determinGalleryItems = el => {
	const currentCard = el.target.closest('.card');
	const cardDescription = currentCard.querySelector('.card__description').textContent;
	const popupImg = popupGallery.querySelector('.popup__img');
	const popupDesc = popupGallery.querySelector('.popup__desc');
	popupImg.src = el.target.src;
	popupImg.alt = cardDescription;
	popupDesc.textContent = cardDescription;
	openImg();
}

const openImg = () => {
	openPopup(popupGallery);
}


// добавляем карточку, обновляем список кнопок и задаём нажатиям функции
const getCardElement = (link, name) => {
	const card = tempCard.cloneNode(true);
	const cardImg = card.querySelector('.card__img');
	const cardButtonDelete = card.querySelector('.button__delete');
	const cardButtonLike = card.querySelector('.button__like');

	cardImg.src = link;
	cardImg.alt = name;
	card.querySelector('.card__description').textContent = name;

	cardImg.addEventListener('click', determinGalleryItems);
	cardButtonDelete.addEventListener('click', handleDelete);
	cardButtonLike.addEventListener('click', handleLike);

	return card;
}

const addCard = (link, name) => {
	cardsList.prepend(getCardElement(link, name));
}

const addStartCard = (link, name) => {
	cardsList.append(getCardElement(link, name));
}

function togglePopupEditName() {
	openPopup(popupEditName);
	popupName.value = profileName.textContent;
	popupDescription.value = profileDescription.textContent;
}

const closePopup = el => {
	el.classList.remove('popup_type_open');
	document.removeEventListener('keydown', closePopupEsc);
}

const openPopup = el => {
	el.classList.add('popup_type_open');
	document.addEventListener('keydown', closePopupEsc);
}

const createPopupAddCard = evt => {
	evt.preventDefault();
	addCard(popupCardLink.value, popupCardName.value);
	popupCardLink.value = '';
	popupCardName.value = '';
	closePopup(popupAddCard);
}

function savePopupEditName(evt) {
	evt.preventDefault();
	profileName.textContent = popupName.value;
	profileDescription.textContent = popupDescription.value;
	closePopup(popupEditName);
}

const popupAddCardToggle = () => {
	openPopup(popupAddCard);
}

initialCards.forEach(card => addStartCard(card.link, card.name));

edit.addEventListener('click', togglePopupEditName);
popupButtonAddCard.addEventListener('click', popupAddCardToggle);

const closePopupOverlay = evt => {
	if (evt.target.classList.contains('page__popup')) {
		closePopup(evt.target);
	}
}

const closePopupEsc = evt => {
	if (evt.key === 'Escape') {
		closePopup(page.querySelector('.popup_type_open'));
	};
}

popups.forEach(item => item.addEventListener('click', closePopupOverlay));
popupButtonsClose.forEach(item => item.addEventListener('click', item => closePopup(item.target.closest('.popup'))));
popupFormEdit.addEventListener('submit', savePopupEditName);
popupFormAddCard.addEventListener('submit', createPopupAddCard);