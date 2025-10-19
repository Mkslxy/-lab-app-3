export interface IBook {
    title: string;
    author: string;
    year: number;
    isBorrowed: boolean;
}

export class Book implements IBook {
    constructor(
        public title: string,
        public author: string,
        public year: number,
        public isBorrowed: boolean = false
    ) {}

    borrow() {
        if (this.isBorrowed) throw new Error("Книга вже позичена");
        this.isBorrowed = true;
    }

    returnBook() {
        this.isBorrowed = false;
    }
}

export interface IUser {
    name: string;
    email: string;
}

export class User implements IUser {
    borrowedBooks: Book[] = [];

    constructor(public name: string, public email: string) {}
}