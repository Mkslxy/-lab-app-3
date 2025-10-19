export class Library {
    constructor() {
        this.collection = [];
    }
    add(item) {
        this.collection.push(item);
    }
    remove(item) {
        const index = this.collection.indexOf(item);
        if (index !== -1)
            this.collection.splice(index, 1);
    }
    getAll() {
        return [...this.collection];
    }
    find(predicate) {
        return this.collection.find(predicate);
    }
}
