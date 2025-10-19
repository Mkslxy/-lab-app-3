export class Book {
    constructor(title, author, year, isBorrowed = false) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.isBorrowed = isBorrowed;
    }
    borrow() {
        if (this.isBorrowed)
            throw new Error("Книга вже позичена");
        this.isBorrowed = true;
    }
    returnBook() {
        this.isBorrowed = false;
    }
}
export class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.borrowedBooks = [];
    }
}
