CREATE TABLE `analyses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('essay','university') NOT NULL,
	`essayType` varchar(10),
	`subject` varchar(100),
	`researchQuestion` text,
	`predictedScore` int,
	`averageGrade` varchar(10),
	`fieldOfStudy` varchar(100),
	`resultJson` json,
	`predictedGrade` varchar(20),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `analyses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `tier` enum('free','pro') DEFAULT 'free' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `stripeCustomerId` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `stripeSubscriptionId` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `analysisCount` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `freeAnalysisLimit` int DEFAULT 1 NOT NULL;