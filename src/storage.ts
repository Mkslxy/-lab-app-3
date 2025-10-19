export class Storage {
    static save(key: string, data: any) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    static load<T>(key: string): T | null {
        const json = localStorage.getItem(key);
        if (!json) return null;
        return JSON.parse(json) as T;
    }

    static remove(key: string) {
        localStorage.removeItem(key);
    }

    static clear() {
        localStorage.clear();
    }
}