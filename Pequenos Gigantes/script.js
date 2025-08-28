const caixa1 = document.querySelector("#caixa1");
const caixa2 = document.querySelector("#caixa2");
const btnTransfer = document.querySelector("#btn_transfer");
const btnVerificar = document.querySelector("#btn_verificar");
const mensagem = document.querySelector("#mensagem");

const ordemCorreta = [
    "REINO", "FILO", "SUB-FILO", "CLASSE",
    "ORDEM", "FAMÍLIA", "GÊNERO", "ESPÉCIE", "SUB-ESPÉCIE"
];

// Função para embaralhar um array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Função para embaralhar os cursos ao carregar a página
function embaralharCursos() {
    const cursos = [...caixa1.querySelectorAll(".curso")];
    shuffleArray(cursos);
    cursos.forEach(curso => caixa1.appendChild(curso));
}

// Embaralha ao carregar
window.addEventListener("load", () => {
    embaralharCursos();
});


// Adiciona funcionalidade de seleção a todos os itens
document.querySelectorAll(".curso").forEach(curso => {
    curso.addEventListener("click", () => {
        curso.classList.toggle("selecao");
    });
});

// Transfere os elementos selecionados da caixa1 para a caixa2
btnTransfer.addEventListener("click", () => {
    mensagem.textContent = ""; // limpa mensagens anteriores
    const selecionados = caixa1.querySelectorAll(".curso.selecao");

    selecionados.forEach(item => {
        item.classList.remove("selecao", "correto", "incorreto");
        caixa2.appendChild(item);
    });
});

// Verifica se a ordem dos itens em caixa2 está correta
btnVerificar.addEventListener("click", () => {
    const cursosNaCaixa2 = [...caixa2.querySelectorAll(".curso")];
    // 1️⃣ Garante que o usuário tenha transferido todos os 9 níveis
    if (cursosNaCaixa2.length !== ordemCorreta.length) {
        mensagem.textContent = "Transfira todos os itens antes de verificar!";
        return;
    }

    let tudoCorreto = true;
    cursosNaCaixa2.forEach((item, index) => {
        item.classList.remove("correto", "incorreto");
        const texto = item.textContent.trim().toUpperCase();
        if (texto === ordemCorreta[index]) {
            item.classList.add("correto");
        } else {
            item.classList.add("incorreto");
            tudoCorreto = false;
        }
    });

    if (!tudoCorreto) {
        window.location.href = "/Fases/Erro.html";
    } else {
        window.location.href = "/Fases/Fim.html";
    }
});
