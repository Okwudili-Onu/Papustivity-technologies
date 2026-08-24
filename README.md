# Papustivity Technologies Website

Static HTML/CSS/JavaScript website for Papustivity Technologies.

## Files

- `index.html` — Home
- `about.html` — About
- `solutions.html` — Solutions
- `contact.html` — Contact
- `css/style.css` — Complete styling
- `js/main.js` — Mobile navigation, active navigation state, year, and Formspree AJAX submission
- `images/papustivity-logo.png` — Approved Papustivity logo

## Deploy to GitHub + Vercel

1. Create a new GitHub repository.
2. Upload all files while preserving the folder structure.
3. In Vercel, choose **Add New Project** and import the GitHub repository.
4. Framework preset: **Other** (or leave Vercel's static detection).
5. Build command: leave empty.
6. Output directory: leave empty / root.
7. Deploy.

The site is intentionally dependency-free and does not require npm, a build command, or a server.

## Contact Form

The contact form is configured to submit via POST to:

https://formspree.io/f/mzepldge

The form includes named fields and JavaScript AJAX handling for success/error feedback.
