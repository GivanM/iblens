CREATE TABLE `revoked_sessions` (
	`tokenHash` varchar(64) NOT NULL,
	`expiresAt` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `revoked_sessions_tokenHash` PRIMARY KEY(`tokenHash`)
);
--> statement-breakpoint
ALTER TABLE `anonymous_analyses` ADD `freeClaim` varchar(8);--> statement-breakpoint
ALTER TABLE `anonymous_analyses` ADD CONSTRAINT `uniq_anon_free_claim` UNIQUE(`fingerprint`,`freeClaim`);