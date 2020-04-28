export default class Likes {
    constructor() {
        this._likes = [];
    }

    addLike(id, title, author, img) {
        const like = {
            id,
            title,
            author,
            img
        }

        this._likes.push(like);

        // Persist data in LocalStorage
        this.persistData();
        return like;
    }

    deleteLike(id) {
        const index = this._likes.findIndex(el => el.id === id);
        this._likes.splice(index, 1);

        // Persist data in LocalStorage
        this.persistData();
    }

    isLiked(id) {
        return this._likes.findIndex(el => el.id === parseFloat(id)) !== -1;
    }

    // getLikesNumber? --- fixed
    getLikesNumber() {
        return this._likes.length;
    }

    // must be private --- there are no private or public keywords in EC6. I can use just normal functions
    persistData() {
        localStorage.setItem('likes', JSON.stringify(this._likes));
    }

    // must be private --- there are no private or public keywords in EC6. I can use just normal functions
    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));

        // Restore likes
        if (storage) this._likes = storage;
    }
}