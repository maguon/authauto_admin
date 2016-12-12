

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `admin_user`
-- ----------------------------
DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `admin_status` tinyint(1) NOT NULL DEFAULT '1',
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remark` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admin_username_uk` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=10000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
--  Table structure for `auto_brand`
-- ----------------------------
DROP TABLE IF EXISTS `auto_brand`;
CREATE TABLE `auto_brand` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `brand_cn` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `brand_en` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `producer_id` int(11) DEFAULT NULL,
  `image` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remark` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `updated_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
--  Table structure for `auto_info`
-- ----------------------------
DROP TABLE IF EXISTS `auto_info`;
CREATE TABLE `auto_info` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name_cn` varchar(40) NOT NULL,
  `name_en` varchar(80) NOT NULL,
  `brand_id` int(11) NOT NULL,
  `img` varchar(100) DEFAULT NULL,
  `remark` varchar(400) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `updated_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10000 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Table structure for `auto_info_extra`
-- ----------------------------
DROP TABLE IF EXISTS `auto_info_extra`;
CREATE TABLE `auto_info_extra` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `auto_id` bigint(11) NOT NULL,
  `year` int(11) DEFAULT NULL,
  `vol` decimal(5,2) DEFAULT NULL,
  `item` varchar(100) DEFAULT NULL,
  `type` tinyint(1) NOT NULL DEFAULT '1',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `updated_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10000 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Table structure for `auto_producer`
-- ----------------------------
DROP TABLE IF EXISTS `auto_producer`;
CREATE TABLE `auto_producer` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name_cn` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name_en` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remark` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
--  Table structure for `feedback`
-- ----------------------------
DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `content` varchar(800) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `operator` int(11) DEFAULT NULL,
  `type` tinyint(3) unsigned NOT NULL DEFAULT '1',
  `updated_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10000 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Table structure for `msg_history`
-- ----------------------------
DROP TABLE IF EXISTS `msg_history`;
CREATE TABLE `msg_history` (
  `id` bigint(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `device` varchar(100) DEFAULT NULL,
  `type` tinyint(1) unsigned NOT NULL,
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `updated_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10000  DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Table structure for `procure_info`
-- ----------------------------
DROP TABLE IF EXISTS `procure_info`;
CREATE TABLE `procure_info` (
  `id` bigint(11) unsigned NOT NULL AUTO_INCREMENT,
  `auto_id` int(11) NOT NULL,
  `name_cn` varchar(40) NOT NULL,
  `name_en` varchar(100) NOT NULL,
  `img` varchar(100) DEFAULT NULL COMMENT '车辆图片信息',
  `extra_id` int(11) DEFAULT NULL,
  `extra_year` int(11) DEFAULT NULL,
  `extra_type` tinyint(1) DEFAULT NULL,
  `extra_vol` decimal(5,2) DEFAULT NULL,
  `extra_item` varchar(100) DEFAULT NULL,
  `brand_id` int(11) NOT NULL,
  `brand_cn` varchar(40) NOT NULL,
  `brand_en` varchar(100) NOT NULL,
  `qty` int(11) DEFAULT NULL,
  `count` int(11) NOT NULL DEFAULT '0' COMMENT '收到报价量',
  `remark` varchar(100) DEFAULT NULL,
  `end` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `updated_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10000 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Table structure for `procure_offer`
-- ----------------------------
DROP TABLE IF EXISTS `procure_offer`;
CREATE TABLE `procure_offer` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `procure_id` bigint(11) NOT NULL,
  `supplier_id` bigint(11) NOT NULL,
  `user_id` bigint(11) DEFAULT NULL,
  `price` int(10) unsigned DEFAULT NULL,
  `qty` int(4) DEFAULT NULL,
  `status` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `updated_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10000 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Table structure for `supplier`
-- ----------------------------
DROP TABLE IF EXISTS `supplier`;
CREATE TABLE `supplier` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(11) DEFAULT '0',
  `contact` varchar(40) NOT NULL,
  `biz_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `fax` varchar(20) DEFAULT NULL,
  `zipcode` varchar(10) DEFAULT NULL,
  `state` varchar(10) DEFAULT NULL,
  `city` varchar(40) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `website` varchar(200) DEFAULT NULL,
  `remark` varchar(400) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `updated_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10000 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Table structure for `user_info`
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(40) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `gender` tinyint(4) NOT NULL DEFAULT '1',
  `first_name` varchar(40) DEFAULT NULL,
  `last_name` varchar(40) DEFAULT NULL,
  `type` tinyint(1) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `last_login_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10000 DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
