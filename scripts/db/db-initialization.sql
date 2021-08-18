-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: videoconferencias
DROP DATABASE IF EXISTS `api-bbb`;

CREATE DATABASE `api-bbb`;

USE `api-bbb`;
-- ------------------------------------------------------
-- Server version	5.5.5-10.5.8-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
                         `id` tinyint(4) NOT NULL AUTO_INCREMENT,
                         `name` varchar(250) NOT NULL DEFAULT '',
                         `description` text DEFAULT NULL,
                         PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin','Administrador del sistema'),(2,'Moderador','Administrador de sala'),(3,'Asistente','Auxuliar del Moderador'),(4,'Participante','Puede conectarse a la sala');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rooms` (
                         `id` bigint(20) NOT NULL AUTO_INCREMENT,
                         `admin` varchar(250) NOT NULL DEFAULT '',
                         `name` varchar(250) DEFAULT NULL,
                         `duration` enum('60"','120"','180"') NOT NULL DEFAULT '60"',
                         `code` varchar(250) DEFAULT NULL,
                         `url` varchar(250) NOT NULL DEFAULT '',
                         `password_assistant` varchar(250) NOT NULL DEFAULT '',
                         `password_moderator` varchar(250) NOT NULL DEFAULT '',
                         `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
                         `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
                         `status` tinyint(1) NOT NULL DEFAULT 1,
                         `date` timestamp NOT NULL DEFAULT current_timestamp(),
                         PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,'mabregu@ejercito.mil.ar','proyeco bbb','60\"','xD45RefG6yxS','https://bbb.ejercito.mil.ar/b/mab-w4y-m39','newpassbbb','newpassbbbM0d','2021-06-10 12:40:02','2021-06-10 12:40:02',1,'2021-09-10 13:30:00'),(2,'ramoneariel@ejercito.mil.ar','api node','120\"','cF35g3hxpwmN','https://bbb.ejercito.mil.ar/b/ari-g3x-n74','\'\'','\'\'','2021-06-10 14:26:07','2021-06-10 14:26:07',1,'2021-06-15 12:30:00');
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms_participants`
--

DROP TABLE IF EXISTS `rooms_participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rooms_participants` (
                                      `id` bigint(20) NOT NULL AUTO_INCREMENT,
                                      `room_id` bigint(20) DEFAULT NULL,
                                      `role_id` tinyint(4) NOT NULL DEFAULT 4,
                                      `participant` varchar(250) NOT NULL DEFAULT '',
                                      PRIMARY KEY (`id`),
                                      KEY `rooms_participants_room_id_fk` (`room_id`),
                                      CONSTRAINT `rooms_participants_room_id_fk` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms_participants`
--

LOCK TABLES `rooms_participants` WRITE;
/*!40000 ALTER TABLE `rooms_participants` DISABLE KEYS */;
INSERT INTO `rooms_participants` VALUES (1,1,1,'mabregu@ejercito.mil.ar'),(2,1,4,'ramoneariel@ejercito.mil.ar'),(3,1,4,'cmaceira@ejercio.mil.ar'),(4,1,4,'acala@ejercio.mil.ar');
/*!40000 ALTER TABLE `rooms_participants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
                         `id` bigint(20) NOT NULL AUTO_INCREMENT,
                         `name` varchar(250) NOT NULL DEFAULT '',
                         `email` varchar(250) NOT NULL DEFAULT '',
                         `created_at` timestamp NULL DEFAULT current_timestamp(),
                         `updated_at` timestamp NULL DEFAULT current_timestamp(),
                         `status` tinyint(1) NOT NULL DEFAULT 1,
                         PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'mabregu','mabregu@ejercito.mil.ar','2021-06-09 13:41:23','2021-06-09 13:41:23',1),(2,'ramoneariel','ramoneariel@ejercito.mil.ar','2021-06-10 13:05:09','2021-06-10 13:05:09',1),(3,'cmaceira','cmaceira@ejercio.mil.ar','2021-06-10 13:06:28','2021-06-10 13:06:28',1),(4,'acala','acala@ejercio.mil.ar','2021-06-10 13:06:50','2021-06-10 13:06:50',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `view_rooms`
--

DROP TABLE IF EXISTS `view_rooms`;
/*!50001 DROP VIEW IF EXISTS `view_rooms`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `view_rooms` (
  `id` tinyint NOT NULL,
  `admin` tinyint NOT NULL,
  `name` tinyint NOT NULL,
  `duration` tinyint NOT NULL,
  `code` tinyint NOT NULL,
  `url` tinyint NOT NULL,
  `created_at` tinyint NOT NULL,
  `updated_at` tinyint NOT NULL,
  `status` tinyint NOT NULL,
  `date` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Dumping routines for database 'videoconferencias'
--

--
-- Final view structure for view `view_rooms`
--

/*!50001 DROP TABLE IF EXISTS `view_rooms`*/;
/*!50001 DROP VIEW IF EXISTS `view_rooms`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_rooms` AS select `rooms`.`id` AS `id`,`rooms`.`admin` AS `admin`,`rooms`.`name` AS `name`,`rooms`.`duration` AS `duration`,`rooms`.`code` AS `code`,`rooms`.`url` AS `url`,`rooms`.`created_at` AS `created_at`,`rooms`.`updated_at` AS `updated_at`,`rooms`.`status` AS `status`,`rooms`.`date` AS `date` from `rooms` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-16 20:19:15
