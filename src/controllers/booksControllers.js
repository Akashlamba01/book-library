const Books = require("../models/booksModel");
const { isValidYear } = require("../utility/helper");
const resp = require("../utility/httpResponse");

const getBooks = async (req, res) => {
  try {
    const books = await Books.find({}).lean();

    return resp.successOk(res, books);
  } catch (error) {
    return resp.unknown(res, error.message);
  }
};

const getBookById = async (req, res) => {
  try {
    const books = await Books.findById(req.params.bookId);

    if (!books) return resp.notFound(res);

    return resp.successOk(res, books);
  } catch (error) {
    return resp.unknown(res, error.message);
  }
};

const addBooks = async (req, res) => {
  try {
    const book = await Books.findOne({
      title: req.body.title,
    });

    if (!book) {
      if (!isValidYear(req.body.year)) {
        return resp.fail(
          res,
          `Expected year should be lesser than ${new Date().getFullYear()}!`
        );
      }

      const book = await Books.create(req.body);
      return resp.successCreate(res, book);
    }

    return resp.taken(res);
  } catch (error) {
    return resp.unknown(res, error.message);
  }
};

const updateBook = async (req, res) => {
  try {
    const books = await Books.findById(req.params.bookId);

    if (!books) return resp.notFound(res);

    if (req.body.title) {
      await Books.findOne({
        title: req.body.title,
      });
      return resp.taken(res);
    }

    if (req.body.year) {
      if (!isValidYear(req.body.year)) {
        return resp.fail(
          res,
          `Expected year should be lesser than ${new Date().getFullYear()}!`
        );
      }
    }

    const updatedBook = await Books.findOneAndUpdate(
      {
        _id: books.id,
      },
      req.body,
      {
        new: true,
      }
    ).lean();

    return resp.successOk(res, "Updated Successfully!", updatedBook);
  } catch (error) {
    return resp.unknown(res, error.message);
  }
};

const removeBook = async (req, res) => {
  try {
    const book = await Books.findByIdAndDelete(req.params.bookId);

    if (!book) return resp.notFound(res);

    return resp.successOk(res, "Deleted Successfully!");
  } catch (error) {
    return resp.unknown(res, error.message);
  }
};

module.exports = {
  getBooks,
  getBookById,
  addBooks,
  updateBook,
  removeBook,
};
