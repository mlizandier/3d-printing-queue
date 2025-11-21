.PHONY: generate migrate start.dev

generate:
	bunx drizzle-kit generate

migrate:
	bunx drizzle-kit migrate

start.dev:
	bun run dev