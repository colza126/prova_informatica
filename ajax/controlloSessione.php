<?php

header('Content-Type: application/json');
if (!isset($_SESSION)) {
    session_start();
}

$response = array(
    'auth' => isset($_SESSION['auth'])&&$_SESSION['auth']==true ? $_SESSION['auth'] : false,
    'admin' => isset($_SESSION['admin'])&&$_SESSION['admin']==true ? $_SESSION['admin'] : false
);

echo json_encode($response);