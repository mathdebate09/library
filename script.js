let myLibrary = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;

  if (status == true) {
    this.status = "Read"
  } else {
    this.status = "Not Read"
  }

  this.info = function () {
    console.log(this.title + " by " + this.author + ", " + this.pages + " pages, " + this.status)
  };
}

//Toggle the reading status
Book.prototype.toggle = function () {
  if (this.status == "Read") {
    this.status = "Not Read";
  } else {
    this.status = "Read";
  }
}

//Dummy inputs for Book()
myLibrary[0] = new Book("The Design of Everyday Things", "Don Norman", 347, false);
myLibrary[1] = new Book("Atomic Habits", "James Clear", 306, true);
myLibrary[2] = new Book("Don't Make Me Think", "Steve Krug", 216, false);
myLibrary[3] = new Book("Subtle Art of Not Giving a F**k", "Mark Manson", 224, true);

// Display the dummy inputs
window.onload = function () {
  loadDataFromLocalStorage();
  for (let i = 0; i < myLibrary.length; i++) {
    displayBookToLibrary(i);
  }
}

// Select the button
const addButton = document.querySelector('.add-book');
// Select dialog modal to be shown
const dialog = document.querySelector("dialog");

// "Show the dialog" button opens the dialog modally
addButton.addEventListener("click", () => {
  console.log("add button");
  dialog.showModal();
});

// Select the form
const form = document.querySelector('dialog form');

// Listen for the submit event
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const bookName = document.querySelector('#book-name');
  const bookAuthor = document.querySelector('#book-author');
  const bookPages = document.querySelector('#book-pages');
  const bookRead = document.querySelector('#book-read'); // This will be true if the checkbox is checked, and false otherwise

  // Store the values
  const book = new Book(bookName.value, bookAuthor.value, bookPages.value, bookRead.checked);

  myLibrary.push(book);
  saveDataToLocalStorage();
  myLibrary[myLibrary.length - 1].info();

  console.log(myLibrary.length);
  dialog.close();

  // Update the display
  displayBookToLibrary(myLibrary.length - 1);

  form.reset();
});

// Select Div where to print the content
const cardParentDiv = document.querySelector('.card-container');

//Printing to the UI
function displayBookToLibrary(i) {
  loadDataFromLocalStorage();
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = 
   `<p class="title">"${myLibrary[i].title}"</h2>
    <p class="author">by ${myLibrary[i].author}</p>
    <p class="pages">${myLibrary[i].pages} pages</p>
    <button class="status-toggle">${myLibrary[i].status}</button>
    <button class="remove-book">Remove</button>`;

  // Select the status toggle button
  const statusToggle = card.querySelector('.status-toggle');

  // Update the color for the button
  if (myLibrary[i].status === "Not Read") {
    statusToggle.style.backgroundColor = "#F7B400";
  } else {
    statusToggle.style.backgroundColor = "#85b582";
  }

  cardParentDiv.appendChild(card);

  // Add an event listener to the status toggle button
  statusToggle.addEventListener('click', function () {
    myLibrary[i].toggle();
    saveDataToLocalStorage();

    // Update the text of the button
    statusToggle.textContent = myLibrary[i].status;

    // Update the color for the button
    if (myLibrary[i].status === "Not Read") {
      statusToggle.style.backgroundColor = "#F7B400";
    } else {
      statusToggle.style.backgroundColor = "#85b582";
    }
  });

  // Select the remove button
  const removeButton = card.querySelector('.remove-book');

  removeButton.addEventListener('click', function() {
    myLibrary.pop(myLibrary[i]);
    saveDataToLocalStorage();
    cardParentDiv.removeChild(card);
  })
}

//LocalStorage functions
function saveDataToLocalStorage() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
};

function loadDataFromLocalStorage() {
  const storedMyLibrary = localStorage.getItem('myLibrary');
  
  if (storedMyLibrary) {
      const parsedMyLibrary = JSON.parse(storedMyLibrary);
      myLibrary = parsedMyLibrary.map(book => new Book(book.title, book.author, book.pages, book.status === "Read"));
  }
};

// Selecting the close-button
const closeButton = document.querySelector(".close-button");

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});