ALTER TABLE `anonymous_analyses` ADD `unlockedAt` timestamp;--> statement-breakpoint
ALTER TABLE `anonymous_analyses` ADD `rerunsUsed` int DEFAULT 0 NOT NULL;