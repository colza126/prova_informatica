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

$id = $_POST['id_stazione'];

// query per selezionare tutte le biciclette
$sql = "DELETE FROM stazione WHERE stazione.ID = ?";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    die("Preparation failed: " . $conn->error);
}
$stmt->bind_param("i", $id);


// esegue la query
$stmt->execute();


if ($stmt === false) {
    die("Preparation failed: " . $conn->error);
}
$stmt->bind_param("i", $id);


// esegue la query
$stmt->execute();
