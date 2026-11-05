# Prosperity Health Transport

A responsive React and Vite landing page for Prosperity Health Transport.

## Development

```sh
npm install
npm run dev
```

Run `npm run lint` and `npm run build` to validate the project.

## Project structure

- `src/components/common/` contains shared UI elements such as the brand, icons, stats, and form fields.
- `src/components/layout/` contains the site header, footer, and floating actions.
- `src/components/sections/` contains the independently composed landing-page sections.
- `src/components/forms/` contains the referral and contact form components.
- `src/data/` contains reusable page copy and contact details.

The forms are frontend previews and are not connected to a submission service. Connect them to an appropriately secured backend before collecting or sending patient information.
