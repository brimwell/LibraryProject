const myLibrary = [];
const main = document.querySelector('.library');



//Constructor for a Book Object

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        if (read === false) {
            return `${title} by ${author}, ${pages} pages, not read yet`;
        } else {
            return `${title} by ${author}, ${pages} pages, already read`;
        }
    }
}

//Function to construct a book & add it to the myLibrary array

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function removeAll () {
    const divs = main.querySelectorAll('div');
    divs.forEach((div) => {
        main.removeChild(div);
    });
};

// Placeholder Books to Start
addBookToLibrary('Fairy Tale', 'Stephen King', 607, true);
addBookToLibrary('The Three Body Problem', 'Cixin Liu', 416, true);
addBookToLibrary('The Dark Forest', 'Cixin Liu', 528, false);
addBookToLibrary('Leap', 'Tess Vigeland', 258, true);
addBookToLibrary('The Brothers Karamazov', 'Dostoyevsky', 824, false);

// Function that Loops through all Book Objects in the myLibrary array and displays them on the page

function displayLibrary () {
    removeAll();
    for (let i = 0; i < myLibrary.length; i++) {
        const div = document.createElement('div');
        div.classList.add('card');
        div.setAttribute('id', `${i}`);

        const h2 = document.createElement('h2');
        h2.textContent = myLibrary[i].title;

        const p = document.createElement('p');
        p.textContent = 'by';

        const p2 = document.createElement('p');
        p2.textContent = myLibrary[i].author;
        p2.classList.add('author');

        const p3 = document.createElement('p');
        p3.textContent = `pages: ${myLibrary[i].pages}`;

        if (myLibrary[i].read === true) {
            div.classList.add('read');
        } else {
            div.classList.add('notRead');
        };

        const btn1 = document.createElement('button');
        btn1.classList.add('remove');
        btn1.textContent = 'Remove';

        const btn2 = document.createElement('button');
        btn2.classList.add('toggleRead');
        btn2.textContent = 'Change Read Status';
    

        main.appendChild(div);
        div.appendChild(h2);
        div.appendChild(p);
        div.appendChild(p2);
        div.appendChild(p3);
        div.appendChild(btn1);
        div.appendChild(btn2);
    };
    let removeBtn = document.querySelectorAll('.remove');
    removeBtn.forEach((button) => {
        button.addEventListener('click', (event) => {
            let arrayNum = event.srcElement.parentElement.id;
            myLibrary.splice(arrayNum, 1);
            displayLibrary();
        });
    });
    let readBtn = document.querySelectorAll('.toggleRead');
    readBtn.forEach((button) => {
        button.addEventListener('click', (e) => {
            let selectedBk = e.srcElement.parentElement;
            if (selectedBk.className === 'card read') {
                selectedBk.className = 'card notRead';
            } else {
                selectedBk.className = 'card read';
            };
        });
    });
    
}

displayLibrary();

//Declaring Needed DOM variables

const dialog = document.querySelector('dialog');
const form = dialog.querySelector('form');
const addButton = document.querySelector('.addBook');
const submitButton = dialog.querySelector('.submit');
const cancelButton = dialog.querySelector('.cancel');


//Code that makes Button allow User to Add a New Book to Library: constructs new book object and adds it to the array and adds it to the webpage

addButton.addEventListener('click', () => {
    form.reset();
    let errorMsg = form.querySelector('p');
    errorMsg.textContent = '';
    dialog.showModal();
});

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (form.title.value && form.author.value && form.pages.value) {
        addBookToLibrary(form.title.value, form.author.value, form.pages.value, form.read.checked);
        displayLibrary();
        dialog.close();
    } else {
        let errorMsg = form.querySelector('p');
        errorMsg.textContent = 'You need to fill out completely to add a book to your library.';
    };
});



cancelButton.addEventListener('click', (event) => {
    event.preventDefault();
    dialog.close();
});
























