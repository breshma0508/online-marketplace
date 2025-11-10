# Simple Makefile for Super Artisans
up:
	docker-compose up --build

down:
	docker-compose down

logs:
	docker-compose logs -f

restart:
	make down && make up

frontend:
	cd frontend && pnpm dev

backend:
	cd backend && pnpm dev
