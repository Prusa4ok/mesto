export class FormValidator {
	constructor(settings, formElement) {
		this._formElement = formElement;
		this._settings = settings;
	}

	enableValidation = () => {
		this._setInputListValidity();
	}

	_validation = (evt, inputList) => {
		const currentInput = evt.target;

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
			if (this._formElement.querySelector(this._settings.submitButtonSelector).classList.contains(this._settings.inactiveButtonClass)) {
				this._formElement.querySelector(this._settings.submitButtonSelector).classList.remove(this._settings.inactiveButtonClass);
				this._formElement.querySelector(this._settings.submitButtonSelector).disabled = false;
			}
		} else if (!this._formElement.querySelector(this._settings.submitButtonSelector).classList.contains(this._settings.inactiveButtonClass)) {
			this._formElement.querySelector(this._settings.submitButtonSelector).classList.add(this._settings.inactiveButtonClass);
			this._formElement.querySelector(this._settings.submitButtonSelector).disabled = true;
		}
	}

	_getInputList = () => { return this._formElement.querySelectorAll(this._settings.inputSelector); }

	_setInputListValidity = () => {
		this._getInputList().forEach(i => i.addEventListener('keyup', this._validation));
	}
}