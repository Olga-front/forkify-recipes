import { elements } from '../views/base'

export const renderError = error => {
    elements.errorText.textContent = error;
    elements.errorWrap.classList.add('error-message--shown');
};

export const closeError = elem => {
    elem.classList.remove('error-message--shown')
};

elements.errorWrap.addEventListener('click', e => {
    if (e.target.matches('.error-message__close, .error-message__close *')) {
        closeError(e.target.parentElement);
    }
});