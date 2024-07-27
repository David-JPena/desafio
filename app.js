function encrypt() {
    let inputText = document.getElementById('inputText').value;
    if (/[^a-z\s]/.test(inputText)) {
        alert("Solo se permiten letras minúsculas sin acentos y caracteres especiales.");
        return;
    }
    let encryptedText = inputText.replace(/e/g, "enter")
                                 .replace(/i/g, "imes")
                                 .replace(/a/g, "ai")
                                 .replace(/o/g, "ober")
                                 .replace(/u/g, "ufat");
    document.getElementById('outputText').value = encryptedText;
    document.getElementById('inputText').value = '';
    // Activar la tarjeta
    activateCard();
}

function decrypt() {
    let inputText = document.getElementById('inputText').value;
    let outputText = document.getElementById('outputText').value;

    // Verificar si hay texto encriptado en inputText
    if (inputText === '') {
        alert("Primero debes encriptar un texto válido.");
        return;
    }

    // Proceso de desencriptación
    let decryptedText = inputText.replace(/ufat/g, "u")
                                 .replace(/ober/g, "o")
                                 .replace(/ai/g, "a")
                                 .replace(/imes/g, "i")
                                 .replace(/enter/g, "e");

    // Mostrar resultado solo si se ha desencriptado correctamente
    if (decryptedText !== inputText) {
        document.getElementById('outputText').value = decryptedText.trim(); // trim() para quitar espacios al inicio y final si los hay
    } else {
        alert("No se pudo desencriptar el texto. Asegúrate de que sea un texto encriptado válido.");
    }
    document.getElementById('inputText').value = '';
    
    // Activar la tarjeta
    activateCard();
}

function activateCard() {
    var cardContent = document.getElementById('cardContent');
    var outputTextarea = document.getElementById('outputText');
    var copyButton = document.querySelector('.button-copy');
    
    // Ocultar imagen y descripción, mostrar textarea y botón de copiar
    cardContent.style.display = 'none';
    outputTextarea.style.display = 'block';
    copyButton.style.display = 'block';
}

function copyToClipboard() {
    var outputText = document.getElementById('outputText');
    var button = document.querySelector('.button-copy');

    outputText.select();
    outputText.setSelectionRange(0, 99999); // Para dispositivos móviles

    // Usa la API del portapapeles para copiar el texto
    navigator.clipboard.writeText(outputText.value)
        .then(() => {
            // Cambia el texto del botón a "Texto copiado"
            button.textContent = 'Texto copiado';
            button.classList.add('copied'); 

            // Restaura el texto del botón después de 2 segundos
            setTimeout(function() {
                button.textContent = 'Copiar';
                button.classList.remove('copied'); 
            }, 2000);
        })
        .catch(err => {
            console.error("Error al copiar el texto: ", err);
        });
}
