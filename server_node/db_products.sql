-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 04, 2024 at 03:35 PM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 7.0.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_products`
--

-- --------------------------------------------------------

--
-- Table structure for table `db_order`
--

CREATE TABLE `db_order` (
  `order_id` int(11) NOT NULL,
  `order_code` varchar(100) NOT NULL,
  `order_price` float NOT NULL,
  `order_count` int(11) NOT NULL,
  `order_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `order_status` int(11) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `db_order`
--

INSERT INTO `db_order` (`order_id`, `order_code`, `order_price`, `order_count`, `order_date`, `order_status`, `user_id`) VALUES
(1, 'TK17278892810861', 1000, 2, '2024-10-03 00:14:41', 0, 3),
(2, 'TK17279810024241', 80, 3, '2024-10-04 01:43:36', 0, 1),
(3, 'TK17279813543951', 80, 3, '2024-10-04 01:49:14', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `db_order_item`
--

CREATE TABLE `db_order_item` (
  `order_item_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_price` float NOT NULL,
  `product_count` int(11) NOT NULL,
  `product_price_total` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `db_order_item`
--

INSERT INTO `db_order_item` (`order_item_id`, `order_id`, `product_id`, `product_price`, `product_count`, `product_price_total`) VALUES
(1, 1, 1, 10, 50, 500),
(2, 1, 2, 10, 50, 500),
(3, 2, 1, 10, 2, 20),
(4, 2, 2, 10, 1, 10),
(5, 2, 5, 50, 1, 50),
(6, 3, 1, 10, 2, 20),
(7, 3, 2, 10, 1, 10),
(8, 3, 5, 50, 1, 50);

-- --------------------------------------------------------

--
-- Table structure for table `db_product`
--

CREATE TABLE `db_product` (
  `product_id` int(11) NOT NULL,
  `product_code` varchar(50) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_detail` text,
  `product_price` float NOT NULL DEFAULT '0',
  `product_type` int(11) NOT NULL,
  `product_img` varchar(100) NOT NULL,
  `product_status` int(1) NOT NULL DEFAULT '0',
  `product_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `product_created_by` int(11) NOT NULL,
  `product_updated` datetime DEFAULT NULL,
  `product_updated_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `db_product`
--

INSERT INTO `db_product` (`product_id`, `product_code`, `product_name`, `product_detail`, `product_price`, `product_type`, `product_img`, `product_status`, `product_created`, `product_created_by`, `product_updated`, `product_updated_by`) VALUES
(1, '1111111111', 'มาม่ารสตำยำกุ้ง', 'มาม่ารสต้มยำกุ้ง*1', 10, 1, 'product_img_2AEaptWF.jpg', 0, '2024-10-02 22:52:22', 3, '2024-10-04 01:04:23', 1),
(2, '2222222222', 'มาม่ารสหมูสับ', 'มาม่ารสหมูสับ*1', 10, 1, 'product_img_RyOqK7Vs.jpg', 0, '2024-10-02 22:54:34', 3, '2024-10-03 23:34:57', 1),
(3, '3333333333', 'มาม่ารสผัดขี้เมาทะเล', 'มาม่ารสผัดขี้เมาทะเล*1', 10, 1, 'product_img_YwTzLMyG.jpg', 0, '2024-10-03 00:40:46', 3, '2024-10-03 23:35:06', 1),
(4, '4444444444', 'มาม่ารสหม้อไฟทะเล', 'มาม่ารสหม้อไฟทะเล*1', 10, 1, 'product_img_RSEwmPlJ.jpg', 1, '2024-10-03 00:46:11', 3, '2024-10-03 22:09:32', 1),
(5, '5555555555', 'เบียร์ช้าง', 'เบียร์ช้างคลาสสิก', 50, 2, 'product_img_C1UUwMf6.jpg', 0, '2024-10-03 22:06:57', 1, '2024-10-03 23:35:17', 1),
(6, '6666666666', 'เบียร์ลีโอ', 'เบียร์ลีโอ ซ่าๆ', 50, 2, 'product_img_zNpB8Uko.jpg', 0, '2024-10-03 22:12:56', 1, '2024-10-03 23:35:30', 1),
(7, '7777777777', 'เบียร์สิงห์', 'เบียร์สิงห์ นุ่มๆ', 50, 2, 'product_img_rhnaVgih.jpg', 0, '2024-10-03 22:14:25', 1, '2024-10-03 23:35:39', 1);

-- --------------------------------------------------------

--
-- Table structure for table `db_product_type`
--

CREATE TABLE `db_product_type` (
  `product_type_id` int(11) NOT NULL,
  `product_type_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `db_product_type`
--

INSERT INTO `db_product_type` (`product_type_id`, `product_type_name`) VALUES
(1, 'อาหารสำเร็จรูป'),
(2, 'เครื่องดื่ม'),
(3, 'เครื่องใช้ไฟฟ้า'),
(4, 'เครื่องสำอาง'),
(5, 'เครื่องแต่งกาย');

-- --------------------------------------------------------

--
-- Table structure for table `db_user`
--

CREATE TABLE `db_user` (
  `user_id` int(11) NOT NULL COMMENT 'ไอดี',
  `user_type` int(1) NOT NULL DEFAULT '2' COMMENT 'ประเภทผู้ใช้งาน',
  `user_firstname` varchar(100) NOT NULL COMMENT 'ชื่อ',
  `user_lastname` varchar(100) NOT NULL COMMENT 'นามสกุล',
  `user_username` varchar(255) NOT NULL COMMENT 'ชื่อผู้ใช้งาน',
  `user_password` varchar(100) NOT NULL COMMENT 'รหัสผ่าน',
  `user_status` int(1) NOT NULL DEFAULT '0' COMMENT '0=เปิด,1=ปิด',
  `user_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'วันที่สร้าง',
  `user_updated` datetime DEFAULT NULL COMMENT 'วันที่แก้ไข',
  `user_last_login` datetime DEFAULT NULL COMMENT 'วันที่เข้าใช้งานล่าสุด'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `db_user`
--

INSERT INTO `db_user` (`user_id`, `user_type`, `user_firstname`, `user_lastname`, `user_username`, `user_password`, `user_status`, `user_created`, `user_updated`, `user_last_login`) VALUES
(1, 1, 'พัชรพล', 'ช่างจัด', 'kendo_hug15@hotmail.com', '1234567890', 0, '2024-10-02 00:00:00', NULL, '2024-10-04 14:13:24'),
(2, 2, 'aaa', 'aaa', 'aaa', 'aaa', 0, '2024-10-02 00:00:00', NULL, NULL),
(3, 2, 'bb', 'b', 'bb', 'bbb', 0, '2024-10-02 19:51:29', NULL, '2024-10-03 02:02:55'),
(4, 2, 'test', 'test', 'test@gmail.com', '1234', 0, '2024-10-03 01:53:35', NULL, NULL),
(5, 2, 'test', 'test', 'test2@hotmail.com', '1234', 0, '2024-10-03 01:59:08', NULL, '2024-10-03 13:22:20');

-- --------------------------------------------------------

--
-- Table structure for table `db_user_type`
--

CREATE TABLE `db_user_type` (
  `user_type_id` int(11) NOT NULL,
  `user_type_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `db_user_type`
--

INSERT INTO `db_user_type` (`user_type_id`, `user_type_name`) VALUES
(1, 'ผู้ดูแลระบบ'),
(2, 'ผู้ใช้งานทั่วไป');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `db_order`
--
ALTER TABLE `db_order`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `db_order_item`
--
ALTER TABLE `db_order_item`
  ADD PRIMARY KEY (`order_item_id`);

--
-- Indexes for table `db_product`
--
ALTER TABLE `db_product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `db_product_type`
--
ALTER TABLE `db_product_type`
  ADD PRIMARY KEY (`product_type_id`);

--
-- Indexes for table `db_user`
--
ALTER TABLE `db_user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `db_user_type`
--
ALTER TABLE `db_user_type`
  ADD PRIMARY KEY (`user_type_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `db_order`
--
ALTER TABLE `db_order`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `db_order_item`
--
ALTER TABLE `db_order_item`
  MODIFY `order_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `db_product`
--
ALTER TABLE `db_product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `db_product_type`
--
ALTER TABLE `db_product_type`
  MODIFY `product_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `db_user`
--
ALTER TABLE `db_user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ไอดี', AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `db_user_type`
--
ALTER TABLE `db_user_type`
  MODIFY `user_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
