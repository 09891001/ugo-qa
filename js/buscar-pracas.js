const URL_PLANILHA =
"https://docs.google.com/spreadsheets/d/1raQ49At3U05o1c5sGCpzH_M1kQYxZhxB7dGAOyslquA/gviz/tq?tqx=out:json";

async function carregarPracas() {
  try {

    const resposta = await fetch(URL_PLANILHA);
    const texto = await resposta.text();

    const json = JSON.parse(
      texto.substring(47).slice(0, -2)
    );

    const linhas = json.table.rows;

    const container = document.getElementById("lista-pracas");

    container.innerHTML = "";

    linhas.forEach((linha) => {

      const endereco = linha.c[0]?.v || "";
      const observacoes = linha.c[1]?.v || "";
      const email = linha.c[2]?.v || "";
      const whatsapp = linha.c[3]?.v || "";
      const foto = linha.c[4]?.v || "";
      const tipo = linha.c[5]?.v || "";
      const data = linha.c[6]?.v || "";

      const card = document.createElement("article");

      card.className = "card-praca";
      card.setAttribute("data-cy", "card-praca");

      card.innerHTML = `
        <h2 data-cy="praca-endereco">${endereco}</h2>

        <p data-cy="praca-observacao">
        ${observacoes}
        </p>

        <p>
        Tipo: <strong data-cy="praca-tipo">${tipo}</strong>
        </p>

        <p>
        Data: <span data-cy="praca-data">${data}</span>
        </p>

        ${
          foto
          ? `<img src="${foto}" alt="Foto da praça" data-cy="praca-foto">`
          : ""
        }

        <p>
        Contato: 
        <a href="mailto:${email}" data-cy="praca-email">${email}</a>
        </p>

        <p data-cy="praca-whatsapp">
        WhatsApp: ${whatsapp}
        </p>
      `;

      container.appendChild(card);

    });

  } catch (erro) {

    console.error("Erro ao carregar dados", erro);

  }
}

document.addEventListener(
  "DOMContentLoaded",
  carregarPracas
);