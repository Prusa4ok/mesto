const page = document.querySelector('.page');
const edit = page.querySelector('.button_type_edit');
const popups = page.querySelectorAll('.popup');
const popupAddCard = page.querySelector('.popup_type_addCard');
const popupEditName = page.querySelector('.popup__editName');
const popupInputs = page.querySelectorAll('.popup__input');
const popupGallery = page.querySelector('.popup_type_gallery');
const popupFormEdit = page.querySelector('.popup__container_type_edit');
const popupFormAddCard = page.querySelector('.popup__container_type_addCard');
const popupButtonAddCard = page.querySelector('.button_type_add');
const popupButtonAddCardCreate = page.querySelector('#popupAddCardCreate');
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

const inputLength = {
	popupEditAddName: [2, 40],
	popupEditAddDesc: [2, 200],
	popupAddCardName: [2, 30]
}


const handleDelete = event => {
	event.target.closest('.card').remove();
};

const handleLike = el => {
	el.target.classList.toggle('button__like_type_active');
};

// разворачиваем картинку для просмотра
let determinGalleryItems = el => {
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
	togglePopupOpen(popupGallery);
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

function togglePopupEditName() {
	togglePopupOpen(popupEditName);
	popupName.value = profileName.textContent;
	popupDescription.value = profileDescription.textContent;
}

const togglePopupOpen = el => {
	el.classList.toggle('popup_type_open');
	popupButtonAddCardCreate.disabled = true;
	if (!popupButtonAddCardCreate.classList.contains('popup__button_type_disabled')) {
		popupButtonAddCardCreate.classList.add('popup__button_type_disabled');
	}
}

const createPopupAddCard = evt => {
	evt.preventDefault();
	addCard(popupCardLink.value, popupCardName.value);
	popupCardLink.value = '';
	popupCardName.value = '';
	togglePopupOpen(popupAddCard);
}

function savePopupEditName(evt) {
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
const closePopup = evt => {
	evt.target.closest('.popup').classList.remove('popup_type_open');
}

const closePopupOverlay = evt => {
	if (evt.target.classList.contains('page__popup')) {
		closePopup(evt);
	}
}

const closePopupEsc = evt => {
	if (evt.key === 'Escape') {
		popups.forEach(item => {
			if (item.classList.contains('popup_type_open')) {
				item.classList.remove('popup_type_open');
			};
		});
	}
}

page.addEventListener('keydown', closePopupEsc);
popups.forEach(item => item.addEventListener('click', closePopupOverlay));
popupButtonsClose.forEach(item => item.addEventListener('click', closePopup));
popupFormEdit.addEventListener('submit', savePopupEditName);
popupFormAddCard.addEventListener('submit', createPopupAddCard);

// валидация формы addCard
const msgError = (evt, value) => {
	if (value === 'link-empty') {
		return 'Вы пропустили это поле.'
	} else if (value === 'link-error') {
		return 'Введите адрес сайта.'
	} else if (value === undefined) {
		return 'Вы пропустили это поле.'
	} else if (value === 'less') {
		return `Минимальное количество символов: ${inputLength[evt.target.id][0]}. Длина текста сейчас: 1 символ.`
	} else if (value === 'more') {
		return `Максимальное количество символов: ${inputLength[evt.target.id][1]}. Длина текста сейчас: ${el.target.value.length} символов.`
	}
}

const checkCardInputs = evt => {
	const inputs = evt.target.closest('.popup__container').querySelectorAll('.popup__input');
	const checking = () => {
		return !inputs[0].classList.contains('popup__input_type_error') && !inputs[1].classList.contains('popup__input_type_error');
	}
	if (inputs[0].value.length > 0 && inputs[1].value.length > 0) {
		return checking();
	}
}

const enabledPopupButton = evt => {
	const currentContainer = evt.target.closest('.popup__container');
	const currentButton = currentContainer.querySelector('.popup__button');
	currentContainer.querySelector('.popup__button').classList.remove('popup__button_type_disabled');
	if (currentButton.disabled === true) {
		currentButton.disabled = false;
	}
}

const disabledPopupButton = evt => {
	const currentContainer = evt.target.closest('.popup__container');
	const currentButton = currentContainer.querySelector('.popup__button');
	currentContainer.querySelector('.popup__button').classList.add('popup__button_type_disabled');
	if (currentButton.disabled === false) {
		currentButton.disabled = true;
	}
}

const addInputError = (evt, error) => {
	if (evt.target.classList.contains('popup__input')) {
		const currentInputId = evt.target.id;
		const msgErrorEl = page.querySelector(`#${currentInputId}-error`);
		evt.target.classList.add('popup__input_type_error');
		msgErrorEl.classList.remove('popup__msgError_type_close');
		msgErrorEl.textContent = error;
	}
	if (!checkCardInputs(evt)) {
		disabledPopupButton(evt);
	}
}

const deleteInputError = (evt) => {
	if (evt.target.classList.contains('popup__input')) {
		const currentInputId = evt.target.id;
		const msgErrorEl = page.querySelector(`#${currentInputId}-error`);
		evt.target.classList.remove('popup__input_type_error');
		msgErrorEl.classList.add('popup__msgError_type_close');
	}
	if (checkCardInputs(evt)) {
		enabledPopupButton(evt);
	}
}

const isUrl = value => {
	const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
	if (regexp.test(value)) {
		return true;
	}
	else {
		return false;
	}
}

// применяем toggleInputError при условии
const checkInputError = evt => {
	const currentInputLength = evt.target.value.length;
	let inputLengthText;
	if (evt.target.id === 'popupAddCardLink') {
		if (currentInputLength === 0) {
			addInputError(evt, msgError(evt, 'link-empty'));
		} else if (!isUrl(evt.target.value)) {
			addInputError(evt, msgError(evt, 'link-error'));
		} else if (isUrl(evt.target.value)) {
			deleteInputError(evt);
		}
	} else {
		if (currentInputLength === 0) {
			addInputError(evt, msgError(evt, inputLengthText));
		} else if (currentInputLength < inputLength[evt.target.id][0]) {
			inputLengthText = 'less';
			addInputError(evt, msgError(evt, inputLengthText));
		} else if (currentInputLength >= inputLength[evt.target.id][0] && currentInputLength <= inputLength[evt.target.id][1]) {
			inputLengthText = 'matches';
			deleteInputError(evt, msgError(evt, inputLengthText));
		} else if (currentInputLength > inputLength[evt.target.id][1]) {
			inputLengthText = 'more';
			addInputError(evt, msgError(evt, inputLengthText));
		}
	}
}

popupInputs.forEach(item => item.addEventListener('keyup', checkInputError));
popupInputs.forEach(item => item.addEventListener('keyup', checkCardInputs));