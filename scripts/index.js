// @todo: Темплейт карточки
const cardTemplate = document.getElementById('card-template').content;

// @todo: DOM узлы
const cardsListEl = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(data, removeCallback) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitleEl = cardElement.querySelector('.card__title');
  const cardImageEl = cardElement.querySelector('.card__image');
  const cardButtonEl = cardElement.querySelector('.card__delete-button');

  cardTitleEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = `${data.name} изображение`;

  cardButtonEl.addEventListener('click', removeCallback);

  return cardElement;
}

// @todo: Функция удаления карточки
function removeCard (evt) {
  const cardButtonEl = evt.target;
  cardButtonEl.removeEventListener('click', removeCard);
  cardButtonEl.closest('.card').remove();
}

// @todo: Вывести карточки на страницу
function renderCards(cardList) {
  cardList.forEach(card => {
    cardsListEl.append(createCard(card, removeCard));
  });
}

renderCards(initialCards);
