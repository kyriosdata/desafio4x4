const d44 = require("../quadrado-magico");

test("computa soluções e o tempo gasto", () => {
   const resposta = d44();
   expect(resposta.solucoes).not.toBeNull();
   expect(resposta.tempo).not.toBeNull();
});