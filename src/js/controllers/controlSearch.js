import Search from '../modules/Search';
import * as searchView from '../views/searchView';
import * as errorView from '../views/errorView';
import { elements, renderLoader, clearLoader, state, errorText } from '../views/base';

// /**
//  * SEARCH CONTROLLER
//  */
export const controlSearch = async () => {
    // 1. Get query from view
    const query = searchView.getInput(); // TODO

    if (query) {
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for results
        // searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4. Search for recipes
            await state.search.getResults();

            // 5. Render results on UI
            clearLoader();
            searchView.renderResult(state.search.result);
            errorView.closeError(elements.errorWrap);
        }
        catch(error) {
            errorView.renderError(error);
            clearLoader();
        }
    }
};