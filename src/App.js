import React, { useState } from "react";

import { Container, CssBaseline } from "@material-ui/core";
import NavBar from "./components/navBar";
import Form from "./components/form";

const App = () => {
  const [bird, setBird] = useState({
    name: "",
    species: "",
    rarity: [],
    image: null
  });

  const [birds, setBirds] = useState([]);

  const handleChange = e => {
    setBird({
      ...bird,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  const handleRarityChange = e => {
    setBird({
      ...bird,
      rarity: e.target.value
    });
  };

  const handleImageChange = e => {
    e.preventDefault();
    setBird({ ...bird, image: e.target.files[0] });
  };

  console.log("bird", bird);

  return (
    <>
      <CssBaseline />
      <NavBar />
      <Container>
        <Form
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleImageChange={handleImageChange}
          handleRarityChange={handleRarityChange}
          bird={bird}
        />
      </Container>
    </>
  );
};

export default App;
