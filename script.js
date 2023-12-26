const myLibrary = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.info = function () {
        console.log(this.title + " by " + this.author + ", " + this.pages + " pages, " + this.status)
    };
}

function addBookToLibrary() {
  // do stuff here
}