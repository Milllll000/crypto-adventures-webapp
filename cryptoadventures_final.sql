CREATE DATABASE  IF NOT EXISTS `cryptochickswebapp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `cryptochickswebapp`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: cryptoadventures.cr2eekagiinz.us-east-1.rds.amazonaws.com    Database: cryptochickswebapp
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `usuario_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `contrasena` varchar(32) NOT NULL,
  PRIMARY KEY (`usuario_id`),
  UNIQUE KEY `correo_UNIQUE` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Patricia','Torres','pat_torres@email.com','7cf2db5ec261a0fa27a502d3196a6f60'),(10,'Aura','Arrioja','aura_arrioja@email.com','$2b$10$5.lEaV3RqOfo/GpjTinx1evOu');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'cryptochickswebapp'
--
/*!50003 DROP PROCEDURE IF EXISTS `iniciarSesion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `iniciarSesion`(IN correo VARCHAR(50))
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
    END;
    START TRANSACTION;
		SELECT u.correo, u.contrasena FROM usuarios u WHERE u.correo = correo;
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-03 16:54:49
CREATE DATABASE  IF NOT EXISTS `cryptoadventures` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `cryptoadventures`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: cryptoadventures.cr2eekagiinz.us-east-1.rds.amazonaws.com    Database: cryptoadventures
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cursos`
--

DROP TABLE IF EXISTS `cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cursos` (
  `id_curso` int NOT NULL AUTO_INCREMENT,
  `nombre_curso` varchar(25) NOT NULL,
  PRIMARY KEY (`id_curso`),
  UNIQUE KEY `nombre_curso` (`nombre_curso`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cursos`
--

LOCK TABLES `cursos` WRITE;
/*!40000 ALTER TABLE `cursos` DISABLE KEYS */;
INSERT INTO `cursos` VALUES (2,'Blockchain'),(3,'Criptomonedas'),(1,'Web3');
/*!40000 ALTER TABLE `cursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `examenes`
--

DROP TABLE IF EXISTS `examenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `examenes` (
  `id_examen` int NOT NULL AUTO_INCREMENT,
  `id_leccion` int DEFAULT NULL,
  PRIMARY KEY (`id_examen`),
  KEY `id_leccion` (`id_leccion`),
  CONSTRAINT `examenes_ibfk_2` FOREIGN KEY (`id_leccion`) REFERENCES `lecciones` (`id_leccion`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `examenes`
--

LOCK TABLES `examenes` WRITE;
/*!40000 ALTER TABLE `examenes` DISABLE KEYS */;
INSERT INTO `examenes` VALUES (1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8),(9,9);
/*!40000 ALTER TABLE `examenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jugadores`
--

DROP TABLE IF EXISTS `jugadores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jugadores` (
  `id_jugador` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `fecha_registro` date NOT NULL DEFAULT (curdate()),
  `correo` varchar(50) NOT NULL,
  `contrasena` varchar(128) NOT NULL,
  `pais` varchar(3) NOT NULL,
  `genero` enum('H','M','N') NOT NULL,
  PRIMARY KEY (`id_jugador`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jugadores`
--

LOCK TABLES `jugadores` WRITE;
/*!40000 ALTER TABLE `jugadores` DISABLE KEYS */;
INSERT INTO `jugadores` VALUES (7,'James','Smith','1990-05-21','2023-11-15','james.smith@example.com','482c811da5d5b4bc6d497ffa98491e38','USA','H'),(8,'Emily','Johnson','1988-08-30','2024-01-10','emily.johnson@example.com','bdb85fcec4296d6e1e1e6528f17fd8f4','USA','M'),(9,'Liam','Tremblay','1995-03-12','2023-12-01','liam.tremblay@example.ca','e773f76c4413b1f74534d9c7fbed9707','CAN','H'),(10,'Sophie','Martin','1992-09-05','2024-03-20','sophie.martin@example.ca','d3e065b0321e825d921c39138d42d267','CAN','M'),(11,'Carlos','Ramírez','1987-11-18','2023-10-28','carlos.ramirez@example.mx','1f819820ad2575401973f01681e35f00','MEX','H'),(12,'Ana','Hernández','1993-06-09','2024-02-05','ana.hernandez@example.mx','005a65fa2d534dc1c4a5f5994f374879','MEX','M'),(13,'Lorena','Jiménez','2003-04-11','2025-01-22','lorejim@email.com','c2267bf266367dd985600d7f8226560e','MEX','M'),(14,'Sam','Torres','2001-10-30','2025-04-22','storres@email.com','7cf2db5ec261a0fa27a502d3196a6f60','MEX','N'),(15,'Brian','Velarde','1998-11-02','2025-04-26','brivel@email.com','be60b431a46fcc7bf5ee4f7712993e3b','MEX','H'),(16,'Aura','Lannie','2003-10-11','2025-04-26','aura_lann@email.com','7fc86b0156aa83d8ccfbba2b8278eeae','CAN','M'),(17,'Sam','Jiménez','1994-11-11','2025-05-01','sam_jim@email.com','7cf2db5ec261a0fa27a502d3196a6f60','MEX','H'),(20,'Petunia','Juárez','2003-10-11','2025-05-02','pe_juarez@email.com','$2b$10$Ulk65.EeEJrtLgtSufjKzeoKd','MEX','M'),(21,'Jesus','Lopez','2003-06-06','2025-05-02','jesus@email.com','$2b$10$hspyzioL8dp/7VYrdKlGxuSWr','PER','M'),(24,'a','a','2000-01-01','2025-05-02','a@B.c','$2b$10$R4rRI3Db57nVrPrCrpGwmegqons2LiXTMyRUYrppmlfgIct1TErU.','MEX','H'),(25,'Mauricio','Castro','1999-01-30','2025-05-02','mauricio@email.com','$2b$10$prFuqGEEeeNVasPuhkGsjuAj9lRcYyzVfcP42yzNpSgNk4gNw/dA.','MEX','N'),(26,'Brian Axel','Velarde Rodriguez','1998-11-02','2025-05-02','Brian@gmail.com','$2b$10$uAM4wOY0/gikQvPuukSf9uuFiV6OPIHPKEXS85nzFdj2HRmgzENli','MEX','H');
/*!40000 ALTER TABLE `jugadores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jugadorescursos`
--

DROP TABLE IF EXISTS `jugadorescursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jugadorescursos` (
  `id_jugador` int NOT NULL,
  `id_curso` int NOT NULL,
  `completado` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_jugador`,`id_curso`),
  KEY `id_curso` (`id_curso`),
  CONSTRAINT `jugadorescursos_ibfk_1` FOREIGN KEY (`id_jugador`) REFERENCES `jugadores` (`id_jugador`) ON DELETE CASCADE,
  CONSTRAINT `jugadorescursos_ibfk_2` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id_curso`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jugadorescursos`
--

LOCK TABLES `jugadorescursos` WRITE;
/*!40000 ALTER TABLE `jugadorescursos` DISABLE KEYS */;
INSERT INTO `jugadorescursos` VALUES (16,1,0),(25,1,1),(26,2,0),(26,3,0);
/*!40000 ALTER TABLE `jugadorescursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jugadoresexamenes`
--

DROP TABLE IF EXISTS `jugadoresexamenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jugadoresexamenes` (
  `id_jugadorexamen` int NOT NULL AUTO_INCREMENT,
  `id_jugador` int NOT NULL,
  `id_examen` int NOT NULL,
  `calificacion` int NOT NULL,
  `fecha_realizado` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_jugadorexamen`),
  KEY `id_jugador` (`id_jugador`),
  KEY `id_examen` (`id_examen`),
  CONSTRAINT `jugadoresexamenes_ibfk_1` FOREIGN KEY (`id_jugador`) REFERENCES `jugadores` (`id_jugador`) ON DELETE CASCADE,
  CONSTRAINT `jugadoresexamenes_ibfk_2` FOREIGN KEY (`id_examen`) REFERENCES `examenes` (`id_examen`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jugadoresexamenes`
--

LOCK TABLES `jugadoresexamenes` WRITE;
/*!40000 ALTER TABLE `jugadoresexamenes` DISABLE KEYS */;
INSERT INTO `jugadoresexamenes` VALUES (42,16,1,9,'2025-05-02 20:09:20'),(43,26,7,5,'2025-05-02 21:29:28'),(44,26,4,3,'2025-05-02 21:35:35'),(45,25,1,10,'2025-05-03 18:44:47'),(47,25,1,10,'2025-05-03 18:57:58'),(48,25,1,10,'2025-05-03 19:02:18'),(49,25,1,10,'2025-05-03 19:02:37'),(50,25,1,10,'2025-05-03 19:04:11'),(51,25,1,10,'2025-05-03 19:10:46'),(52,25,1,10,'2025-05-03 19:13:21');
/*!40000 ALTER TABLE `jugadoresexamenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jugadorespreguntas`
--

DROP TABLE IF EXISTS `jugadorespreguntas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jugadorespreguntas` (
  `id_jugadorpregunta` int NOT NULL AUTO_INCREMENT,
  `id_pregunta` int NOT NULL,
  `id_jugador` int NOT NULL,
  `contestado_correct` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_jugadorpregunta`),
  KEY `id_pregunta` (`id_pregunta`),
  KEY `id_jugador` (`id_jugador`),
  CONSTRAINT `jugadorespreguntas_ibfk_1` FOREIGN KEY (`id_pregunta`) REFERENCES `preguntas` (`id_pregunta`) ON DELETE CASCADE,
  CONSTRAINT `jugadorespreguntas_ibfk_2` FOREIGN KEY (`id_jugador`) REFERENCES `jugadores` (`id_jugador`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=619 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jugadorespreguntas`
--

LOCK TABLES `jugadorespreguntas` WRITE;
/*!40000 ALTER TABLE `jugadorespreguntas` DISABLE KEYS */;
INSERT INTO `jugadorespreguntas` VALUES (572,83,15,0),(573,82,15,1),(574,81,15,1),(575,85,15,0),(576,86,15,1),(577,88,15,1),(578,89,15,0),(579,84,15,1),(580,90,15,1),(581,87,15,0),(582,90,15,1),(583,89,15,0),(584,87,15,0),(585,85,15,1),(586,81,15,1),(587,88,15,1),(588,86,15,1),(589,83,15,1),(590,84,15,1),(591,82,15,1),(592,68,26,0),(593,66,26,0),(594,62,26,0),(595,70,26,1),(596,61,26,1),(597,65,26,0),(598,63,26,0),(599,64,26,1),(600,67,26,1),(601,69,26,1),(602,35,26,0),(603,33,26,1),(604,31,26,0),(605,34,26,0),(606,39,26,0),(607,32,26,0),(608,37,26,1),(609,36,26,1),(610,38,26,0),(611,40,26,0),(612,40,25,1),(613,31,25,1),(614,47,25,1),(615,47,25,1),(616,47,25,1),(617,47,25,1),(618,47,25,1);
/*!40000 ALTER TABLE `jugadorespreguntas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lecciones`
--

DROP TABLE IF EXISTS `lecciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lecciones` (
  `id_leccion` int NOT NULL AUTO_INCREMENT,
  `id_curso` int NOT NULL,
  PRIMARY KEY (`id_leccion`,`id_curso`),
  KEY `id_curso` (`id_curso`),
  CONSTRAINT `lecciones_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id_curso`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lecciones`
--

LOCK TABLES `lecciones` WRITE;
/*!40000 ALTER TABLE `lecciones` DISABLE KEYS */;
INSERT INTO `lecciones` VALUES (1,1),(2,1),(3,1),(4,2),(5,2),(6,2),(7,3),(8,3),(9,3);
/*!40000 ALTER TABLE `lecciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preguntas`
--

DROP TABLE IF EXISTS `preguntas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preguntas` (
  `id_pregunta` int NOT NULL AUTO_INCREMENT,
  `id_examen` int NOT NULL,
  PRIMARY KEY (`id_pregunta`,`id_examen`),
  KEY `id_examen` (`id_examen`),
  CONSTRAINT `preguntas_ibfk_1` FOREIGN KEY (`id_examen`) REFERENCES `examenes` (`id_examen`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preguntas`
--

LOCK TABLES `preguntas` WRITE;
/*!40000 ALTER TABLE `preguntas` DISABLE KEYS */;
INSERT INTO `preguntas` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1),(10,1),(11,2),(12,2),(13,2),(14,2),(15,2),(16,2),(17,2),(18,2),(19,2),(20,2),(21,3),(22,3),(23,3),(24,3),(25,3),(26,3),(27,3),(28,3),(29,3),(30,3),(31,4),(32,4),(33,4),(34,4),(35,4),(36,4),(37,4),(38,4),(39,4),(40,4),(41,5),(42,5),(43,5),(44,5),(45,5),(46,5),(47,5),(48,5),(49,5),(50,5),(51,6),(52,6),(53,6),(54,6),(55,6),(56,6),(57,6),(58,6),(59,6),(60,6),(61,7),(62,7),(63,7),(64,7),(65,7),(66,7),(67,7),(68,7),(69,7),(70,7),(71,8),(72,8),(73,8),(74,8),(75,8),(76,8),(77,8),(78,8),(79,8),(80,8),(81,9),(82,9),(83,9),(84,9),(85,9),(86,9),(87,9),(88,9),(89,9),(90,9);
/*!40000 ALTER TABLE `preguntas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tiempojugado`
--

DROP TABLE IF EXISTS `tiempojugado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tiempojugado` (
  `id_tiempojugado` int NOT NULL AUTO_INCREMENT,
  `id_jugador` int NOT NULL,
  `login` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `logout` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_tiempojugado`),
  KEY `id_jugador` (`id_jugador`),
  CONSTRAINT `tiempojugado_ibfk_1` FOREIGN KEY (`id_jugador`) REFERENCES `jugadores` (`id_jugador`) ON DELETE CASCADE,
  CONSTRAINT `tiempojugado_chk_1` CHECK (((`logout` >= `login`) or (`logout` is null)))
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tiempojugado`
--

LOCK TABLES `tiempojugado` WRITE;
/*!40000 ALTER TABLE `tiempojugado` DISABLE KEYS */;
INSERT INTO `tiempojugado` VALUES (47,25,'2025-05-03 15:20:32','2025-05-03 15:20:32'),(48,25,'2025-05-03 15:26:02','2025-05-03 15:27:59'),(49,25,'2025-05-03 15:26:51','2025-05-03 15:27:59'),(50,25,'2025-05-03 15:27:35','2025-05-03 15:27:59'),(51,25,'2025-05-03 15:27:58','2025-05-03 15:27:59'),(52,25,'2025-05-03 16:14:16',NULL),(53,25,'2025-05-03 16:15:34','2025-05-03 16:15:35'),(54,25,'2025-05-03 16:18:42','2025-05-03 16:18:43'),(55,25,'2025-05-03 16:19:02','2025-05-03 16:19:04'),(56,25,'2025-05-03 16:19:54','2025-05-03 16:19:55'),(57,25,'2025-05-03 16:20:29','2025-05-03 16:20:30'),(58,25,'2025-05-03 16:25:49','2025-05-03 16:25:53'),(59,25,'2025-05-03 17:16:39',NULL),(60,25,'2025-05-03 18:35:19',NULL),(61,25,'2025-05-03 18:36:36',NULL),(62,25,'2025-05-03 18:52:25',NULL),(63,25,'2025-05-03 19:03:58',NULL),(64,25,'2025-05-03 19:10:41',NULL),(65,25,'2025-05-03 19:13:17','2025-05-03 19:13:23'),(66,25,'2025-05-03 22:48:34',NULL),(67,25,'2025-05-03 22:49:59',NULL);
/*!40000 ALTER TABLE `tiempojugado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'cryptoadventures'
--
/*!50003 DROP PROCEDURE IF EXISTS `actualizarProgresoCurso` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `actualizarProgresoCurso`(IN id_curso INT, IN id_jugador INT)
BEGIN
	DECLARE examenes_aprobados INT DEFAULT 0;
    DECLARE examenes_existentes INT DEFAULT 0;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		RESIGNAL SQLSTATE "45000";
		ROLLBACK;
    END;
    SELECT COUNT(*) INTO examenes_aprobados FROM `jugadoresexamenes` je
			JOIN `examenes` ex ON je.id_examen = ex.id_examen
            JOIN `lecciones` le ON ex.id_leccion = le.id_leccion
			WHERE je.id_jugador = id_jugador
			AND le.id_curso = id_curso
			AND je.calificacion > 6;
    SELECT COUNT(*) INTO examenes_existentes 
			FROM `examenes` ex
            JOIN `lecciones` le ON ex.id_leccion = le.id_leccion
			WHERE le.id_curso = id_curso;
	IF examenes_aprobados < examenes_existentes
	THEN
		CALL `registrarProgresoCurso`(id_jugador, id_curso, 0);
	ELSE
		CALL `registrarProgresoCurso`(id_jugador, id_curso, 1);
	END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertarJugador` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `insertarJugador`(IN nombre VARCHAR(50), IN apellido VARCHAR(50), 
	IN fecha_nacimiento DATE, IN correo VARCHAR(100), IN contrasena VARCHAR(128), 
    IN pais VARCHAR(3), IN genero ENUM("H", "M", "N"))
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		RESIGNAL SQLSTATE "45000";
		ROLLBACK;
    END;
	START TRANSACTION;
		INSERT INTO jugadores(nombre, apellido, fecha_nacimiento, fecha_registro, correo,
			contrasena, pais, genero) VALUES
		(nombre, apellido, fecha_nacimiento, DEFAULT, correo, contrasena, pais, genero);
	COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertarPregunta` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `insertarPregunta`(IN examen INT)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		RESIGNAL SQLSTATE "45000";
		ROLLBACK;
    END;

	START TRANSACTION;
		INSERT INTO preguntas (id_examen)
			VALUES (examen);
		COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `registrarCurso` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `registrarCurso`(IN nombre VARCHAR(25))
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		RESIGNAL SQLSTATE "45000";
		ROLLBACK;
    END;
	START TRANSACTION;
		INSERT INTO cursos(nombre_curso) VALUES (nombre);
	COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `registrarExamen` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `registrarExamen`(IN leccion INT)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		RESIGNAL SQLSTATE "45000";
		ROLLBACK;
    END;
	START TRANSACTION;
		INSERT INTO `examenes`(id_leccion)
			VALUES (leccion);
	COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `registrarLeccion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `registrarLeccion`(IN id_curso INT)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		RESIGNAL SQLSTATE "45000";
		ROLLBACK;
    END;
	START TRANSACTION;
		INSERT INTO lecciones(id_curso) VALUES (id_curso);
	COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `registrarLogin` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `registrarLogin`(IN id_jugador INT)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		RESIGNAL SQLSTATE "45000";
		ROLLBACK;
    END;
	START TRANSACTION;
		INSERT INTO tiempojugado(id_jugador, login)
			VALUES (id_jugador, DEFAULT);
	COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `registrarLogout` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `registrarLogout`(IN jugador INT)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		RESIGNAL SQLSTATE "45000";
		ROLLBACK;
    END;
	START TRANSACTION;
		UPDATE tiempojugado tj1
        JOIN (
			SELECT id_tiempojugado
            FROM tiempojugado
            WHERE id_jugador = jugador AND logout IS NULL
            ORDER BY login DESC
            LIMIT 1) tj2 ON tj1.id_tiempojugado = tj2.id_tiempojugado
            SET tj1.logout = CURRENT_TIMESTAMP();
	COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `registrarProgresoCurso` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `registrarProgresoCurso`(IN id_jugador INT, IN id_curso INT,
											IN completado TINYINT(1))
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		RESIGNAL SQLSTATE "45000";
		ROLLBACK;
	END ;
    START TRANSACTION;
		IF 
			(SELECT jc.id_jugador
			FROM `jugadorescursos` jc
			WHERE jc.id_jugador = id_jugador AND jc.id_curso = id_curso) 
		IS NULL
		THEN
			INSERT INTO `jugadorescursos`(id_jugador, id_curso, completado)
				VALUES(id_jugador, id_curso, completado);
		ELSE
			UPDATE `jugadorescursos` jc
				SET jc.completado = completado
				WHERE jc.id_jugador = id_jugador AND jc.id_curso = id_curso;
		END IF;
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `registrarProgresoExamen` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `registrarProgresoExamen`(IN id_examen INT, IN id_jugador INT,
												IN calificacion INT)
BEGIN
	DECLARE curso INT DEFAULT 0;
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		RESIGNAL SQLSTATE "45000";
		ROLLBACK;
    END ;
	START TRANSACTION;
		INSERT INTO `jugadoresexamenes`(id_examen, id_jugador, calificacion, fecha_realizado)
			VALUES (id_examen, id_jugador, calificacion, DEFAULT);
		SELECT le.id_curso INTO curso 
			FROM jugadoresexamenes je
			JOIN examenes ex ON je.id_examen = ex.id_examen
			JOIN lecciones le ON ex.id_leccion = le.id_leccion
			WHERE je.id_examen = id_examen AND je.id_jugador = id_jugador
            ORDER BY je.fecha_realizado DESC
            LIMIT 1;
		CALL `actualizarProgresoCurso`(curso, id_jugador);
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `registrarProgresoPregunta` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`admin`@`%` PROCEDURE `registrarProgresoPregunta`(IN id_pregunta INT, IN id_jugador INT,
												IN correcto TINYINT(1))
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		RESIGNAL SQLSTATE "45000";
		ROLLBACK;
    END;
	START TRANSACTION;
		INSERT INTO `jugadorespreguntas`(id_pregunta, id_jugador, contestado_correct)
			VALUES (id_pregunta, id_jugador, correcto);
	COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-03 16:55:01
