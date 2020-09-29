const page = document.querySelector('.page');
const edit = page.querySelector('.button_type_edit');
const popups = page.querySelectorAll('.popup');
const popupAddCard = page.querySelector('.popup_type_addCard');
const popupEditName = page.querySelector('.popup__editName');
const popupGallery = page.querySelector('.popup_type_gallery');
const popupFormEdit = page.querySelector('.popup__container_type_edit');
const popupFormAddCard = page.querySelector('.popup__container_type_addCard');
const popupButtonAddCard = page.querySelector('.button_type_add');
const popupButtonClose = page.querySelectorAll('.popup__close');
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
	el = el.target.closest('.card');
	el.remove();
};

// лайк карточки
const handleLike = el => {
	el.target.classList.toggle('button__like_type_active');
};

//разворачиваем картинку для просмотра
const openImg = (el, img) => {
	img = el.target.src;
	let currentCard = el.target.closest('.card');
	let cardDescription = currentCard.querySelector('.card__description').innerText;
	popupImg = popupGallery.querySelector('.popup__img');
	popupDesc = popupGallery.querySelector('.popup__desc');
	popupGallery.classList.toggle('popup_type_open');
	popupImg.src = img;
	popupDesc.innerText = cardDescription;
}


// добавляем карточку, обновляем список кнопок и задаём нажатиям функции
const addCard = (link, name) => {
	const card = tempCard.cloneNode(true);

	card.querySelector('.card__img').src = link;
	card.querySelector('.card__description').innerText = name;

	cardsList.prepend(card);
	getButtonsPopups();

	cardsImages.forEach(item => item.addEventListener('click', openImg));
	buttonsDelete.forEach(item => item.addEventListener('click', handleDelete));
	buttonsLike.forEach(item => item.addEventListener('click', handleLike));
}

function popupEditNameToggle() {
	popupEditName.classList.toggle('popup_type_open');
	if (popupEditName.classList.contains('popup_type_open')) {
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
	popupEditName.classList.toggle('popup_type_open');
}

const popupAddCardToggle = () => {
	popupAddCard.classList.toggle('popup_type_open');
}

initialCards.forEach(card => addCard(card.link, card.name));

edit.addEventListener('click', popupEditNameToggle);
popupButtonAddCard.addEventListener('click', popupAddCardToggle);

// закрывание попапа
const popupClose = () => {
	popups.forEach(item => {
		if (item.classList.contains('popup_type_open') != false) {
			item.classList.toggle('popup_type_open');
		}
	})
}

popupButtonClose.forEach(item => item.addEventListener('click', popupClose));
popupFormEdit.addEventListener('submit', popupEditNameSave, false);
popupFormAddCard.addEventListener('submit', popupAddCardCreate, false);
