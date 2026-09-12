ALTER TABLE `analyses` ADD `unlocked` boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE `analyses` ADD `rerunsUsed` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `analyses` ADD `unlockedAt` timestamp;--> statement-breakpoint
ALTER TABLE `anonymous_analyses` ADD `unlocked` boolean DEFAULT false NOT NULL;