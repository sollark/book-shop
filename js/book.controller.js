'use strict';

let gCurrUser = 'user';

function onInit() {
  console.log('onInit()');
  renderGenres();
  renderFilterByQueryStringParams();
  renderContent();
}

function onUserView(userRole) {
  console.log('userRole:', userRole);
  gCurrUser = userRole;

  onInit();
}

function renderContent() {
  if (gCurrUser === 'user') {
    renderBookCards();

    const elBookContainer = document.querySelector('.book-table');
    elBookContainer.innerHTML = '';
  }
  if (gCurrUser === 'admin') {
    renderBookTable();

    var elBookContainer = document.querySelector('.book-cards');
    elBookContainer.innerHTML = '';
  }
}

function onKeyUp(e) {
  // console.log(e);
}

function renderGenres() {
  const genres = getGenres();
  const strHTMLs = genres.map((genre) => `<option>${genre}</option>`);
  strHTMLs.unshift('<option value="">Select Genre</option>');
  document.querySelector('.filter-genre-select').innerHTML = strHTMLs.join('');
}

function renderBookTable() {
  if (gCurrUser === 'user') return;

  const books = getAllBooks();
  const elBookContainer = document.querySelector('.book-table');

  if (!books || !elBookContainer) return;

  var strHTML = '';

  strHTML += '<button onclick="onNewBook()">Create new book</button>\n';

  strHTML += '<table>\n';
  strHTML += '<tbody>\n';

  strHTML += '<tr>\n';
  strHTML += `<th>Id</th>\n`;
  strHTML += `<th onclick="onSetSort('title')">Title</th>\n`;
  strHTML += `<th onclick="onSetSort('price')">Price</th>\n`;
  strHTML += `<th colspan='3'>Actions</th>\n`;
  strHTML += `</tr>\n`;

  strHTML += books
    .map(
      (book) =>
        `<tr>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.price}$</td>
            <td><button onclick='onReadBook("${book.id}")'>Read</button></td>
            <td><button onclick='onUpdateBook("${book.id}")'>Update</button></td>
            <td><button onclick='onRemoveBook("${book.id}")'>Delete</button></td>
        </tr>`
    )
    .join('');

  strHTML += '</tr>\n';
  strHTML += '</table>\n';

  elBookContainer.innerHTML = strHTML;
}

function renderBookCards() {
  if (gCurrUser === 'admin') return;

  var books = getBooks();

  var elBookContainer = document.querySelector('.book-cards');

  if (!books || !elBookContainer) return;

  var strHTML = ``;
  strHTML += `<button class="back-button" onclick="onChangePage(-1)" >&lt;&lt;</button>\n`;
  strHTML += books
    .map(
      (book) => `
    <div class="card">
    <h3>${book.title}</h3>
    <img src="${book.imgUrl}" alt="book_cover">
    <button class="btn--style1" onclick='onRemoveBook("${book.id}")'>Buy</button>
          <button class="btn--style2" onclick='onReadBook("${book.id}")'>Read</button>
        </div> 
        `
    )
    .join('');

  strHTML += `<button class="forward-button" onclick="onChangePage(1)">&gt;&gt;</button>\n`;
  elBookContainer.innerHTML = strHTML;
}

function onChangePage(page) {
  changePage(page) && renderContent();
}

function onSetSort(sortBy) {
  setSort(sortBy);
  renderContent();
}

function onNewBook() {
  console.log('onNewBook()');
  const title = prompt("Book's title? ");
  const price = prompt("Book's price? ");

  addBook(title, price);
  renderContent();
}

function onClearSearch() {
  const elSearchValue = document.querySelector('.filter-title');
  elSearchValue.value = '';
}

function onSearchChange(value) {
  // console.log('value:', value);
  setBookFilter({ title: value });
  renderContent();
}

function onRemoveBook(bookId) {
  // console.log('onRemoveBook()', bookId);
  deleteBook(bookId);
  renderContent();
}

function onUpdateBook(bookId) {
  const price = prompt("Book's price? ");

  updateBookPrice(bookId, price);
  renderContent();
}

function onRateBook(bookId, rating) {
  // console.log('bookId:', bookId, 'rating', rating);
  updateBookRate(bookId, rating);
}

function onReadBook(bookId) {
  onSetFilterBy({ modal: bookId });
  renderContent();

  renderModal(bookId);
}

function renderModal(bookId) {
  const book = getBookById(bookId);
  var strHTML = '';

  strHTML += `<label class="rating"><span>Rate this book</span> `;
  strHTML += `<div class="number-input">`;
  strHTML += `<button onclick=" event.preventDefault();
              var input = this.parentNode.querySelector('input[type=number]');
              input.stepDown();input.onchange();" ></button>`;
  strHTML += `<input class="rating bg-light" min="0" max="10" value="${book.rate}"          
              type="number" onchange="onRateBook('${book.id}', this.value)">`;
  strHTML += `<button onclick=" event.preventDefault();
              var input = this.parentNode.querySelector('input[type=number]');
              input.stepUp();input.onchange();" 
              class="plus"></button>`;
  strHTML += `</div>`;
  strHTML += `<img src="${book.imgUrl}" alt="book_cover">`;
  strHTML += `<h3>${book.title}</h3>`;
  strHTML += `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, consequatur animi recusandae quos optio a sunt repudiandae officia suscipit ad.</p>`;

  strHTML += `</label>`;

  openModal(null, strHTML);
}

function onCloseModal() {
  onSetFilterBy({ modal: '' });
}

function onSetFilterBy(filterBy) {
  filterBy = setBookFilter(filterBy);
  renderContent();

  console.log('filterBy:', filterBy);
  generateQueryStringParams(filterBy);
}

function generateQueryStringParams(filterBy) {
  console.log(filterBy);
  const queryStringParams = `?genre=${filterBy.genre}&maxPrice=${filterBy.maxPrice}&minRate=${filterBy.minRate}&modal=${filterBy.modal}`;
  const newUrl =
    window.location.protocol +
    '//' +
    window.location.host +
    window.location.pathname +
    queryStringParams;
  window.history.pushState({ path: newUrl }, '', newUrl);
}

function renderFilterByQueryStringParams() {
  const queryStringParams = new URLSearchParams(window.location.search);
  const filterBy = {
    genre: queryStringParams.get('genre') || '',
    maxPrice: +queryStringParams.get('maxPrice') || Infinity,
    minRate: +queryStringParams.get('minRate') || 0,
    modal: queryStringParams.get('modal') || '',
  };

  if (
    !filterBy.genre &&
    !filterBy.maxPrice &&
    !filterBy.minRate &&
    !filterBy.modal
  )
    return;

  document.querySelector('.filter-genre-select').value = filterBy.genre;
  document.querySelector('.filter-maxPrice-range').value = filterBy.maxPrice;
  document.querySelector('.filter-minRate-range').value = filterBy.minRate;

  // console.log('filterBy:', filterBy);
  if (filterBy.modal) renderModal(filterBy.modal);

  setBookFilter(filterBy);
}
