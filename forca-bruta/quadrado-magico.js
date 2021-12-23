//
// PASSO 1
//

function passo1() {
    const todas = [];

    for (let a = 1; a < 17; a++) {
        for (let b = a + 1; b < 17; b++) {
            for (let c = b + 1; c < 17; c++) {
                for (let d = c + 1; d < 17; d++) {
                    todas.push([a, b, c, d]);
                }
            }
        }
    }

    return todas;
}

//
// PASSO 2
//

function linha34(linha) {
    return linha[0] + linha[1] + linha[2] + linha[3] === 34;
}

function passo2(linhas) {
    return linhas.filter(linha34);
}

//
// PASSO 3
//

/**
 * Verifica se a matriz contendo as linhas a, b, c e d fazem uso
 * dos 16 números naturais de 1 a 16.
 *
 * @param entrada Vetor de combinações (linhas).
 * @param a Índice de uma das linhas
 * @param b Índice de uma das linhas
 * @param c Índice de uma das linhas
 * @param d Índice de uma das linhas
 * @returns {boolean} O valor true se as linhas formam uma matriz com
 * todos os números de 1 a 16 e false, caso contrário.
 */
function elementosDistintos(entrada, a, b, c, d) {
    const ocorrencias = new Array(17).fill(0);

    if (encontradaSimilaridade(ocorrencias, entrada[a])) {
        return false;
    }

    if (encontradaSimilaridade(ocorrencias, entrada[b])) {
        return false;
    }

    if (encontradaSimilaridade(ocorrencias, entrada[c])) {
        return false;
    }

    return !encontradaSimilaridade(ocorrencias, entrada[d]);
}

function encontradaSimilaridade(contadores, vetor) {
    for (const elemento of vetor) {
        if (contadores[elemento] > 0) {
            return true;
        }

        contadores[elemento] = 1;
    }

    return false;
}

function passo3(somas34) {
    const candidatas = [];
    const total = somas34.length;
    for (let a = 0; a < total; a++) {
        for (let b = a + 1; b < total; b++) {
            for (let c = b + 1; c < total; c++) {
                for (let d = c + 1; d < total; d++) {
                    if (elementosDistintos(somas34, a, b, c, d)) {
                        candidatas.push([somas34[a], somas34[b], somas34[c], somas34[d]]);
                    }
                }
            }
        }
    }

    return candidatas;
}

//
// PASSO 4
//

// Código obtido do portal StackOverflow
// https://stackoverflow.com/questions/9960908/permutations-in-javascript
const permutator = (inputArr) => {
    let result = [];

    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next))
            }
        }
    }

    permute(inputArr)

    return result;
}

function passo4(candidatas) {
    const derivadas = [];
    for (const candidata of candidatas) {
        const parciais = permutator(candidata);
        for (const parcial of parciais) {
            derivadas.push(parcial);
        }
    }

    return derivadas;
}

//
// PASSO 5
//

function colunas34(l1, l2, l3, l4) {
    for (let c = 0; c < 4; c++) {
        const soma = l1[c] + l2[c] + l3[c] + l4[c];
        if (soma !== 34) {
            return false;
        }
    }

    return true;
}

function diagonais34(l1, l2, l3, l4) {
    const d1 = l1[0] + l2[1] + l3[2] + l4[3];
    if (d1 !== 34) {
        return false;
    }

    const d2 = l1[3] + l2[2] + l3[1] + l4[0];
    return d2 === 34;
}

function passo5(matrizes) {
    const solucoes = [];
    for (const matriz of matrizes) {
        const linhas1 = permutator(matriz[0]);
        const linhas2 = permutator(matriz[1]);
        const linhas3 = permutator(matriz[2]);
        const linhas4 = permutator(matriz[3]);

        for (const l1 of linhas1) {
            for (const l2 of linhas2) {
                for (const l3 of linhas3) {
                    for (const l4 of linhas4) {
                        if (colunas34(l1, l2, l3, l4) && diagonais34(l1, l2, l3, l4)) {
                            solucoes.push([l1, l2, l3, l4]);
                        }
                    }
                }
            }
        }
    }

    return solucoes;
}

//
// PASSO 6
//

function passo6(matrizes) {
    let acumuladorDePropriedades = {};

    function ignoraExistente(elemento) {
        let propriedade = JSON.stringify(elemento);
        if (acumuladorDePropriedades.hasOwnProperty(propriedade)) {
            return false;
        }

        acumuladorDePropriedades[propriedade] = true;
        return true;
    }

    return matrizes.filter(ignoraExistente);
}

/**
 * Identifica todas as soluções do desafio 4x4.
 * @returns {{tempo: number, solucoes: *[]}} Objeto contendo vetor de soluções
 * e tempo transcorrido durante o cômputo.
 */
function d44() {
    const inicio = new Date();

    const combinacoes = passo1();
    console.log("combinacoes", combinacoes.length);

    const combinacoes34 = passo2(combinacoes);
    console.log("combinacoes34", combinacoes34.length);

    const candidatas = passo3(combinacoes34);
    console.log("candidatas", candidatas.length);

    const derivadas = passo4(candidatas);
    console.log("derivadas", derivadas.length);

    const parciais = passo5(derivadas);
    console.log("derivadas", derivadas.length);

    const solucoes = passo6(parciais);
    console.log("solucoes", solucoes.length);

    const tempo = new Date() - inicio;

    return {
        solucoes,
        tempo
    };
}

function main() {
    const resposta = d44();
    console.log("Tempo para execução (ms)", resposta.tempo);
    console.log("Total de soluções:", resposta.solucoes.length);
}

/**
 * Seleciona, dentre as matrizes fornecidas, aquelas que satisfazem
 * mascara. A máscara é uma matriz 4x4 contendo os valores de 0 a 16,
 * inclusive. Quando uma célula da máscara é zero, então qualquer valor
 * na matriz de interesse é considerado satisfeito, na mesma posição.
 * Se o valor difere de zero, então a matriz de interesse deve
 * possuir o mesmo valor na mesma posição.
 * @param matrizes Matrizes das quais serão selecionadas aquelas de interesse.
 * @param mascara A máscara a ser empregada na seleção.
 */
function filtro(matrizes, mascara) {
    const filtradas = [];
    for (let matriz of matrizes) {
        if (satisfazMascara(matriz, mascara)) {
            filtradas.push(matriz);
        }
    }

    return filtradas;
}

function satisfazMascara(matriz, mascara) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (mascara[i][j] !== 0) {
                if (mascara[i][j] !== matriz[i][j]) {
                    return false;
                }
            }
        }
    }

    return true;
}

main();