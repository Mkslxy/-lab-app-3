import { Book, User } from './models';
import { LibraryService } from './services';
import '../libs/bootstrap.css';
import * as bootstrap from 'bootstrap';
class App {
    constructor() {
        this.libraryService = new LibraryService();
        this.initUI();
        this.renderBooks();
        this.renderUsers();
    }
    showAlert(message) {
        const modalBody = document.getElementById('alertModalBody');
        modalBody.textContent = message;
        const alertModalEl = document.getElementById('alertModal');
        const bsModal = new bootstrap.Modal(alertModalEl);
        bsModal.show();
    }
    initUI() {
        const bookForm = document.querySelector('form#bookForm');
        bookForm === null || bookForm === void 0 ? void 0 : bookForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = (document.querySelector('#bookTitle').value || '').trim();
            const author = (document.querySelector('#bookAuthor').value || '').trim();
            const year = parseInt(document.querySelector('#bookYear').value);
            if (!title || !author || !year) {
                this.showAlert('Будь ласка, заповніть усі поля книги');
                return;
            }
            const book = new Book(title, author, year);
            this.libraryService.addBook(book);
            this.renderBooks();
            bookForm.reset();
        });
        // Кнопки користувача
        const userForm = document.querySelector('form#userForm');
        userForm === null || userForm === void 0 ? void 0 : userForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = (document.querySelector('#userName').value || '').trim();
            const email = (document.querySelector('#userEmail').value || '').trim();
            if (!name || !email) {
                this.showAlert('Введіть будь-ласка всі поля!');
                return;
            }
            const user = new User(name, email);
            this.libraryService.addUser(user);
            this.renderUsers();
            userForm.reset();
        });
        const bookSearchInput = document.createElement('input');
        bookSearchInput.placeholder = 'Пошук книги за назвою...';
        bookSearchInput.className = 'form-control mb-3';
        const booksContainer = document.querySelector('#booksList');
        booksContainer.parentElement.insertBefore(bookSearchInput, booksContainer);
        bookSearchInput.addEventListener('input', () => {
            const query = bookSearchInput.value.trim().toLowerCase();
            const books = this.libraryService.getAllBooks().filter(b => b.title.toLowerCase().includes(query));
            this.renderBooks(books);
        });
        const userSearchInput = document.createElement('input');
        userSearchInput.placeholder = 'Пошук користувача за іменем...';
        userSearchInput.className = 'form-control mb-3';
        const usersContainer = document.querySelector('#usersList');
        usersContainer.parentElement.insertBefore(userSearchInput, usersContainer);
        userSearchInput.addEventListener('input', () => {
            const query = userSearchInput.value.trim().toLowerCase();
            const users = this.libraryService.getAllUsers().filter(u => u.name.toLowerCase().includes(query));
            this.renderUsers(users);
        });
    }
    renderBooks(books) {
        const container = document.querySelector('#booksList');
        if (!container)
            return;
        container.innerHTML = '';
        (books || this.libraryService.getAllBooks()).forEach((book, index) => {
            var _a, _b, _c;
            const div = document.createElement('div');
            div.className = 'border p-2 mb-2';
            div.innerHTML = `<strong>${index + 1}. ${book.title}</strong> — ${book.author} (${book.year}) 
            ${book.isBorrowed ? '<span class="text-danger">(Позичена)</span>' : ''}
            <button class="btn btn-sm btn-warning ms-2 borrowBtn">Позичити</button>
            <button class="btn btn-sm btn-secondary ms-1 returnBtn">Повернути</button>
            <button class="btn btn-sm btn-danger ms-1 deleteBtn">Видалити</button>`;
            (_a = div.querySelector('.borrowBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                const email = prompt('Введіть email користувача, який позичає книгу:');
                if (!email)
                    return;
                const user = this.libraryService.getAllUsers().find(u => u.email === email);
                if (!user) {
                    this.showAlert('Користувач не знайдений');
                    return;
                }
                if (book.isBorrowed) {
                    this.showAlert('Книга вже позичена');
                    return;
                }
                if (!user.borrowedBooks)
                    user.borrowedBooks = [];
                if (user.borrowedBooks.length >= 3) {
                    this.showAlert('Користувач вже взяв 3 книги !! 4 ні!');
                    return;
                }
                book.isBorrowed = true;
                user.borrowedBooks.push(book);
                this.libraryService.updateBook(book);
                this.libraryService.updateUser(user);
                this.renderBooks();
                this.renderUsers();
            });
            (_b = div.querySelector('.returnBtn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
                const email = prompt('Введіть email користувача, який повертає книгу:');
                if (!email)
                    return;
                const user = this.libraryService.getAllUsers().find(u => u.email === email);
                if (!user || !user.borrowedBooks)
                    return;
                book.isBorrowed = false;
                user.borrowedBooks = user.borrowedBooks.filter(b => b !== book);
                this.libraryService.updateBook(book);
                this.libraryService.updateUser(user);
                this.renderBooks();
                this.renderUsers();
            });
            (_c = div.querySelector('.deleteBtn')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
                this.libraryService.removeBook(book);
                this.renderBooks();
            });
            container.appendChild(div);
        });
    }
    renderUsers(users) {
        const container = document.querySelector('#usersList');
        if (!container)
            return;
        container.innerHTML = '';
        (users || this.libraryService.getAllUsers()).forEach((user, index) => {
            var _a;
            const div = document.createElement('div');
            div.className = 'border p-2 mb-2';
            div.innerHTML = `<strong>${index + 1}. ${user.name}</strong> — ${user.email}
            <div>Позичені книги: ${user.borrowedBooks.map(b => b.title).join(', ') || 'немає'}</div>
            <button class="btn btn-sm btn-danger ms-2 deleteBtn">Видалити</button>`;
            (_a = div.querySelector('.deleteBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                this.libraryService.removeUser(user);
                this.renderUsers();
            });
            container.appendChild(div);
        });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
