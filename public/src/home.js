function getTotalBooksCount(books) {
  // use native array method reduce()
  const totalNumberOfBooks = books.reduce((acc, curr) => {
    acc++;
    return acc;
  }, 0);
  return totalNumberOfBooks;
}

function getTotalAccountsCount(accounts) {
  // use native array method reduce()
  const totalNumberOfAccounts = accounts.reduce((acc, curr) => {
    acc++;
    return acc;
  }, 0);
  return totalNumberOfAccounts;
}

function getBooksBorrowedCount(books) {
  // use native array method reduce()
  const totalNumberOfBorrowedBooks = books.reduce((acc, curr) => {
    if (!curr.borrows[0].returned) acc++;
    return acc;
  }, 0);
  return totalNumberOfBorrowedBooks;
}
// project employs helper function to support getMostCommonGenres()
function testIfGenreExistsHelper(genre, genresArray) {
  const isGenreInArray = genresArray.some(
    (genreObj) => genreObj.name === genre
  );
  return isGenreInArray;
}
// project employs helper function to support getMostCommonGenres()
function increaseCountHelper(genre, genreArray) {
  genreArray.forEach((genreObj) => {
    if (genreObj.name === genre) {
      genreObj.count += 1;
    }
  });
}

function getMostCommonGenres(books) {
  const genresArray = [];

  books.forEach((book) => {
    const { genre } = book;
    if (!testIfGenreExistsHelper(genre, genresArray)) {
      genresArray.push({ name: genre, count: 1 });
    } else {
      increaseCountHelper(genre, genresArray);
    }
  });
  // sort and return top five genres
  return genresArray
    .sort((genre1, genre2) => genre2.count - genre1.count)
    .slice(0, 5);
}

function getMostPopularBooks(books) {
  const bookTitleAndTimesBorrowed = [];

  books.forEach((book) => {
    bookTitleAndTimesBorrowed.push({
      name: book.title,
      count: book.borrows.length,
    });
  });
  // sort and return five most popular books
  return bookTitleAndTimesBorrowed
    .sort((book1, book2) => book2.count - book1.count)
    .slice(0, 5);
}
// project employs helper function to support getMostPopularAuthors()
function checkIfAuthorExistsHelper(author, authorNameAndCount) {
  const doesAuthorExist = authorNameAndCount.some(
    (authorObj) => authorObj.name === author
  );
  return doesAuthorExist;
}
// project employs helper function to support getMostPopularAuthors()
function getAuthorFromIdAndFormatNameHelper(authorId, authors) {
  // use native array method find()
  const foundAuthor = authors.find((author) => author.id === authorId);
  const fullName = `${foundAuthor.name.first} ${foundAuthor.name.last}`;
  return fullName;
}
// project employs helper function to support getMostPopularAuthors()
function addToAuthorCountHelper(totalBorrows, authorName, authorInfo) {
  authorInfo.forEach((author) => {
    if (author.name === authorName) author.count += totalBorrows;
  });
}

function getMostPopularAuthors(books, authors) {
  const authorInfo = [];

  books.forEach((book) => {
    // use object destructing
    const { authorId } = book;
    const totalBorrows = book.borrows.length;
    const authorName = getAuthorFromIdAndFormatNameHelper(authorId, authors);
    if (!checkIfAuthorExistsHelper(authorName, authorInfo)) {
      authorInfo.push({ name: authorName, count: totalBorrows });
    } else {
      addToAuthorCountHelper(totalBorrows, authorName, authorInfo);
    }
  });
  // sort by descending order and return top five authors
  return authorInfo
    .sort((author1, author2) => author2.count - author1.count)
    .slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
