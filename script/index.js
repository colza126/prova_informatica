function login() {
    $.ajax({
        type: "POST",
        url: "../ajax/login.php",
        data: {
            email: $("#email").val(),
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
function register(){
    $.ajax({
        type: "POST",
        url: "../ajax/register.php",
        data: {
            email: $("#mail-reg").val(),
            cod_f: $("#codfiscale").val(),
            password: $("#password-reg").val()
        },
        success: function(data) {
            if (data == "success") {
                alert("Register success");
            } else {
                alert(data);
            }
        }
    })

}

$(document).ready(function() {
    // Hide the divs initially
    $("login-con").hide();
    $("register-con").hide();
    $("forgot-con").hide();

    // Show the div when a button is pressed
    $("show-log").click(function() {
        $("login-con").hide();
        $("register-con").hide();
        $("forgot-con").hide();
        $("login-con").show();
    });
    // Show the div when a button is pressed
    $("show-reg").click(function() {
        $("login-con").hide();
        $("register-con").hide();
        $("forgot-con").hide();
        $("register-con").show();
    });
    // Show the div when a button is pressed
    $("show-for").click(function() {
        $("login-con").hide();
        $("register-con").hide();
        $("forgot-con").hide();
        $("forgot-con").show();
    });

    $("btn-login").click(function() {
        login();
    });

    $("btn-register").click(function() {
        register();
    });
});