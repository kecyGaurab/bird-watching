import React, { Fragment, useState, useEffect } from "react";

import { Grid, Container, CssBaseline } from "@material-ui/core";
import NavBar from "./components/navBar";
import Form from "./components/form";

const App = () => {
  const [bird, setBird] = useState({ name: "", species: "" });

  const handleChange = e => {
    setBird({ ...bird, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(bird);
  };

  return (
    <Fragment>
      <CssBaseline />
      <NavBar />
      <Container>
        <Form
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          bird={bird}
        />
      </Container>
    </Fragment>
  );
};

export default App;
