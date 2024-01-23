<?php
require_once "conexion.php";
session_start();

$id_user = $_SESSION["id"];

if (!empty($_POST['busqueda'])) {
    $data = $_POST['busqueda'];
    $consulta = $pdo->prepare("SELECT *, c.name FROM user u INNER JOIN cargos c 
    on c.id_cargo=u.cargo WHERE id_user != :user_id AND (u.id_user LIKE :data OR u.username LIKE :data OR c.name LIKE :data)");
    $consulta->bindParam(':user_id', $id_user);
    $consulta->bindValue(':data', '%' . $data . '%');
} else {
    $consulta = $pdo->prepare("SELECT *, c.name FROM user u INNER JOIN cargos c on c.id_cargo=u.cargo AND id_user != :user_id");
    $consulta->bindParam(':user_id', $id_user);
}

$consulta->execute();
$resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($resultado);
