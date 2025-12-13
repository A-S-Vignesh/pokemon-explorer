🎮 Pokémon Explorer

A modern, animated, lightning-fast Pokédex built with React, Vite, Zustand, GSAP & Tailwind CSS.

<img width="100%" src="https://raw.githubusercontent.com/user/repo/main/banner.png" alt="Pokemon Explorer Banner"/>
🔗 Live Demo

👉 https://thepokemonexplorer.vercel.app/

Explore any Pokémon by name, ID, type filter, or scroll endlessly to discover more!

✨ Features
🔍 Smart Search

Search Pokémon by name or ID

Live suggestions (auto-complete)

Works with Enter key, click, and navigation

🌀 Advanced Filtering

Filter by Types (up to 2 types at once)

Real-time updating Pokémon list

Efficient lazy-loading for filtered results

♾️ Infinite Scrolling

Auto-load more Pokémon as you scroll

Fast + optimized Pokémon fetching

🎨 Modern UI With Animations

Fully animated using GSAP

Hover effects, card transitions, floating particles

Modern glass-morphism & gradient style

📘 Detailed Pokémon Pages

Each Pokémon page includes:

Official artwork

Stats with animated progress bars

Moves list (view 30 or all)

Abilities

Region badge (Kanto, Johto, Hoenn…)

Type chips with icons

Animated background, floating image

Height, weight, base XP, and more!

⚡ Ultra-Fast Performance

Built with Vite

Uses Zustand for global state management

Minimal re-renders → smooth UI

🛠️ Tech Stack
Category	Tools
Frontend Framework	React + Vite
Styling	Tailwind CSS
Animations	GSAP + ScrollTrigger
State Management	Zustand
Routing	React Router
API	PokéAPI
Deployment	Vercel
📸 Screenshots
🏠 Home Page

(Add your screenshot here)

🔍 Search & Filter

(Add screenshot)

📄 Pokémon Details Page

(Add screenshot)

🚀 Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/A-S-V/pokemon-explorer.git
cd pokemon-explorer

2️⃣ Install dependencies
npm install

3️⃣ Start the development server
npm run dev

4️⃣ Build for production
npm run build

5️⃣ Preview production build
npm run preview

📁 Project Structure
pokemon-explorer/
│
├── public/
├── src/
│   ├── components/
│   │   ├── PokemonCard.tsx
│   │   ├── FilterDropdown.tsx
│   │   ├── SearchDropdown.tsx
│   │   └── skeleton/
│   ├── pages/
│   │   ├── Home.tsx
│   │   └── PokemonDetails.tsx
│   ├── store/
│   │   └── pokedexStore.ts
│   ├── utils/
│   │   ├── typeGradients.ts
│   │   └── allPokemon.ts
│   ├── App.tsx
│   └── main.tsx
│
└── vercel.json

🔥 Deployment Notes (Important)

Because this is a SPA using React Router, you MUST include:

// vercel.json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}


This ensures direct page loads like:

/pokemon/lucario
/pokemon/pikachu


work properly on Vercel.

⭐ Future Enhancements

Evolution chain visualization

Favorites system (local storage or Zustand persist)

Shiny Pokémon toggle

Compare Pokémon stats

Sorting (by HP, Attack, Weight, Height, etc.)

🤝 Contributing

Pull Requests & Issues are always welcome!

📜 License

This project is open source and available under the MIT License.

💛 Acknowledgements

Pokémon data from PokeAPI.co

Pokémon © Nintendo / Game Freak / The Pokémon Company