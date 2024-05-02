-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 30, 2024 at 10:30 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bicicletta`
--

-- --------------------------------------------------------

--
-- Table structure for table `bicicletta`
--

CREATE TABLE `bicicletta` (
  `ID` int(11) NOT NULL,
  `posizione` varchar(255) NOT NULL,
  `stato` enum('Noleggiata','Stazione') NOT NULL,
  `codice` int(11) NOT NULL,
  `ID_stazione` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `indirizzo`
--

CREATE TABLE `indirizzo` (
  `ID` int(11) NOT NULL,
  `via` varchar(255) NOT NULL,
  `citta` varchar(255) NOT NULL,
  `cap` int(11) NOT NULL,
  `provincia` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `operazione`
--

CREATE TABLE `operazione` (
  `ID` int(11) NOT NULL,
  `tipo` enum('prelievo','restituzione') NOT NULL,
  `tempo` time NOT NULL,
  `ID_bicicletta` int(11) NOT NULL,
  `ID_utente` int(11) NOT NULL,
  `ID_stazione` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stazione`
--

CREATE TABLE `stazione` (
  `ID` int(11) NOT NULL,
  `posizione` varchar(255) NOT NULL,
  `MaxSlot` int(11) NOT NULL,
  `ID_indirizzo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `utente`
--

CREATE TABLE `utente` (
  `ID` int(11) NOT NULL,
  `codice_fiscale` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `credito` int(11) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `ID_indirizzo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bicicletta`
--
ALTER TABLE `bicicletta`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `codice` (`codice`),
  ADD KEY `ID_stazione` (`ID_stazione`);

--
-- Indexes for table `indirizzo`
--
ALTER TABLE `indirizzo`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `operazione`
--
ALTER TABLE `operazione`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_bicicletta` (`ID_bicicletta`),
  ADD KEY `ID_utente` (`ID_utente`),
  ADD KEY `ID_stazione` (`ID_stazione`);

--
-- Indexes for table `stazione`
--
ALTER TABLE `stazione`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `posizione` (`posizione`),
  ADD KEY `ID_indirizzo` (`ID_indirizzo`);

--
-- Indexes for table `utente`
--
ALTER TABLE `utente`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `codice_fiscale` (`codice_fiscale`),
  ADD KEY `ID_indirizzo` (`ID_indirizzo`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bicicletta`
--
ALTER TABLE `bicicletta`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `indirizzo`
--
ALTER TABLE `indirizzo`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `operazione`
--
ALTER TABLE `operazione`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stazione`
--
ALTER TABLE `stazione`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `utente`
--
ALTER TABLE `utente`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bicicletta`
--
ALTER TABLE `bicicletta`
  ADD CONSTRAINT `bicicletta_ibfk_1` FOREIGN KEY (`ID_stazione`) REFERENCES `stazione` (`ID`);

--
-- Constraints for table `operazione`
--
ALTER TABLE `operazione`
  ADD CONSTRAINT `operazione_ibfk_1` FOREIGN KEY (`ID_utente`) REFERENCES `utente` (`ID`),
  ADD CONSTRAINT `operazione_ibfk_2` FOREIGN KEY (`ID_bicicletta`) REFERENCES `bicicletta` (`ID`),
  ADD CONSTRAINT `operazione_ibfk_3` FOREIGN KEY (`ID_stazione`) REFERENCES `stazione` (`ID`);

--
-- Constraints for table `stazione`
--
ALTER TABLE `stazione`
  ADD CONSTRAINT `stazione_ibfk_1` FOREIGN KEY (`ID_indirizzo`) REFERENCES `indirizzo` (`ID`);

--
-- Constraints for table `utente`
--
ALTER TABLE `utente`
  ADD CONSTRAINT `utente_ibfk_1` FOREIGN KEY (`ID_indirizzo`) REFERENCES `indirizzo` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;