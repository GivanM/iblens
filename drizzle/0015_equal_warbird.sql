CREATE TABLE `device_credits` (
	`fingerprint` varchar(64) NOT NULL,
	`credits` int NOT NULL DEFAULT 0,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `device_credits_fingerprint` PRIMARY KEY(`fingerprint`)
);
