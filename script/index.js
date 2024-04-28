function login() {
    $.ajax({
        type: "POST",
        url: "ajax/login.php",
        data: {
            mail: $("#email").val(),
            password: $("#password").val()
        },
        success: function(data) {
            if (data == "success") {
                window.location.href = "pages/home.html";
            } else {
                alert(data);
            }
        }
    })
}
function register() {
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
                // Esegui la seconda richiesta AJAX solo se la prima ha avuto successo
                registerUser(response.id);
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

function registerUser(id) {
    $.ajax({
        type: "POST",
        url: "ajax/registra.php",
        data: {
            mail: $("#mail-reg").val(),
            cod_f: $("#codfiscale").val(),
            password: $("#password-reg").val(),
            id: id,
        },
        success: function(data) {
            if (data === "success") {
                alert("Registrazione avvenuta con successo");
            } else {
                alert(data);
            }
        },
        error: function(xhr, status, error) {
            console.error("Errore nella richiesta AJAX:", status, error);
            alert("Errore nella richiesta AJAX");
        }
    });
}


$(document).ready(function() {
    // Hide the divs initially
    $("#login-con").hide();
    $("#register-con").hide();
    $("#forgot-con").hide();

    // Show the div when a button is pressed
    $("#show-log").click(function() {
        $("#login-con").hide();
        $("#register-con").hide();
        $("#forgot-con").hide();
        $("#login-con").show();
    });
    // Show the div when a button is pressed
    $("#show-reg").click(function() {
        $("#login-con").hide();
        $("#register-con").hide();
        $("#forgot-con").hide();
        $("#register-con").show();
    });
    // Show the div when a button is pressed
    $("#show-for").click(function() {
        $("#login-con").hide();
        $("#register-con").hide();
        $("#forgot-con").hide();
        $("#forgot-con").show();
    });

    $("#btn-login").click(function() {
        login();
    });

    $("#btn-reg").click(function() {
        register();
    });
});