let express = require("express");
let app = express();
let port = process.env.port || 3000;
let db;
let sqlite3 = require("sqlite3");
let { open } = require("sqlite");
//Connect to the database
(async () => {
  db = await open({
    filename: "./BD-4.4-HW3/database.sqlite",
    driver: sqlite3.Database,
  });
  if (db) console.log("Connected to the SQLite database.");
})();
// Message
app.get("/", (req, res) => {
  res.status(200).json({ message: "BD 4.4 HW3 Select specific columns" });
});
//node BD-4.4-HW3/initDB.js
// THE ENPOINTS
//node BD-4.4-HW3
//1 /books
async function fetchAllBooks() {
  let response = await db.all("SELECT id, title, author FROM books");
  return { books: response };
}
app.get("/books", async (req, res) => {
  try {
    const result = await fetchAllBooks();
    if (result.books.length === 0)
      return res.status(404).json({ message: "No books found" });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//2 /books/author/Dan%20Brown
async function fetchBooksByAuthor(author) {
  let response = await db.all(
    "SELECT id, title, author, year FROM books WHERE author = ?",
    [author],
  );
  return { books: response };
}
app.get("/books/author/:author", async (req, res) => {
  let author = req.params.author;
  try {
    const result = await fetchBooksByAuthor(author);
    if (result.books.length === 0)
      return res
        .status(404)
        .json({ message: `No books found of this author ${author}` });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//3 /books/genre/Fantasy
async function fetchBooksByGenre(genre) {
  let response = await db.all(
    "SELECT id, title, author, genre FROM books WHERE genre = ?",
    [genre],
  );
  return { books: response };
}
app.get("/books/genre/:genre", async (req, res) => {
  let genre = req.params.genre;
  try {
    const result = await fetchBooksByGenre(genre);
    if (result.books.length === 0)
      return res
        .status(404)
        .json({ message: `No books found of this genre ${genre}` });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//4 /books/year/2000
async function fetchBooksByYear(year) {
  let response = await db.all(
    "SELECT id, title, author, genre, year FROM books WHERE year = ?",
    [year],
  );
  return { books: response };
}
app.get("/books/year/:year", async (req, res) => {
  let year = req.params.year;
  try {
    const result = await fetchBooksByYear(year);
    if (result.books.length === 0)
      return res
        .status(404)
        .json({ message: `No book found of this year ${year}` });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//Server Port connection Message
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
