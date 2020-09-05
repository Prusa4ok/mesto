const page = document.querySelector('.page');
const edit = page.querySelector('.button_type_edit');
const popup = page.querySelector('.popup');
const popupForm = page.querySelector('.popup__container');
const popupButtonClose = page.querySelector('.popup__close');
const popupButtonSave = page.querySelector('.popup__button');
const profileName = page.querySelector('.profile__name');
const profileDescription = page.querySelector('.profile__description');
const popupName = page.querySelector('.popup_input_name');
const popupDescription = page.querySelector('.popup_input_description');

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

edit.addEventListener('click', popupToggle);

popupButtonClose.addEventListener('click', popupToggle);

popupForm.addEventListener('submit', popupSave, false);
