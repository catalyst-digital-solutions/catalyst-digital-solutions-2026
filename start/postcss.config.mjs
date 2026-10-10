// Tailwind v4 is scoped to this app (start/). Declaring plugins here also stops
// PostCSS from walking up to the main site's config. Tailwind is only imported
// by the onboarding stylesheet, so the checkout pages are unaffected.
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
