CREATE TABLE `verification_tokens` (
	`token` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `verification_tokens_token` PRIMARY KEY(`token`)
);
--> statement-breakpoint
DROP TABLE `payment`;--> statement-breakpoint
ALTER TABLE `users` ADD `email_verified` datetime;