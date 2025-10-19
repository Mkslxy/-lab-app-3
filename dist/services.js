import { Book, User } from './models';
import { Library } from './library';
import { Storage } from './storage';
export class LibraryService {
    constructor() {
        this.books = new Library();
        this.users = new Library();
        // localS
        const savedBooks = Storage.load('books');
        if (savedBooks)
            savedBooks.forEach(book => this.books.add(new Book(book.title, book.author, book.year, book.isBorrowed)));
        const savedUsers = Storage.load('users');
        if (savedUsers)
            savedUsers.forEach(user => this.users.add(new User(user.name, user.email)));
    }
    // ==== Книги ====
    addBook(book) {
        this.books.add(book);
        this.saveBooks();
    }
    removeBook(book) {
        this.books.remove(book);
        this.saveBooks();
    }
    updateBook(book) {
        const existing = this.books.getAll().find(b => b.title === book.title && b.author === book.author && b.year === book.year);
        if (existing) {
            existing.isBorrowed = book.isBorrowed;
        }
        this.saveBooks();
    }
    updateUser(user) {
        const existing = this.users.getAll().find(u => u.email === user.email);
        if (existing) {
            existing.borrowedBooks = user.borrowedBooks;
        }
        this.saveUsers();
    }
    getAllBooks() {
        return this.books.getAll();
    }
    saveBooks() {
        Storage.save('books', this.books.getAll());
    }
    // ==== Користувачі ====
    addUser(user) {
        this.users.add(user);
        this.saveUsers();
    }
    removeUser(user) {
        this.users.remove(user);
        this.saveUsers();
    }
    getAllUsers() {
        return this.users.getAll();
    }
    saveUsers() {
        Storage.save('users', this.users.getAll());
    }
}
