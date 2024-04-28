<?php

// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bicicletta";

// Values to be inserted
$citta = $_POST['citta'];
$cap = $_POST['cap'];
$provincia = $_POST['provincia'];
$via = $_POST['via'];

// Create a new connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare the SQL query
$sql = "INSERT INTO indirizzo (citta, cap, provincia, via) VALUES ('$citta', '$cap', '$provincia', '$via')";

// Execute the query
if ($conn->query($sql) === TRUE) {
    
    // Get the last inserted ID
    $last_id = $conn->insert_id;
    
    // Create the response array
    $response = array(
        "status" => "success",
        "id" => $last_id
    );
    
    // Convert the response array to JSON
    $json_response = json_encode($response);
    
    // Return the JSON response
    echo $json_response;

} else {
    // Create the error response array
    $error_response = array(
        "status" => "error",
        "message" => "Error inserting record: " . $conn->error
    );
    
    // Convert the error response array to JSON
    $json_error_response = json_encode($error_response);
    
    // Return the JSON error response
    echo $json_error_response;
}

// Close the connection
$conn->close();

?>
