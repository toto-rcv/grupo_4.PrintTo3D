-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-01-2023 a las 23:14:26
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `printto3d_3000`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `description` varchar(256) DEFAULT NULL,
  `image` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `image`) VALUES
(0, 'Impresoras de filamento', 'Descripción 1', 'default.jpg'),
(1, 'Impresoras de resina', 'Descripción 2', 'default.jpg'),
(2, 'Insumos', 'Descripción 2', 'default.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `colors`
--

CREATE TABLE `colors` (
  `id` int(11) NOT NULL,
  `hexadecimal` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `colors`
--

INSERT INTO `colors` (`id`, `hexadecimal`) VALUES
(0, '#9600FF'),
(1, '#03CA00'),
(2, '#E8F300'),
(3, '#F30000'),
(4, '#000CFF'),
(5, '#00FFFF');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `short_description` varchar(256) DEFAULT NULL,
  `long_description` varchar(256) DEFAULT NULL,
  `image` varchar(256) DEFAULT NULL,
  `id_category` int(11) NOT NULL,
  `price` decimal(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `short_description`, `long_description`, `image`, `id_category`, `price`) VALUES
(0, 'Creality Ender-6 2', 'Descripción 2 corta', 'Descripción 2 larga', 'impresora1.jpg', 1, '62000.00'),
(1, 'Creality Ender 3 V2', 'Descripción 1 corta', 'Descripción 1 larga', 'impresora0.jpg', 1, '85000.00'),
(2, 'Creality Ender-6', 'Descripción 3 corta', 'Descripción 3 larga', 'impresora3.jpg', 2, '50000.00'),
(3, 'Creality CR-5 PRO', 'Descripción 4 corta', 'Descripción 4 larga', 'impresora4.jpg', 2, '42000.00'),
(4, 'Filamento Pla Silk', 'Descripción 5 corta', 'Descripción 5 larga', 'filamento1.jpg', 3, '4000.00'),
(5, 'Filamento 3D PLA', 'Descripción 6 corta', 'Descripción 6 larga', 'filamento2.jpg', 3, '4500.00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productscolors`
--

CREATE TABLE `productscolors` (
  `id` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `id_color` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productscolors`
--

INSERT INTO `productscolors` (`id`, `id_product`, `id_color`) VALUES
(1, 1, 2),
(2, 2, 0),
(3, 0, 1),
(4, 3, 4),
(5, 4, 1),
(6, 5, 5),
(7, 5, 3),
(9, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `apellido` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `id_level` int(11) NOT NULL,
  `image` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `apellido`, `email`, `password`, `id_level`, `image`) VALUES
(0, 'Ricardo Ariel', 'Martinez', 'ricardoarielmartinez@gmail.com', '$2a$10$rxus6gJG.rQR3.grIDvvZ.JsaoJUx/TscrHKD9M7lbNXfQZzeO/e6', 3, 'default-image.jpg'),
(1, 'Luis', 'Viloria', 'boaviloria@gmail.com', '$2a$10$H/jbubClw/WRJxbA70m8SeoH9Pi7YDy9l7uQXpFt3EuYdm30Nnm2W', 3, 'default-image.jpg'),
(2, 'Ryon', 'Ashington', 'rashington5@google.com.hk', 'vuxWYdInRnzm', 1, 'http://dummyimage.com/102x100.png/ff4444/ffffff');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productscolors`
--
ALTER TABLE `productscolors`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `productscolors`
--
ALTER TABLE `productscolors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
