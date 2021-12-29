import React, { useState } from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
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

const userInitialState = {
  id: "",
  name: "",
  email: "",
  entries: 0,
  join: ""
}

const App = () => {
  const [user, setUser] = useState({});
  const [box, setBox] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [route, setRoute] = useState("signin");

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      join: data.join
    }
    )
  }

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
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

  const displayFaceBox = (boxData) => {
    setBox(boxData);
    console.log(boxData);
  }

  const onInputChange = (evt) => {
    setImageUrl(evt.target.value);
  }

  const onButtonSubmit = () => {
    fetch("https://brain-server2138.herokuapp.com/imageUrl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: imageUrl
      })
    })
      .then(res => res.json())
      .then(response => {
        fetch("https://brain-server2138.herokuapp.com/image", {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: user.id
          })
        })
          .then(res => res.json())
          .then(count =>
            setUser({ ...user, entries: count })
          );
        displayFaceBox(calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  const onRouteChange = (newRoute) => {
    if (newRoute === "signin") {
      setUser(userInitialState);
      setImageUrl("");
      setBox("");
    }
    setRoute(newRoute);
  }

  return (
    <div className="App">
      <Particles className="particles" params={particlesOptions} />
      <Navigation onRouteChange={onRouteChange} route={route} />
      {route === "home" ?
        <div>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </div> :
        (route === "signin" ?
          <SignIn loadUser={loadUser} onRouteChange={onRouteChange} /> :
          <Register loadUser={loadUser} onRouteChange={onRouteChange} />)
      }
    </div>
  );
}

export default App;