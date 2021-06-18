console.log("Heanding This app using OOP prototype");

// constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

// Display

function Display() {

}

// add methods to display prototype
// Emplementing add function
Display.prototype.add = function (book) {
    let tbody = document.getElementById('tableBody');
    let tbodyHtml = `<tr> <td> ${book.name} </td>
                            <td> ${book.author} </td>
                            <td> ${book.type} </td>
             </tr>`;

    tbody.innerHTML += tbodyHtml;

}
// Emplementing clear function
Display.prototype.clear = function () {
    let form = document.getElementById('myForm');
    form.reset();
}

// Emplementing validate function
Display.prototype.validate = function(book){
 if(book.name.length<3 || book.author.length<3){
     return false;
 }
 else{
     return true;
 }
}

// Emplementing show function

Display.prototype.show= function(type,msgTxt){
     let msg = document.getElementById('msgBox');

     msg.innerHTML = `<div id="alert" class="alert ${type}"><p>${msgTxt}</p> <img id="alert-btn" src="cross.svg" alt="cut"></div>`;
}
// Adding Submit Event Listner To Form

form = document.getElementById('myForm');

form.addEventListener('submit', formSubmit);

function formSubmit(e) {
    e.preventDefault();
    console.log('You have submitted library form');

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
    console.log(book);

    let display = new Display();
    if (display.validate(book)) {

        display.add(book);
        display.clear();
        display.show('success','Successfully Added Book');
    }
    else{
        // show error
        display.show('error','Unable to add book try again');
    }
    let alertBtn = document.getElementById('alert-btn');

    alertBtn.addEventListener('click', function(){
         let alert = document.getElementById('alert');
         alert.style.display = 'none';
    });

}
