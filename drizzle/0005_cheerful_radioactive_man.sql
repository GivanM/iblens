ALTER TABLE `payments` MODIFY COLUMN `provider` enum('coingate') NOT NULL;--> statement-breakpoint
ALTER TABLE `payments` ADD `callbackToken` varchar(255);