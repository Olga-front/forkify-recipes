import { elements } from '../views/base'

export const renderError = error => {
    elements.recipe.innerHTML = `<div class="error-message">${error}</div>`
};

export const clearErrors = () => {
    elements.recipe.innerHTML = ``
};