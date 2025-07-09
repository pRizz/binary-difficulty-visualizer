# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/7d631b94-ec17-45fa-bacd-79ed608623c5
**Git URL**: https://github.com/pRizz/binary-difficulty-visualizer

## Project Overview

This project is a Bitcoin Difficulty Visualizer and Converter. It provides tools to understand, visualize, and convert Bitcoin network difficulty and related values. The app is built with React and TypeScript, using Vite for development and Tailwind CSS for styling. UI components are powered by shadcn-ui.

### Key Features

- **Bitcoin Difficulty Converter**: Convert between Bitcoin difficulty, target, and bits. See `src/components/BitcoinDifficultyConverter.tsx` for the main logic and UI.
- **Reusable UI Components**: Modular UI elements (accordion, alert, button, card, chart, etc.) are located in `src/components/ui/` and can be reused throughout the app.
- **Utility Functions**: Bitcoin-specific calculations and helpers are in `src/lib/bitcoin-utils.ts` and `src/lib/utils.ts`.
- **Responsive Design**: Includes mobile-friendly hooks and layouts (see `src/hooks/use-mobile.tsx`).
- **Routing**: Main pages are in `src/pages/` (e.g., `Index.tsx` for the homepage, `NotFound.tsx` for 404s).

### File Structure

- `src/App.tsx` – Main React app entry point.
- `src/components/BitcoinDifficultyConverter.tsx` – Core component for difficulty conversion and visualization.
- `src/components/ui/` – Collection of reusable UI components.
- `src/lib/bitcoin-utils.ts` – Bitcoin difficulty/target/bits conversion logic.
- `src/pages/Index.tsx` – Main landing page.
- `src/pages/NotFound.tsx` – 404 page.

### Example Usage

To convert Bitcoin difficulty to target or bits, use the converter on the main page. The logic is handled in `BitcoinDifficultyConverter.tsx` and uses helpers from `bitcoin-utils.ts`.

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/7d631b94-ec17-45fa-bacd-79ed608623c5) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/7d631b94-ec17-45fa-bacd-79ed608623c5) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
