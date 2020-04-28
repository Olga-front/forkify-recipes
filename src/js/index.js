import { controlSearch } from './controllers/controlSearch';
import { controlRecipe } from './controllers/controlRecipe';
import { controlList } from './controllers/controlList';
import { controlLike } from './controllers/controlLike';
import Likes from './modules/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader, elementStrings, state } from './views/base';

/**Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();

    // seems like invalid handling of async method --- fixed
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest(`.${elementStrings.btn}`);

    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResult(state.search.result, goToPage);
    }
});


// So why controllers are not in separate files? --- fixed
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// Handle delete and update list item events
elements.shoppingList.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // Handle the delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from state
        state.list.deleteItem();

        // Delete from UI
        listView.deleteItem(id);
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        if (val > 0) state.list.updateCount(id, val);
    }
});

// Restore liked recipes on page load
window.addEventListener('load', () => {
    state.likes = new Likes();

    // Restore likes
    state.likes.readStorage();

    // Toggle like menu button
    likesView.toggleLikeMenu(state.likes.getLikesNumber());

    // Render the existing likes
    state.likes._likes.forEach(like => {
        likesView.renderLike(like)
    });
});

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease button is clicked
        if (state.recipe._servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // Increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // Add ingredients to shopping list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        // Like controller
        controlLike();
    }
});