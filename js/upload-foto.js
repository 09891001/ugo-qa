/* =========================================
UPLOAD DE FOTO PARA CLOUDINARY
Projeto Praça Pet - Versão Homologada
========================================= */

const CLOUD_NAME = "dtfehnpxy";
const UPLOAD_PRESET = "praca_pet";

// Iniciamos o script garantindo que a página carregou completamente
document.addEventListener("DOMContentLoaded", () => {
    
    const uploadInput = document.getElementById("foto-praca");
    const uploadStatus = document.getElementById("upload-status");
    const fotoUrlInput = document.getElementById("foto-url");
    const previewImagem = document.getElementById("preview-imagem");

    // Só executa a lógica se o campo de upload existir na página atual
    if (uploadInput) {

        uploadInput.addEventListener("change", async function () {
            const file = uploadInput.files[0];

            if (!file) return;

            /* =============================
            VALIDAÇÃO DE ARQUIVO
            ============================= */
            const tiposPermitidos = ["image/jpeg", "image/png", "image/webp"];

            if (!tiposPermitidos.includes(file.type)) {
                if (uploadStatus) uploadStatus.textContent = "Formato inválido. Use JPG, PNG ou WEBP.";
                return;
            }

            /* =============================
            VALIDAÇÃO DE TAMANHO (5MB)
            ============================= */
            const tamanhoMaximo = 5 * 1024 * 1024;
            if (file.size > tamanhoMaximo) {
                if (uploadStatus) uploadStatus.textContent = "A imagem deve ter no máximo 5MB.";
                return;
            }

            // Feedback visual de carregamento
            if (uploadStatus) {
                uploadStatus.textContent = "Enviando imagem... Por favor, aguarde.";
                uploadStatus.style.color = "#0000FF";
            }

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

                if (!resposta.ok) throw new Error("Erro no servidor do Cloudinary");

                const dados = await resposta.json();
                const urlImagem = dados.secure_url;

                /* =============================
                SUCESSO - PREENCHIMENTO DE DADOS
                ============================= */
                if (fotoUrlInput) {
                    fotoUrlInput.value = urlImagem;
                    // Foco visual/auditivo no link gerado
                    fotoUrlInput.focus(); 
                }

                if (uploadStatus) {
                    uploadStatus.textContent = "Upload concluído com sucesso!";
                    uploadStatus.style.color = "green";
                }

                /* =============================
                PREVIEW DA IMAGEM
                ============================= */
                if (previewImagem) {
                    previewImagem.src = urlImagem;
                    previewImagem.style.display = "block";
                    previewImagem.style.maxWidth = "100%";
                    previewImagem.style.marginTop = "15px";
                }

            } catch (erro) {
                if (uploadStatus) {
                    uploadStatus.textContent = "Erro ao enviar imagem. Verifique sua conexão.";
                    uploadStatus.style.color = "red";
                }
                console.error("Erro no processo de upload:", erro);
            }
        });
    }
});