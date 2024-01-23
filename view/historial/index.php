<?php
session_start();
$user = $_SESSION['username'];
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
    <link rel="stylesheet" href="./style.css">
    <!-- Agregado el enlace al archivo de estilo de Bootstrap -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
</head>

<body>
    <h1>Registra o edita a un trabajador </h1>
    <div class="tabla_resultado">
        <form action="" method="post" id="frmbusqueda">
            <div class="form-group">
                <label for="buscar">Buscar:</label>
                <input type="text" name="buscar" id="buscar" placeholder="Buscar..." class="form-control">
            </div>
        </form>
        <table class="table table-hover table-responsive">
            <thead>
                <tr>
                    <th>Camarero</th>
                    <th>Mesa</th>
                    <th>Inicio ocupacion</th>
                    <th>Fin Ocupacion</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="resultado">
            </tbody>
        </table>
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