export const elements = {
    mainContainer: document.querySelector('.container-fluid'),
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResultsList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping'),
    shoppingList: document.querySelector('.shopping__list'),
    shoppingDeleteItems: document.querySelector('.shopping__delete-items'),
    likesMenu: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list'),
    errorWrap: document.querySelector('.error-message'),
    errorText: document.querySelector('.error-message__text'),
    errorCloseIcon: document.querySelector('.error-message__close-icon')
};

export const elementStrings = {
    loader: 'loader',
    btn: 'btn--inline'
};

export const errorText = {
    wrongSearchValue: "There is no such value. Please try to type 'pizza'"
}

export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;

    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) {
        loader.parentElement.removeChild(loader);
    }
};

export const state = {};