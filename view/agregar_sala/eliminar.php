<?php
require_once "conexion.php";
$id = $_POST['id'];

$query = $pdo->prepare("DELETE FROM sala WHERE id_sala = :id");
$query->bindParam(":id", $id);
$query->execute();
echo "ok";
