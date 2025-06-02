var uniqueRandomArray = from("unique-random-array");
var starWarsNames = require("./star-wars-names.json");

module.exports = {
  all: starWarsNames,
  random: uniqueRandomArray(starWarsNames),
};
