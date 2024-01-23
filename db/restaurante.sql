-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.24-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para restaurant
CREATE DATABASE IF NOT EXISTS `restaurant` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `restaurant`;

-- Volcando estructura para tabla restaurant.cargos
CREATE TABLE IF NOT EXISTS `cargos` (
  `id_cargo` int(11) NOT NULL AUTO_INCREMENT COMMENT 'AUTO_INCREMENT',
  `name` text NOT NULL,
  PRIMARY KEY (`id_cargo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- Volcando estructura para tabla restaurant.sala
CREATE TABLE IF NOT EXISTS `sala` (
  `id_sala` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) DEFAULT NULL,
  `tipo` enum('Terraza','Comedor','Sala privada') DEFAULT NULL,
  PRIMARY KEY (`id_sala`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;

-- Volcando estructura para tabla restaurant.mesa
CREATE TABLE IF NOT EXISTS `mesa` (
  `id_mesa` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(100) DEFAULT NULL,
  `sala` int(11) DEFAULT NULL,
  `ocupado` enum('0','1','2','3') DEFAULT NULL,
  `num_sillas` int(11) DEFAULT NULL,
  `reserva_ini` datetime NOT NULL,
  `reserva_fin` datetime NOT NULL,
  PRIMARY KEY (`id_mesa`),
  UNIQUE KEY `codigo_UNIQUE` (`codigo`),
  KEY `mesa_sala_idx` (`sala`),
  CONSTRAINT `mesa_sala` FOREIGN KEY (`sala`) REFERENCES `sala` (`id_sala`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;


-- Volcando estructura para tabla restaurant.user
CREATE TABLE IF NOT EXISTS `user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `cargo` int(11) NOT NULL,
  PRIMARY KEY (`id_user`),
  KEY `FK_cargo` (`cargo`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;

-- Volcando estructura para tabla restaurant.ocupacion
CREATE TABLE IF NOT EXISTS `ocupacion` (
  `id_ocup` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) DEFAULT NULL,
  `mesa` int(11) DEFAULT NULL,
  `ocupacion_ini` datetime DEFAULT NULL,
  `ocupacion_fin` datetime DEFAULT NULL,
  PRIMARY KEY (`id_ocup`),
  KEY `ocupacion_user_idx` (`user`),
  KEY `ocupacion_mesa_idx` (`mesa`),
  CONSTRAINT `ocupacion_mesa` FOREIGN KEY (`mesa`) REFERENCES `mesa` (`id_mesa`),
  CONSTRAINT `ocupacion_user` FOREIGN KEY (`user`) REFERENCES `user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4;


INSERT INTO `cargos` (`id_cargo`, `name`) VALUES
	(1, 'Admin'),
	(2, 'Gerente'),
	(3, 'Mantenimiento'),
	(4, 'Camarero');

INSERT INTO `user` (`id_user`, `username`, `password`, `nom`, `cargo`) VALUES
	(1, 'David.david', '$2y$10$tWbF.MmmXwgkjUnY6ozskOoXbAFZhHyeCSbW3xilw6.BGTpkZ0ISy', 'David', 2),
	(2, 'julio.cesar', '$2y$10$tWbF.MmmXwgkjUnY6ozskOoXbAFZhHyeCSbW3xilw6.BGTpkZ0ISy', 'Julio', 1),
	(3, 'aron.aron', '$2y$10$tWbF.MmmXwgkjUnY6ozskOoXbAFZhHyeCSbW3xilw6.BGTpkZ0ISy', 'aron', 3),
	(4, 'marc.marc', '$2y$10$tWbF.MmmXwgkjUnY6ozskOoXbAFZhHyeCSbW3xilw6.BGTpkZ0ISy', 'marc', 4);

INSERT INTO `sala` (`id_sala`, `nom`, `tipo`) VALUES
	(1, 'comedor 1', 'Comedor'),
	(2, 'terraza 1', 'Terraza'),
	(3, 'Sala privad 1', 'Sala privada');

INSERT INTO `mesa` (`id_mesa`, `codigo`, `sala`, `ocupado`, `num_sillas`, `reserva_ini`, `reserva_fin`) VALUES
	(1, 'Mesa 1', 1, '0', 2, '2024-01-23 00:00:00', '2024-01-23 00:00:00'),
	(2, 'Mesa 2', 1, '0', 2, '2024-01-23 00:00:00', '2024-01-23 00:00:00'),
	(3, 'Mesa 3', 2, '0', 4, '2024-01-23 00:00:00', '2024-01-23 00:00:00'),
	(4, 'Mesa 4', 2, '0', 2, '2024-01-23 00:00:00', '2024-01-23 00:00:00'),
	(5, 'Mesa 5', 3, '0', 4, '2024-01-23 00:00:00', '2024-01-23 00:00:00');

