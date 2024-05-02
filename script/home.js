
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

    //da sistemare
    $.ajax({
        url: "../ajax/getStazioni.php",
        type: "POST",
        success: async function (data) {
            if (data.status == "success") {
                for (let index = 0; index < data.numero; index++) {
                    
                    var divDaje = "<div><h1>Stazione numero: " + index+1  + "</h1><br>";
                    divDaje += await getIndirizzo(data[index].Id_indirizzo)
                    divDaje += "<button class='visualizzaBici' value='" + data[index].ID + "'>Visualizza</button></div>";
                    con.append(divDaje);
                }
            }

        }
    });

}


$(document).ready(function () {
    caricaHome();
    
    // Event delegation per gestire il click sui pulsanti visualizzaBici
    $("#stazioni-container").on("click", ".visualizzaBici", function() {
        window.location.href = "visualizzaBici.html?id_sta=" + $(this).val();
    });
});
