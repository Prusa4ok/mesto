const blockButtonAddCard = () => {
	popupButtonAddCardCreate.disabled = true;
	if (!popupButtonAddCardCreate.classList.contains(parameters.inactiveButtonClass)) {
		popupButtonAddCardCreate.classList.add(parameters.inactiveButtonClass);
	}
}

let parameters = {};

const enableValidation = (obj) => {
	parameters = obj;
}

const defineInputs = evt => {
	return inputs = evt.target.closest(parameters.formSelector).querySelectorAll(`.${parameters.inputSelector}`);
}

const checkCardInputs = evt => {
	defineInputs(evt);
	const checking = () => {
		for (let i = 0; i < inputs.length; i++) {
			if (inputs[i].classList.contains(parameters.inputErrorClass)) {
				break;
			}
			else {
				return true;
			}
		}
	}
	if (inputs[0].value.length > 0 && inputs[1].value.length > 0) {
		return checking();
	}
}


function enabledPopupButton(evt) {
	const currentContainer = evt.target.closest(parameters.formSelector);
	const currentButton = currentContainer.querySelector(parameters.submitButtonSelector);
	currentContainer.querySelector(parameters.submitButtonSelector).classList.remove(parameters.inactiveButtonClass);
	if (currentButton.disabled === true) {
		currentButton.disabled = false;
	}
}

const disabledPopupButton = evt => {
	const currentContainer = evt.target.closest(parameters.formSelector);
	const currentButton = currentContainer.querySelector(parameters.submitButtonSelector);
	currentContainer.querySelector(parameters.submitButtonSelector).classList.add(parameters.inactiveButtonClass);
	if (currentButton.disabled === false) {
		currentButton.disabled = true;
	}
}

const deleteInputError = evt => {
	if (evt.target.classList.contains(parameters.inputSelector)) {
		const currentInputId = evt.target.id;
		const msgErrorEl = page.querySelector(`#${currentInputId}-error`);
		evt.target.classList.remove(parameters.inputErrorClass);
		msgErrorEl.classList.add(parameters.errorClass);
	}
	if (checkCardInputs(evt)) {
		enabledPopupButton(evt);
	}
}

const checkInputError = evt => {
	defineInputs(evt);
	const elErrorMessage = evt.target.closest(parameters.formSelector).querySelector(`#${evt.target.id}-error`);
	if (!evt.target.reportValidity()) {
		elErrorMessage.classList.remove(parameters.errorClass);
		elErrorMessage.textContent = evt.target.validationMessage;
		disabledPopupButton(evt);
	} else {
		elErrorMessage.classList.remove(parameters.errorClass);
		elErrorMessage.textContent = '';
	}
	for (let i = 0; i < inputs.length; i++) {
		if (!inputs[i].checkValidity()) {
			break;
		} else {
			deleteInputError(evt);
		}
	}
}

popupInputs.forEach(item => item.addEventListener('input', checkInputError));
popupInputs.forEach(item => item.addEventListener('keyup', checkCardInputs));


enableValidation({
	formSelector: '.popup__container',
	inputSelector: 'popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_type_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__msgError_type_close',
	inputLinkSelector: 'popupAddCardLink'
});