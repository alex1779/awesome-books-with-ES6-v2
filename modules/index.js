/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */
import { addMenuLinks } from './menu.js';
import { displayTime } from './time.js';
import { removeBookFromDOM, addRemoveButtons } from './remove.js';

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  // Local Storage
  saveToLocalStorage() {
    localStorage.setItem('MY-Library', JSON.stringify(this.books));
  }

  getDataFromLocalStorage() {
    try {
      const data = JSON.parse(localStorage.getItem('MY-Library'));
      if (data !== null) {
        this.books = data;
      }
    } catch (error) {
      saveToLocalStorage();
    }
  }

  addBook() {
    const form = document.querySelector('#form');
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const bookTitle = title.value;
    const bookAuthor = author.value;

    if (bookTitle.trim().length !== 0 && bookAuthor.trim().length !== 0) {
      const objBook = new Book(bookTitle, bookAuthor);
      this.books.push(objBook);
      this.saveToLocalStorage();
      this.getBooks();
      form.reset();
      document.getElementById('msg-add-book').innerHTML = 'New book added...';
      setTimeout(() => {
        document.getElementById('msg-add-book').innerHTML = '';
      }, 3000);
    }
    addRemoveButtons(this);
  }

  getBooks() {
    const section = document.querySelector('#book-list');
    this.getDataFromLocalStorage();
    let books = '<table>';
    this.books.forEach((book, index) => {
      books += `<tr>
      <td>
        <article class="book">
          <p>"${book.title}" by ${book.author}</p>
          <button type="button" id="${index}" class="btn remove-btn">Remove</button>
        </article>
      </td>
    </tr>
    `;
    });
    if (this.books.length === 0) {
      books += '<tr><td<p class="empty-libray">Empty...</p></td></tr>';
    }
    books += '</table>';
    section.innerHTML = books;
  }

  removeBook(bookId) {
    const filteredBooks = this.books.filter((book, index) => bookId !== index);
    this.books = filteredBooks;
    this.saveToLocalStorage();
    this.getBooks();
    addRemoveButtons(this);
  }
}

// let listBooks
const listBooks = new Library();

const form = document.querySelector('#form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  listBooks.addBook();
});

listBooks.getDataFromLocalStorage();
listBooks.getBooks();
removeBookFromDOM(listBooks, -1);

// ====================== NAVIGATION =========================

displayTime();
addRemoveButtons(listBooks);
// MENUS
const listMenuLink = document.querySelector('#m-list');
const addMenuLink = document.querySelector('#m-add');
const contactMenuLink = document.querySelector('#m-contact');

addMenuLinks();
