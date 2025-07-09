# Bitcoin Difficulty Visualizer

A powerful, free and open source web application for understanding and converting Bitcoin mining difficulty values. Built for developers, miners, and Bitcoin enthusiasts who want to explore the mathematical relationships behind Bitcoin's proof-of-work algorithm.

🔗 **Live App**: https://lovable.dev/projects/7d631b94-ec17-45fa-bacd-79ed608623c5  
📂 **Source Code**: https://github.com/pRizz/binary-difficulty-visualizer

## 🚀 What This App Does

This interactive tool helps you understand the critical relationship between Bitcoin's mining difficulty and the binary representation of valid block hashes. It provides real-time, bidirectional conversion between different ways of expressing mining difficulty.

### ✨ Key Features

#### 🔄 **Bidirectional Difficulty Conversion**
- Convert from difficulty values to required leading binary zeroes
- Convert from leading zeroes back to difficulty values
- Support for multiple difficulty units (T, P, E, Z, Y)
- Real-time synchronization between all representations

#### 🎯 **Target Hash Visualization**
- View target hash threshold in **hexadecimal**, **decimal**, and **binary** formats
- Binary representation with 8-bit spacing for readability
- Automatic counting of leading zeroes in target hash
- Clear explanation of how target values are calculated

#### 📊 **Probability & Statistics**
- Calculate exact probability of finding a valid hash (1 in 2^n)
- Display human-readable probability formats (millions, billions, etc.)
- Show log₂ difficulty for mathematical analysis
- Visualize zeroes ratio as percentage of 256-bit hash space

#### 🧮 **Advanced Calculations**
- Implements authentic Bitcoin difficulty algorithm
- Uses nBits to target conversion (0x1d00ffff genesis target)
- Handles large numbers with precision (up to 256-bit integers)
- Error handling for edge cases and invalid inputs

#### 🎨 **Beautiful, Responsive Design**
- Modern gradient-based crypto-inspired theme
- Mobile-friendly responsive layout
- Dark/light mode support through design system
- Smooth animations and transitions

## 🎓 Educational Value

Perfect for:
- **Blockchain Developers**: Understanding proof-of-work mechanics
- **Mining Engineers**: Calculating hash rate requirements
- **Bitcoin Researchers**: Analyzing difficulty adjustment algorithms
- **Crypto Educators**: Teaching Bitcoin's security model
- **Students**: Learning about cryptographic hash functions

## 🛠 Technical Implementation

### Architecture
- **Frontend**: React 18 + TypeScript for type safety
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom crypto design tokens
- **UI Components**: shadcn/ui for consistent, accessible components
- **State Management**: React hooks with bidirectional data flow
- **Utilities**: Custom Bitcoin calculation library

### Key Components
- `BitcoinDifficultyConverter.tsx` - Main interactive converter interface
- `bitcoin-utils.ts` - Core Bitcoin difficulty calculation algorithms
- `ui/` components - Reusable, themed UI elements
- Custom design system with crypto-specific color palette

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
