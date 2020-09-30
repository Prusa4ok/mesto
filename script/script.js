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
let buttonsLike = [];
let buttonsDelete = [];
let cardsImages = [];
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

//берём все лайки, корзины и изображения
const getButtonsPopups = () => {
	buttonsLike = page.querySelectorAll('.button__like');
	buttonsDelete = page.querySelectorAll('.button__delete');
	cardsImages = page.querySelectorAll('.card__img');
}

// удаление карточки
const handleDelete = el => {
	el = el.target.closest('.card').remove();
};

// лайк карточки
const handleLike = el => {
	el.target.classList.toggle('button__like_type_active');
};

//разворачиваем картинку для просмотра
let determinGalleryItems = (el) => {
	let currentCard = el.target.closest('.card');
	let cardDescription = currentCard.querySelector('.card__description').textContent;
	let popupImg = popupGallery.querySelector('.popup__img');
	let popupDesc = popupGallery.querySelector('.popup__desc');
	popupImg.src = el.target.src;
	popupImg.alt = cardDescription;
	popupDesc.textContent = cardDescription;
	openImg();
}

const openImg = () => {
	togglePopupOpen(popupGallery);
}


// добавляем карточку, обновляем список кнопок и задаём нажатиям функции
const getCardElement = (link, name) => {
	const card = tempCard.cloneNode(true);

	card.querySelector('.card__img').src = link;
	card.querySelector('.card__img').alt = name;
	card.querySelector('.card__description').textContent = name;

	return card;
}

const addCard = (link, name) => {
	cardsList.prepend(getCardElement(link, name));

	getButtonsPopups();

	cardsImages.forEach(item => item.addEventListener('click', determinGalleryItems));
	buttonsDelete.forEach(item => item.addEventListener('click', handleDelete));
	buttonsLike.forEach(item => item.addEventListener('click', handleLike));
}

function togglePopupEditName() {
	togglePopupOpen(popupEditName);
	popupName.value = profileName.textContent;
	popupDescription.value = profileDescription.textContent;
}

const togglePopupOpen = (el) => el.classList.toggle('popup_type_open');

const createPopupAddCard = (evt) => {
	evt.preventDefault();
	addCard(popupCardLink.value, popupCardName.value);
	popupCardLink.value = '';
	popupCardName.value = '';
	togglePopupOpen(popupAddCard);
}

function SavePopupEditName(evt) {
	evt.preventDefault();
	profileName.textContent = popupName.value;
	profileDescription.textContent = popupDescription.value;
	togglePopupOpen(popupEditName);
}

const popupAddCardToggle = () => {
	togglePopupOpen(popupAddCard);
}

initialCards.forEach(card => addCard(card.link, card.name));

edit.addEventListener('click', togglePopupEditName);
popupButtonAddCard.addEventListener('click', popupAddCardToggle);

// закрывание попапа
const closePopup = (el) => {
	el.target.closest('.popup').classList.remove('popup_type_open');
}

popupButtonsClose.forEach(item => item.addEventListener('click', closePopup));
popupFormEdit.addEventListener('submit', SavePopupEditName);
popupFormAddCard.addEventListener('submit', createPopupAddCard);
