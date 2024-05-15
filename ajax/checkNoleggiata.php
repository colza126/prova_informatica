<?php
header('Content-Type: application/json');

if (!isset($_SESSION)) {
    session_start();
}

// Parametri di connessione al database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bicicletta";

// Crea una nuova connessione al database
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica la connessione al database
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Controlla se l'id dell'utente è stato inviato
if(isset($_POST['id_user'])) {
    $id_user = $_POST['id_user'];

    // Query per controllare se l'utente ha una bicicletta noleggiata
    $sql = "SELECT * FROM utente WHERE ID = ?";
    $stmt = $conn->prepare($sql);

    // Verifica se la preparazione della query ha avuto successo
    if ($stmt === false) {
        die("Preparation failed: " . $conn->error);
    }

    // Associa il parametro alla query
    $stmt->bind_param("i", $id_user);

    // Esegui la query
    $stmt->execute();

    // Associa le variabili di output ai risultati della query
    $stmt->bind_result($id, $nome, $cognome, $bici_carico);

    // Estrai il risultato
    $stmt->fetch();

    // Controlla se l'utente ha una bicicletta noleggiata
    $is_rented = $bici_carico == 1;

    // Chiudi la dichiarazione
    $stmt->close();

    // Restituisci il risultato come JSON
    echo json_encode(array("is_rented" => $is_rented));
} else {
    // Se l'id dell'utente non è stato inviato, restituisci un messaggio di errore
    echo json_encode(array("error" => "ID dell'utente non specificato"));
}