CREATE TABLE `credit_ledger` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`delta` int NOT NULL,
	`reason` text NOT NULL,
	`orderId` varchar(36),
	`creditType` enum('essay','university') NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `credit_ledger_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` varchar(36) NOT NULL,
	`userId` int NOT NULL,
	`sku` enum('essay_single','essay_pack_5','essay_pack_10','university_single') NOT NULL,
	`amountUsd` int NOT NULL,
	`currency` varchar(10) NOT NULL DEFAULT 'usd',
	`status` enum('pending','processing','partial','paid','failed','expired','refunded') NOT NULL DEFAULT 'pending',
	`provider` enum('nowpayments','tribute') NOT NULL DEFAULT 'nowpayments',
	`npInvoiceId` varchar(255),
	`npPaymentId` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `webhook_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`provider` varchar(50) NOT NULL,
	`npPaymentId` varchar(255) NOT NULL,
	`paymentStatus` varchar(50) NOT NULL,
	`rawBody` text,
	`signatureValid` boolean NOT NULL DEFAULT false,
	`receivedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `webhook_events_id` PRIMARY KEY(`id`),
	CONSTRAINT `uniq_provider_payment_status` UNIQUE(`provider`,`npPaymentId`,`paymentStatus`)
);
--> statement-breakpoint
ALTER TABLE `payments` MODIFY COLUMN `provider` enum('tribute','nowpayments') NOT NULL;