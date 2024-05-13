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
        var singolo = "<div id=" + response[index].ID + ">Codice:" + response[index].codice + "<br>stato:" + response[index].stato + "<br>Citta:" + response[index].citta + "<button class='elimina'>elimina</button></div>";
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
$(document).ready(async function () {
    await controllaSess();
    popolaSelect();
    await caricaBici();

    $(".elimina").on("click", function () {
        var id = $(this).parent().attr("id");
        eliminaBici(id);
    });
    $("#ins-bici").on("click", function () {
        inserisciBici();
    });
});