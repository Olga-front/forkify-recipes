import { elements } from './base';

export const renderItem = item => {
    const markup = `
        <li class="shopping__item" data-itemid=${item.id}>
            <div class="shopping__count">
                <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn btn--tiny">
                <svg class="btn--tiny__icon">
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;

    elements.shoppingList.insertAdjacentHTML('beforeend', markup);
};

export const showDeleteBtn = () => {
    elements.shoppingDeleteItems.classList.add('shopping__delete-items--visible')
};

export const hideDeleteBtn = () => {
    elements.shoppingDeleteItems.classList.remove('shopping__delete-items--visible')
};

export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    if (item) item.parentElement.removeChild(item);
};

export const deleteAllItems = () => {
    elements.shoppingList.textContent = "";
};