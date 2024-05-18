

async function controllaSess() {
    return new Promise((resolve) => {
        $.ajax({
            url: "../ajax/controlloSessione.php",
            type: "POST",
            success: async function (data) {
                if (data.auth) {
                    admin = data.admin;

                    if (admin) {
                        $("#red").show();
                    } else {
                        $("#red").hide();
                    }
                    // Dopo aver impostato admin, chiamiamo caricaHome
                    if(await controlloNoleggio() == false){
                        caricaHome(getQueryParamValue("id_sta"), admin);
                    }else{
                        //da aggiungere funzione che visualizza la bici noleggiata
                        visualizzaBiciNoleggiata(getQueryParamValue("id_sta"));
                    }
                    resolve(true);
                } else {
                    window.location.href = "../index.html";
                }
            }
        });
    });

}

function visualizzaStats(){
    var div = $("#operazione-con");

    $.ajax({
        url: "../ajax/fetchOperazioniUser.php",
        type: "POST",
        success: function(data){
            for (let index = 0; index < data.numero; index++) {
                div += "<h1>Operazione: " + data[index].ID + "</h1>";
                div += "<p>tipo: " + data[index].tipo + "</p>";
                div += "<p>inizio: " + data[index].operazione + "</p>";
                if(data[index].fine == null){
                    div += "<p>Non ancora terminata</p>";
                }else{
                    div += "<p>Orario: " + data[index].fine + "</p>";

                }
                div += "</div>";
                $("#home-con").append(divDaje);
            }
        }
    });
}

function visualizzaBiciletta(){
    var carta = $("#home-con");

    $.ajax({
        url: "../ajax/getBiciclette.php",
        type: "POST",
        data: { id_sta: id },
        success: function (data) {
            if (data.status == "success") {
                for (let index = 0; index < data.numero; index++) {
                    var divDaje = "<div id='" + data[index].ID + "'>";
                    divDaje += "<h1>Bicicletta: " + data[index].codice + "</h1>";
                    divDaje += "<p>Al momento e': " + data[index].stato + "</p>";

                    if (data[index].stato != "Noleggiata") {
                        divDaje += "<button class='noleggia btn btn-success'>Noleggia</button>";
                    }
                    if (admin) {
                        divDaje += "<button class='elimina btn btn-danger'>Elimina</button>";
                    }

                    divDaje += "</div>";
                    carta.append(divDaje);
                }
            }

        }
    });
}
function visualizzaBiciNoleggiata(ID){
    var carta = $("#home-con");
    $.ajax({
        url: "../ajax/biciNoleggiateUser.php",
        type: "POST",
        data: { ID: ID },
        success: function (data) {
            if (data.status == "success") {
                for (let index = 0; index < data.numero; index++) {
                    var divDaje = "<div id='" + data[index].ID + "'>";
                    divDaje += "<h1>Bicicletta: " + data[index].codice + "</h1>";
                    divDaje += "<p>Al momento e': " + data[index].stato + "</p>";

                    if (data[index].stato != "Noleggiata") {
                        divDaje += "<button class='noleggia btn btn-success'>Noleggia</button>";
                    }

                    divDaje += "</div>";
                    carta.append(divDaje);
                }
            }

        }
    });

}
function caricaHome(id, admin) {
    var carta = $("#home-con");

    $.ajax({
        url: "../ajax/getBiciclette.php",
        type: "POST",
        data: { id_sta: id },
        success: function (data) {
            if (data.status == "success") {
                for (let index = 0; index < data.numero; index++) {
                    var divDaje = "<div id='" + data[index].ID + "'>";
                    divDaje += "<h1>Bicicletta: " + data[index].codice + "</h1>";
                    divDaje += "<p>Al momento e': " + data[index].stato + "</p>";

                    if (data[index].stato != "Noleggiata") {
                        divDaje += "<button class='noleggia btn btn-success'>Noleggia</button>";
                    }
                    if (admin) {
                        divDaje += "<button class='elimina btn btn-danger'>Elimina</button>";
                    }

                    divDaje += "</div>";
                    carta.append(divDaje);
                }
            }

        }
    });
}
async function controlloNoleggio() {
    var id_utente;
    $.ajax({
        url: "../ajax/getIdNellaSessione.php",
        type: "GET",
        success: function (response) {
            id_utente = response.id;
            $.ajax({
                url: "../ajax/checkNoleggiata.php",
                type: "POST",
                data: { id_utente: id_utente },
                success: function (response) {
                        return response.is_rented;
                }
            });
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

function eliminaBici(id) {
    $.ajax({
        url: "../ajax/eliminaBici.php",
        type: "POST",
        data: { id_bici: id },
        success: function (response) {
            if (response.status == "success") {
                alert("Bici eliminata");
                location.reload();
            } else {
                alert("Errore");
            }
        }
    });
}

function noleggia(id_bici, codice) {

    var id_utente;
    $.ajax({
        url: "../ajax/getIdNellaSessione.php",
        type: "GET",
        success: function (response) {
            id_utente = response.id;

            $.ajax({
                url: "../ajax/noleggiaBici.php",
                type: "POST",
                data: { id_bici: id_bici, id_utente: id_utente, codice: codice },
                success: async function (response) {
                    await controllaSess();

                }
            });
        }
    });

}

$(document).ready(async function () {
    await controllaSess();

    $("#red").click(function () {
        window.location.href = "gestoreBici.html";
    });

    // Delega gli eventi click per le classi ".elimina" e ".noleggia" agli elementi "body"
    $("body").on("click", ".elimina", function () {
        var id = $(this).parent().attr("id");
        eliminaBici(id);
    });

    $("body").on("click", ".noleggia", function () {
        var id = $(this).parent().attr("id");
        var codice = $(this).parent().find("h1").text().split(" ")[1];
        noleggia(id, codice);
    });
});
