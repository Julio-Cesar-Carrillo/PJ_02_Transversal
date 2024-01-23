<?php
session_start();
// Verificar si el usuario ya está autenticado
if (!isset($_SESSION['id'])) {
    header('Location: ../index.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./style.css">
</head>

<body>
    <div>
        <?php switch ($_SESSION['cargo']) {
            case '1': ?>
                <div>
                    <h2>Bienvenido <?php echo $_SESSION['username']; ?></h2>
                    <p>Que quieres hacer?</p>
                    <a href="./usuarios/index.php">Administrar usuarios</a>
                    <a href="./ocupar/index.php">Ocupar mesa</a>
                    <a href="./historial/index.php">Historial de ocupacion</a>
                    <a href="./reservar/index.php">Reservar mesa</a>
                    <a href="./agregar_sala/index.php">Agregar sala/mesa</a>
                    <a href="./salir.php" class="salir">Cerrar Sesión</a>
                </div>

            <?php break;

            case '2': ?>
                <h2>Bienvenido <?php echo $_SESSION['username']; ?></h2>
                <p>Que quieres hacer?</p>
                <a href="./salir.php" class="salir">Cerrar Sesión</a>
                <a href="./ocupar/index.php">Ocupar mesa</a>
                <a href="./reservar/index.php">Reservar mesa</a>
                <a href="./agregar_sala/index.php">Agregar sala/mesa</a>
            <?php break;

            case '3': ?>
                <h2>Bienvenido <?php echo $_SESSION['username']; ?></h2>
                <p>Que quieres hacer?</p>
                <a href="./mantenimiento/index.php">Poner en mantenimiento una mesa</a>
                <a href="./salir.php" class="salir">Cerrar Sesión</a>
            <?php break;

            default: ?>
                <h2>Bienvenido <?php echo $_SESSION['username']; ?></h2>
                <p>Que quieres hacer?</p>
                <a href="./ocupar/index.php">Ocupar mesa</a>
                <a href="./reservar/index.php">Reservar mesa</a>
                <a href="./salir.php" class="salir">Cerrar Sesión</a>
        <?php break;
        }

        ?>

    </div>
</body>

</html>