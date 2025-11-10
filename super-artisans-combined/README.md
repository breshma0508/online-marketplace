# Super Artisans — Combined package

This archive was automatically prepared to help you run the frontend and backend with minimal changes.

## Structure
- `frontend/` — the frontend app (extracted from the uploaded frontend ZIP)
- `backend/` — the backend app (extracted from the uploaded backend ZIP)
- `.vscode/tasks.json` — VS Code tasks to install & run each app
- `super-artisans.code-workspace` — VS Code workspace referencing both folders

## Quick start (recommended: Visual Studio Code)
1. Open `super-artisans.code-workspace` in VS Code.
2. Open the Command Palette (Ctrl+Shift+P) → `Tasks: Run Task` → choose `Run: Install All` to install dependencies.
3. After install completes, run `Tasks: Run Task` → `Run: Start Both (terminals)` to start frontend & backend in two terminals.

## Quick start (terminal)
Open two terminals:
- Terminal 1:
```bash
cd frontend
npm install
npm start
```
- Terminal 2:
```bash
cd backend
npm install
npm start
```

## Important notes / possible adjustments you may need to make
1. **Environment variables / .env**: If the backend requires environment variables (database URL, API keys, JWT secrets), create a `.env` file in `backend/` with the appropriate values. I did not attempt to create secrets.
2. **Databases / external services**: If the backend expects a running database (e.g., MongoDB, PostgreSQL) or Redis, set those up locally and update config/connection strings.
3. **Ports**: If ports clash, update `frontend` or `backend` config (commonly in `package.json` scripts, `.env`, or config files).
4. **Node version**: Use Node LTS (>=16 typically) for best compatibility.
5. **If `npm start` fails**: check `package.json` in each folder to see the actual start script. If project uses `dev` or `serve`, run that instead.

If you'd like, I can:
- detect common `.env` keys and create a sample `.env.example`,
- add a `docker-compose.yml` for local DB + app (if you want),
- or inspect `package.json` files and adapt tasks to the actual start commands.

I made no source changes besides adding workspace/tasks/README.


## Added by assistant
- Merged `.env.example` generated at `backend/.env.example` (backup saved as `.env.example.orig` if present).
- Dockerfiles added for frontend and backend. A `docker-compose.yml` was added at project root to run frontend, backend, and MongoDB (if detected).

### Docker compose
To build and run locally:
```
docker-compose up --build
```
This will expose:
- frontend -> http://localhost:3000
- backend -> http://localhost:4000
- mongo (if present) -> mongodb://localhost:27017

If you prefer not to use Docker, use the VS Code tasks or run the install/start commands in each folder.

### PNPM & Docker updates
- Both Dockerfiles now use **pnpm** for installation and running.
- Use `make up` to build and start all containers, or `make down` to stop them.
- Backend `.env.example` has been replaced with a clean, ready template.
