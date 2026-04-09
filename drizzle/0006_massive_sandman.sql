ALTER TABLE `payments` MODIFY COLUMN `provider` enum('plisio') NOT NULL;--> statement-breakpoint
ALTER TABLE `payments` DROP COLUMN `callbackToken`;