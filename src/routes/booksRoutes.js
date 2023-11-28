const express = require("express");
const router = express.Router();

const { celebrate, Joi } = require("celebrate");
const {
  getBooks,
  getBookById,
  addBooks,
  removeBook,
  updateBook,
} = require("../controllers/booksControllers");

router.get("/", getBooks);
router.get("/:bookId", getBookById);
router.post(
  "/add",
  celebrate({
    body: Joi.object().keys({
      title: Joi.string().required(),
      auther: Joi.string().required(),
      genre: Joi.string().required(),
      year: Joi.number().required(),
    }),
  }),
  addBooks
);
router.put(
  "/edit/:bookId",
  celebrate({
    body: Joi.object().keys({
      title: Joi.string().optional(),
      auther: Joi.string().optional(),
      genre: Joi.string().optional(),
      year: Joi.number().optional(),
    }),
  }),
  updateBook
);
router.delete("/remove/:bookId", removeBook);

module.exports = router;
