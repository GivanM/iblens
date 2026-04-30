ALTER TABLE `webhook_events` ADD `requestHeaders` text;--> statement-breakpoint
ALTER TABLE `webhook_events` ADD `errorMessage` text;--> statement-breakpoint
ALTER TABLE `webhook_events` ADD `computedSignature` varchar(255);