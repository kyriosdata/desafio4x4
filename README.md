# Problema

Identificar todas as possíveis soluções do "quadrado mágico".

> Uma solução inclui a disposição de todos os números inteiros naturais de 1 a 16, inclusive,
> em uma matriz 4x4 de tal forma que as somas dos números em cada uma das linhas,
> em cada uma das colunas e em cada uma das diagonais seja 34.

Na ilustração abaixo o “quadrado”, “matriz” ou “tabuleiro” está parcialmente preenchido, restando o acréscimo dos números 2, 3, 4, 6, 10, 12 e 13. Observe que este preenchimento parcial não é parte de uma solução, pois a linha contendo 14 e 9, o que perfaz 23, precisa nas duas outras posições de números cuja soma deve perfazer 11, o que não é possível com os números ainda não empregados.

<img src="https://github.com/kyriosdata/desafio4x4/blob/main/imagens/4x4.png" width="300">

Você pode consultar informações adicionais sobre quadrados mágicos [aqui](https://pt.wikipedia.org/wiki/Quadrado_m%C3%A1gico).
Este problema foi inspirado por um jogo, dentre vários outros, comercializados pela empresa
[EnigMais](https://www.enigmais.com.br/).

## Importante (possível erro)

Conforme https://mathworld.wolfram.com/MagicSquare.html o quadrado mágico 4x4 possui 880 soluções, enquanto
o que segue abaixo é um número menor e, portanto, indica que o _design_ e a implementação correspondente,
conforme esta referência, estão errados. O que exige investigação posterior.

## Projeto (design)

A proposta é resolver o desafio por meio do produto D44, uma página web que exibe todas as soluções possíveis. As soluções são calculadas toda vez que a página é carregada.

### Proposta

Identificar todas as possíveis formas de se distribuir 16 números em um tabuleiro 4x4 e, na sequência, selecionar aquelas que atendem às exigências do desafio. Ou seja, uma estratégia conhecida por “força bruta” (brute force).

O problema desta estratégia é que temos 16! = 16 x 15 x 14 x … x 3 x 2 x 1 possibilidades de se dispor 16 números no tabuleiro. Em tempo, isto resulta em quase 21 trilhões de possibilidades. Ou seja, foram feitas “otimizações” nesta estratégia.

### Processo de otimização

A definição do produto D44, conforme acima, só foi possível após experimentações com código intercaladas com a proposta de solução.

Um algoritmo ingênuo foi pensado logo no início, mas que se mostrou inviável pela quantidade de combinações. Melhorias foram introduzidas visando eliminar as combinações que não podiam fazer parte da solução, por exemplo, considerar apenas
"linhas" cujas somam resultam em 34.

A alternância entre o projeto (design) do algoritmo e a verificação correspondente foi seguido em várias iterações. Adicionalmente, foi acrescentado ao final um passo visando certificar que, de fato, todas as soluções encontradas eram distintas entre si.

### Algoritmo

A solução é definida por meio de um algoritmo que identifica todas as matrizes que satisfazem as restrições definidas. Estratégia: força bruta (brute force). Dado que estamos interessados em todas as soluções, a solução não faz uso de heurísticas.

**Passo 1**. Gere todas as combinações possíveis de 4 números dos 16 números empregados, sem repetições. Por exemplo, (1, 2, 3, 4) e (4, 9, 14, 16) são duas destas combinações. O total de combinações possíveis, ignorando a ordem dos elementos, é 16!/[4! (16 - 4)!] = 1820. Observe que cada uma destas 1820 combinações podem ser dispostas em 24 sequências diferentes (4! = 4 x 3 x 2 x 1).

**Passo 2**. Das combinações do passo 1 selecione apenas aquelas cujas somas resultam em 34. Por exemplo, a combinação (1, 2, 3, 4) não satisfaz o critério de seleção, pois a soma é 10. Ou seja, esta combinação não é válida para uma linha, nem coluna nem diagonal da matriz desejada e, portanto, não faz parte da solução. De forma análoga, a combinação (2, 9, 14, 16) também não satisfaz esta restrição, pois a soma é 41. Por outro lado, a combinação (1, 6, 11, 16) satisfaz esta restrição. Observe que não necessariamente, 1, 6, 11 e 16, nesta ordem, forma uma linha, ou coluna ou diagonal, qualquer que seja o sentido, de uma solução. De fato, qualquer permutação destes elementos desta combinação também resulta em 34. Neste passo é definido o conjunto S de todas as combinações cujas somas são 34, ou seja, todas as tuplas de quatro números cuja soma é 34. Naturalmente, só elementos deste conjunto podem ser utilizados para montar uma linha, coluna ou diagonal das soluções desejadas, independente da ordem destes elementos.

**Passo 3**. Gerar todas as combinações de 4 elementos do conjunto S. Observe que cada elemento de S é uma tupla de 4 números. O total destas combinações é 86!/[4! (86-4)!] = 2.123.555, que é um número considerável e, naturalmente, nem todas elas são válidas, pois números podem ser repetidos nestas combinações. Neste passo, apenas as combinações que fazem uso dos 16 números são consideradas, produzindo o conjunto C.
Ou seja, cada elemento do conjunto C define uma matriz candidata. Uma matriz candidata é uma matriz cujas linhas somam 34, mas que ignoram as permutações delas. Ou seja, cada matriz candidata representa 24 matrizes, sendo que cada uma delas ignora as permutações dos números em cada linha.

**Passo 4**. Para cada elemento de C, ou matriz candidata, gerar as matrizes derivadas, todas as permutações das linhas e, para cada derivada,
gerar todas as permutações dos valores de cada uma das linhas. Dado que o total de permutações de 4 elementos é 24, teremos 24 x 24 x 24 x 24 = 331776 matrizes a serem consideradas para cada matriz derivada. Sabemos que cada matriz derivada satisfaz o critério de soma 34 das linhas, contudo, tanto as colunas quanto as diagonais precisam ser verificadas. Ao percorrer todas as derivadas de cada uma das candidatas e verificar, para cada uma delas, aquelas cujas colunas e diagonais são satisfeitas, tem-se como resultado a resposta desejada.

**Passo 5**. Identificar, dentre as soluções encontradas, aquelas que são idênticas. Se houver, então remover as repetições. Verificar que todas as soluções fornecidas são distintas entre si.

### Interface com o usuário

Dado que são quase 300 respostas, simplesmente listá-las é só uma simples proposta, na qual o usuário percorre cada uma delas, na ordem em que foram produzidas.

Uma melhoria é empregar um filtro. O usuário tem a disposição uma matriz na
qual estabelece um ou mais valores nas posições desejadas e, após cada mudança
do filtro, apenas as matrizes que satisfazem a restrição são exibidas. Quando
esta matriz "filtro" é "zerada", naturalmente são exibidas todas as soluções.

## Implementação

Consulte o diretório [forca-bruta](forca-bruta). Observe que o arquivo
[quadrado-magico.js](./forca-bruta/quadrado-magico.js) foi aquele
utilizado nas experimentações. O cliente está no diretório
[web](./forca-bruta/web).

## Cliente (em produção)

Siga https://kyriosdata.github.io/desafio4x4.
