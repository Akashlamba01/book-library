function isValidYear(year) {
  let persentYear = new Date().getFullYear();
  if (year >= 1000 && year <= persentYear) {
    return true;
  } else {
    return false;
  }
}

module.exports = { isValidYear };
