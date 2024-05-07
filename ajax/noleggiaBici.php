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

// Imposta il fuso orario desiderato
date_default_timezone_set('Europe/Rome');

// Ottieni il tempo attuale
$tempo_attuale = date('H:i:s');

// crea una nuova connessione al database
$conn = new mysqli($servername, $username, $password, $dbname);

// verifica la connessione al database
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$id_b = $_POST['id_bici'];
$id_u = $_POST['id_utente'];
$codice = $_POST['codice'];

// query per selezionare tutte le biciclette
$sql = "INSERT INTO operazione ('tipo','tempo','ID_bicicletta','ID_utente') VALUES ('prelievo',?,?,?)";
$stmt = $conn->prepare($sql);

// associa i parametri alla query
$stmt->bind_param("tii",$tempo_attuale, $id_b,$id_u);
if ($stmt === false) {
    die("Preparation failed: " . $conn->error);
}


// esegue la query
$stmt->execute();

// query per selezionare tutte le biciclette
$sql = "UPDATE biciletta ('stato') VALUES ('Noleggiata') WHERE ID = ?";
$stmt = $conn->prepare($sql);

// associa i parametri alla query
$stmt->bind_param("i",$id_b);
if ($stmt === false) {
    die("Preparation failed: " . $conn->error);
}


// esegue la query
$stmt->execute();
