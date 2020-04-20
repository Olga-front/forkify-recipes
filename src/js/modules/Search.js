export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {

        try {
            // URL to parameters
            let response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            let data = await response.json();
            this.result = data.recipes;
        } catch (err) {
            console.log(err); // TypeError: failed to fetch
        }
    }
}