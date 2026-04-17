ALTER TABLE `payments` MODIFY COLUMN `provider` enum('tribute') NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `telegramUsername` varchar(100);