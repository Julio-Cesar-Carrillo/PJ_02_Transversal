<?php
session_start();
if (!isset($_SESSION['id'])) {
    header('Location: ../../index.php');
    exit();
}

$_SESSION["id_sala"] = $_GET["id_sala"];

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
    <div>
        <div class="texto">
            <h1>¿<?php echo $_GET['nom_sala']; ?> mesa quires reservar?</h1>
            <a href="../index.php" class="salir">salas</a>
        </div>
        <div class="columna">
            <div class="sala" id="sala"></div>
        </div>
    </div>

    <!-- Agregado el enlace al archivo de script de SweetAlert -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
    <script src="./script.js"></script>
    <!-- Agregado el enlace al archivo de script de Bootstrap -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
</body>

</html>