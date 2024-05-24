<?php
// FILEPATH: /D:/xampp/htdocs/cinema/ajax/registration.php

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

// query per verificare l'autenticazione dell'utente
$sql = "UPDATE utente SET carta_attiva = ?  WHERE ID = ?";
$stmt = $conn->prepare($sql);

// verifica la preparazione della query
if ($stmt === false) {
    die("Preparation failed: " . $conn->error);
}


// associa i parametri alla query
$stmt->bind_param("ii", $status, $id);

// esegue la query
$stmt->execute();


// Chiudi la connessione al database
$conn->close();