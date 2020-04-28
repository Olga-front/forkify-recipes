import List from '../modules/List';
import * as listView from '../views/listView';
import { state } from '../views/base';

/**
 * LIST CONTROLLER
 */
export const controlList = () => {
    // Create a new list IF there in none yet
    if (!state.list) state.list = new List();

    // Add each ingredient to the list
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
};