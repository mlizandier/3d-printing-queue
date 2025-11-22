ALTER TABLE "api_key" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "api_key" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;