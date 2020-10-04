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