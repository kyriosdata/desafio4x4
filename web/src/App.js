import {useEffect, useState} from "react";
import logo from "./d44.png";
import "./App.css";
import d44 from "desafio4x4";
import Matriz from "./Matriz";

function GerandoSolucoes() {
    return (
        <div className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1>Gerando soluções. Aguarde...</h1>
        </div>
    );
}

function App() {
    const [solucoes, setSolucoes] = useState([]);
    const [loading, setLoading] = useState(true);

    async function calcula() {
        return d44();
    }

    useEffect(() => {
        (async () => {
            const resposta = await calcula();
            setSolucoes(resposta.solucoes);
            setLoading(false);
        })();
    }, []);

    function exibe(matrizes) {
        if (!matrizes) {
            return;
        }

        return matrizes.map((m, i) => <Matriz key={i} valor={m}/>);
    }

    if (loading) {
        return GerandoSolucoes();
    }

    return (
        <div className="container">
            <h1>Total de soluções: {solucoes.length}</h1>
            {exibe(solucoes)}
        </div>
    );
}

export default App;
