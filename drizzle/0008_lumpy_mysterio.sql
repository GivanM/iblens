CREATE TABLE `anonymous_analyses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fingerprint` varchar(64) NOT NULL,
	`type` enum('essay','university') NOT NULL,
	`essayType` varchar(10),
	`subject` varchar(100),
	`researchQuestion` text,
	`resultJson` json,
	`predictedGrade` varchar(20),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `anonymous_analyses_id` PRIMARY KEY(`id`)
);
