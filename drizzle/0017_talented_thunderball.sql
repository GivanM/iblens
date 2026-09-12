ALTER TABLE `analyses` ADD `unlockOrderId` varchar(64);--> statement-breakpoint
ALTER TABLE `anonymous_analyses` ADD `unlockOrderId` varchar(64);--> statement-breakpoint
ALTER TABLE `orders` ADD `deviceCreditsGranted` int DEFAULT 0 NOT NULL;