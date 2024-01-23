<?php
require_once "conexion.php";
$id = $_POST['id'];

$query = $pdo->prepare("DELETE FROM user WHERE id_user = :id");
$query->bindParam(":id", $id);
$query->execute();
echo "ok";
