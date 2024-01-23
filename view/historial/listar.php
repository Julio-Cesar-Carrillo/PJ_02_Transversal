<?php
require_once "conexion.php";

if (!empty($_POST['busqueda'])) {
    
    $data = $_POST['busqueda'];
    $consulta = $pdo->prepare("SELECT *, u.username, m.codigo FROM ocupacion o 
    INNER JOIN user u ON o.user = u.id_user
    INNER JOIN mesa m ON o.mesa = m.id_mesa
    WHERE (u.username LIKE :data OR m.codigo LIKE :data)");
    $consulta->bindValue(':data', '%' . $data . '%');
} else {
    $consulta = $pdo->prepare("SELECT *, u.username, m.codigo FROM ocupacion o 
    INNER JOIN user u ON o.user = u.id_user
    INNER JOIN mesa m ON o.mesa = m.id_mesa ORDER BY ocupacion_ini");
}

$consulta->execute();
$resultado = $consulta->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($resultado);
