<?php
// FILEPATH: /D:/xampp/htdocs/cinema/ajax/registration.php

header('Content-Type: application/json');
function generateRandomNumber() {
    $randomNumber = mt_rand(1000000000, 9999999999);
    return $randomNumber;
}

// Connessione al database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bicicletta";

// Crea la connessione al database
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica la connessione al database
if ($conn->connect_error) {
    die("Connessione al database fallita: " . $conn->connect_error);
}

// Verifica se il form è stato inviato
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recupera i dati dal form
    $mail = $_POST["mail"];
    $password = md5($_POST["password"]); // Encrypt password using MD5
    $id = $_POST["id"];
    
    // Prepara la query SQL utilizzando una prepared statement
    $sql = "INSERT INTO utente (mail, password, numero_tessera, ID_indirizzo, admin,carta_attiva) VALUES (?, ?, ?, ?, 0,1)";
    $stmt = $conn->prepare($sql);
    
    // Verifica se la preparazione della query è avvenuta con successo
    if ($stmt === false) {
        die("Preparation failed: " . $conn->error);
    }
    $tessera =  generateRandomNumber();
    // Associa i parametri alla query
    $stmt->bind_param("ssii", $mail, $password, $tessera, $id);
    
    // Esegui la query
    if ($stmt->execute()) {
        $response['status'] = 'success';
    } else {
        $response['status'] = 'fail';
    }
    
    // Chiudi la dichiarazione preparata
    $stmt->close();
}

// Stampa la risposta JSON
echo json_encode($response);

// Chiudi la connessione al database
$conn->close();
?>
