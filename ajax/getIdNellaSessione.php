<?php
session_start();

if (isset($_SESSION['id'])) {
    $id = $_SESSION['id'];
    $response = ['id' => $id];
} else {
    $response = ['error' => 'ID not found in session'];
}

header('Content-Type: application/json');
echo json_encode($response);
