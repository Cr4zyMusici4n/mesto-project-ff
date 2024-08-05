import '@styles/pages/index.css';
import { initialCards } from './cards';
import { renderCards } from './renderCards';
import { openPopup, setClassToPopups } from './popups';

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

renderCards(initialCards);
setClassToPopups();


buttonEditProfile.addEventListener('click', () => openPopup('popupProfileEdit'));
buttonAddCard.addEventListener('click', () => openPopup('popupNewCard'));
