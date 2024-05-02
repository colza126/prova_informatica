function getQueryParamValue(name) {
    // Ottieni la stringa di query dalla URL
    var queryString = window.location.search.substring(1);
    
    // Dividi la stringa di query in una matrice di coppie chiave-valore
    var queryParams = queryString.split("&");
    
    // Itera su tutte le coppie chiave-valore
    for (var i = 0; i < queryParams.length; i++) {
        // Dividi la coppia chiave-valore in nome e valore
        var pair = queryParams[i].split("=");
        
        // Controlla se il nome del parametro corrente corrisponde a quello cercato
        if (pair[0] === name) {
            // Decodifica il valore e restituiscilo
            return decodeURIComponent(pair[1]);
        }
    }
    
    // Se il parametro non è stato trovato, restituisci null
    return null;
}

//var divDaje = "<div><h1>Bicicletta: " + element.codice + "</h1><br><br><p>Al momento e': " + element.stato + "</p><br></button></div>";

function caricaHome(id) {

    var carta = $("#home-con");

    $.ajax({
        url: "../ajax/getBiciclette.php",
        type: "POST",
        data: { id_sta: id },
        success: function (data) {
            if (data.status == "success") {
                for (let index = 0; index < data.numero; index++) {
                    
                    divDaje = "<div><h1>Bicicletta: " + data[index].codice + "</h1><p>Al momento e': " + data[index].stato + "</p></button></div>"
                    carta.append(divDaje);
                }
            }

        }
    });
}


$(document).ready(function () {
    
    caricaHome(getQueryParamValue("id_sta"));

});

