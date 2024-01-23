<?php
require_once "conexion.php";

if (!empty($_POST['busqueda'])) {
    $data = $_POST['busqueda'];
    $consulta = $pdo->prepare("SELECT * FROM sala WHERE id_sala LIKE '%" . $data . "%' OR nom LIKE '%" . $data . "%' OR tipo LIKE '%" . $data . "%'");
    $consulta->execute();
} else {
    $consulta = $pdo->prepare("SELECT * FROM sala");
    $consulta->execute();
}

$resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($resultado);
