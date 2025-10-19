import { Book, User } from './models';
import { Library } from './library';
import { Storage } from './storage';

export class LibraryService {
  books: Library<Book>;
  users: Library<User>;

  constructor() {
    this.books = new Library<Book>();
    this.users = new Library<User>();

    // localS
    const savedBooks = Storage.load<Book[]>('books');
    if (savedBooks)
      savedBooks.forEach((book) =>
        this.books.add(
          new Book(book.title, book.author, book.year, book.isBorrowed)
        )
      );

    const savedUsers = Storage.load<User[]>('users');
    if (savedUsers)
      savedUsers.forEach((user) =>
        this.users.add(new User(user.name, user.email))
      );
  }

  addBook(book: Book) {
    this.books.add(book);
    this.saveBooks();
  }

  removeBook(book: Book) {
    this.books.remove(book);
    this.saveBooks();
  }

  updateBook(book: Book) {
    const existing = this.books
      .getAll()
      .find(
        (b) =>
          b.title === book.title &&
          b.author === book.author &&
          b.year === book.year
      );
    if (existing) {
      existing.isBorrowed = book.isBorrowed;
    }
    this.saveBooks();
  }

  updateUser(user: User) {
    const existing = this.users.getAll().find((u) => u.email === user.email);
    if (existing) {
      existing.borrowedBooks = user.borrowedBooks;
    }
    this.saveUsers();
  }

  getAllBooks(): Book[] {
    return this.books.getAll();
  }

  private saveBooks() {
    Storage.save('books', this.books.getAll());
  }

  addUser(user: User) {
    this.users.add(user);
    this.saveUsers();
  }

  removeUser(user: User) {
    this.users.remove(user);
    this.saveUsers();
  }

  getAllUsers(): User[] {
    return this.users.getAll();
  }

  private saveUsers() {
    Storage.save('users', this.users.getAll());
  }
}
