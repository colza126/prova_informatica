<?php
// FILEPATH: /D:/xampp/htdocs/cinema/ajax/registration.php

// Funzione per generare un numero casuale da 10 cifre
function generateRandomNumber() {
    $randomNumber = mt_rand(1000000000, 9999999999);
    echo json_encode(array("random_number" => $randomNumber));
}


header('Content-Type: application/json');

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

$id = $_POST['ID'];
$status = $_POST['status'];

if($status = $_POST['status'] == 1){

    // query per verificare l'autenticazione dell'utente
    $sql = "UPDATE utente SET carta_attiva = ?, numero_tessera = ?  WHERE ID = ?";
    $stmt = $conn->prepare($sql);

    // verifica la preparazione della query
    if ($stmt === false) {
        die("Preparation failed: " . $conn->error);
    }

    // Associa i parametri alla query
    $stmt->bind_param("iii", $status,generateRandomNumber(), $id);

}else{
    
    // query per verificare l'autenticazione dell'utente
    $sql = "UPDATE utente SET carta_attiva = ?  WHERE ID = ?";
    $stmt = $conn->prepare($sql);

    // verifica la preparazione della query
    if ($stmt === false) {
        die("Preparation failed: " . $conn->error);
    }

    // Associa i parametri alla query
    $stmt->bind_param("ii", $status, $id);


}


// Esegui la query
$stmt->execute();

// Chiudi la connessione al database
$conn->close();

// Verifica se lo status è 1
if ($status == 1) {
    // Richiama la funzione per generare un numero casuale da 10 cifre
    generateRandomNumber();
}