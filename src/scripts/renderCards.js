import { openPopup } from "./popups";

const cardTemplate = document.getElementById('card-template').content;
const cardsListEl = document.querySelector('.places__list');

function createCard(data, removeCallback, likeCallback) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitleEl = cardElement.querySelector('.card__title');
  const cardImageEl = cardElement.querySelector('.card__image');
  const cardButtonDelEl = cardElement.querySelector('.card__delete-button');
  const cardButtonLikeEl = cardElement.querySelector('.card__like-button');

  cardTitleEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = `${data.name} изображение`;
  cardImageEl.addEventListener('click', evt => {
    openPopup('popupImage', cardElement)
  });

  cardButtonDelEl.addEventListener('click', removeCallback);
  cardButtonLikeEl.addEventListener('click', likeCallback);

  return cardElement;
}

function removeCard (evt) {
  const cardButtonDelEl = evt.target;
  cardButtonDelEl.removeEventListener('click', removeCard);
  cardButtonDelEl.closest('.card').remove();
}

function likeCard(evt) {
  const cardButtonLikeEl = evt.target
  cardButtonLikeEl.classList.toggle('card__like-button_is-active');
}

function renderCards(cardList) {
  cardList.forEach(card => {
    cardsListEl.append(createCard(card, removeCard, likeCard));
  });
}

function prependCard(cardName, cardUrl) {
  if (!cardName || !cardUrl) return;

  const card = {
    name: cardName,
    link: cardUrl
  };
  const cardNode = createCard(card, removeCard, likeCard);
  cardsListEl.prepend(cardNode);
}

export { renderCards, prependCard }
