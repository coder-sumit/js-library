

class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display {
    add(book) {

        let books = [];
        if (localStorage.getItem('books') != null) {
            books = JSON.parse(localStorage.getItem('books'));
        }
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));

    }
    showTable() {
        let tbodyHTML = ``;

        if (localStorage.getItem('books') != null) {
            let books = JSON.parse(localStorage.getItem('books'));
            let tbody = document.getElementById('tableBody');
            Array.from(books).forEach(function (book, index) {
                tbodyHTML += `<tr> <td> ${index +1} </td>
                                  <td> ${book.name} </td>
                                <td> ${book.author} </td>
                                <td> ${book.type} </td>
                                <td> <img id= "${index}" onclick= "deleteNote(this.id)" class="delete-btn" src="delete.svg" alt="delete" /> </td>
                 </tr>`;
               
               
            });
            tbody.innerHTML = tbodyHTML;
        }

    }

    clear() {
        let form = document.getElementById('myForm');
        form.reset();
    }

    validate(book) {
        if (book.name.length < 3 || book.author.length < 3) {
            return false;
        }
        else {
            return true;
        }
    }
    show(type, msgTxt) {
        let msg = document.getElementById('msgBox');

        msg.innerHTML = `<div id="alert" class="alert ${type}"><p>${msgTxt}</p> <img id="alert-btn" src="cross.svg" alt="cut"></div>`;
    }
}

// showing table data 
let showTable = new Display();
showTable.showTable();


// Adding Submit Event Listner To Form

form = document.getElementById('myForm');

form.addEventListener('submit', formSubmit);

function formSubmit(e) {
    e.preventDefault();

    let bookName = document.getElementById('bookName').value;
    let bookAuthor = document.getElementById('bookAuthor').value;
    let bookType;

    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) {
        bookType = 'fiction';
    }
    else if (programming.checked) {
        bookType = 'programming';
    }
    else if (cooking.checked) {
        bookType = 'cooking';
    }
    let book = new Book(bookName, bookAuthor, bookType);
    // console.log(book);

    let display = new Display();
    if (display.validate(book)) {

        display.add(book);
        display.showTable();
        display.clear();
        display.show('success', 'Successfully Added Book');
    }
    else {
        // show error
        display.show('error', 'Unable to add book try again');
    }



    // this is for alert
    let alertBtn = document.getElementById('alert-btn');

    alertBtn.addEventListener('click', function () {
        let alert = document.getElementById('alert');
        alert.style.display = 'none';
    });

}

// Function for deleting notes

function deleteNote(id){
    let bookObj = JSON.parse(localStorage.getItem('books'));
    bookObj.splice(id,1);
    localStorage.setItem('books', JSON.stringify(bookObj));
    let showTable = new Display();
    showTable.showTable();
}