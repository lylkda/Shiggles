# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.6.35)
# Database: shiggles_db
# Generation Time: 2018-02-02 02:29:00 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table compQuestions
# ------------------------------------------------------------
CREATE DATABASE shiggles_db;
USE shiggles_db;
DROP TABLE IF EXISTS `compQuestions`;

CREATE TABLE `compQuestions` (
  `question` varchar(200) DEFAULT NULL,
  `answer1` varchar(75) DEFAULT NULL,
  `answer2` varchar(75) DEFAULT NULL,
  `questionID` int(50) DEFAULT NULL,
  `winner` varchar(75) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table questions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `questions`;

CREATE TABLE `questions` (
  `question` varchar(200) NOT NULL,
  `answer1` varchar(75) NOT NULL,
  `answer2` varchar(75) NOT NULL,
  `questionID` int(50) NOT NULL AUTO_INCREMENT,
  `isCurrent` tinyint(1) DEFAULT '0',
  `a1Votes` int(10) DEFAULT NULL,
  `a2Votes` int(10) DEFAULT NULL,
  PRIMARY KEY (`questionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;

INSERT INTO `questions` (`question`, `answer1`, `answer2`, `questionID`, `isCurrent`, `a1Votes`, `a2Votes`)
VALUES
	('What is better, cats or dogs?','cats','dogs',1,0,NULL,NULL),
	('Pie vs cake?','Pie!','Cake!',2,0,NULL,NULL),
	('What tastes better, oranges or apples?','Oranges forever!','Glorious Apples!',3,0,NULL,NULL);

/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table userData
# ------------------------------------------------------------

DROP TABLE IF EXISTS `userData`;

CREATE TABLE `userData` (
  `username` varchar(50) NOT NULL,
  `questionID` int(10) DEFAULT NULL,
  `answer` varchar(50) DEFAULT NULL,
  `guess` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
