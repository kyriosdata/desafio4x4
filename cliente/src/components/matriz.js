import React from "react";

import styles from "./matriz.module.css";

const Matriz = ({ tabela }) => {
  return (
    <div className={styles["container"]}>
      <table>
        <tbody>
          <tr>
            <td>{tabela[0][0]}</td>
            <td>{tabela[0][1]}</td>
            <td>{tabela[0][2]}</td>
            <td>{tabela[0][3]}</td>
          </tr>
          <tr>
            <td>{tabela[1][0]}</td>
            <td>{tabela[1][1]}</td>
            <td>{tabela[1][2]}</td>
            <td>{tabela[1][3]}</td>
          </tr>
          <tr>
            <td>{tabela[2][0]}</td>
            <td>{tabela[2][1]}</td>
            <td>{tabela[2][2]}</td>
            <td>{tabela[2][3]}</td>
          </tr>
          <tr>
            <td>{tabela[3][0]}</td>
            <td>{tabela[3][1]}</td>
            <td>{tabela[3][2]}</td>
            <td>{tabela[3][3]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Matriz;
