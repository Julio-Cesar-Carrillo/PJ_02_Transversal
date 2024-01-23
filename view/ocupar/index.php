<?php
session_start();
if (!isset($_SESSION['id'])) {
    header('Location: ../../index.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar sala</title>
    <link rel="stylesheet" href="style.css">
    <!-- Agregado el enlace al archivo de estilo de Bootstrap -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
</head>

<body>
    <div class="reserva">
        <div class="texto">
            <h1>¿Donde quieres ocupar la mesa?</h1> 
            <a href="../index.php" class="btn-atras">Volver</a>
        </div>
        <div class="columna2" id="sala2"></div>
        <div class="columna3" id="sala3"></div>
        <div class="columna" id="sala"></div>
    </div>

    <script src="./script.js"></script>
</body>

</html>