CREATE TYPE "public"."status" AS ENUM('pending', 'rejected', 'in_progress', 'done');--> statement-breakpoint
ALTER TABLE "print" ADD COLUMN "status" "status";