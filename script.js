const SAVED_LIBRARY = "myLibrary";

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function() {
    return`${this.title} by ${this.author}, ${this.pages} pages, ${!read ? "not": "already"} read ${!read ? "yet": ""}`;
  }
}

Book.prototype.toggleRead = function(){
  this.read = !this.read;
};

let myLibrary = [];

let booksSaved = loadLibrary();
if(booksSaved.length > 0) {
  myLibrary = myLibrary.concat(booksSaved);
  displayBook();
}


if(myLibrary.length === 0)  {
  const book_1 = new Book("I Promessi Sposi", "A. Manzoni", 500, true);
  addCard(myLibrary.length, book_1);myLibrary.push(book_1); 
  const book_2 = new Book("Oliver Twist", "C. Dickens", 480, false);
  addCard(myLibrary.length, book_2);myLibrary.push(book_2);
  const book_3 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
  addCard(myLibrary.length, book_3);myLibrary.push(book_3);
}

saveLibrary(myLibrary);

/* function addBookToLibrary() {
  let bTitle = prompt("Book title?");
  let bAuthor = prompt("Book Author?");
  let bPages = prompt("Book pages?");
  let bRead = prompt("Alredy read?");

  myLibrary.push(new Book(bTitle, bAuthor, bPages, bRead));
} */

function displayBook() {
  for(const [index, book] of myLibrary.entries()) {
    addCard(index, book);
  }
}

let button_info = document.querySelector("button.add_book");
button_info.addEventListener("click", function() {
  let form = document.querySelector(".form");
  form.toggleAttribute("hidden");
});

let button_enter = document.querySelector("button.enter");

 button_enter.addEventListener("click", function() {

  let title = document.getElementById("title");
  let author = document.getElementById("author");
  let pages = document.getElementById("pages");
  let read = document.getElementById("read");

  if( 
    !title.checkValidity() 
    || !author.checkValidity() 
    || !pages.checkValidity() 
    || !read.checkValidity()
    ) 
    return;
  
  let new_book = new Book(title.value, author.value, pages.value, read.value);
  
  addCard(myLibrary.length ,new_book);
  myLibrary.push(new_book);
  saveLibrary(myLibrary);
});

function addCard(index, book) {
  let container = document.querySelector("div.book_container");
  let card = document.createElement("div");
  card.className = "card";
  card.setAttribute("data-index", `${index}`);
  let read_paragraph = document.createElement("p");
  read_paragraph.innerText = `${book.read ? "already read": "not read yet"}`
  card.innerHTML =`<h2>${book.title}</h2><p>Author: ${book.author}</p><p>${book.pages} pages</p>`;
  card.appendChild(read_paragraph);
  
  if(!book.read) {
    let toggleRead = document.createElement("button");
    toggleRead.className="toggleRead";
    toggleRead.innerText="Ok,I read it";
    card.appendChild(toggleRead);
    toggleRead.addEventListener("click", function() { 
      myLibrary[card.dataset.index].toggleRead();
      read_paragraph.innerText = "already read";
      card.removeChild(toggleRead);
      saveLibrary(myLibrary);
    });
  }

  let remove = document.createElement("button");
  remove.innerText = "remove";
  card.appendChild(remove);container.appendChild(card);

  remove.addEventListener("click", function() {
      container.removeChild(card);
      myLibrary[card.dataset.index] = null;
      saveLibrary(myLibrary);
  } );
}

function saveLibrary(library) {
  localStorage.setItem(SAVED_LIBRARY, JSON.stringify(library));
}

function loadLibrary() {

  let books = [];
  let lib = localStorage.getItem(SAVED_LIBRARY); 
  if(!lib) return [];
  lib = JSON.parse(lib);
  for(let obj of lib) {
    if(obj === null) continue;
    let book = new Book(obj.title, obj.author, obj.pages, obj.read);
    books.push(book);
  }

  return books;
}