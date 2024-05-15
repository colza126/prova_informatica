<?php

header('Content-Type: application/json');

if (!isset($_SESSION)) {
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

// Controlla se l'id della bicicletta è stato inviato
if(isset($_POST['id_bici'])) {
    $id_b = $_POST['id_bici'];

    // query per selezionare le colonne desiderate dalla tabella bicicletta
    $sql = "SELECT * FROM biciletta WHERE ID = ?";
    $stmt = $conn->prepare($sql);

    // verifica se la preparazione della query ha avuto successo
    if ($stmt === false) {
        die("Preparation failed: " . $conn->error);
    }

    // associa il parametro alla query
    $stmt->bind_param("i", $id_b);

    // esegue la query
    $stmt->execute();

    // ottiene i risultati della query
    $result = $stmt->get_result();

    // controlla se la bicicletta è noleggiata o meno
    $is_rented = $result->num_rows > 0;

    // libera la memoria dei risultati
    $result->free();

    // chiude la dichiarazione
    $stmt->close();

    // restituisce il risultato come JSON
    echo json_encode(array("is_rented" => $is_rented));
} else {
    // Se l'id della bicicletta non è stato inviato, restituisci un messaggio di errore
    echo json_encode(array("error" => "ID della bicicletta non specificato"));
}
