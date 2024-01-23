<?php
require_once "conexion.php";
session_start();

$id_sala = $_SESSION["id"];

if (!empty($_POST['busqueda'])) {
    $data = $_POST['busqueda'];
    $consulta = $pdo->prepare("SELECT * FROM mesa WHERE sala = :id_sala AND (id_mesa LIKE :data OR codigo LIKE :data OR num_sillas LIKE :data)");
    $consulta->bindParam(':id_sala', $id_sala);
    $consulta->bindValue(':data', '%' . $data . '%');
} else {
    $consulta = $pdo->prepare("SELECT * FROM mesa WHERE sala = :id_sala");
    $consulta->bindParam(':id_sala', $id_sala);
}

$consulta->execute();
$resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($resultado);
