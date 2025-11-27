3D Model Project — Minimal Monochrome Site

Overview
- A clean, minimal black-and-white website for showcasing and submitting 3D models.
- Pages included: `index.html`, `submit.html`, `thankyou.html`, `about.html`, `contact.html`.
- Styling in `styles.css` uses CSS variables for easy customization.

Customization
- Change site text: edit the HTML files (`index.html`, `about.html`, etc.).
- Replace images: in `index.html` gallery cards, swap placeholder `src` values with your images.
- Change prices: edit the `.price` text inside each card (displayed in GEL, e.g. `₾ 1200`).
- Layout and style: update variables at the top of `styles.css` (colors, fonts, spacing).

Form submission (send to your email)
Option A — Use Formspree (no server required)
1. Sign up at https://formspree.io and create a form endpoint.
2. In `submit.html` and `contact.html`, replace the `<form action="/submit" ...>` attribute with your Formspree URL, e.g. `action="https://formspree.io/f/{your-id}"`.
3. Keep `method="post"` and `enctype="multipart/form-data"` so that attachments are submitted.
4. Configure emails in Formspree dashboard. Note: attachments may require a paid plan.

Option B — Self-hosted Node server (sends email using SMTP)
- A simple Node example is provided as `server.js`. It accepts multipart uploads and forwards the form contents and attachments to a configured recipient email via SMTP.

Quick start (Node server)
1. Install Node.js (v16+ recommended).
2. From this folder run:

```powershell
npm install
node server.js
```

3. Configure environment variables (create a `.env` file) with the following:

```
PORT=3000
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
RECIPIENT=you@example.com
```

4. Open `http://localhost:3000` and use the forms. The server will redirect to `thankyou.html` after successful submit.

Files
- `index.html` — Home / gallery
- `submit.html` — Submission form (message + up to 3 images)
- `thankyou.html` — Confirmation page
- `about.html`, `contact.html` — informational pages
- `styles.css` — global styles
- `server.js` — example Node Express email endpoint
- `package.json` — dependencies for the example server

Notes & Privacy
- If you use the self-hosted server, store SMTP credentials safely and enable TLS where possible.
- Uploaded files are handled by the server temporarily; the example stores them in memory/temporary files and attaches them to the outgoing email. For production, use a more robust storage policy.

If you want, I can:
- Replace placeholder images with your provided images.
- Configure a hosted Formspree endpoint for you (requires your email and Formspree account).
- Help deploy the Node server to a platform (Heroku, Fly, Render, Railway, Vercel serverless, etc.).
