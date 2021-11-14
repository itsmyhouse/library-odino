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

const book_1 = new Book("I Promessi Sposi", "A. Manzoni", 500, true);
addCard(book_1);myLibrary.push(book_1);
const book_2 = new Book("Oliver Twist", "C. Dickens", 480, false);
addCard(book_2);myLibrary.push(book_2);
const book_3 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
addCard(book_3);myLibrary.push(book_3);

function addBookToLibrary() {
  let bTitle = prompt("Book title?");
  let bAuthor = prompt("Book Author?");
  let bPages = prompt("Book pages?");
  let bRead = prompt("Alredy read?");

  myLibrary.push(new Book(bTitle, bAuthor, bPages, bRead));
}

function displayBook() {
  for(let book of myLibrary) {
    addCard(book);
  }
}

let button_info = document.querySelector("button.add_book");
button_info.addEventListener("click", function() {
  let form = document.querySelector(".form");
  form.toggleAttribute("hidden");
});

let button_enter = document.querySelector("button.enter");

 button_enter.addEventListener("click", function() {

  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let read = document.getElementById("read").checked;
  
  let new_book = new Book(title, author, pages, read);
  
  addCard(new_book);
  myLibrary.push(new_book);

});

function addCard(book) {
  let container = document.querySelector("div.book_container");
  let card = document.createElement("div");
  card.className = "card";
  card.setAttribute("data-index", `${myLibrary.length}`);
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
    });
  }

  let remove = document.createElement("button");
  remove.innerText = "remove";
  card.appendChild(remove);container.appendChild(card);

  remove.addEventListener("click", function() {
      container.removeChild(card);
      myLibrary[card.dataset.index] = null;
  } );
   

}
