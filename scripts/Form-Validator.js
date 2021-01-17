import { page } from '../utils/constants.js'

export class FormValidator {
	constructor(settings, formElement) {
		this._formElement = formElement;
		this._settings = settings;
	}

	enableValidation = () => {
		const currentPopup = page.querySelector(this._settings.openPopupClass);
		if (currentPopup.querySelector(this._settings.inputSelector) != null) {
			this._setInputListValidity();
			this._blockCurrentButton();
			this._hideInputsMsgError();
		}
	}

	_validateInput = evt => {
		const currentInput = evt.target;

		if (!currentInput.checkValidity()) {
			this._formElement.querySelector(`#${currentInput.id}-error`).classList.remove(this._settings.closeErrorClass)
			this._formElement.querySelector(`#${currentInput.id}-error`).innerText = currentInput.validationMessage;
		} else {
			this._formElement.querySelector(`#${currentInput.id}-error`).classList.add(this._settings.closeErrorClass)
		}

		let checker = 0;
		this._getInputList().forEach(input => {
			if (input.checkValidity()) {
				checker++
			}
		})

		if (checker === this._getInputList().length) {
			this._unblockCurrentButton();
		} else {
			this._blockCurrentButton();
		}
	}

	_getInputList = () => { return this._formElement.querySelectorAll(this._settings.inputSelector); }

	_setInputListValidity = () => {
		this._getInputList().forEach(input => input.addEventListener('keyup', this._validateInput));
	}
	_hideInputsMsgError = () => {
		const currentPopup = page.querySelector(this._settings.openPopupClass);
		currentPopup.querySelectorAll(`.${this._settings.errorClass}`).forEach(msg => {
			if (!msg.classList.contains(this._settings.closeErrorClass))
				msg.classList.add(this._settings.closeErrorClass);
		});
	}

	_blockCurrentButton = () => {
		const currentButton = page.querySelector(this._settings.openPopupClass).querySelector(this._settings.submitButtonSelector);
		currentButton.classList.add(this._settings.inactiveButtonClass);
		currentButton.disabled = true;
	}

	_unblockCurrentButton = () => {
		const currentButton = page.querySelector(this._settings.openPopupClass).querySelector(this._settings.submitButtonSelector);
		currentButton.classList.remove(this._settings.inactiveButtonClass);
		currentButton.disabled = false;
	}
}
