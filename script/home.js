var admin = false;
function controllaSess(){
    return new Promise((resolve) => {
        $.ajax({
            url: "../ajax/controllaSessione.php",
            type: "POST",
            success: function (data) {
                if (data.auth) {
                    admin = data.admin;
                    resolve(true);
                }else{
                    window.location.href = "../index.html";
                }
            }
        });
    });

}


function getIndirizzo(id_ad){
    return new Promise((resolve) => {
        $.ajax({
            url: "../ajax/getIndirizzo.php",
            type: "POST",
            data: {Id: id_ad},
            success: function (data) {
                
                resolve("<br>Presente in: "+data.via+" "+data.citta+" "+data.cap+" "+data.provincia);
            }
        });
    
    })
}



async function caricaHome(){
    
    var con = $("#stazioni-container");
    
    $.ajax({
        url: "../ajax/getStazioni.php",
        type: "POST",
        success: async function (data) {
            if (data.status == "success") {
                for (let index = 0; index < data.numero; index++) {
                    // Aggiungi 1 all'indice prima di concatenarlo alla stringa
                    var stationIndex = index + 1;
                    var divDaje = "<div><h1>Stazione numero: " + stationIndex + "</h1><br>";
                    divDaje += await getIndirizzo(data[index].Id_indirizzo)
                    divDaje += "<button class='visualizzaBici' value='" + data[index].ID + "'>Visualizza</button></div>";
                    con.append(divDaje);
                }
            }
        }
    });
    

}


$(document).ready(function () {
    $("#gestore_bici").hide();
    controllaSess();
    caricaHome();
    
    if(admin){
        $("#gestore_bici").show();
    }
    $("#gestore_bici").on("click", function(){
        window.location.href = "gestoreBici.html";
    });

    // Event delegation per gestire il click sui pulsanti visualizzaBici
    $("#stazioni-container").on("click", ".visualizzaBici", function() {
        window.location.href = "visualizzaBici.html?id_sta=" + $(this).val();
    });
});
