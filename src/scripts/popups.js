import { prependCard } from "./renderCards";

const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const formEditUserEl = document.querySelector('.popup__form[name="edit-profile"]');
const formAddCardEl = document.querySelector('.popup__form[name="new-place"]');

const popups = {
  popupProfileEdit,
  popupNewCard,
  popupImage,
}

let openedPopupName;

function setClassToPopups () {
  for (const popup of Object.values(popups)) {
    popup.classList.add('popup_is-animated');
  }
}

function openPopup (popupName, cardEl) {
  const currentPopup = popups[popupName];
  if(!currentPopup) return;
  openedPopupName = popupName;

  if (popupName === 'popupProfileEdit') {
    loadUserForm();
  }

  if (popupName === 'popupImage') {
    loadImagePopup(cardEl);
  }

  const closeButton = currentPopup.querySelector('.popup__close');
  currentPopup.classList.add('popup_is-opened');

  closeButton.addEventListener('click', closePopup);
  document.addEventListener('keydown', closePopup);
  currentPopup.addEventListener('click', closePopup);
}

function closePopup (evt) {
  if (evt?.type === 'click' && evt?.target !== this) return
  if (evt?.type === 'keydown' && evt?.key !== 'Escape') return;

  const currentPopup = popups[openedPopupName]; 
  if(!currentPopup) return;

  currentPopup.classList.remove('popup_is-opened');
  openedPopupName = undefined;
  
  const closeButton = currentPopup.querySelector('.popup__close');
  closeButton.removeEventListener('click', closePopup);
  document.removeEventListener('keydown', closePopup);
  currentPopup.removeEventListener('click', closePopup);
}

function getEditPopupElements () {
  const userNameEl = document.querySelector('.profile__title');
  const userDescEl = document.querySelector('.profile__description');
  const userNameInputEl = popupProfileEdit.querySelector('.popup__input_type_name');
  const userDescInputEl = popupProfileEdit.querySelector('.popup__input_type_description');

  return { userNameEl, userDescEl, userNameInputEl, userDescInputEl };
}

function loadUserForm() {
  const {userNameEl, userDescEl, userNameInputEl, userDescInputEl } = getEditPopupElements();

  userNameInputEl.value = userNameEl.textContent;
  userDescInputEl.value = userDescEl.textContent;
}

function loadImagePopup(cardEl) {
  const cardImgEl = cardEl.querySelector('.card__image');
  const cardTitleEl = cardEl.querySelector('.card__title');
  const popupImgEl = popupImage.querySelector('.popup__image');
  const popupImgCaptionEl = popupImage.querySelector('.popup__caption');

  if (!cardImgEl || !cardTitleEl || !popupImgEl || !popupImgCaptionEl) return;

  popupImgEl.src = cardImgEl.src;
  popupImgEl.alt = cardImgEl.alt;
  popupImgCaptionEl.textContent = cardTitleEl.textContent;
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  
  const {userNameEl, userDescEl, userNameInputEl, userDescInputEl } = getEditPopupElements();
  
  userNameEl.textContent = userNameInputEl.value;
  userDescEl.textContent = userDescInputEl.value;
  
  closePopup();
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const cardNameInputEl = document.querySelector('.popup__input_type_card-name');
  const cardUrlInputEl = document.querySelector('.popup__input_type_url');

  prependCard(cardNameInputEl?.value, cardUrlInputEl?.value);
  closePopup();
}

formEditUserEl.addEventListener('submit', handleEditFormSubmit);
formAddCardEl.addEventListener('submit', handleAddCardFormSubmit);

export { openPopup, setClassToPopups }