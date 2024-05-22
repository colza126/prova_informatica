<?php

// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bicicletta";

// Values to be inserted
$slot = $_POST['slot'];

// Create a new connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare the SQL query
$sql = "INSERT INTO stazione (MaxSlot) VALUES (?)";
$stmt = $conn->prepare($sql);
if ($stmt === false) {
    die("Preparation failed: " . $conn->error);
}

// associa i parametri alla query
$stmt->bind_param("i", $slot);



// esegue la query
$stmt->execute();
$result = $stmt->get_result();

