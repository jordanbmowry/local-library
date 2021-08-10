function findAccountById(accounts, id) {
  // use native array method find()
  const foundAccount = accounts.find((account) => account.id === id);
  return foundAccount;
}

function sortAccountsByLastName(accounts) {
  const sortedAccounts = accounts.sort((accountA, accountB) =>
    //use ternary operator
    accountA.name.last > accountB.name.last ? 1 : -1
  );
  return sortedAccounts;
}

function getTotalNumberOfBorrows(account, books) {
  // use native array method reduce
  const totalNumber = books.reduce((acc, curr) => {
    // arrow function used
    curr.borrows.forEach((borrowObj) => {
      if (borrowObj.id === account.id) {
        acc++;
      }
    });
    return acc;
  }, 0);
  return totalNumber;
}
// project employs helper function to support getBooksPossessedByAccount()
function getAuthorHelper(book, authors) {
  const author = authors.find((author) => author.id === book.authorId);
  return author;
}

function getBooksPossessedByAccount(account, books, authors) {
  const borrowedBooks = [];

  books.forEach((book) => {
    let bookBorrows = book.borrows;

    bookBorrows.forEach((borrow) => {
      if (borrow.id === account.id && !borrow.returned) {
        borrowedBooks.push(book);
      }
    });
  });
  // use native array method map()
  const result = borrowedBooks.map((book) => {
    // use spread operator
    return { ...book, author: getAuthorHelper(book, authors) };
  });
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
