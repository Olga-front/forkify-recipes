export default class Search {
    constructor(query) {
        this.query = query;
        this.url = 'https://forkify-api.herokuapp.com/api/search';
    }

    async getResults() {

        try {
            // URL to parameters -- fixed
            let response = await fetch(`${this.url}?q=${this.query}`);
            let data = await response.json();
            this.result = data.recipes;

        } catch (err) {
            console.log(err); // TypeError: failed to fetch
        }
    }
}