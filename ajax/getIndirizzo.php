<?php
// imposta l'intestazione per indicare che il contenuto è in formato JSON
header('Content-Type: application/json');

if(!isset($_SESSION)){
    session_start();
}

// parametri di connessione al database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bicicletta";

// crea una nuova connessione al database
$conn = new mysqli($servername, $username, $password, $dbname);

// verifica la connessione al database
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// ottieni username e password dalla richiesta POST
$Id = $_POST['Id'];

// query per verificare l'autenticazione dell'utente
$sql = "SELECT * FROM indirizzo WHERE `ID` = ?";
$stmt = $conn->prepare($sql);

// verifica la preparazione della query
if ($stmt === false) {
    die("Preparation failed: " . $conn->error);
}

// associa i parametri alla query
$stmt->bind_param("s", $Id);

// esegue la query
$stmt->execute();

// ottieni il risultato della query
$result = $stmt->get_result();

// array per la risposta JSON
$response = array();

// verifica se ci sono righe nel risultato
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    
    $response['status'] = 'success';
    $response['via'] = $row['via'];
    $response['citta'] = $row['citta'];
    $response['cap'] = $row['cap'];
    $response['provincia'] = $row['provincia'];
} else {
    $response['status'] = 'fail';
}

// chiudi lo statement e la connessione al database
$stmt->close();
$conn->close();

// stampa la risposta JSON
echo json_encode($response);
    