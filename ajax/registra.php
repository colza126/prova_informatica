<?php
// FILEPATH: /D:/xampp/htdocs/cinema/ajax/registration.php

header('Content-Type: application/json');

// Connessione al database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bicicletta";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connessione al database fallita: " . $conn->connect_error);
}

// Verifica se il form è stato inviato
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recupera i dati dal form
    $mail = $_POST["mail"];
    $password = md5($_POST["password"]); // Encrypt password using MD5
    $cod = $_POST["cod_f"];
    $id = $_POST["id"];
    // Esegui la query per inserire i dati nel database
    $sql = "INSERT INTO utente (mail, password,codice_fiscale,credito,ID_indirizzo) VALUES ('$mail', '$password', '$cod', 0, $id)";

    if ($conn->query($sql) === TRUE) {
        $response['status'] = 'success';    
    } else {
        $response['status'] = 'fail';
    }
}
// stampa la risposta JSON
echo json_encode($response);

$conn->close();