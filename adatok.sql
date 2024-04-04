-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Ápr 05. 01:08
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `filc`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `felhasznalo_id` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `admin`
--

INSERT INTO `admin` (`id`, `level`, `felhasznalo_id`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, '2024-04-01 21:19:30.000', '2024-04-01 21:19:30.000');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `diak`
--

CREATE TABLE `diak` (
  `id` int(11) NOT NULL,
  `om_azonosito` varchar(255) NOT NULL,
  `osztaly_id` int(11) DEFAULT NULL,
  `felhasznalo_id` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `diak`
--

INSERT INTO `diak` (`id`, `om_azonosito`, `osztaly_id`, `felhasznalo_id`, `createdAt`, `updatedAt`) VALUES
(1, '7311202', 3, 4, '2024-04-03 20:14:47.832', '2024-04-03 20:14:47.832'),
(2, '7412365', 1, 5, '2024-04-03 20:15:55.284', '2024-04-03 20:15:55.284'),
(3, '7105896', 1, 6, '2024-04-03 20:17:06.282', '2024-04-03 20:17:06.282'),
(4, '7423698', 2, 7, '2024-04-03 20:20:32.438', '2024-04-03 20:20:32.438'),
(5, '7520369', 3, 8, '2024-04-03 20:21:37.175', '2024-04-03 20:21:37.175'),
(6, '7122258', 2, 9, '2024-04-03 20:22:52.459', '2024-04-03 20:22:52.459'),
(7, '728963544', 1, 13, '2024-04-04 11:16:32.282', '2024-04-04 11:16:32.282');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalo`
--

CREATE TABLE `felhasznalo` (
  `id` int(11) NOT NULL,
  `teljes_nev` varchar(255) NOT NULL,
  `szuletesi_datum` varchar(255) DEFAULT NULL,
  `jelszo` varchar(255) NOT NULL,
  `telefonszam` varchar(255) NOT NULL,
  `utolso_belepes` datetime DEFAULT NULL,
  `regisztracio_datum` datetime NOT NULL DEFAULT current_timestamp(),
  `iskola_id` int(11) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `felhasznalo`
--

INSERT INTO `felhasznalo` (`id`, `teljes_nev`, `szuletesi_datum`, `jelszo`, `telefonszam`, `utolso_belepes`, `regisztracio_datum`, `iskola_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Bányai Erzsébet', '1971.10.02', '$2a$10$TfQXBGaPJyL8dtcjxw5jNOLaXZXezrpdcon..L6lNxvpjjoaN/HxK\n', '06121231234', NULL, '2024-04-03 21:18:59', 1, '2024-04-01 21:18:22.000', '2024-04-01 21:18:22.000'),
(2, 'Lópiczi Gáspár', '1967-11-03', '$2a$10$3J76EdJk5vsE1GxK6cNqx.uaswpZaE4fYysrQzZdIkD5FcGzRnGHe', '06203332589', '2024-04-03 19:39:56', '2024-04-03 19:39:56', 1, '2024-04-03 19:39:56.027', '2024-04-03 19:39:56.027'),
(3, 'Szeredi Lilla', '2000-02-02', '$2a$10$L/i7DZpQ9JnECPBd0rX9Ke/59Z5F//8wNJrmqLDRctA0soUJLhIJW', '061221314', '2024-04-03 19:44:54', '2024-04-03 19:44:54', 1, '2024-04-03 19:44:54.043', '2024-04-03 19:44:54.043'),
(4, 'Kiss Kamilla', '2007-11-19', '$2a$10$L/i7DZpQ9JnECPBd0rX9Ke/59Z5F//8wNJrmqLDRctA0soUJLhIJW', '06307894562', '2024-04-03 20:14:47', '2024-04-03 20:14:47', 1, '2024-04-03 20:14:47.832', '2024-04-03 20:14:47.832'),
(5, 'Nagy Árpád', '2009-01-01', '$2a$10$L/i7DZpQ9JnECPBd0rX9Ke/59Z5F//8wNJrmqLDRctA0soUJLhIJW', '06301234567', '2024-04-03 20:15:55', '2024-04-03 20:15:55', 1, '2024-04-03 20:15:55.284', '2024-04-03 20:15:55.284'),
(6, 'László Erika', '2008-12-24', '$2a$10$L/i7DZpQ9JnECPBd0rX9Ke/59Z5F//8wNJrmqLDRctA0soUJLhIJW', '06303254658', '2024-04-03 20:17:06', '2024-04-03 20:17:06', 1, '2024-04-03 20:17:06.282', '2024-04-03 20:17:06.282'),
(7, 'Dézsi Ambrus', '2005-12-24', '$2a$10$L/i7DZpQ9JnECPBd0rX9Ke/59Z5F//8wNJrmqLDRctA0soUJLhIJW', '06202364589', '2024-04-03 20:20:32', '2024-04-03 20:20:32', 1, '2024-04-03 20:20:32.438', '2024-04-03 20:20:32.438'),
(8, 'Szeredi Szabolcs', '2004-06-28', '$2a$10$L/i7DZpQ9JnECPBd0rX9Ke/59Z5F//8wNJrmqLDRctA0soUJLhIJW', '06302364572', '2024-04-03 20:21:37', '2024-04-03 20:21:37', 1, '2024-04-03 20:21:37.175', '2024-04-03 20:21:37.175'),
(9, 'Bátkai Éva', '2007-05-20', '$2a$10$L/i7DZpQ9JnECPBd0rX9Ke/59Z5F//8wNJrmqLDRctA0soUJLhIJW', '06203254698', '2024-04-03 20:22:52', '2024-04-03 20:22:52', 1, '2024-04-03 20:22:52.459', '2024-04-03 20:22:52.459'),
(10, 'Miklósné Gróh Erzsébet', '1968-01-23', '$2a$10$L/i7DZpQ9JnECPBd0rX9Ke/59Z5F//8wNJrmqLDRctA0soUJLhIJW', '06307894562', '2024-04-03 20:58:16', '2024-04-03 20:58:16', 1, '2024-04-03 20:58:16.592', '2024-04-03 20:58:16.592'),
(11, 'Miklós György', '1960-01-01', '$2a$10$L/i7DZpQ9JnECPBd0rX9Ke/59Z5F//8wNJrmqLDRctA0soUJLhIJW', '06307894563', '2024-04-03 20:59:47', '2024-04-03 20:59:47', 1, '2024-04-03 20:59:47.549', '2024-04-03 20:59:47.549'),
(12, 'Kovács Piroska', '1989-11-01', '$2a$10$L/i7DZpQ9JnECPBd0rX9Ke/59Z5F//8wNJrmqLDRctA0soUJLhIJW', '06307893562', '2024-04-03 21:01:29', '2024-04-03 21:01:29', 1, '2024-04-03 21:01:29.380', '2024-04-03 21:01:29.380'),
(13, 'Kovács Kristóf', '2008-05-03', '$2a$10$L/i7DZpQ9JnECPBd0rX9Ke/59Z5F//8wNJrmqLDRctA0soUJLhIJW', '06207894562', '2024-04-04 11:16:32', '2024-04-04 11:16:32', 1, '2024-04-04 11:16:32.282', '2024-04-04 11:16:32.282'),
(15, 'Teszt Jakab', '2024-04-02', '$2b$10$KUJfFdZ0LJDh6S5b4mbNEOykSNkYzvFrGIcO7VK4VomInXgtzx/xu', '0623421', '2024-04-04 17:09:55', '2024-04-04 17:09:55', 1, '2024-04-04 17:09:55.251', '2024-04-04 17:09:55.251');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `hianyzas`
--

CREATE TABLE `hianyzas` (
  `id` int(11) NOT NULL,
  `tipus` int(11) DEFAULT NULL,
  `diak_id` int(11) NOT NULL,
  `tanora_id` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `hianyzas`
--

INSERT INTO `hianyzas` (`id`, `tipus`, `diak_id`, `tanora_id`, `createdAt`, `updatedAt`) VALUES
(15, 1, 4, 16, '2024-04-04 22:39:30.865', '2024-04-04 22:40:54.445'),
(18, 0, 1, 14, '2024-04-04 22:46:44.979', '2024-04-04 22:46:44.979'),
(19, 0, 5, 14, '2024-04-04 22:46:44.979', '2024-04-04 22:46:44.979'),
(20, 0, 1, 18, '2024-04-04 22:46:47.319', '2024-04-04 22:46:47.319'),
(21, 0, 5, 18, '2024-04-04 22:46:47.319', '2024-04-04 22:46:47.319');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `iskola`
--

CREATE TABLE `iskola` (
  `id` int(11) NOT NULL,
  `nev` varchar(255) NOT NULL,
  `iranyitoszam` int(11) NOT NULL,
  `weboldal` varchar(255) DEFAULT NULL,
  `telefonszam` varchar(191) DEFAULT NULL,
  `cim` varchar(255) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `email` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `iskola`
--

INSERT INTO `iskola` (`id`, `nev`, `iranyitoszam`, `weboldal`, `telefonszam`, `cim`, `createdAt`, `updatedAt`, `email`) VALUES
(1, 'Szabó István Technikum, Szakképző iskola', 5700, 'szitsz.hu', '06 66 562-270', '5700 Gyula, Kiss Ernő u. 2', '2024-04-01 21:17:27.000', '2024-04-01 21:17:27.000', 'szitsz@gmail.com');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `jegy`
--

CREATE TABLE `jegy` (
  `id` int(11) NOT NULL,
  `osztalyzat` varchar(191) NOT NULL,
  `suly` int(11) DEFAULT NULL,
  `datum` varchar(255) NOT NULL,
  `oktatas_id` int(11) NOT NULL,
  `diak_id` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `tema` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `jegy`
--

INSERT INTO `jegy` (`id`, `osztalyzat`, `suly`, `datum`, `oktatas_id`, `diak_id`, `createdAt`, `updatedAt`, `tema`) VALUES
(1, '1', 100, '2024-04-05', 1, 2, '2024-04-04 22:58:32.409', '2024-04-04 22:58:32.409', 'Doga'),
(2, '2', 100, '2024-04-05', 1, 3, '2024-04-04 22:58:32.409', '2024-04-04 22:58:32.409', 'Doga'),
(3, '3', 100, '2024-04-05', 1, 7, '2024-04-04 22:58:32.409', '2024-04-04 22:58:32.409', 'Doga'),
(4, '4', 100, '2024-03-06', 1, 2, '2024-04-04 22:59:07.506', '2024-04-04 22:59:07.506', 'Témazáró'),
(5, '3', 100, '2024-03-06', 1, 3, '2024-04-04 22:59:07.506', '2024-04-04 22:59:07.506', 'Témazáró'),
(6, '5', 100, '2024-03-06', 1, 7, '2024-04-04 22:59:07.506', '2024-04-04 22:59:07.506', 'Témazáró'),
(7, '3', 100, '2024-03-19', 1, 2, '2024-04-04 22:59:53.966', '2024-04-04 22:59:53.966', 'Felelet'),
(8, '4', 100, '2024-03-19', 1, 3, '2024-04-04 22:59:53.966', '2024-04-04 22:59:53.966', 'Felelet'),
(9, 'Nem felelt', 100, '2024-03-19', 1, 7, '2024-04-04 22:59:53.966', '2024-04-04 22:59:53.966', 'Felelet');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `oktatas`
--

CREATE TABLE `oktatas` (
  `id` int(11) NOT NULL,
  `tanar_id` int(11) NOT NULL,
  `tantargy_id` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `oktatas`
--

INSERT INTO `oktatas` (`id`, `tanar_id`, `tantargy_id`, `createdAt`, `updatedAt`) VALUES
(1, 2, 1, '2024-04-03 19:39:56.054', '2024-04-03 19:39:56.054'),
(2, 4, 5, '2024-04-03 20:58:16.612', '2024-04-03 20:58:16.612'),
(3, 4, 2, '2024-04-03 20:58:16.612', '2024-04-03 20:58:16.612'),
(4, 4, 9, '2024-04-03 20:58:16.612', '2024-04-03 20:58:16.612'),
(5, 5, 3, '2024-04-03 20:59:47.569', '2024-04-03 20:59:47.569'),
(6, 5, 7, '2024-04-03 20:59:47.569', '2024-04-03 20:59:47.569'),
(7, 6, 4, '2024-04-03 21:01:29.396', '2024-04-03 21:01:29.396'),
(8, 6, 10, '2024-04-03 21:01:29.396', '2024-04-03 21:01:29.396'),
(9, 1, 11, '2024-04-01 23:12:33.000', '2024-04-01 23:12:33.000');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ora`
--

CREATE TABLE `ora` (
  `id` int(11) NOT NULL,
  `kezdete` varchar(191) NOT NULL,
  `vege` varchar(191) NOT NULL,
  `ora` int(11) NOT NULL,
  `iskola_id` int(11) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `ora`
--

INSERT INTO `ora` (`id`, `kezdete`, `vege`, `ora`, `iskola_id`, `createdAt`, `updatedAt`) VALUES
(1, '07:30', '08:15', 1, 1, '2024-04-03 20:49:07.005', '2024-04-03 20:49:07.005'),
(2, '08:30', '09:15', 2, 1, '2024-04-03 20:49:41.807', '2024-04-03 20:49:41.807'),
(3, '09:30', '10:15', 3, 1, '2024-04-03 20:50:30.097', '2024-04-03 20:50:30.097');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orarend`
--

CREATE TABLE `orarend` (
  `id` int(11) NOT NULL,
  `nap` int(11) NOT NULL,
  `torolt` tinyint(1) NOT NULL DEFAULT 0,
  `ora_id` int(11) NOT NULL,
  `oktatas_id` int(11) DEFAULT NULL,
  `iskola_id` int(11) DEFAULT NULL,
  `osztaly_id` int(11) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `orarend`
--

INSERT INTO `orarend` (`id`, `nap`, `torolt`, `ora_id`, `oktatas_id`, `iskola_id`, `osztaly_id`, `createdAt`, `updatedAt`) VALUES
(24, 1, 0, 1, 1, 1, 1, '2024-04-04 22:37:40.624', '2024-04-04 22:37:40.624'),
(25, 2, 0, 1, 1, 1, 3, '2024-04-04 22:38:51.939', '2024-04-04 22:38:51.939'),
(26, 3, 0, 1, 1, 1, 4, '2024-04-04 22:39:03.474', '2024-04-04 22:39:03.474'),
(27, 4, 0, 1, 1, 1, 2, '2024-04-04 22:39:26.700', '2024-04-04 22:39:26.700'),
(28, 1, 0, 2, 1, 1, 4, '2024-04-04 22:41:43.830', '2024-04-04 22:41:43.830'),
(29, 1, 0, 3, 1, 1, 3, '2024-04-04 22:41:53.653', '2024-04-04 22:41:53.653'),
(30, 3, 0, 2, 1, 1, 3, '2024-04-04 22:42:07.093', '2024-04-04 22:42:07.093'),
(31, 5, 0, 2, 1, 1, 2, '2024-04-04 22:42:21.969', '2024-04-04 22:42:21.969'),
(32, 2, 0, 2, 1, 1, 3, '2024-04-04 22:44:55.800', '2024-04-04 22:44:55.800');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `osztaly`
--

CREATE TABLE `osztaly` (
  `id` int(11) NOT NULL,
  `azonosito` varchar(255) NOT NULL,
  `tanar_id` int(11) DEFAULT NULL,
  `iskola_id` int(11) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `osztaly`
--

INSERT INTO `osztaly` (`id`, `azonosito`, `tanar_id`, `iskola_id`, `createdAt`, `updatedAt`) VALUES
(1, '9/A', 1, 1, '2024-04-03 19:32:37.855', '2024-04-03 19:32:37.855'),
(2, '9/B', 2, 1, '2024-04-03 19:55:06.421', '2024-04-03 19:55:06.421'),
(3, '10/A', 3, 1, '2024-04-03 19:55:15.722', '2024-04-03 19:55:15.722'),
(4, '12/A', 5, 1, '2024-04-04 21:48:14.953', '2024-04-04 21:48:14.953');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tanar`
--

CREATE TABLE `tanar` (
  `id` int(11) NOT NULL,
  `felhasznalonev` varchar(255) NOT NULL,
  `felhasznalo_id` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `tanar`
--

INSERT INTO `tanar` (`id`, `felhasznalonev`, `felhasznalo_id`, `createdAt`, `updatedAt`) VALUES
(1, 'erzsike', 1, '2024-04-01 21:19:10.000', '2024-04-01 21:19:10.000'),
(2, 'lopiczi', 2, '2024-04-03 19:39:56.027', '2024-04-03 19:39:56.027'),
(3, 'lilla', 3, '2024-04-03 19:44:54.043', '2024-04-04 16:04:12.635'),
(4, 'miklosne', 10, '2024-04-03 20:58:16.592', '2024-04-03 20:58:16.592'),
(5, 'miklos', 11, '2024-04-03 20:59:47.549', '2024-04-03 20:59:47.549'),
(6, 'kovacs', 12, '2024-04-03 21:01:29.380', '2024-04-03 21:01:29.380');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tanora`
--

CREATE TABLE `tanora` (
  `id` int(11) NOT NULL,
  `orarend_id` int(11) DEFAULT NULL,
  `tema` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `tanora`
--

INSERT INTO `tanora` (`id`, `orarend_id`, `tema`, `createdAt`, `updatedAt`) VALUES
(14, 25, 'Nincs téma', '2024-04-04 22:38:56.678', '2024-04-04 22:46:44.979'),
(15, 26, 'valami', '2024-04-04 22:39:09.372', '2024-04-04 22:39:09.372'),
(16, 27, 'Nincs téma', '2024-04-04 22:39:30.865', '2024-04-04 22:39:30.865'),
(17, 24, 'valami', '2024-04-04 22:40:45.315', '2024-04-04 22:41:12.220'),
(18, 32, 'doga', '2024-04-04 22:45:04.512', '2024-04-04 22:46:47.319');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tantargy`
--

CREATE TABLE `tantargy` (
  `id` int(11) NOT NULL,
  `nev` varchar(255) NOT NULL,
  `iskola_id` int(11) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `tantargy`
--

INSERT INTO `tantargy` (`id`, `nev`, `iskola_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Matematika', 1, '2024-04-03 19:29:33.390', '2024-04-03 19:29:33.390'),
(2, 'Irodalom', 1, '2024-04-03 19:45:17.143', '2024-04-03 19:45:17.143'),
(3, 'Történelem', 1, '2024-04-03 19:45:25.802', '2024-04-03 19:45:25.802'),
(4, 'Angol nyelv', 1, '2024-04-03 19:45:29.975', '2024-04-03 20:00:59.549'),
(5, 'Informatika', 1, '2024-04-03 19:45:36.162', '2024-04-03 19:45:36.162'),
(6, 'Testnevelés', 1, '2024-04-03 19:45:44.436', '2024-04-03 19:45:44.436'),
(7, 'Kémia', 1, '2024-04-03 19:45:48.490', '2024-04-03 19:45:48.490'),
(8, 'Biológia', 1, '2024-04-03 19:45:55.968', '2024-04-03 19:45:55.968'),
(9, 'Munkavállalói alapismeretek', 1, '2024-04-03 19:46:08.780', '2024-04-03 19:46:08.780'),
(10, 'Webfejlesztés', 1, '2024-04-03 19:46:20.344', '2024-04-03 19:46:20.344'),
(11, 'Osztályközösség-építés', 1, '2024-04-03 21:12:13.403', '2024-04-03 21:12:13.403');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Admin_felhasznalo_id_key` (`felhasznalo_id`);

--
-- A tábla indexei `diak`
--
ALTER TABLE `diak`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Diak_om_azonosito_key` (`om_azonosito`),
  ADD UNIQUE KEY `Diak_felhasznalo_id_key` (`felhasznalo_id`),
  ADD KEY `Diak_osztaly_id_fkey` (`osztaly_id`);

--
-- A tábla indexei `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Felhasznalo_teljes_nev_key` (`teljes_nev`),
  ADD KEY `Felhasznalo_iskola_id_fkey` (`iskola_id`);

--
-- A tábla indexei `hianyzas`
--
ALTER TABLE `hianyzas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Hianyzas_diak_id_fkey` (`diak_id`),
  ADD KEY `Hianyzas_tanora_id_fkey` (`tanora_id`);

--
-- A tábla indexei `iskola`
--
ALTER TABLE `iskola`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Iskola_nev_key` (`nev`);

--
-- A tábla indexei `jegy`
--
ALTER TABLE `jegy`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Jegy_oktatas_id_fkey` (`oktatas_id`),
  ADD KEY `Jegy_diak_id_fkey` (`diak_id`);

--
-- A tábla indexei `oktatas`
--
ALTER TABLE `oktatas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Oktatas_tanar_id_fkey` (`tanar_id`),
  ADD KEY `Oktatas_tantargy_id_fkey` (`tantargy_id`);

--
-- A tábla indexei `ora`
--
ALTER TABLE `ora`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Ora_iskola_id_fkey` (`iskola_id`);

--
-- A tábla indexei `orarend`
--
ALTER TABLE `orarend`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Orarend_ora_id_fkey` (`ora_id`),
  ADD KEY `Orarend_oktatas_id_fkey` (`oktatas_id`),
  ADD KEY `Orarend_iskola_id_fkey` (`iskola_id`),
  ADD KEY `Orarend_osztaly_id_fkey` (`osztaly_id`);

--
-- A tábla indexei `osztaly`
--
ALTER TABLE `osztaly`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Osztaly_azonosito_key` (`azonosito`),
  ADD UNIQUE KEY `Osztaly_tanar_id_key` (`tanar_id`),
  ADD KEY `Osztaly_iskola_id_fkey` (`iskola_id`);

--
-- A tábla indexei `tanar`
--
ALTER TABLE `tanar`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Tanar_felhasznalo_id_key` (`felhasznalo_id`);

--
-- A tábla indexei `tanora`
--
ALTER TABLE `tanora`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Tanora_orarend_id_fkey` (`orarend_id`);

--
-- A tábla indexei `tantargy`
--
ALTER TABLE `tantargy`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Tantargy_nev_key` (`nev`),
  ADD KEY `Tantargy_iskola_id_fkey` (`iskola_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `diak`
--
ALTER TABLE `diak`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `felhasznalo`
--
ALTER TABLE `felhasznalo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT a táblához `hianyzas`
--
ALTER TABLE `hianyzas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT a táblához `iskola`
--
ALTER TABLE `iskola`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `jegy`
--
ALTER TABLE `jegy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT a táblához `oktatas`
--
ALTER TABLE `oktatas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT a táblához `ora`
--
ALTER TABLE `ora`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `orarend`
--
ALTER TABLE `orarend`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT a táblához `osztaly`
--
ALTER TABLE `osztaly`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `tanar`
--
ALTER TABLE `tanar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `tanora`
--
ALTER TABLE `tanora`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT a táblához `tantargy`
--
ALTER TABLE `tantargy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `Admin_felhasznalo_id_fkey` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalo` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `diak`
--
ALTER TABLE `diak`
  ADD CONSTRAINT `Diak_felhasznalo_id_fkey` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalo` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Diak_osztaly_id_fkey` FOREIGN KEY (`osztaly_id`) REFERENCES `osztaly` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Megkötések a táblához `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD CONSTRAINT `Felhasznalo_iskola_id_fkey` FOREIGN KEY (`iskola_id`) REFERENCES `iskola` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Megkötések a táblához `hianyzas`
--
ALTER TABLE `hianyzas`
  ADD CONSTRAINT `Hianyzas_diak_id_fkey` FOREIGN KEY (`diak_id`) REFERENCES `diak` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Hianyzas_tanora_id_fkey` FOREIGN KEY (`tanora_id`) REFERENCES `tanora` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `jegy`
--
ALTER TABLE `jegy`
  ADD CONSTRAINT `Jegy_diak_id_fkey` FOREIGN KEY (`diak_id`) REFERENCES `diak` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Jegy_oktatas_id_fkey` FOREIGN KEY (`oktatas_id`) REFERENCES `oktatas` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `oktatas`
--
ALTER TABLE `oktatas`
  ADD CONSTRAINT `Oktatas_tanar_id_fkey` FOREIGN KEY (`tanar_id`) REFERENCES `tanar` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Oktatas_tantargy_id_fkey` FOREIGN KEY (`tantargy_id`) REFERENCES `tantargy` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `ora`
--
ALTER TABLE `ora`
  ADD CONSTRAINT `Ora_iskola_id_fkey` FOREIGN KEY (`iskola_id`) REFERENCES `iskola` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Megkötések a táblához `orarend`
--
ALTER TABLE `orarend`
  ADD CONSTRAINT `Orarend_iskola_id_fkey` FOREIGN KEY (`iskola_id`) REFERENCES `iskola` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Orarend_oktatas_id_fkey` FOREIGN KEY (`oktatas_id`) REFERENCES `oktatas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Orarend_ora_id_fkey` FOREIGN KEY (`ora_id`) REFERENCES `ora` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Orarend_osztaly_id_fkey` FOREIGN KEY (`osztaly_id`) REFERENCES `osztaly` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Megkötések a táblához `osztaly`
--
ALTER TABLE `osztaly`
  ADD CONSTRAINT `Osztaly_iskola_id_fkey` FOREIGN KEY (`iskola_id`) REFERENCES `iskola` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Osztaly_tanar_id_fkey` FOREIGN KEY (`tanar_id`) REFERENCES `tanar` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Megkötések a táblához `tanar`
--
ALTER TABLE `tanar`
  ADD CONSTRAINT `Tanar_felhasznalo_id_fkey` FOREIGN KEY (`felhasznalo_id`) REFERENCES `felhasznalo` (`id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `tanora`
--
ALTER TABLE `tanora`
  ADD CONSTRAINT `Tanora_orarend_id_fkey` FOREIGN KEY (`orarend_id`) REFERENCES `orarend` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Megkötések a táblához `tantargy`
--
ALTER TABLE `tantargy`
  ADD CONSTRAINT `Tantargy_iskola_id_fkey` FOREIGN KEY (`iskola_id`) REFERENCES `iskola` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
