CREATE TABLE `payment` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	CONSTRAINT `payment_id` PRIMARY KEY(`id`),
	CONSTRAINT `payment_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `role` varchar(50) DEFAULT 'user';