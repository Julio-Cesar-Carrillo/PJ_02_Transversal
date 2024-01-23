<?php
session_start();
if (!isset($_SESSION['id'])) {
    header('Location: ../../index.php');
    exit();
}
$_SESSION['id_sala'] = $_GET["id_sala"];
$_SESSION['nom_sala'] = $_GET["nom_sala"];
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
    <h1>Registra o edita una mesa en <?php echo $_SESSION['nom_sala']; ?> </h1>
    <div class="columna">
        <div class="formulario">
            <form action="" method="post" id="frm" enctype="multipart/form-data">
                <input type="hidden" name="idp" id="idp" value="">
                <p>Mesa:</p>
                <p><input type="text" name="cod" id="cod" placeholder="Mesa 01" class="form-control"></p>
                <p>Estado:</p>
                <p>
                    <select name="ocup" id="ocup">
                        <option value="" selected>Elige una opcion</option>
                        <option value="0">Libre</option>
                        <option value="1">Ocupado</option>
                        <option value="2">Reservado</option>
                        <option value="3">Mantenimiento</option>
                    </select>
                </p>
                <p>Asientos:</p>
                <p><input type="text" name="num" id="num" placeholder="2" class="form-control"></p>
                <p><input type="button" value="Registrar" id="registrar" class="btn btn-primary"></p>
            </form>
        </div>

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
                        <th>Codigo</th>
                        <th>ocupado</th>
                        <th>Nº sillas</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="resultado">
                </tbody>
            </table>
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