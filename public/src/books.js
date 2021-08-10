function findAuthorById(authors, id) {
  // use native array method find()
  const foundAuthor = authors.find((authors) => authors.id === id);
  return foundAuthor;
}

function findBookById(books, id) {
  const foundBook = books.find((book) => {
    // use object destructuring
    const { id: bookId } = book;
    return bookId === id;
  });
  return foundBook;
}
// project employs helper function
function testBookStatusHelper(book) {
  const hasBookBeenReturned = book.borrows[0].returned;
  return hasBookBeenReturned;
}

function partitionBooksByBorrowedStatus(books) {
  const returnedBooks = [];
  const nonReturnedBooks = [];
  for (book of books) {
    if (testBookStatusHelper(book)) {
      returnedBooks.push(book);
    } else {
      nonReturnedBooks.push(book);
    }
  }
  return [nonReturnedBooks, returnedBooks];
}
// project employs helper function to support getBorrowersForBook()
function findBorrowerHelper(accountId, accounts) {
  const foundBorrower = accounts.find((account) => account.id === accountId);
  return foundBorrower;
}

function getBorrowersForBook(book, accounts) {
  const borrowers = [];

  book.borrows.forEach((borrow) => {
    // use  object destructing and rename field
    const { id: accountId } = borrow;
    const account = findBorrowerHelper(accountId, accounts);
    // use the spread operator
    borrowers.push({ ...borrow, ...account });
  });
  // the test expects only 10 items to be returned
  return borrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
