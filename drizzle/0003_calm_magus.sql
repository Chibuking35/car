CREATE TABLE `password_reset_otps` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`otp` varchar(6) NOT NULL,
	`expires` datetime NOT NULL,
	CONSTRAINT `password_reset_otps_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `payment` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	CONSTRAINT `payment_id` PRIMARY KEY(`id`),
	CONSTRAINT `payment_email_unique` UNIQUE(`email`)
);
