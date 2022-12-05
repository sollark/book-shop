'use strict';

const STORAGE_KEY = 'bookDB';
const RANDOM_TITLE = 'https://api.lorem.space/image/book?w=150&h=220';
const gGenres = [
  'crime',
  'science',
  'fantasy',
  'romance',
  'fairy tale',
  'mystery',
  'western',
];

var gBooks = null;
var gFilterBy = { genre: '', title: '' };
var gPageIdx = 0;

let gSortBy = 'title';

let gBookQuantity = null;
let PAGE_SIZE = 4;

// const book = {
//   id: 0,
//   name: 'title',
//   price: 100,
//   imgUrl: '../../assets/img/books/title.jpg',
// };

// clearLS();
_createBooks();

function getGenres() {
  return gGenres;
}

function getBooks() {
  let books = gBooks.filter((book) => {
    return (
      book.price <= gFilterBy.maxPrice &&
      book.rate >= gFilterBy.minRate &&
      book.title.toLowerCase().includes(gFilterBy.title)
    );
  });

  if (gBookQuantity !== books.length) gPageIdx = 0;

  gBookQuantity = books.length;
  books = _sortBooks(books, gSortBy);
  console.log(
    'gPageIdx:',
    gPageIdx * PAGE_SIZE,
    ' (gPageIdx + 1) * PAGE_SIZE)',
    (gPageIdx + 1) * PAGE_SIZE
  );

  return books.slice(gPageIdx * PAGE_SIZE, (gPageIdx + 1) * PAGE_SIZE);
}

function getAllBooks() {
  let books = gBooks.filter((book) => {
    return (
      book.price <= gFilterBy.maxPrice &&
      book.rate >= gFilterBy.minRate &&
      book.title.toLowerCase().includes(gFilterBy.title)
    );
  });

  books = _sortBooks(books, gSortBy);

  return books;
}

function deleteBook(bookId) {
  const bookIdx = gBooks.findIndex((book) => bookId === book.id);
  gBooks.splice(bookIdx, 1);
  // console.log('gBooks:', gBooks);
  _saveBooksToStorage();
}

function addBook(title, price) {
  const book = _createBook(title, price);
  gBooks.unshift(book);
  _saveBooksToStorage();

  return book;
}

function getBookById(bookId) {
  const book = gBooks.find((book) => bookId === book.id);
  return book;
}

function updateBookPrice(bookId, newPrice) {
  const book = getBookById(bookId);
  book.price = newPrice;
  _saveBooksToStorage();
  return book;
}

function updateBookRate(bookId, newRate) {
  const book = getBookById(bookId);
  book.rate = newRate;
  _saveBooksToStorage();
  return book;
}

function setBookFilter(filterBy = {}) {
  //   gPageIdx = 0;
  if (filterBy.genre !== undefined) gFilterBy.genre = filterBy.genre;
  if (filterBy.title !== undefined) gFilterBy.title = filterBy.title;
  if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice;
  if (filterBy.minRate !== undefined) gFilterBy.minRate = filterBy.minRate;
  if (filterBy.modal !== undefined) gFilterBy.modal = filterBy.modal;
  return gFilterBy;
}

function setBookSort(sortBy = {}) {
  //   gPageIdx = 0;
  if (sortBy.title !== undefined) {
    gBooks.sort((c1, c2) => (c1.title - c2.title) * sortBy.title);
  } else if (sortBy.price !== undefined) {
    gBooks.sort((c1, c2) => c1.price.localeCompare(c2.price) * sortBy.price);
  }
}

function changePage(page) {
  console.log(
    'change page',
    (page + gPageIdx) * PAGE_SIZE >= gBookQuantity || gPageIdx + page <= 0
  );

  if ((page + gPageIdx) * PAGE_SIZE >= gBookQuantity || gPageIdx + page <= 0)
    return false;

  gPageIdx += page;
  return true;
}

function setSort(sortBy) {
  gSortBy = sortBy;
}

function _createBook(title, price, imgUrl) {
  return {
    id: makeId(),
    title,
    price,
    rate: 0,
    imgUrl: imgUrl || RANDOM_TITLE,
  };
}

function _createBooks() {
  var books = loadFromLS(STORAGE_KEY);
  // Nothing in storage - generate demo data
  if (!books || !books.length) {
    books = [];
    for (let i = 0; i < 21; i++) {
      const book = _createBook(
        generateTitle(),
        getRandomInt(20, 150),
        RANDOM_TITLE
      );
      books.push(book);
    }
  }
  gBooks = books;
  gBookQuantity = gBooks.length;

  console.log('gBooks:', gBooks);
  _saveBooksToStorage();
}

function _saveBooksToStorage() {
  saveToLS(STORAGE_KEY, gBooks);
}

function _sortBooks(arr, sortBy) {
  return arr.sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'price':
        return a.price - b.price;
    }
  });
}
