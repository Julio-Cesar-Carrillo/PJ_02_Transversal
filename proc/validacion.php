<?php
session_start();
include_once("./conexion.php");

$user = $_POST['user'];
$pwd = $_POST['password'];

$consulta = $pdo->prepare("SELECT * FROM user WHERE username = :user");
$consulta->bindParam(':user', $user);
$consulta->execute();

$resultado = $consulta->fetch(PDO::FETCH_ASSOC);
if ($resultado && $resultado['username'] == $user) {
    if ($resultado && password_verify($pwd, $resultado['password'])) {
        // Iniciar sesión y redirigir a la página de inicio
        $_SESSION['id'] = $resultado['id_user'];
        $_SESSION['username'] = $resultado['nom'];
        $_SESSION['cargo'] = $resultado['cargo'];
        header('Location: ../view/index.php');
        exit();
    } else {
        // Usuario o contraseña incorrectos
        $error_message = "Usuario o contraseña incorrectos.";
        header('Location: ../index.php?error_message=' . urlencode($error_message));
        exit();
    }
}
