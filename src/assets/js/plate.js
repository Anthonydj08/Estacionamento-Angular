

function leitura(foto64) {
    var secret_key = "sk_fde22bcc8fe54ef476718757";
    var url = "https://api.openalpr.com/v2/recognize_bytes?recognize_vehicle=1&country=br&secret_key=" + secret_key;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    // Send POST data and display response
    xhr.send(foto64); // Replace with base64 string of an actual image
    xhr.onreadystatechange = function () {
        return new Promise(resolve => {
            console.log(xhr ,xhr.readyState);
            if (xhr.readyState == 4) {
                resolve(document.getElementById("response").innerHTML = xhr.responseText);
            } else {
                resolve(document.getElementById("response").innerHTML = "Placa não identificada");
            }
        })
    }
}