//
// PASSO 1
//

function passo1() {
    const todas = [];

    function todasAsCombinacoes(vetor, tamanho, inicio, resultado) {
        if (tamanho === 0) {
            todas.push(resultado.slice());
            return;
        }

        for (let i = inicio; i <= vetor.length - tamanho; i++) {
            resultado[resultado.length - tamanho] = vetor[i];
            todasAsCombinacoes(vetor, tamanho - 1, i + 1, resultado);
        }
    }

    const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    const resposta = [0, 0, 0, 0];
    todasAsCombinacoes(numeros, 4, 0, resposta);

    return todas;
}

//
// PASSO 2
//

function passo2(vetores) {
    return vetores.filter((c) => c[0] + c[1] + c[2] + c[3] === 34)
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

/**
 * Troca as posições de dois elementos do vetor cujos índices são fornecidos.
 *
 * @param vetor O vetor cujos elementos serão trocados.
 * @param a O índice de um elemento que receberá o outro elemento.
 * @param b O índice do outro elemento.
 */
function swap(vetor, a, b) {
    const tmp = vetor[a];
    vetor[a] = vetor[b];
    vetor[b] = tmp;
}

function geraPermutacoes(elementos) {
    const permutacoes = [];
    permutacoes.push(elementos);
    const indexes = [0, 0, 0, 0];
    const n = 4;
    let i = 0;
    while (i < n) {
        if (indexes[i] < i) {
            swap(elementos, i % 2 === 0 ? 0 : indexes[i], i);
            permutacoes.push(elementos.slice());
            indexes[i]++;
            i = 0;
        } else {
            indexes[i] = 0;
            i++;
        }
    }

    return permutacoes;
}

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

function passo5(matrizes) {
    console.log("consideradas", matrizes.length);
    const solucoes = [];
    for (const matriz of matrizes) {
        const linhas1 = geraPermutacoes(matriz[0]);
        const linhas2 = geraPermutacoes(matriz[1]);
        const linhas3 = geraPermutacoes(matriz[2]);
        const linhas4 = geraPermutacoes(matriz[3]);

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

    console.log("solucoes", solucoes.length);
    return solucoes;
}

//
// PASSO 6
//

function localizaMatrizesIdenticas(matrizes) {
    const identicas = [];
    const totalDeSolucoes = matrizes.length;
    for (let s = 0; s < totalDeSolucoes; s++) {
        for (let c = s + 1; c < totalDeSolucoes; c++) {
            if (matrizesIguais(matrizes[s], matrizes[c])) {
                identicas.push(c);
            }
        }
    }

    const indicesNaoDuplicados = new Set(identicas);
    return Array.from(indicesNaoDuplicados);
}

function matrizesIguais(m1, m2) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (m1[i][j] !== m2[i][j]) {
                return false;
            }
        }
    }

    return true;
}

function removeEntradasDuplicadas(duplicidades, matrizes) {
    const naoDuplicadas = [];

    for (let i = 0; i < matrizes.length; i++) {
        if (!duplicidades.includes(i)) {
            naoDuplicadas.push(matrizes[i]);
        }
    }

    return naoDuplicadas;
}

function passo6(respostasParciais) {
    const iguais = localizaMatrizesIdenticas(respostasParciais);
    const solucoes = removeEntradasDuplicadas(iguais, respostasParciais);

    const verificacao = localizaMatrizesIdenticas(solucoes);
    if (verificacao.length > 0) {
        throw new Error("ainda iguais???");
    }

    return solucoes;
}

/**
 * Identifica todas as soluções do desafio 4x4.
 * @returns {{tempo: number, solucoes: *[]}} Objeto contendo vetor de soluções
 * e tempo transcorrido durante o cômputo.
 */
function d44() {
    const inicio = new Date();

    const combinacoes = passo1();
    const combinacoes34 = passo2(combinacoes);
    const candidatas = passo3(combinacoes34);
    const derivadas = passo4(candidatas);
    const parcial = passo5(derivadas);
    const solucoes = passo6(parcial);

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

main();