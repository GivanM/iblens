CREATE TABLE `credit_lots` (
	`id` int AUTO_INCREMENT NOT NULL,
	`lotKey` varchar(64) NOT NULL,
	`place` enum('account','device') NOT NULL,
	`userId` int,
	`fingerprint` varchar(64),
	`granted` int NOT NULL,
	`remaining` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `credit_lots_id` PRIMARY KEY(`id`),
	CONSTRAINT `uniq_credit_lot_key` UNIQUE(`lotKey`)
);
