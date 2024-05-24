

function popolaSelect() {
    var select = $("#stazioni"); // Replace "selectId" with the actual ID of your select element
    $.ajax({
        url: "../ajax/fetchStazioni.php",
        type: "POST",
        success: function (response) {
            // Assuming the response is an array of options
            for (let index = 0; index < response.numero; index++) {
                const element = response[index];
                var optionElement = $("<option>").val(element.ID).text(element.ID);
                select.append(optionElement);
            }

        }
    });
}

async function controllaSess() {
    return new Promise((resolve) => {
        $.ajax({
            url: "../ajax/controlloSessione.php",
            type: "POST",
            success: function (data) {
                if (data.auth) {
                    if (!data.admin) {
                        window.location.href = "../index.html";
                    }
                    resolve(); // Risolve la Promise quando l'autenticazione ha successo
                } else {
                    window.location.href = "../index.html";
                }
            }
        });
    });
}

async function caricaBici() {
    var container = $("#bici_container");
    var response = await new Promise((resolve) => {
        $.ajax({
            url: "../ajax/fetchBici.php",
            type: "POST",
            success: function (response) {
                resolve(response);
            }
        });
    });
    
    for (let index = 0; index < response.numero; index++) {
        const element = response[index];
        var singolo = "<div id=" + response[index].ID + ">Codice:" + response[index].codice + "<br>stato:" + response[index].stato + "<br>Citta:" + response[index].citta;
        if(response[index].stato != "Noleggiata"){
            singolo += "<button class='elimina btn btn-danger'>Elimina</button>";
        }
        singolo += "</div>";
        container.append(singolo);
    }
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

function inserisciBici(){
    var codice = $("#cod").val();
    var citta = $("#stazioni").val();
    $.ajax({
        url: "../ajax/creaBicicletta.php",
        type: "POST",
        data: {
            codice:codice,
            id_stazione:citta
        },
        success: function (response) {
            if(response.status == "success"){
                alert("Bici inserita");
                location.reload();
            }else{
                alert("Errore");
            }
        }
    });

}

function inserisciStazioni(){

    var nSlot = $("#n_slot").val();

    $.ajax({
        type: "POST",
        url: "ajax/inserisci_indirizzo.php",
        data: {
            citta: $("#citta").val(),
            via: $("#via").val(),
            provincia: $("#provincia").val(),
            cap: $("#cap").val()
        },
        success: function(response) {
            if (typeof response === "string") {
                try {
                    response = JSON.parse(response); // Parsa la risposta JSON
                } catch (error) {
                    console.error("Errore di parsing JSON:", error);
                    alert("Errore di parsing JSON");
                    return;
                }
            }
            if (response.status === "success") {
                console.log("Successo! ID:", response.id);
                $.ajax({
                    url: "../ajax/inserisciStazione.php",
                    method: "POST",
                    data:{
                        slot: nSlot
                    },
                    success:function name() {
                        alert("stazione inserita con successo");
                    }
                })
            } else {
                console.error("Errore:", response.message); // Supponendo che ci sia un campo "message" nel caso di errore
                alert("Errore: " + response.message);
            }
        },
        error: function(xhr, status, error) {
            console.error("Errore nella richiesta AJAX:", status, error);
            alert("Errore nella richiesta AJAX");
        }
    });
}

function createHomeButton() {
    var homeButtonHtml = `
        <button class="btn btn-secondary mt-3" id="home-button">Torna alla Home</button>
    `;
    $('#form-container').append(homeButtonHtml);

    // Event listener for the home button
    $('#home-button').on('click', function() {
        window.location.href = "home.html";
    });
}


$(document).ready(async function () {
    await controllaSess();
    popolaSelect();
    createHomeButton();
    await caricaBici();

    $(".elimina").on("click", function () {
        var id = $(this).parent().attr("id");
        eliminaBici(id);
    });
    $("#ins-bici").on("click", function () {
        inserisciBici();
    });
});