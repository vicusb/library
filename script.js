const enter = document.querySelector('.enter');
const submit = document.querySelector('.submit');
const overlay = document.querySelector('.overlay');
const main = document.querySelector('main');
const removeAll = document.querySelector('.remove');
let myLibrary = [];


//DOM Variables Definition

let card;
let bookTitle;
let bookAuthor;
let bookPages;
let readIt;
let trash;
let deleters;
let reads;

// LocalStorage Access

if(localStorage.getItem('myLibrary')) {
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    console.log(JSON.parse(localStorage.getItem('myLibrary')));
    addBooksToLibrary();
  } else {
    myLibrary = [];
  }

//--------------------ICONS---------------------//

const bookIcon = document.createElement('i');
bookIcon.classList.add("fas");
bookIcon.classList.add("fa-book");
const authorIcon = document.createElement('i');
authorIcon.classList.add("fas");
authorIcon.classList.add("fa-pen-nib");
const pagesIcon = document.createElement('i');
pagesIcon.classList.add("fas")
pagesIcon.classList.add("fa-book-open")
const readIcon = document.createElement('i');
readIcon.classList.add("fas")
readIcon.classList.add("fa-book-reader")
const trashIcon = document.createElement('i');
trashIcon.classList.add("fas");
trashIcon.classList.add("fa-trash");

//----------------FUNCTIONS--------------------//



function Book(title, author, pages, read) {
    this.bookTitle = title;
    this.bookAuthor = author;
    this.bookPages = pages;
    this.readIt = read;
}

function getFormData() {
    const title = document.getElementById('bookTitle');
    const author = document.getElementById('bookAuthor');
    const pages = document.getElementById('bookPages');
    const read = document.getElementById('readCheck');

    if (title === "" || author === "" || pages === "" || pages <= 0) {
        return;
    }

    addBookToArray(title.value, author.value, pages.value, read.checked);
    addBooksToLibrary();

    title.value = '';
    author.value = '';
    pages.value = '';
    read.checked = false;
}


function addBookToArray(title, author, pages, read) {

    if (title === "" || author === "" || pages === "" || pages <= 0) {
        return;
    }

    let book = new Book(title, author, pages, read);
    
    myLibrary.push(book);

    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function addBooksToLibrary() {

    main.textContent = "";

    for (let i = 0; i < myLibrary.length; i++) {

        card = document.createElement('div');
        card.classList.add('card');

        bookTitle = document.createElement('div');
        bookTitle.classList.add("bookTitle");

        bookAuthor = document.createElement('div');
        bookAuthor.classList.add("bookAuthor");

        bookPages = document.createElement('div');
        bookPages.classList.add("bookPages");

        readIt = document.createElement('div');
        readIt.classList.add("readIt");
        readIt.setAttribute('data-key', i);

        if (myLibrary[i].readIt === true) {
            readIt.classList.add("read");
        } else {
            readIt.classList.add("noRead")
        }

        trash = document.createElement('div');
        trash.classList.add("trash");

        bookTitle.innerHTML = '<i class="fas fa-book"></i>' + myLibrary[i].bookTitle;
        //bookTitle.textContent = title;
        card.appendChild(bookTitle);

        bookAuthor.innerHTML = '<i class="fas fa-pen-nib"></i>' + myLibrary[i].bookAuthor;
        //bookAuthor.textContent = author;
        card.appendChild(bookAuthor);

        bookPages.innerHTML = '<i class="fas fa-book-open"></i>' + myLibrary[i].bookPages + " pages";
        //bookPages.textContent = pages;
        card.appendChild(bookPages);

        if (myLibrary[i].readIt === true) {
            readIt.innerHTML = '<i class="fas fa-book-reader"></i>FINISHED';
        } else {
            readIt.innerHTML = '<i class="fas fa-book-reader"></i>UNFINISHED';
        }
        card.appendChild(readIt);

        trash.innerHTML = `<button class='deleter' data-key='${i}'>DELETE</button>`//'<i class="fas fa-trash"></i>';
        card.appendChild(trash);


        main.appendChild(card);
    }

    reads = document.querySelectorAll('.readIt');
    reads.forEach(read => read.addEventListener('click', toggleRead));
   
    deleters = document.querySelectorAll('.deleter');
    deleters.forEach(deleter => deleter.addEventListener('click', deleteBook));

}

function deleteBook () {

    myLibrary = myLibrary.filter(i => i !== myLibrary[this.dataset.key]);

    addBooksToLibrary();

    console.table(myLibrary);
    
}

function toggleRead(){
    

    if (myLibrary[this.dataset.key].readIt === true){
        myLibrary[this.dataset.key].readIt = false;
        localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    } else {
        myLibrary[this.dataset.key].readIt = true;
        localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    }

    console.table(myLibrary);

    addBooksToLibrary();
}

//----------------EVENTS LISTENERS-------------------------//

enter.addEventListener('click', () => {
    overlay.classList.toggle('invisible');
    if(overlay.classList.contains('fade-out')){
        overlay.classList.remove('fade-out');
    }
    overlay.classList.add('fade-in');
});

removeAll.addEventListener('click', () => {
    main.textContent = '';
    myLibrary = [];
})

submit.addEventListener('click', () => {
    getFormData();
   
    if(overlay.classList.contains('fade-in')){
        overlay.classList.remove('fade-in');
    }
    overlay.addEventListener('animationend', addInvisibility);
    overlay.classList.add('fade-out');
    
});

function addInvisibility() {
    if(this.classList.contains('fade-in')){
        return;
    }
    else {
        this.classList.add('invisible');
    }
    
}


