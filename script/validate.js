const blockButtonAddCard = () => {
	popupButtonAddCardCreate.disabled = true;
	if (!popupButtonAddCardCreate.classList.contains('popup__button_type_disabled')) {
		popupButtonAddCardCreate.classList.add('popup__button_type_disabled');
	}
}

const enableValidation = array => {

	const checkCardInputs = evt => {
		const inputs = evt.target.closest(array.formSelector).querySelectorAll(`.${array.inputSelector}`);
		const checking = () => {
			return !inputs[0].classList.contains(array.inputErrorClass) && !inputs[1].classList.contains(array.inputErrorClass);
		}
		if (inputs[0].value.length > 0 && inputs[1].value.length > 0) {
			return checking();
		}
	}

	const enabledPopupButton = evt => {
		const currentContainer = evt.target.closest(array.formSelector);
		const currentButton = currentContainer.querySelector(array.submitButtonSelector);
		currentContainer.querySelector(array.submitButtonSelector).classList.remove(array.inactiveButtonClass);
		if (currentButton.disabled === true) {
			currentButton.disabled = false;
		}
	}

	const disabledPopupButton = evt => {
		const currentContainer = evt.target.closest(array.formSelector);
		const currentButton = currentContainer.querySelector(array.submitButtonSelector);
		currentContainer.querySelector(array.submitButtonSelector).classList.add(array.inactiveButtonClass);
		if (currentButton.disabled === false) {
			currentButton.disabled = true;
		}
	}

	const deleteInputError = (evt) => {
		if (evt.target.classList.contains(array.inputSelector)) {
			const currentInputId = evt.target.id;
			const msgErrorEl = page.querySelector(`#${currentInputId}-error`);
			evt.target.classList.remove(array.inputErrorClass);
			msgErrorEl.classList.add(array.errorClass);
		}
		if (checkCardInputs(evt)) {
			enabledPopupButton(evt);
		}
	}

	const checkInputError = evt => {
		const elErrorMessage = evt.target.closest(array.formSelector).querySelector(`#${evt.target.id}-error`);
		if (!evt.target.reportValidity()) {
			elErrorMessage.classList.remove(array.errorClass);
			elErrorMessage.textContent = evt.target.validationMessage;
			disabledPopupButton(evt);
		} else {
			elErrorMessage.classList.remove(array.errorClass);
			elErrorMessage.textContent = '';
			deleteInputError(evt)
		}
	}

	popupInputs.forEach(item => item.addEventListener('keyup', checkInputError));
	popupInputs.forEach(item => item.addEventListener('keyup', checkCardInputs));
}

enableValidation({
	formSelector: '.popup__container',
	inputSelector: 'popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_type_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__msgError_type_close',
	inputLinkSelector: 'popupAddCardLink'
});