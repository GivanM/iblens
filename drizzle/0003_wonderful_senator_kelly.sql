CREATE TABLE `payments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`productType` enum('essay_single','essay_pack_5','essay_pack_10','university_single') NOT NULL,
	`creditsGranted` int NOT NULL,
	`amount` int NOT NULL,
	`currency` varchar(10) NOT NULL DEFAULT 'usd',
	`provider` enum('stripe','lemonsqueezy','nowpayments') NOT NULL,
	`providerPaymentId` varchar(255),
	`status` enum('pending','completed','failed','expired') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	CONSTRAINT `payments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `freeEssayUsed` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `essayCredits` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `universityCredits` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `tier`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `stripeCustomerId`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `stripeSubscriptionId`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `lsCustomerId`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `lsSubscriptionId`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `analysisCount`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `freeAnalysisLimit`;