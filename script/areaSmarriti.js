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
                        <div class="card stazione-item mb-3">
                            <div class="card-body">
                                <h5 class="card-title">ID: ${element.ID}</h5>
                                <p class="card-text">Numero tessera: ${element.numero_tessera}</p>
                                <button class="btn btn-primary riattiva-btn" data-id="${element.ID}">Riattiva carta</button>
                            </div>
                        </div>
                    `;
                    usercon.append(itemHtml);
                }

            } else {
                usercon.html('<div class="alert alert-warning" role="alert">Nessuna carta disattivata trovata</div>');
            }
        },
        error: function () {
            console.error("Errore durante il recupero dei dati");
            usercon.html('<div class="alert alert-danger" role="alert">Si è verificato un errore durante il recupero dei dati</div>');
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
                visualizzaDisattivati(); // Aggiorna la lista dopo aver riattivato
            },
            error: function (xhr, status, error) {
                console.error("Si è verificato un errore durante l'operazione", error);
            }
        });
    }
}
function createHomeButton() {
    var homeButtonHtml = `
        <button class="btn btn-secondary mt-3" id="home-button">Torna alla Home</button>
    `;
    $('#user-con').append(homeButtonHtml);

    // Event listener for the home button
    $('#home-button').on('click', function() {
        window.location.href = "../index.html";
    });
}

$(document).ready(async function () {
    const isAuthorized = await controllaSess();
    if (isAuthorized) {
        visualizzaDisattivati();

        // Event delegation to handle click events on dynamically created buttons
        $('#user-con').on('click', '.riattiva-btn', function () {
            var id = $(this).data('id');
            riattivaCarta(id);
        });

        // Call the function to create the home button
        createHomeButton();
    }
});
