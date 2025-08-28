// URL da tua API no Render
const API_URL = "https://empromo-api.onrender.com/promocoes";

// Função para carregar promoções
async function carregarPromocoes() {
  try {
    const resposta = await fetch(API_URL);
    const promocoes = await resposta.json();

    const lista = document.getElementById("lista-promocoes");
    lista.innerHTML = "";

    promocoes.forEach(promo => {
      // calcular desconto
      const desconto = Math.round(((promo.precoMedio - promo.precoPromocao) / promo.precoMedio) * 100);

      const card = document.createElement("div");
      card.className = "promo-card";
      card.innerHTML = `
        <h2>${promo.nome}</h2>
        <p><strong>Descrição:</strong> ${promo.descricao}</p>
        <p><strong>Preço Médio:</strong> ${promo.precoMedio.toLocaleString()} Kz</p>
        <p><strong>Promoção:</strong> ${promo.precoPromocao.toLocaleString()} Kz</p>
        <p><strong>Desconto:</strong> ${desconto}% OFF</p>
        <p><strong>Loja:</strong> ${promo.loja}</p>
        <p><a href="${promo.link}" target="_blank">Ver no site</a></p>
        <p><strong>Contato:</strong> ${promo.telefone}</p>
        <p><strong>Até:</strong> ${new Date(promo.tempoRestante).toLocaleDateString()}</p>
      `;
      lista.appendChild(card);
    });

  } catch (erro) {
    console.error("Erro ao carregar promoções:", erro);
    document.getElementById("lista-promocoes").innerHTML = "<p>Não foi possível carregar promoções 😢</p>";
  }
}

// Carregar promoções ao abrir o site
carregarPromocoes();
