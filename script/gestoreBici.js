function controllaSess(){
    return new Promise((resolve) => {
        $.ajax({
            url: "../ajax/controllaSessione.php",
            type: "POST",
            success: function (data) {
                if (data.auth) {

                    if(!data.admin){
                        window.location.href = "../index.html";
                    }
                }else{
                    window.location.href = "../index.html";
                }
            }
        });
    });

}

function caricaBici(){
    var container = $("#bici");
    $.ajax({
        url: "../ajax/fetchBici.php",
        type: "POST",
        success: function(response){
            
            for (let index = 0; index < response.numero; index++) {
                const element = array[index];
                var singolo = "<div id = "+array[index].ID+">Codice:"+array[index].codice+"<br>stato:"+array[index].stato+"<br>Citta:"+array[index].citta+"<button class = 'elimina'>elimina</button>"+"</div>"
                container.append(singolo);
            }
        }
    });
}

function eliminaBici(id){
    $.ajax({
        url: "../ajax/eliminaBici.php",
        type: "POST",
        data: { id_bici: id },
        success: function(response){
            if(response.status == "success"){
                alert("Bici eliminata");
                location.reload();
            }else{
                alert("Errore");
            }
        }
    });
}

$(document).ready(function(){
    controllaSess();
    caricaBici();

    $(".elimina").on("click", function(){
        var id = $(this).parent().attr("id");
        eliminaBici(id);
    });
});