import uniqueRandomArray from "unique-random-array";
import starWarsNames from "./starwars-names.js";

export default {
  all: starWarsNames,
  random: uniqueRandomArray(starWarsNames),
};
