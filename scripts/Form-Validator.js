import { page } from '../utils/constants.js'

export class FormValidator {
	constructor(settings, formElement) {
		this._formElement = formElement;
		this._settings = settings;
	}

	enableValidation = () => {
		if (this._formElement.querySelector(this._settings.inputSelector) != null) {
			this._setInputListValidity();
			this._getCurrentButton();
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

		this._checkInput();
	}

	_checkInput = () => {
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

	_getCurrentButton = () => {
		this._currentButton = this._formElement.querySelector(this._settings.submitButtonSelector);
	}

	_setInputListValidity = () => {
		this._getInputList().forEach(input => input.addEventListener('keyup', this._validateInput));
	}

	_hideInputsMsgError = () => {
		this._formElement.querySelectorAll(`.${this._settings.errorClass}`).forEach(msg => {
			if (!msg.classList.contains(this._settings.closeErrorClass))
				msg.classList.add(this._settings.closeErrorClass);
		});
	}

	_blockCurrentButton = () => {
		if (this._currentButton) {
			this._currentButton.classList.add(this._settings.inactiveButtonClass);
			this._currentButton.disabled = true;
		}
	}

	_unblockCurrentButton = () => {
		if (page.querySelector(this._settings.openPopupClass)) {
			const currentButton = page.querySelector(this._settings.openPopupClass).querySelector(this._settings.submitButtonSelector);
			currentButton.classList.remove(this._settings.inactiveButtonClass);
			currentButton.disabled = false;
		}
	}
}