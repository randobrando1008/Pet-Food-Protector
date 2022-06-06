CREATE TABLE `pet_information` (
  `pid` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `name` varchar(20) NOT NULL,
  `weight` float NOT NULL,
  `age` int NOT NULL,
  `gender` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`pid`),
  UNIQUE KEY `pid_UNIQUE` (`pid`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user_information` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
