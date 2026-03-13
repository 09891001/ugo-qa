/* =========================================
UPLOAD DE FOTO PARA CLOUDINARY
Projeto Praça Pet
========================================= */

const CLOUD_NAME = "dtfehnpxy";
const UPLOAD_PRESET = "praca_pet";

const uploadInput = document.getElementById("foto-praca");
const uploadStatus = document.getElementById("upload-status");
const fotoUrlInput = document.getElementById("foto-url");
const previewImagem = document.getElementById("preview-imagem");

if (uploadInput) {

uploadInput.addEventListener("change", async function () {

const file = uploadInput.files[0];

if (!file) {
return;
}

/* =============================
VALIDAÇÃO DE ARQUIVO
============================= */

const tiposPermitidos = [
"image/jpeg",
"image/png",
"image/webp"
];

if (!tiposPermitidos.includes(file.type)) {

uploadStatus.textContent =
"Formato inválido. Use JPG, PNG ou WEBP.";

return;

}

/* =============================
VALIDAÇÃO DE TAMANHO
============================= */

const tamanhoMaximo = 5 * 1024 * 1024;

if (file.size > tamanhoMaximo) {

uploadStatus.textContent =
"A imagem deve ter no máximo 5MB.";

return;

}

uploadStatus.textContent =
"Enviando imagem...";

/* =============================
UPLOAD PARA CLOUDINARY
============================= */

const formData = new FormData();

formData.append("file", file);
formData.append("upload_preset", UPLOAD_PRESET);

try {

const resposta = await fetch(
`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
{
method: "POST",
body: formData
}
);

if (!resposta.ok) {
throw new Error("Erro no upload");
}

const dados = await resposta.json();

const urlImagem = dados.secure_url;

/* =============================
SUCESSO
============================= */

fotoUrlInput.value = urlImagem;

uploadStatus.textContent =
"Upload concluído com sucesso.";

/* =============================
PREVIEW DA IMAGEM
============================= */

if (previewImagem) {

previewImagem.src = urlImagem;
previewImagem.style.display = "block";

}

} catch (erro) {

uploadStatus.textContent =
"Erro ao enviar imagem. Tente novamente.";

console.error("Erro upload:", erro);

}

});

}