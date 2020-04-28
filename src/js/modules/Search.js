export default class Search {
    constructor(query) {
        this._query = query;
        this._url = 'https://forkify-api.herokuapp.com/api/search';
    }

    async getResults() {

        try {
            // URL to parameters -- fixed
            let response = await fetch(`${this._url}?q=${this._query}`);
            let data = await response.json();
            this.result = data.recipes;
        } catch (err) {
            console.log(err); // TypeError: failed to fetch
        }
    }
}