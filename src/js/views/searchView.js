import { elements, elementStrings } from './base';

export const getInput = () => elements.searchInput.value;

export const clearResults = () => {
    elements.searchResultsList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
    document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
};

export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];

    if (title.length > limit) {
        title.split(" ").reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        // return the result
        return `${newTitle.join(' ')} ...`;
    }
    return title;
};

const renderRecipe = rec => {
    const markup = `
    <li>
        <a class="results__link" href="#${rec.recipe_id}">
            <figure class="results__fig">
                <img src="${rec.image_url}" alt="${rec.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(rec.title)}</h4>
                <p class="results__author">${rec.publisher}</p>
            </div>
        </a>
    </li>
    `;

    elements.searchResultsList.insertAdjacentHTML("beforeend", markup);
};


// type: prev || next
// So maybe Type must be enum, not just a random string? -- added enum inside searchView.js
const createButton = (page, type) =>
    `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>   
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

// the whole method looks like magic
const renderButtons = (page, numResults, resPerPage) => {
    // pagesCount? -- fixed
    const pagesCount = Math.ceil(numResults / resPerPage);
    const btnTypes = {
        next: 'next',
        prev: 'prev'
    };
    let button;

    // Is 1 a magic number? Why page object can be equal to 1? -- It means that it is a first page
    if (page === 1) {
        // Only button to go to next page
        button = createButton(page, btnTypes.next);
    } else if (page < pagesCount) {
        // Both buttons
        button = `
            ${createButton(page, btnTypes.prev)}
            ${createButton(page, btnTypes.next)}
        `;
    } else if (page === pagesCount && pagesCount > 1) {
        // Only button to go to previous page
        button = createButton(page, btnTypes.prev);
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResult = (recipes, page = 1, resPerPage = 8) => {
    // render results of current page
    const start = (page - 1) * resPerPage;
    const end = start + resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    // render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
};