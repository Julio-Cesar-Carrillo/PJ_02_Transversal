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
    <title>Editar sala</title>ç
    <link rel="stylesheet" href="./style.css">
    <!-- Agregado el enlace al archivo de estilo de Bootstrap -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
</head>

<body>
    <div class="texto">
        <h1>Registra o edita una sala</h1>
        <a href="../index.php" class="salir">Volver</a>
    </div>
    <div class="columna">
        <div class="formulario">
            <form action="" method="post" id="frm" enctype="multipart/form-data">
                <input type="hidden" name="idp" id="idp" value="">
                <p><label for="nom">Nombre:</label></p>
                <p><input type="text" name="nom" id="nom" placeholder="Terraza 3" class="form-control"></p>
                <p><label for="tipo">Tipo:</label></p>
                <p>
                    <select name="tipo" id="tipo" class="form-control">
                        <option value="" disabled selected>Elige una opción</option>
                        <option value="Terraza">Terraza</option>
                        <option value="Comedor">Comedor</option>
                        <option value="Sala privada">Sala privada</option>
                    </select>
                </p>
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
                        <th>Descripción</th>
                        <th>Precio</th>
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