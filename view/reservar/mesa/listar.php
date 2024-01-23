<?php
require_once "conexion.php";
session_start();

$id_sala = $_SESSION["id_sala"];

$consulta = $pdo->prepare("SELECT * FROM mesa WHERE sala = :id_sala");
$consulta->bindParam(':id_sala', $id_sala);


$consulta->execute();
$resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($resultado);
