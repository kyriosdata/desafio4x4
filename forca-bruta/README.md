## Quadrado mágico (4x4)

Implementação do quadrado mágico 4x4.

Consulte detalhes tanto do problema quanto
da solução aqui implementada
em https://github.com/kyriosdata/desafio4x4.

## Instalação

`npm install desafio4x4`

## Uso

O trecho de código abaixo gera as soluções do quadrado mágico, conforme ilustrado.

```javascript
const { d44 } = require("desafio4x4");

const resposta = d44();

console.log("Quantas soluções:", resposta.solucoes.length);
console.log("Tempo para cômputo:", resposta.tempo);
```

Além da função `d44`, a outra função é `filtro`. que recebe dois argumentos,
uma vetor de matrizes e uma máscara a ser empregada para selecionar matrizes,
dentre aquelas fornecida no vetor, que satisfazem tal máscara.

## Arquivo com soluções

Por comodidade, as soluções previamente computadas estão disponíveis no
arquivo JSON denominado **solucoes.json**.
