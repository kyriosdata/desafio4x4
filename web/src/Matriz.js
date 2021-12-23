import "./Matriz.css";

function Matriz(props) {

    const linha = (vetor) => (
        <tr key={vetor[0]}>
            {vetor.map(e => <td key={e}>{e}</td>)}
        </tr>
    );

    return (
        <div className="matriz">
            <table>
                <tbody>
                {props.valor.map(l => linha(l))}
                </tbody>
            </table>
        </div>
    );
}

export default Matriz;
