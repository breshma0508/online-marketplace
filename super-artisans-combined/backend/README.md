# Super Artisans - Backend (Final)

This backend includes:
- MongoDB Atlas ready
- Cloudinary support for images/certifications/id proofs
- Artisan model with location (lat/lng), videoUrl, social links, certifications, address, verifiedIdProof
- Government schemes API and seed data (ODOP, KVIC, MSME, PMV)
- Auth (JWT), Reviews, Contact form, Admin stats

## Quick start
1. Copy `.env.example` to `.env` and set `MONGO_URI`, `JWT_SECRET`, and Cloudinary keys if used.
2. Install dependencies: `npm install`
3. Create uploads folder: `mkdir uploads`
4. Seed sample data: `node scripts/seed.js`
5. Run: `npm run dev` or `node server.js`

## API highlights
- GET /api/artisans
- POST /api/artisans (auth + multipart/form-data)
- POST /api/auth/register, /api/auth/login
- GET /api/schemes
- GET /api/admin/stats

## Notes
- Images will be uploaded to Cloudinary if credentials are set; otherwise stored in `/uploads`.
- Location is GeoJSON Point: { type: 'Point', coordinates: [lng, lat] }
