// function caricaHome() {

//     var carta = $("#home-con").val();

//     $.ajax({
//         url: "../ajax/getBiciclette.php",
//         type: "POST",
//         success: function (data) {
//             if (data.status == "success") {
//                 array.forEach(element => {
//                     array.forEach(element => {
//                         var divDaje = "<div><h1>Bicicletta: " + element.codice + "</h1><br><p>Si trodatava a: " + element.posizione + "</p><br><p>Al momento e': " + element.stato + "</p><br></button></div>";
//                         carta.append(divDaje);
//                     });
//                     var divDaje = "<div><h1>Bicicletta: " + element.codice + "</h1><br><p>Si trodatava a: " + element.posizione + "</p><br><p>Al momento e': " + element.stato + "</p><br></button></div>";
//                     carta.append(divDaje);
//                 });
//             }

//         }
//     });
// }
    

function getIndirizzo(id_ad){
    return new Promise((resolve) => {
        $.ajax({
            url: "../ajax/getIndirizzo.php",
            type: "POST",
            data: {Id: id_ad},
            success: function (data) {
                
                resolve("<br>Presente in: "+data.via+" "+data.citta+" "+data.cap+" "+data.provincia+"</div>");
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
                    
                    con.append(divDaje);
                }
            }

        }
    });

}


$(document).ready(function () {
    caricaHome();

});
