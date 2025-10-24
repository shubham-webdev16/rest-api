const express = require('express');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json()); // For API
app.use(express.urlencoded({ extended: true })); // For forms
app.set('view engine', 'ejs'); // Enable EJS
app.use(express.static('public')); // For static files (if needed)

// In-memory storage for books
let books = [];
let nextId = 1;

// Validation helper
function validateBook(book) {
  if (!book.title || typeof book.title !== 'string' || book.title.trim() === '') {
    return 'Title is required and must be a non-empty string.';
  }
  if (!book.author || typeof book.author !== 'string' || book.author.trim() === '') {
    return 'Author is required and must be a non-empty string.';
  }
  return null;
}

// Frontend Routes
app.get('/', (req, res) => {
  res.render('index', { books });
});

app.get('/books/add', (req, res) => {
  res.render('add-book', { error: null });
});

app.post('/books/add', (req, res) => {
  const bookData = { title: req.body.title, author: req.body.author };
  const validationError = validateBook(bookData);
  if (validationError) {
    return res.render('add-book', { error: validationError });
  }
  const newBook = { id: nextId++, title: bookData.title.trim(), author: bookData.author.trim() };
  books.push(newBook);
  res.redirect('/');
});

app.get('/books/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) {
    return res.render('error', { message: 'Book not found' });
  }
  res.render('edit-book', { book, error: null });
});

app.post('/books/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === id);
  if (bookIndex === -1) {
    return res.render('error', { message: 'Book not found' });
  }
  const bookData = { title: req.body.title, author: req.body.author };
  const validationError = validateBook(bookData);
  if (validationError) {
    const book = books[bookIndex];
    return res.render('edit-book', { book, error: validationError });
  }
  books[bookIndex] = { id, title: bookData.title.trim(), author: bookData.author.trim() };
  res.redirect('/');
});

app.post('/books/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === id);
  if (bookIndex === -1) {
    return res.render('error', { message: 'Book not found' });
  }
  books.splice(bookIndex, 1);
  res.redirect('/');
});

// API Routes (same as before)
app.get('/api/books', (req, res) => {
  console.log('GET /api/books - Retrieved all books');
  res.json(books);
});

app.post('/api/books', (req, res) => {
  const validationError = validateBook(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }
  const newBook = { id: nextId++, title: req.body.title.trim(), author: req.body.author.trim() };
  books.push(newBook);
  console.log(`POST /api/books - Added book: ${newBook.title}`);
  res.status(201).json(newBook);
});

app.put('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === id);
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  const validationError = validateBook(req.body);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }
  books[bookIndex] = { id, title: req.body.title.trim(), author: req.body.author.trim() };
  console.log(`PUT /api/books/${id} - Updated book`);
  res.json(books[bookIndex]);
});

app.delete('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === id);
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  const deletedBook = books.splice(bookIndex, 1)[0];
  console.log(`DELETE /api/books/${id} - Deleted book`);
  res.json({ message: 'Book deleted', book: deletedBook });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});