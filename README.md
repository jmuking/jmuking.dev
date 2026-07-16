# jmuking.dev

This site now runs on Vite and uses MUI Material for the main application shell and shared UI components.

## Scripts

- `npm start` or `npm run dev`: start the Vite dev server
- `npm run build`: create a production build in `build/`
- `npm run preview`: preview the production build locally
- `npm test`: run the Vitest suite

## Environment Variables

Vite only exposes client-side variables prefixed with `VITE_`.

Current app variables:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_USER_ID`
- `VITE_PENGUIN_LIVESTREAM_ID`

Store them in `.env.local` for local development.
