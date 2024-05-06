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

$id = $_POST['id_bici'];
$codice = $_POST['codice'];

// query per selezionare tutte le biciclette
$sql = "INSERT INTO bicicletta ('Stato','codice','ID_stazione') VALUES ('Stazione',?,?)";
$stmt = $conn->prepare($sql);

// associa i parametri alla query
$stmt->bind_param("ii", $codice,$id);
if ($stmt === false) {
    die("Preparation failed: " . $conn->error);
}


// esegue la query
$stmt->execute();
