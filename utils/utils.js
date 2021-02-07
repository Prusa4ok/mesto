import { page } from '../utils/constants.js'

export const modalAction = {

	openPopup: el => {
		el.classList.add('popup_type_open');
		document.addEventListener('keydown', modalAction.closePopupEsc);
	},

	closePopupEsc: evt => {
		if (evt.key === 'Escape') {
			modalAction.closePopup(page.querySelector('.popup_type_open'));
		};
	},

	closePopup: el => {
		el.classList.remove('popup_type_open');
		document.removeEventListener('keydown', modalAction.closePopupEsc);
	},

	closePopupOverlay: evt => {
		if (evt.target.classList.contains('page__popup')) {
			modalAction.closePopup(evt.target);
		}
	}
}