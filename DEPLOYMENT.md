# Deploying for free

This app needs five pieces of infrastructure. All five have a free tier that's genuinely
free forever (no credit card trial that expires):

| Piece | Platform | Why this one |
|---|---|---|
| Frontend (React/Vite) | [Vercel](https://vercel.com) | Free forever, static hosting + CDN, zero-config for Vite |
| Backend (Express API + Socket.io + BullMQ worker) | [Render](https://render.com) | Free Web Services support WebSockets and long-running processes — most free Node hosts don't |
| Database | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) | Free M0 cluster, 512MB, forever |
| Redis (cache + job queue) | [Upstash](https://upstash.com) | Free forever, TLS URL works with this app's Redis clients out of the box |
| Avatar image storage | [Cloudinary](https://cloudinary.com) | Free 25GB — needed because Render's free tier wipes local disk on every restart |

**One thing to know going in:** Render's free tier puts your backend to sleep after ~15
minutes of no traffic. The first request after that takes 30–60 seconds to wake it back
up. That's normal for free hosting, not a bug — just don't be surprised by a slow first
load.

I can't create these accounts for you — sign-ups need your own action. Everything below
is written so each step is copy-paste simple.

---

## 1. MongoDB Atlas (database)

1. Sign up at [mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register).
2. Create a free **M0** cluster (any region close to you).
3. **Database Access** → add a database user (username + password — save these).
4. **Network Access** → add IP address → **Allow access from anywhere** (`0.0.0.0/0`).
   Render's free tier doesn't have static IPs, so this is the only option without a paid plan.
5. **Connect** → **Drivers** → copy the connection string. It looks like:
   `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/tourism?retryWrites=true&w=majority`
   Fill in your real username/password, and make sure a database name (`tourism`) is in the path.

This becomes `MONGO_URI`.

## 2. Upstash (Redis)

1. Sign up at [upstash.com](https://upstash.com).
2. Create a free **Redis** database (any region).
3. On the database page, copy the **TLS URL** — starts with `rediss://` (note the double `s`).

This becomes `REDIS_URL`.

## 3. Cloudinary (avatar uploads)

1. Sign up free at [cloudinary.com](https://cloudinary.com).
2. Your dashboard's **Product Environment Credentials** panel shows three values:
   `Cloud name`, `API Key`, `API Secret`.

These become `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.

## 4. Payments (optional — works without this)

`SSLCOMMERZ_STORE_ID` / `SSLCOMMERZ_STORE_PASSWORD` default to SSLCommerz's public sandbox
credentials (`testbox` / `qwerty`) if you leave them unset — checkout works end-to-end in
test mode with no signup. Real, live payments need a verified SSLCommerz merchant account;
skip this unless you actually intend to take real money.

## 5. Google Sign-In (optional — the button just won't render without it)

1. [Google Cloud Console](https://console.cloud.google.com/apis/credentials) → Create OAuth
   2.0 Client ID → type "Web application".
2. Under **Authorized JavaScript origins**, add your Vercel URL once you have it (step 8).
3. Copy the Client ID — it's used on **both** sides (`GOOGLE_CLIENT_ID` on the server,
   `VITE_GOOGLE_CLIENT_ID` on the client — same value, same ID).

## 6. Gemini API key (optional — trip planner returns a clear error without it)

Get a free key at [Google AI Studio](https://aistudio.google.com/apikey).

This becomes `GEMINI_API_KEY`. **Use a fresh key, not one you've used in client-side code
before** — a key that was ever bundled into a browser build is effectively public and
should be treated as burned.

---

## 7. Deploy the backend (Render)

This repo includes a `render.yaml` Blueprint, so Render can set up the service for you:

1. Push this repo to GitHub (already done if you're reading this from the repo).
2. In Render: **New** → **Blueprint** → connect the GitHub repo.
3. Render reads `render.yaml` and shows one service (`tourism-platform-api`) with empty
   fields for every secret. Fill them in:

   | Key | Value |
   |---|---|
   | `MONGO_URI` | from step 1 |
   | `JWT_SECRET` | any long random string — generate one with `openssl rand -base64 32` |
   | `FRONTEND_URL` | leave a placeholder like `http://localhost:5173` for now, you'll update it in step 9 |
   | `REDIS_URL` | from step 2 |
   | `SSLCOMMERZ_STORE_ID` / `SSLCOMMERZ_STORE_PASSWORD` | leave blank to use sandbox defaults |
   | `GOOGLE_CLIENT_ID` | from step 5, or leave blank |
   | `GEMINI_API_KEY` | from step 6, or leave blank |
   | `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | from step 3 |

4. Deploy. Once live, copy the service URL (`https://tourism-platform-api-xxxx.onrender.com`).

## 8. Deploy the frontend (Vercel)

1. In Vercel: **Add New** → **Project** → import the same GitHub repo.
2. **Root Directory**: set to `client` (Vercel auto-detects the Vite build settings from there).
3. Add environment variables:

   | Key | Value |
   |---|---|
   | `VITE_BACKEND_URL` | the Render URL from step 7 |
   | `VITE_OPENWEATHER_API_KEY` | your OpenWeatherMap key (free at openweathermap.org) |
   | `VITE_GOOGLE_CLIENT_ID` | from step 5, or leave blank |

4. Deploy. Copy the Vercel URL (`https://your-project.vercel.app`).

## 9. Wire the two together

Go back to Render → the backend service → Environment → update `FRONTEND_URL` to the real
Vercel URL from step 8, and save (this triggers a redeploy). This is what makes CORS and
the Socket.io connection work — the backend only accepts requests from this exact origin.

If you set up Google Sign-In, also go back to the Google Cloud Console OAuth client and
add the Vercel URL under **Authorized JavaScript origins**.

## 10. Seed the database

The app needs its destinations/shop/blog seed data and at least one admin account. From
your machine, with `server/.env`'s `MONGO_URI` pointed at the same Atlas cluster:

```bash
cd server
npm run seed
npm run promote:admin -- your-email@example.com
```

(Sign up for that account through the live site first, then run the promote command.)

## 11. Verify

- Visit the Vercel URL, sign up, log in.
- Browse destinations, add something to the cart, check out (sandbox payment).
- Open the admin panel and confirm the dashboard stats load.
- Open a blog post in two tabs and react/comment in one — confirm it appears live in the other (WebSocket check).
- Generate a trip plan and confirm it completes (background job + Redis check).

If something 404s or CORS-errors, it's almost always `FRONTEND_URL` on Render or
`VITE_BACKEND_URL` on Vercel pointing at the wrong place — those are the two most common
copy-paste mistakes.
