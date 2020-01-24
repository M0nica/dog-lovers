import React, { Component } from "react";
// import Select from "react-dropdown-select";
import "./App.css";

export function getBreed(url) {
  if (url === "") return "dog";
  const parser = document.createElement("a");
  parser.href = url;
  const breed = parser.href.split("/").slice(-2)[0];
  return breed;
}

// export function getBreeds() {
//   return fetch("https://dog.ceo/api/breeds/list/all").then(response =>
//     response.json().then(json => Object.keys(json.message))
//   );
// }

class DogAPICall extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: false, imgUrl: "", breeds: [] };

    this.setState({ loading: true });
    fetch("https://dog.ceo/api/breeds/image/random")
      .then(response => response.json())
      .then(json => this.setState({ loading: false, imgUrl: json.message }));
  }

  handleClick = api => e => {
    e.preventDefault();

    this.setState({ loading: true });
    fetch("https://dog.ceo/api/breeds/image/random")
      .then(response => response.json())
      .then(json => this.setState({ loading: false, imgUrl: json.message }));
  };

  render() {
    const { imgUrl } = this.state;

    return (
      <>
        <button onClick={this.handleClick()} className="button">
          Say "Hi!" to another dog {""}
          <span role="img" aria-label="dog-emoji">
            🐶
          </span>
        </button>

        <div className="dog-image">
          {" "}
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
