.PHONY: db.generate db.migrate start.dev db.attach

db.generate:
	bunx drizzle-kit generate

db.migrate:
	bunx drizzle-kit migrate

db.attach:
	docker compose exec db psql -U myuser -d mydb

start.dev:
	bun run dev

