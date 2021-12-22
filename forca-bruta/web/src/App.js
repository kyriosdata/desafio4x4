import {useEffect, useState} from "react";
import logo from "./d44.png";
import "./App.css";
import d44 from "./d44"
import Matriz from "./Matriz";

function App() {
    let todasAsSolucoes;

    const [solucoes, setSolucoes] = useState([]);

    function exibe(matrizes) {
        console.log(matrizes);
        if (!matrizes) {
            return;
        }

        return matrizes.map((m, i) => <Matriz key={i} valor={m}/>);
    }

    useEffect(() => {
        const resposta = d44();
        todasAsSolucoes = resposta.solucoes;
        setSolucoes(todasAsSolucoes);
        console.log("Executado em (ms):", resposta.tempo);
    }, []);

    return (
        <div className="container">
            <img src={logo} className="App-logo" alt="logo"/>
            {exibe(solucoes)}
        </div>
    );
}

export default App;
