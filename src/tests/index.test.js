const { expect } = require("chai");
const starWars = require("../index");

describe("starwars-names", () => {
  describe("all", () => {
    it("it should be an array of string", () => {
      expect(starWars.all).to.satisfy(isArrayOfStrings);

      function isArrayOfStrings(arr) {
        return (
          Array.isArray(arr) && arr.every((item) => typeof item === "string")
        );
      }
    });

    it("it should contain `Luke Skywalker`", () => {
      expect(starWars.all).to.include("Luke Skywalker");
    });
  });

  describe("random", () => {
    it("it should return a random ite from the starWars.all", () => {
      var randomItem = starWars.random();
      expect(starWars.all).to.include(randomItem);
    });
  });
});
