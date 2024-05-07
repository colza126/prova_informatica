$(document).ready(async function () {
    await controllaSess();

    $("#red").click(function () {
        window.location.href = "gestoreBici.html";
    });
});

async function controllaSess() {
    return new Promise((resolve) => {
        $.ajax({
            url: "../ajax/controlloSessione.php",
            type: "POST",
            success: function (data) {
                if (data.auth) {
                    admin = data.admin;

                    if (admin) {
                        $("#red").show();
                    } else {
                        $("#red").hide();
                    }
                    // Dopo aver impostato admin, chiamiamo caricaHome
                    caricaHome(getQueryParamValue("id_sta"),admin);
                    resolve(true);
                } else {
                    window.location.href = "../index.html";
                }
            }
        });
    });

}

function caricaHome(id,admin) {
    var carta = $("#home-con");

    $.ajax({
        url: "../ajax/getBiciclette.php",
        type: "POST",
        data: { id_sta: id },
        success: function (data) {
            if (data.status == "success") {
                for (let index = 0; index < data.numero; index++) {
                    divDaje = "<div id = "+data[index].ID+"><h1>Bicicletta: " + data[index].codice + "</h1><p>Al momento e': " + data[index].stato + "</p>"

                    if (data[index].stato != "Noleggiata") {
                        divDaje += "<button class = 'noleggia'>noleggia</button>";
                    }
                    if(admin){
                        divDaje += "<button class = 'elimina'>elimina</button>";
                    }
                    
                    divDaje += "</div>";
                    carta.append(divDaje);
                }
            }

        }
    });
}

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
