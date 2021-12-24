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

  useEffect(async () => {
    const recuperado = await axios(
      "https://unpkg.com/desafio4x4@1.0.3/solucoes.json"
    );

    setSolucoes(recuperado.data);
    setLoading(false);
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
    <div className="container">
      <h1>Total de soluções: {solucoes.length}</h1>
      {exibe(solucoes)}
    </div>
  );
}

export default App;
