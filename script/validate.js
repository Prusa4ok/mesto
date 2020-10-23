const blockButton = (input, formSelector, submitButtonSelector, inactiveButtonClass) => {
	activeButton(input, formSelector, submitButtonSelector).classList.add(inactiveButtonClass);
	activeButton(input, formSelector, submitButtonSelector).setAttribute('disabled', true);
}

const unblockButton = (input, formSelector, submitButtonSelector, inactiveButtonClass) => {
	activeButton(input, formSelector, submitButtonSelector).classList.remove(inactiveButtonClass);
	activeButton(input, formSelector, submitButtonSelector).removeAttribute('disabled');
}

const showErrorMessage = (input, closeErrorClass, formSelector) => {
	activeForm(input, formSelector).querySelector(`#${input.id}-error`).classList.remove(closeErrorClass);
	activeForm(input, formSelector).querySelector(`#${input.id}-error`).innerText = input.validationMessage;
}

const removeErrorMessage = (input, closeErrorClass, formSelector) => {
	activeForm(input, formSelector).querySelector(`#${input.id}-error`).classList.add(closeErrorClass);
}

const getInputs = inputSelector => page.querySelectorAll(inputSelector);
const getActiveInputList = (openedPopup, inputSelector) => openedPopup.querySelectorAll(inputSelector).forEach('input', item => console.log(item));
const activeForm = (el, form) => el.closest(form);
const activeButton = (input, formSelector, submitButtonSelector) => activeForm(input, formSelector).querySelector(submitButtonSelector);

const addInputError = (input, inputErrorClass) => input.classList.add(inputErrorClass);
const removeInputError = (input, inputErrorClass) => input.classList.remove(inputErrorClass);

const checkValidityState = (input, inputErrorClass, formSelector, submitButtonSelector, inactiveButtonClass, closeErrorClass) => {
	if (input.validity.valid) {
		if (input.classList.contains(inputErrorClass)) {
			removeInputError(input, inputErrorClass);
			removeErrorMessage(input, closeErrorClass, formSelector);
		}
	} else if (!input.validity.valid) {
		addInputError(input, inputErrorClass);
		showErrorMessage(input, closeErrorClass, formSelector);
	}
	if (activeForm(input, formSelector).querySelector(`.${inputErrorClass}`)) {
		blockButton(input, formSelector, submitButtonSelector, inactiveButtonClass);
	} else unblockButton(input, formSelector, submitButtonSelector, inactiveButtonClass);
}

const defineFormSelector = (activePopup, evt) => openedPopup = evt.target.closest(activePopup);

const enableValidation = validationConfig => {

	const inputs = getInputs(validationConfig.inputSelector);

	inputs.forEach(item => item.addEventListener('input', evt => {
		defineFormSelector(validationConfig.activePopup, evt),
			checkValidityState(evt.target, validationConfig.inputErrorClass, validationConfig.formSelector, validationConfig.submitButtonSelector,
				validationConfig.inactiveButtonClass, validationConfig.closeErrorClass);
	}));
}

enableValidation({
	formSelector: '.popup__container',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_type_disabled',
	inputErrorClass: 'popup__input_type_error',
	closeErrorClass: 'popup__msgError_type_close',
	activePopup: '.popup_type_open'
});