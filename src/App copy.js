import React from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Registry/Registry";
import Particles from 'react-particles-js';

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    join: ""
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user : {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      join: data.join
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
    console.log(box);
  }

  onInputChange = (evt) => {
    this.setState({input: evt.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
      fetch("https://brain-server2138.herokuapp.com/imageUrl", {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          url: this.state.imageUrl
        })
      })
      .then(res => res.json())
      .then(response => {
        fetch("https://brain-server2138.herokuapp.com/image", {
            method: "put",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                id: this.state.user.id
            })
        })
        .then(res => res.json())
        .then(count => 
          this.setState(Object.assign(this.state.user, {entries: count})
        ));
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === "signin") {
      this.setState(initialState);
    }
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation onRouteChange={this.onRouteChange} route={this.state.route}/>
        {this.state.route === "home"? 
          <div>
            <Logo/>
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
          </div> : 
          (this.state.route === "signin"? 
            <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> :
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>)
          }
      </div>
    );
  }
}

export default App;