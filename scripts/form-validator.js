export class FormValidator {
	constructor(settings, formElement) {
		this._formElement = formElement;
		this._settings = settings;
	}

	enableValidation = () => {
		this._setInputListValidity();
		this._blockButtonAfterPress();
	}

	_validateInput = evt => {
		const currentInput = evt.target;
		const currentSubmitButton = this._formElement.querySelector(this._settings.submitButtonSelector);

		if (!currentInput.checkValidity()) {
			this._formElement.querySelector(`#${currentInput.id}-error`).classList.remove(this._settings.closeErrorClass)
			this._formElement.querySelector(`#${currentInput.id}-error`).innerText = currentInput.validationMessage;
		} else {
			this._formElement.querySelector(`#${currentInput.id}-error`).classList.add(this._settings.closeErrorClass)
		}

		let checker = 0;
		this._getInputList().forEach(i => {
			if (i.checkValidity()) {
				checker++
			}
		})

		if (checker === this._getInputList().length) {
			if (currentSubmitButton.classList.contains(this._settings.inactiveButtonClass)) {
				currentSubmitButton.classList.remove(this._settings.inactiveButtonClass);
				currentSubmitButton.disabled = false;
			}
		} else if (!currentSubmitButton.classList.contains(this._settings.inactiveButtonClass)) {
			currentSubmitButton.classList.add(this._settings.inactiveButtonClass);
			currentSubmitButton.disabled = true;
		}
	}

	_getInputList = () => { return this._formElement.querySelectorAll(this._settings.inputSelector); }

	_setInputListValidity = () => {
		this._getInputList().forEach(input => input.addEventListener('keyup', this._validateInput));
	}

	_blockButtonAfterPress = () => {
		const popupButtonAddCard = document.querySelector('#popupAddCardCreateButton');

		popupButtonAddCard.addEventListener('click', () => {
			setTimeout(() => {
				popupButtonAddCard.classList.add(this._settings.inactiveButtonClass);
				popupButtonAddCard.disabled = true;
			}, 10);
		})
	}
}