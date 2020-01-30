import React, { Component } from "react";
import "./App.css";
import Select from "react-select";

export function getBreed(url) {
  if (url === "") return "dog";
  const parser = document.createElement("a");
  parser.href = url;
  const breed = parser.href.split("/").slice(-2)[0];
  return breed;
}

export class DogPhotoDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: "",
      breeds: [],
      selectedBreed: { value: "", label: "" }
    };
  }

  componentDidMount() {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then(response => response.json())
      .then(json =>
        this.setState(
          {
            imgUrl: json.message
          },
          () => {}
        )
      )
      .catch(err => console.log(err));

    const breedData = [];
    fetch("https://dog.ceo/api/breeds/list/all")
      .then(response => response.json())
      .then(json => Object.keys(json.message))
      .then(
        breeds =>
          breeds.map(breed =>
            breedData.push({
              value: breed,
              label: breed
            })
          ),
        this.setState({ breeds: breedData }, () => {})
      )
      .catch(err => console.log(err));
  }

  handleBreedSelection = selectedBreed => {
    const { value } = selectedBreed;
    fetch(`https://dog.ceo/api/breed/${value}/images/random`)
      .then(response => response.json())
      .then(json =>
        this.setState({ selectedBreed: selectedBreed, imgUrl: json.message })
      )
      .catch(err => console.log(err));
  };

  handleClick = api => e => {
    e.preventDefault();

    const { value } = this.state.selectedBreed;
    const url =
      value === ""
        ? "https://dog.ceo/api/breeds/image/random"
        : `https://dog.ceo/api/breed/${value}/images/random`;

    fetch(url)
      .then(response => response.json())
      .then(json => {
        if (json.status === "success") {
          this.setState({ imgUrl: json.message });
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const { imgUrl, breeds, selectedBreed } = this.state;

    return (
      <>
        <div className="container">
          <div className="selectionPanel">
            <p>Select a Dog Breed</p>

            <Select
              options={breeds}
              onChange={this.handleBreedSelection}
              className="dropdown"
            />

            <button onClick={this.handleClick()} className="button">
              Say "Hi!" to another{" "}
              {selectedBreed.value ? selectedBreed.value : "dog"}{" "}
              <span role="img" aria-label="dog-emoji">
                🐶
              </span>
            </button>
          </div>
          <div className="dog-image">
            {imgUrl && <img src={imgUrl} alt={`a ${getBreed(imgUrl)}`} />}
            <p>
              <span>W</span>
              <span>e</span> {""}
              <span> ❤ </span> {""}
              <br />
              <span>o</span>
              <span>u</span>
              <span>r</span>
              {""} {""}
              <span>p</span>
              <span>u</span>
              <span>p</span>
              <span>s</span>
              <span>!</span>
            </p>
          </div>
        </div>
      </>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Dogapooloza</h1>
        By <a href="https://github.com/M0nica/">Monica Powell</a>
        <DogPhotoDisplay />
        <p></p>
      </div>
    );
  }
}

export default App;
