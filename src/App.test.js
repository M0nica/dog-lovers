import React from "react";
import { getBreed, DogPhotoDisplay } from "./App";
import { mount } from "enzyme";
import Select from "react-select";

describe("getBreed returns proper breed", () => {
  test("getBreed returns the proper breed when given a URL response from https://images.dog.ceo/breeds", () => {
    expect(
      getBreed("https://images.dog.ceo/breeds/keeshond/n02112350_7317.jpg")
    ).toBe("keeshond");
  });
  test("getBreed returns dog when passed an empty URL", () => {
    expect(getBreed("")).toBe("dog");
  });
});

describe("dog image rendering", () => {
  test("it renders correct image and alt tag when there is an imgUrl", () => {
    const mockImageUrl =
      "https://images.dog.ceo/breeds/springer-english/n02102040_3476.jpg";
    const wrapper = mount(<DogPhotoDisplay />);
    expect(wrapper.find("img").length).toEqual(0);
    wrapper.setState({
      imgUrl: mockImageUrl
    });

    expect(wrapper.find("img").length).toEqual(1);
    expect(wrapper.find("img").prop("src")).toEqual(mockImageUrl);
    expect(wrapper.find("img").prop("alt")).toEqual("a springer-english");
  });

  test("it does not render an image when there is not an imgUrl", () => {
    const wrapper = mount(<DogPhotoDisplay />);
    expect(wrapper.find("img").length).toEqual(0);
    wrapper.setState({
      imgUrl: ""
    });
    expect(wrapper.find("img").length).toEqual(0);
  });
});

describe("button renders with correct text", () => {
  test("it renders generic language when a breed is not selected ", () => {
    const wrapper = mount(<DogPhotoDisplay />);
    expect(wrapper.find("button").text()).toEqual(
      'Say "Hi!" to another dog 🐶'
    );
  });
});
test("it renders breed specific language when a breed is not selected ", () => {
  const wrapper = mount(<DogPhotoDisplay />);
  wrapper.setState({
    selectedBreed: {
      value: "poodle",
      label: "poodle"
    }
  });
  expect(wrapper.find("button").text()).toEqual(
    'Say "Hi!" to another poodle 🐶'
  );
});

describe("dropdown renders", () => {
  test("it renders dropdown", () => {
    const wrapper = mount(<DogPhotoDisplay />);
    expect(wrapper.find(Select).length).toEqual(1);
  });
});
