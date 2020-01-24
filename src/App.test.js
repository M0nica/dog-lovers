import React from "react";
import { render } from "@testing-library/react";
import App, { getBreed } from "./App";

test("getBreed returns the proper breed when given a URL response from https://images.dog.ceo/breeds", () => {
  expect(
    getBreed("https://images.dog.ceo/breeds/keeshond/n02112350_7317.jpg")
  ).toBe("keeshond");
});
test("getBreed returns dog when passed an empty URL", () => {
  expect(getBreed("")).toBe("dog");
});
