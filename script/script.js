const page = document.querySelector('.page'),
	edit = page.querySelector('.edit'),
	popup = page.querySelector('.popup'),
	popupButtonClose = page.querySelector('.popup__close'),
	popupButtonSave = page.querySelector('.popup__button'),
	profileName = page.querySelector('.profile__name'),
	profileDescription = page.querySelector('.profile__description'),
	popupName = page.querySelector('.popup__input_name'),
	popupDescription = page.querySelector('.popup__input_description');
;

function popupClose() {
	popup.classList.toggle('popup__js-open-close');
	popupName.value = profileName.textContent;
	popupDescription.value = profileDescription.textContent;
}

function popupSave() {
	profileName.innerHTML = popupName.value;
	profileDescription.innerHTML = popupDescription.value;
	popup.classList.toggle('popup__js-open-close');
}

edit.addEventListener('click', popupClose);

popupButtonClose.addEventListener('click', popupClose);

popupButtonSave.addEventListener('click', popupSave);
popupName.addEventListener('keypress', function (e) {
	if (e.key === 'Enter') {
		popupSave();
	}
});
popupDescription.addEventListener('keypress', function (e) {
	if (e.key === 'Enter') {
		popupSave();
	}
});