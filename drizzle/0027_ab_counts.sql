CREATE TABLE `ab_counts` (
	`test` varchar(32) NOT NULL,
	`variant` int NOT NULL,
	`event` varchar(16) NOT NULL,
	`day` date NOT NULL,
	`n` int NOT NULL DEFAULT 0,
	CONSTRAINT `ab_counts_pk` PRIMARY KEY(`test`,`variant`,`event`,`day`)
);
