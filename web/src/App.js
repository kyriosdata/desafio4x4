import { useEffect, useState } from "react";
import logo from "./d44.png";
import "./App.css";
import Matriz from "./Matriz";
import axios from "axios";

function GerandoSolucoes(x) {
  return (
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Baixando soluções. Aguarde...</h1>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [solucoes, setSolucoes] = useState();

  useEffect(() => {
    axios(
      "https://unpkg.com/desafio4x4@1.0.3/solucoes.json"
    ).then(({ data }) => {
      if (data) {
        setSolucoes(data);
        setLoading(false);
      } 
    }).catch((error) => {
      console.error(error);
      return error;
    })
  }, []);

  function exibe(matrizes) {
    if (!matrizes) {
      return;
    }

    return matrizes.map((m, i) => <Matriz key={i} valor={m} />);
  }

  if (loading) {
    return GerandoSolucoes("teste");
  }

  return (
    <>
      <h1>Total de soluções: {solucoes.length}</h1>
      <div className="container">
        {exibe(solucoes)}
      </div>
    </>
  );
}

export default App;
