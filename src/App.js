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

class DogAPICall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      imgUrl: "",
      breeds: [],
      selectedOption: { value: "", label: "" }
    };
  }

  componentDidMount() {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then(response => response.json())
      .then(json =>
        this.setState(
          {
            loading: false,
            imgUrl: json.message
          },
          () => console.log("updating dog image...")
        )
      )
      .catch(err => console.log(err));

    const formattedBreeds = [];
    fetch("https://dog.ceo/api/breeds/list/all")
      .then(response => response.json())
      .then(json => Object.keys(json.message))
      .then(
        breeds =>
          breeds.map(breed =>
            formattedBreeds.push({
              value: breed,
              label: breed
            })
          ),
        this.setState({ breeds: formattedBreeds }, () => {
          console.log("setting breeds...");
        })
      )
      .catch(err => console.log(err));
  }

  handleBreedSelection = selectedOption => {
    const { value } = selectedOption;
    fetch(`https://dog.ceo/api/breed/${value}/images/random`)
      .then(response => response.json())
      .then(json =>
        this.setState({ selectedOption, loading: false, imgUrl: json.message })
      )
      .catch(err => console.log(err));
  };

  handleClick = api => e => {
    this.setState({ loading: true });
    e.preventDefault();

    const { value } = this.state.selectedOption;
    const url =
      value === ""
        ? "https://dog.ceo/api/breeds/image/random"
        : `https://dog.ceo/api/breed/${value}/images/random`;

    fetch(url)
      .then(response => response.json())
      .then(json => {
        if (json.status === "success") {
          this.setState({ loading: false, imgUrl: json.message });
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const { imgUrl, breeds, selectedOption } = this.state;

    return (
      <>
        <div className="container">
          <div className="selection">
            <p>Select a Dog Breed</p>
            <Select
              options={breeds}
              onChange={this.handleBreedSelection}
              className="dropdown"
            />
            <button onClick={this.handleClick()} className="button">
              Say "Hi!" to another{" "}
              {selectedOption.value ? selectedOption.value : "dog"}{" "}
              <span role="img" aria-label="dog-emoji">
                🐶
              </span>
            </button>
          </div>
          <div className="dog-image">
            {console.log(imgUrl)}{" "}
            {imgUrl && <img src={imgUrl} alt={`a ${getBreed(imgUrl)}`} />}
            <p>
              <span>W</span>
              <span>e</span> {""}
              <span> ❤ </span> {""}
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
        <DogAPICall />
      </div>
    );
  }
}

export default App;
