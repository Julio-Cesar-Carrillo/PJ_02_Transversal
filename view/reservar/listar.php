<?php
require_once "conexion.php";

$consulta = $pdo->prepare("SELECT * FROM sala");
$consulta->execute();

$resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($resultado);
