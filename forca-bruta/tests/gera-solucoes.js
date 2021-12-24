const { d44 } = require("../quadrado-magico");
const fs = require("fs");

const resposta = d44();
const json = JSON.stringify(resposta.solucoes);
fs.writeFileSync("solucoes.json", json);
