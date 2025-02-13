const myLibrary = []

class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
    toggleRead() {
        this.read = !this.read
    }

}

const addBookbtn = document.getElementById("addBookBtn")
const addBookModal = document.getElementById("addBookModal")
const form = document.getElementById("addBookForm")
const closeModal = document.querySelector(".close")
const bookContainer = document.getElementById("library")

addBookbtn.addEventListener("click", () => {
    addBookModal.style.display = "flex"
})

closeModal.addEventListener("click", () => {
    addBookModal.style.display = "none"
})

window.addEventListener("click", (event) => {
    if (event.target === addBookModal) {
        addBookModal.style.display = "none"
    }
})

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        addBookModal.style.display = "none"
    }
})

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const pages = document.getElementById("pages").value
    const read = document.getElementById("read").checked

    console.log(`Title: ${title}, Author: ${author}, Pages: ${pages}, Read: ${read}`);

    if (title === "" || author === "" || pages <= 0) {
        alert("Please enter valid book details.");
        return;
    }

    const book = new Book(title, author, pages, read)
    addBookToLibrary(book)
    form.reset();
    addBookModal.style.display = "none"
    renderLibrary()
})

function renderLibrary() {
    bookContainer.innerHTML = ""

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement("div")
        bookCard.classList.add("book-card")

        bookCard.innerHTML = `
        <h2>${book.title}</h2>
        <h3>${book.author}</h3>
        <p>${book.pages} pages</p>
        <button id="readBtn" onclick="toggleRead(${index})">${book.read ? "Read" : "❌ Not Read"}</button>
        <button id="removeBtn" onclick="removeBook(${index})">Remove</button>
        `
        bookContainer.appendChild(bookCard)
    })
}

function addBookToLibrary(book) {
    myLibrary.push(book)
    renderLibrary()
}

function removeBook(index) {
    myLibrary.splice(index, 1)
    renderLibrary()
}

function toggleRead(index) {
    console.log(myLibrary[index])
    myLibrary[index].toggleRead()
    renderLibrary()
}
