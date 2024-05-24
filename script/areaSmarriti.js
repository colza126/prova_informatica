async function controllaSess() {
    return new Promise((resolve) => {
        $.ajax({
            url: "../ajax/controlloSessione.php",
            type: "POST",
            success: function (data) {
                if (data.auth && data.admin) {
                    console.log(data.admin);
                    resolve(true); // Resolve the promise if authorized
                } else {
                    window.location.href = "../index.html";
                }
            },
            error: function () {
                window.location.href = "../index.html";
            }
        });
    });
}

function visualizzaDisattivati() {
    $.ajax({
        method: "POST",
        url: "../ajax/fetchSmarrita.php",
        success: function (data) {
            if (data.status === 'success') {
                // Get the div where the data will be displayed
                var usercon = $('#user-con');

                // Clear any existing content
                usercon.empty();

                // Loop through the data and generate HTML content
                for (let index = 0; index < data.numero; index++) {
                    const element = data[index];
                    
                    var itemHtml = `
                        <div class="stazione-item">
                            <p>ID: ${element.ID}</p>
                            <p>Numero tessera: ${element.numero_tessera}</p>
                            <button class="sistema" data-id="${element.ID}">Riattiva carta</button>
                        </div>
                    `;
                    usercon.append(itemHtml);
                }

            } else {
                alert('No disactivated cards found');
            }
        },
        error: function () {
            console.error("Error occurred while fetching data");
        }
    });
}

function riattivaCarta(id) {
    if (confirm("Sei sicuro di voler segnalare questa carta come recuperata?")) {
        $.ajax({
            url: "../ajax/cambiaStatus.php",
            type: "POST",
            data: { ID: id, status: 1 },
            success: function (data) {
                alert("Operazione effettuata con successo");
                visualizzaDisattivati(); // Refresh the list after reactivating
            },
            error: function (xhr, status, error) {
            }
        });
    }
}

$(document).ready(async function () {
    const isAuthorized = await controllaSess();
    if (isAuthorized) {
        visualizzaDisattivati();

        // Event delegation to handle click events o    n dynamically created buttons
        $('#user-con').on('click', '.sistema', function () {
            var id = $(this).data('id');
            riattivaCarta(id);
        });
    }
});
