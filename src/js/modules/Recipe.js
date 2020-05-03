export default class Recipe {
    constructor(id) {
        this.id = id;
        this.url = 'https://forkify-api.herokuapp.com/api/get';
        this.servings = 4;
    }

    async getRecipe() {

        try {
            // URL must be in parameters -- fixed
            let response = await fetch(`${this.url}?rId=${this.id}`);

            // why response is not strongly typed? --  I have no idea how to do it
            let result = await response.json();

            this.title = result.recipe.title;
            this.author = result.recipe.publisher;
            this.img = result.recipe.image_url;
            this.url = result.recipe.source_url;
            this.ingredients = result.recipe.ingredients;

        } catch (err) {
            console.log(err); // TypeError: failed to fetch
        }
    };

    calcTime() {
        // Assuming that we need 15 min for each 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        const servTime = 15;
        // what is 15? Magic number? Why not 5.4 or 42? Create a constant with a proper nema what is 15 -- fixed
        this.time = periods * servTime;
    };

    parseIngredients() {

        const unitsLong = ['tablespoons', 'tablespoon', 'pounds', 'teaspoons', 'teaspoon', 'ounces', 'ounce', 'cups'];
        const unitsShort = ['tbsp', 'tbsp', 'pound', 'tsp', 'tsp', 'oz', 'oz', 'cup'];
        const units = [...unitsShort, 'g', 'kg'];

        // looks too complicated
        const newIngredients = this.ingredients.map(el => {
            // 1. Uniform units

            let ingredient = el.toLowerCase();

            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i])

            });

            // 2. Remove parentheses
            ingredient = ingredient.replace(/ *\([^]*\) */g, ' ');

            // 3. Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

            let objIng;
            if (unitIndex > -1) {
                // There is a unit
                const arrCount = arrIng.slice(0, unitIndex); // ex. 4 1/2 cups, arrCount is [4,1/2]
                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }
                objIng = {
                    count: count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }
            } else if (parseInt(arrIng[0], 10)) {
                // There is NO unit, but 1st element is a number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                // There is no unit
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }

            return objIng;
        });

        this.ingredients = newIngredients;
    }

    updateServings(type) {
        // Servings
        const newString = type === 'dec' ? this.servings - 1 : this.servings + 1;

        // Ingredients
        this.ingredients.forEach(ing => {
            ing.count *= (newString / this.servings)
        });

        this.servings = newString;
    }
}