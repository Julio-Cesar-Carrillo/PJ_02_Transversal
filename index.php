<?php
session_start();
$error_message = isset($_GET['error_message']) ? urldecode($_GET['error_message']) : '';

// Verificar si el usuario ya está autenticado
if (isset($_SESSION['id'])) {
    header('Location: ./view/index.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="./styles.css">
</head>

<body>
    <div class="login-container">
        <h2>Login</h2>
        <?php if (!empty($error_message)) {
            echo '<p style="color: red;">' . $error_message . '</p>';
        } ?>
        <form onsubmit="return validarinicio()" action="./proc/validacion.php" method="post">
            <span id="erroruser"></span>
            <div class="input-with-icon">
                <label for="user">Username:</label>
                <input type="text" id="user" name="user">
            </div>

            <span id="errorpwd"></span>
            <div class="input-with-icon">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password">
            </div>

            <input type="submit" id="enviarButton">
        </form>
    </div>
    <script src="scripts/index.js"></script>
</body>

</html>