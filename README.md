# jmuking.dev

This site now runs on Vite and uses MUI Material for the main application shell and shared UI components.

## Scripts

- `npm start` or `npm run dev`: start the Vite dev server
- `npm run build`: create a production build in `build/`
- `npm run preview`: preview the production build locally
- `npm test`: run the Vitest suite

## Environment Variables

This app now reads client-safe values from a Netlify Function at
`/.netlify/functions/client-env`.

Current app variables:

- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`
- `EMAILJS_USER_ID`
- `PENGUIN_LIVESTREAM_ID`

Set these in Netlify site environment variables.

For local development with env values, run with `netlify dev` so the function can
read your local `.env.local` values.
