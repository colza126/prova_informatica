<?php
// imposta l'intestazione per indicare che il contenuto è in formato JSON
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

$id = $_POST['id_sta'];

// query per selezionare tutte le biciclette
$sql = "SELECT * FROM bicicletta WHERE ID_stazione = ?";
$stmt = $conn->prepare($sql);


// associa i parametri alla query
$stmt->bind_param("i", $id);

if ($stmt === false) {
    die("Preparation failed: " . $conn->error);
}

// esegue la query
$stmt->execute();

// ottieni il risultato della query
$result = $stmt->get_result();

// array per la risposta JSON
$response = array();
$numero = 0;


// verifica se ci sono righe nel risultato
if ($result->num_rows > 0) {
    
    // array per le biciclette
    $biciclette = array();

    $response['status'] = 'success';
    // loop attraverso le righe del risultato
    while($row = $result->fetch_assoc()) {
        $response[] = array('codice' => $row['codice'],'stato' => $row['stato'],'ID' => $row['ID']);
        $numero++;

    }
    
} else {
    $response['status'] = 'fail';
}
$response["numero"] = $numero;


$stmt->close();
$conn->close();

// stampa la risposta JSON
echo json_encode($response);
