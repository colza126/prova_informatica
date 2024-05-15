<?php
header('Content-Type: application/json');
session_start();

// Parametri di connessione al database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bicicletta";

// Imposta il fuso orario desiderato
date_default_timezone_set('Europe/Rome');

// Ottieni il tempo attuale
$tempo_attuale = date('Y-m-d H:i:s');

// Crea una nuova connessione al database
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica la connessione al database
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Verifica che le variabili POST siano settate e non vuote
if(isset($_POST['id_bici'], $_POST['id_utente'], $_POST['codice'])) {
    // Sanitizza le variabili POST
    $id_b = $_POST['id_bici'];
    $id_u = $_POST['id_utente'];
    $codice = $_POST['codice'];

    // Query per inserire un'operazione
    $sql = "INSERT INTO operazione (tipo, inizio, ID_bicicletta, ID_utente) VALUES ('prelievo', ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    // Associa i parametri alla query
    $stmt->bind_param("sii", $tempo_attuale, $id_b, $id_u);
    if ($stmt === false) {
        die("Preparation failed: " . $conn->error);
    }

    // Esegui la query
    $stmt->execute();

    // Query per aggiornare lo stato della bicicletta
    $sql = "UPDATE bicicletta SET stato = 'Noleggiata' WHERE ID = ?";
    $stmt = $conn->prepare($sql);

    // Associa i parametri alla query
    $stmt->bind_param("i", $id_b);
    if ($stmt === false) {
        die("Preparation failed: " . $conn->error);
    }

    // Esegui la query
    $stmt->execute();

    // Query per aggiornare lo stato della bicicletta
    $sql = "UPDATE utente SET bici_carico = 1 WHERE ID = ?";
    $stmt = $conn->prepare($sql);

    // Associa i parametri alla query
    $stmt->bind_param("i", $id_u);
    if ($stmt === false) {
        die("Preparation failed: " . $conn->error);
    }

    // Esegui la query
    $stmt->execute();

    // Chiudi la connessione al database
    $conn->close();

    // Restituisci una risposta JSON di successo
    echo json_encode(array("status" => "success"));
} else {
    // Restituisci una risposta JSON di errore se le variabili POST non sono state settate
    echo json_encode(array("status" => "error", "message" => "Missing POST parameters"));
}
