var admin = false;
var map;
function controllaSess() {
    return new Promise((resolve) => {
        $.ajax({
            url: "../ajax/controlloSessione.php",
            type: "POST",
            success: function (data) {
                if (data.auth) {
                    admin = data.admin;
                    resolve(true);
                } else {
                    window.location.href = "../index.html";
                }
            }
        });
    });

}
async function getIdSession() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "../ajax/getIdNellaSessione.php",
            type: "POST",
            success: function (data) {
                resolve(data.id);
            },
            error: function (xhr, status, error) {
                alert("Si è verificato un errore: " + error);
                reject(error);
            }
        });
    });
}

function segnalaSmarrite(id) {
    if (confirm("Sei sicuro di voler segnalare questa carta come smarrita?")) {
        $.ajax({
            url: "../ajax/cambiaStatus.php",
            type: "POST",
            data: { ID: id, status: 0 },
            success: function (data) {
                alert("Segnalazione effettuata con successo");
                window.location.href = "../index.html"; // Redirect to home page
            },
            error: function (xhr, status, error) {
                alert("Si è verificato un errore: " + error);
            }
        });
    }
}



function getIndirizzo(id_ad) {
    return new Promise((resolve) => {
        $.ajax({
            url: "../ajax/getIndirizzo.php",
            type: "POST",
            data: { Id: id_ad },
            success: function (data) {

                resolve("\"" + data.via + " " + data.citta + "\"");
            }
        });

    })
}


async function caricaHome() {
    var con = $("#stazioni-container");

    $.ajax({
        url: "../ajax/getStazioni.php",
        type: "POST",
        success: async function (data) {
            if (data.status === "success") {
                for (let index = 0; index < data.numero; index++) {
                    // Aggiungi 1 all'indice prima di concatenarlo alla stringa
                    var stationIndex = index + 1;
                    var divDaje = "<div><h1>Stazione numero: " + stationIndex + "</h1><br>";

                    // Ottenere l'indirizzo
                    var indirizzo = await getIndirizzo(data[index].Id_indirizzo);
                    divDaje += indirizzo;
                    divDaje += "<br><a href = 'visualizzaBici.html?id_sta=" + data[index].ID + "'>visualizza stazione</a>";

                    // Funzione per ottenere le coordinate di geocoding
                    await aggiungiMarker(indirizzo, divDaje);
                    await new Promise(resolve => setTimeout(resolve, 200));


                }
            }
        }
    });
}

// Funzione per ottenere le coordinate di geocoding e aggiungere un marker alla mappa
async function aggiungiMarker(indirizzo, divDaje) {
    return $.ajax({
        url: "https://geocode.maps.co/search",
        method: "GET",
        data: { q: indirizzo, api_key: "664b4e3cd75ef811112818qwie61d60" },
        success: function (geoData) {
            if (geoData.length > 0) {
                L.marker([geoData[0].lat, geoData[0].lon]).addTo(map)
                    .bindPopup(divDaje)
                    .openPopup();
            }
        }
    });
}




$(document).ready(function () {
    $("#gestore_bici").hide();
    $('#area-smarrimenti-btn').hide();
    controllaSess();
    caricaHome();
    map = L.map('map').setView([45, 10], 3);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);




    if (admin) {
        $("#gestore_bici").show();
        $('area-smarrimenti-btn').show();
    }
    $("#gestore_bici").on("click", function () {
        window.location.href = "gestoreBici.html";
    });
    $("#smarrimento-btn").on("click", async function(){
        
        id = await getIdSession();
        segnalaSmarrite(id);
        window.location.href = "../index.html";
    })

    $('#area-smarrimenti-btn').on("click",function() {
        window.location.href = '../pages/areaSmarriti.html'; // Update with the correct URL if different
    });

});
