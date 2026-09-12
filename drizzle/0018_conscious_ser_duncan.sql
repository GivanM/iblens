ALTER TABLE `device_credits` ADD `claimedAmount` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `device_credits` ADD `claimedByUserId` int;