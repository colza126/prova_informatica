function caricaHome() {

    var carta = $("#home-con").val();

    $.ajax({
        url: "../ajax/getBiciclette.php",
        type: "POST",
        success: function (data) {
            if (data.status == "success") {
                array.forEach(element => {
                    array.forEach(element => {
                        var divDaje = "<div><h1>Bicicletta: " + element.codice + "</h1><br><p>Si trodatava a: " + element.posizione + "</p><br><p>Al momento e': " + element.stato + "</p><br></button></div>";
                        carta.append(divDaje);
                    });
                    var divDaje = "<div><h1>Bicicletta: " + element.codice + "</h1><br><p>Si trodatava a: " + element.posizione + "</p><br><p>Al momento e': " + element.stato + "</p><br></button></div>";
                    carta.append(divDaje);
                });
            }

        }
    });
}


$(document).ready(function () {
    caricaHome();

});codice