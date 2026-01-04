-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1:3306
-- Létrehozás ideje: 2026. Jan 04. 16:22
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `zoo_database`
--
CREATE DATABASE IF NOT EXISTS `zoo_database` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `zoo_database`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `animal`
--

CREATE TABLE `animal` (
  `ID` int(11) NOT NULL,
  `SpeciesName` varchar(150) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `ForSaleQuantity` int(11) NOT NULL,
  `Description` text DEFAULT NULL,
  `SpeciesID` int(11) NOT NULL,
  `OriginID` int(11) NOT NULL,
  `Habitat` text DEFAULT NULL,
  `Feeding` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `animal`
--

INSERT INTO `animal` (`ID`, `SpeciesName`, `Quantity`, `ForSaleQuantity`, `Description`, `SpeciesID`, `OriginID`, `Habitat`, `Feeding`) VALUES
(1, 'Budgerigar', 12, 4, 'Small colorful parrot species', 1, 2, 'Aviary', 'Seeds'),
(2, 'European Hamster', 6, 1, 'Small nocturnal rodent', 2, 1, 'Grasslands', 'Grains and vegetables'),
(3, 'Guinea Pig', 10, 3, 'Domesticated small mammal', 3, 3, 'Enclosure', 'Hay and vegetables');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `image`
--

CREATE TABLE `image` (
  `ID` int(11) NOT NULL,
  `ImageData` longblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `image`
--

INSERT INTO `image` (`ID`, `ImageData`) VALUES
(1, 0x00),
(2, 0x00),
(3, 0x00);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `imageanimal`
--

CREATE TABLE `imageanimal` (
  `ID` int(11) NOT NULL,
  `ImageID` int(11) NOT NULL,
  `AnimalID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `imageanimal`
--

INSERT INTO `imageanimal` (`ID`, `ImageID`, `AnimalID`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `openinghours`
--

CREATE TABLE `openinghours` (
  `ID` int(11) NOT NULL,
  `StartDate` date NOT NULL,
  `EndDate` date DEFAULT NULL,
  `StartTime` time NOT NULL,
  `EndTime` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `origin`
--

CREATE TABLE `origin` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `origin`
--

INSERT INTO `origin` (`ID`, `Name`) VALUES
(1, 'Europe'),
(2, 'Asia'),
(3, 'South America');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `species`
--

CREATE TABLE `species` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `species`
--

INSERT INTO `species` (`ID`, `Name`) VALUES
(1, 'Bird'),
(2, 'Small Mammal'),
(3, 'Small Mammal');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `animal`
--
ALTER TABLE `animal`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_animal_class` (`SpeciesID`),
  ADD KEY `fk_animal_origin` (`OriginID`);

--
-- A tábla indexei `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `imageanimal`
--
ALTER TABLE `imageanimal`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `ImageID` (`ImageID`,`AnimalID`),
  ADD KEY `fk_imageanimal_animal` (`AnimalID`);

--
-- A tábla indexei `openinghours`
--
ALTER TABLE `openinghours`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `origin`
--
ALTER TABLE `origin`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `species`
--
ALTER TABLE `species`
  ADD PRIMARY KEY (`ID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `animal`
--
ALTER TABLE `animal`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `image`
--
ALTER TABLE `image`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `imageanimal`
--
ALTER TABLE `imageanimal`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `openinghours`
--
ALTER TABLE `openinghours`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `origin`
--
ALTER TABLE `origin`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `species`
--
ALTER TABLE `species`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `animal`
--
ALTER TABLE `animal`
  ADD CONSTRAINT `fk_animal_class` FOREIGN KEY (`SpeciesID`) REFERENCES `species` (`ID`),
  ADD CONSTRAINT `fk_animal_origin` FOREIGN KEY (`OriginID`) REFERENCES `origin` (`ID`);

--
-- Megkötések a táblához `imageanimal`
--
ALTER TABLE `imageanimal`
  ADD CONSTRAINT `fk_imageanimal_animal` FOREIGN KEY (`AnimalID`) REFERENCES `animal` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_imageanimal_image` FOREIGN KEY (`ImageID`) REFERENCES `image` (`ID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
