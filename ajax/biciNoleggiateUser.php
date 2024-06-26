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

$id = $_POST['ID'];


// query per selezionare tutte le biciclette
$sql = "SELECT bicicletta.*,citta,stato FROM bicicletta JOIN stazione ON bicicletta.ID_stazione = stazione.ID JOIN indirizzo ON stazione.ID_indirizzo = indirizzo.ID JOIN operazione ON operazione.ID_bicicletta = bicicletta.ID JOIN utente ON operazione.ID_utente = utente.ID WHERE operazione.ID_utente = ? AND bicicletta.stato = 'noleggiata'";
$stmt = $conn->prepare($sql);


if ($stmt === false) {
    die("Preparation failed: " . $conn->error);
}
$stmt->bind_param("i", $id);

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
        $response[] = array('codice' => $row['codice'],'stato' => $row['stato'],'ID' => $row['ID'],'citta' => $row['citta']);
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
