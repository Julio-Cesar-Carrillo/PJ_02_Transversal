<?php
session_start();

// Destruir todas las variables de sesión
$_SESSION = array();

// Destruir la sesión
session_destroy();

// Redirigir a la página de inicio de sesión (o a cualquier otra página que desees)
header("Location: ../index.php");
exit();