import Recipe from '../modules/Recipe';
import * as recipeView from '../views/recipeView';
import * as searchView from '../views/searchView';
import * as errorView from '../views/errorView';
import { elements, renderLoader, clearLoader, state } from '../views/base';

// /**
//  * RECIPE CONTROLLER
//  */
export const controlRecipe = async () => {
    // Get ID from url
    const id = window.location.hash.replace('#', '');

    if (id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item
        if (state.search) searchView.highlightSelected(id);

        // Create new recipe object
        state.recipe = new Recipe(parseFloat(id));

        try {
            // Get recipe data

            await state.recipe.getRecipe(); // to wait for the promise to get back with results value

            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcTime();

            // Render recipe
            clearLoader();

            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
            );

            errorView.closeError(elements.errorWrap);
        }
        catch (error) {
            errorView.renderError(error);
        }
    }
};