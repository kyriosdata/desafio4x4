import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from "./d44.png";
import axios from "axios";

import "./style.module.css";
import LandingPage from "./views/landing-page";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [solucoes, setSolucoes] = useState();

  useEffect(() => {
    axios("https://unpkg.com/desafio4x4@1.0.3/solucoes.json")
      .then(({ data }) => {
        if (data) {
          setSolucoes(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Baixando soluções, aguarde...</h1>
      </div>
    );
  }

  return (
    <Router>
      <div>
        <LandingPage solucoes={solucoes} />
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
