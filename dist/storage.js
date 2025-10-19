export class Storage {
    static save(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }
    static load(key) {
        const json = localStorage.getItem(key);
        if (!json)
            return null;
        return JSON.parse(json);
    }
    static remove(key) {
        localStorage.removeItem(key);
    }
    static clear() {
        localStorage.clear();
    }
}
