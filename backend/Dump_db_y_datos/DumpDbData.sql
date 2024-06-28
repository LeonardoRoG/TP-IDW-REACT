CREATE DATABASE  IF NOT EXISTS `idw` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `idw`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: idw
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `alojamientos`
--

DROP TABLE IF EXISTS `alojamientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alojamientos` (
  `idAlojamiento` int NOT NULL AUTO_INCREMENT,
  `Titulo` varchar(255) NOT NULL,
  `Descripcion` text,
  `Latitud` decimal(10,8) NOT NULL,
  `Longitud` decimal(11,8) NOT NULL,
  `PrecioPorDia` decimal(10,2) NOT NULL,
  `CantidadDormitorios` int NOT NULL,
  `CantidadBanios` int NOT NULL,
  `Estado` enum('Disponible','Reservado') NOT NULL,
  `idTipoAlojamiento` int DEFAULT NULL,
  PRIMARY KEY (`idAlojamiento`),
  KEY `idTipoAlojamiento` (`idTipoAlojamiento`),
  CONSTRAINT `alojamientos_ibfk_1` FOREIGN KEY (`idTipoAlojamiento`) REFERENCES `tiposalojamiento` (`idTipoAlojamiento`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alojamientos`
--

LOCK TABLES `alojamientos` WRITE;
/*!40000 ALTER TABLE `alojamientos` DISABLE KEYS */;
INSERT INTO `alojamientos` VALUES (5,'Cabaña en la montaña','Cabaña en la montaña con vista a la montaña y con peligro de ataques de yetis , ',-32.14722260,-69.55976711,20000.00,4,2,'Disponible',60),(6,'Casa en San Luis','Casa con hogar en medio de la ciudad, cerca de los principales centros comerciales y turísticos. Zona muy segura y de fácil acceso',-33.68701411,-65.47099909,40000.00,3,1,'Reservado',71),(7,'Departamento en CABA','Departamento en piso 22 en barrio Palermo con balcón, expensas incluidas. A metros de la Embajada de EEUU, zona muy poblada y transitada con alta seguridad, plena zona comercial y a escasos metros de parques naturales.',-34.58078027,-58.42447592,34000.00,4,2,'Disponible',57),(8,'Cabaña en Mendoza','nuestra cabaña ofrece una experiencia única para los amantes de la naturaleza y la tranquilidad. A continuación, algunos aspectos destacados:  Vistas panorámicas: Desde la terraza privada, podrás contemplar las majestuosas montañas y el lago Nahuel Huapi. Comodidades modernas: La cabaña cuenta con una cocina completamente equipada, calefacción central y Wi-Fi de alta velocidad. Decoración rústica: El interior combina elementos de madera y piedra, creando un ambiente acogedor y relajante. Acceso a senderos: A pocos minutos, encontrarás senderos para caminatas y actividades al aire libre. Cercanía al centro: Estamos a solo 5 minutos en auto del centro, donde encontrarás restaurantes, tiendas y más. A escasos metros del lago y estación de servicio.',-32.95945729,-69.19525377,24000.00,3,1,'Reservado',60),(11,'Casa en Mar del Plata','Casa a 500 metros de la playa principal de la ciudad, con todas las comodidades y seguridad',-38.05750000,-57.54941000,60000.00,4,3,'Reservado',71),(12,'Choza con gotera','Choza con gotera en medio del impenetrable , ',-24.90838380,-61.47259213,30000.00,1,1,'Reservado',74),(13,'Departamento en Córdoba','Departamento en plena zona céntrica de la ciudad, cerca de las principales zonas turísticas y centros comerciales',-31.41465179,-64.20875114,69999.00,3,2,'Reservado',57),(15,'Cabaña en Neuquén','Ubicada en el corazón de la Patagonia, nuestra cabaña ofrece una experiencia única para los amantes de la naturaleza y la tranquilidad. A continuación, algunos aspectos destacados:  Vistas panorámicas: Desde la terraza privada, podrás contemplar las majestuosas montañas y el lago Nahuel Huapi. Comodidades modernas: La cabaña cuenta con una cocina completamente equipada, calefacción central y Wi-Fi de alta velocidad. Decoración rústica: El interior combina elementos de madera y piedra, creando un ambiente acogedor y relajante. Acceso a senderos: A pocos minutos, encontrarás senderos para caminatas y actividades al aire libre. Cercanía al centro: Estamos a solo 5 minutos en auto del centro de Villa La Angostura, donde encontrarás restaurantes, tiendas y más. Reserva ahora y descubre la magia de la Patagonia en nuestra cabaña. ¡Te esperamos!',-40.75890025,-71.66312193,20000.00,2,1,'Disponible',60),(16,'Excelente hotel en Cataratas','El Exe Hotel Cataratas está situado cerca de la selva misionera y ofrece un intenso contacto con la naturaleza, fantásticas piscinas y varias opciones de ocio.El hotel cuenta con pista de tenis, sala de juegos, parque infantil y gimnasio.Las habitaciones del Exe Hotel Cataratas son cómodas y disponen de aire acondicionado, caja fuerte, TV por cable y baño privado con bañera, secador de pelo y artículos de aseo gratuitos .El Exe Hotel Cataratas, de 5 estrellas, alberga un bar restaurante que sirve especialidades regionales e internacionales .Las habitaciones amplias y el personal profesional son algunas de las características por las que destaca el hotel .El spa permanecerá cerrado al momento.En la media pensión los servicios incluyen Desayuno y Cena (incluye plato principal y postre) Debido a cuestiones de aforo, para el servicio de cena se debe reservar lugar con 24 horas de antelación.',-25.59824639,-54.57574351,115000.00,3,2,'Reservado',77),(39,'Alojamiento de relleno','Alguna descripcion',-33.12750000,-64.35777000,23000.00,2,2,'Disponible',60);
/*!40000 ALTER TABLE `alojamientos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alojamientoservicios`
--

DROP TABLE IF EXISTS `alojamientoservicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alojamientoservicios` (
  `idAlojamientoServicio` int NOT NULL AUTO_INCREMENT,
  `idAlojamiento` int DEFAULT NULL,
  `idServicio` int DEFAULT NULL,
  PRIMARY KEY (`idAlojamientoServicio`),
  KEY `idAlojamiento` (`idAlojamiento`),
  KEY `idServicio` (`idServicio`),
  CONSTRAINT `alojamientoservicios_ibfk_1` FOREIGN KEY (`idAlojamiento`) REFERENCES `alojamientos` (`idAlojamiento`),
  CONSTRAINT `alojamientoservicios_ibfk_2` FOREIGN KEY (`idServicio`) REFERENCES `servicios` (`idServicio`)
) ENGINE=InnoDB AUTO_INCREMENT=253 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alojamientoservicios`
--

LOCK TABLES `alojamientoservicios` WRITE;
/*!40000 ALTER TABLE `alojamientoservicios` DISABLE KEYS */;
INSERT INTO `alojamientoservicios` VALUES (3,5,1),(4,5,2),(12,12,4),(13,5,4),(30,8,2),(31,8,6),(33,8,4),(35,15,8),(36,11,2),(37,11,1),(38,11,8),(39,13,9),(40,13,5),(64,8,13),(65,8,12),(88,12,4),(89,12,5),(188,6,1),(189,6,2),(190,6,4),(193,16,10),(194,16,11),(195,16,12),(196,16,1),(197,16,2),(198,16,8),(199,16,15),(200,16,13),(201,16,4),(202,16,5),(203,16,6),(204,16,9),(241,39,1),(242,39,2),(250,7,1),(251,7,5),(252,7,15);
/*!40000 ALTER TABLE `alojamientoservicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenes`
--

DROP TABLE IF EXISTS `imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagenes` (
  `idImagen` int NOT NULL AUTO_INCREMENT,
  `idAlojamiento` int DEFAULT NULL,
  `RutaArchivo` varchar(255) NOT NULL,
  PRIMARY KEY (`idImagen`),
  KEY `idAlojamiento` (`idAlojamiento`),
  CONSTRAINT `imagenes_ibfk_1` FOREIGN KEY (`idAlojamiento`) REFERENCES `alojamientos` (`idAlojamiento`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes`
--

LOCK TABLES `imagenes` WRITE;
/*!40000 ALTER TABLE `imagenes` DISABLE KEYS */;
INSERT INTO `imagenes` VALUES (1,5,'https://cdn.pixabay.com/photo/2014/07/31/21/41/apartment-406901_1280.jpg'),(2,6,'https://cdn.pixabay.com/photo/2017/01/14/12/48/hotel-1979406_1280.jpg'),(4,11,'https://cdn.pixabay.com/photo/2013/10/09/02/27/lake-192990_1280.jpg'),(5,12,'https://cdn.pixabay.com/photo/2017/03/22/17/39/kitchen-2165756_1280.jpg'),(6,7,'https://cdn.pixabay.com/photo/2014/07/21/19/20/lobby-398845_1280.jpg'),(7,8,'https://cdn.pixabay.com/photo/2016/10/13/09/06/travel-1737168_1280.jpg'),(23,13,'https://i.ibb.co/mvBYW8P/bedroom-5664221-1280-jpg.jpg'),(24,15,'https://i.ibb.co/BP0cz6V/bedroom-1281580-1280-jpg.jpg'),(25,15,'https://i.ibb.co/h7vnNZY/bedroom-1281580-1280-jpg.jpg'),(27,7,'https://i.ibb.co/hBrSTcH/kitchen-2400367-1280-jpg.jpg'),(28,16,'https://i.ibb.co/crNtmjY/hotel-389256-1280-jpg.jpg'),(30,16,'https://i.ibb.co/nsyZxY4/kitchen-2400367-1280-jpg.jpg'),(39,39,'https://i.ibb.co/W62Sjy6/kitchen-2400367-1280-jpg.jpg');
/*!40000 ALTER TABLE `imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicios`
--

DROP TABLE IF EXISTS `servicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicios` (
  `idServicio` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`idServicio`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicios`
--

LOCK TABLES `servicios` WRITE;
/*!40000 ALTER TABLE `servicios` DISABLE KEYS */;
INSERT INTO `servicios` VALUES (1,'WiFi'),(2,'TV'),(4,'Desayuno'),(5,'Limpieza'),(6,'Almuerzo'),(8,'Cochera'),(9,'Gimnasio'),(10,'Spa'),(11,'Piscina'),(12,'Lavandería'),(13,'Cena'),(15,'Bar');
/*!40000 ALTER TABLE `servicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tiposalojamiento`
--

DROP TABLE IF EXISTS `tiposalojamiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tiposalojamiento` (
  `idTipoAlojamiento` int NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(255) NOT NULL,
  PRIMARY KEY (`idTipoAlojamiento`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tiposalojamiento`
--

LOCK TABLES `tiposalojamiento` WRITE;
/*!40000 ALTER TABLE `tiposalojamiento` DISABLE KEYS */;
INSERT INTO `tiposalojamiento` VALUES (55,'Edificio'),(57,'Departamento'),(60,'Cabaña'),(63,'Duplex'),(71,'Casa'),(74,'Choza'),(75,'Condominio'),(77,'Hotel'),(83,'Prueba 1');
/*!40000 ALTER TABLE `tiposalojamiento` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-28 10:11:43
