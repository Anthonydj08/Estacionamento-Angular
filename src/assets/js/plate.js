// function teste() {
//     alert("teste")
// }

// $(function () {
//     const fetch = require('node-fetch');
//     const FormData = require('form-data');
//     const fs = require('fs');

//     let image_path = '../assets/images/placa.jpg'
//     let body = new FormData();
//     body.append('upload', fs.createReadStream(image_path));

//     fetch("https://api.platerecognizer.com/v1/plate-reader/", {
//         method: 'POST',
//         headers: {
//             "Authorization": "Token 321be1e11119bc11eb38a56bef273ebff58599ba"
//         },
//         body: body
//     }).then(res => res.json())
//         .then(json => console.log("testeeeee", json))
//         .catch((err) => {
//             console.log(err);
//         });
// })
// console.log("tefasdvfgdsdgsdsf");

// Open connection to api.openalpr.com

function leitura(foto64) {
    var secret_key = "sk_fde22bcc8fe54ef476718757";
    var url = "https://api.openalpr.com/v2/recognize_bytes?recognize_vehicle=1&country=br&secret_key=" + secret_key;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    var placa = ""

    // Send POST data and display response
    xhr.send(foto64); // Replace with base64 string of an actual image
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            console.log(xhr.responseText);
            document.getElementById("response").innerHTML = xhr.responseText;
        } else {
            document.getElementById("response").innerHTML = "Placa não identificada";
        }
    }
    setTimeout(() => {
        return placa
    }, 3000);

}