export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, img) {
        const like = {
            id,
            title,
            author,
            img
        }

        this.likes.push(like);

        // Persist data in LocalStorage
        this.persistData();
        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);

        // Persist data in LocalStorage
        this.persistData();
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === parseFloat(id)) !== -1;
    }

    // getLikesNumber?
    getNumberLikes() {
        return this.likes.length;
    }

    // must be private
    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    // must be private
    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));

        // Restore likes
        if (storage) this.likes = storage;
    }
}