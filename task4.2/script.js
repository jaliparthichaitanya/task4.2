const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory array to store books
let books = [
    { id: 1, title: '1984', author: 'George Orwell' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
];

// GET /books - Get all books
app.get('/books', (req, res) => {
    res.json(books);
});

// POST /books - Add a new book
app.post('/books', (req, res) => {
    const { title, author } = req.body;
    const newBook = { id: books.length + 1, title, author };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT /books/:id - Update a book by ID
app.put('/books/:id', (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;

    let book = books.find(b => b.id == id);
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    book.title = title || book.title;
    book.author = author || book.author;

    res.json(book);
});

// DELETE /books/:id - Remove a book by ID
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    const bookIndex = books.findIndex(b => b.id == id);

    if (bookIndex === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }

    const deletedBook = books.splice(bookIndex, 1);
    res.json(deletedBook);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
