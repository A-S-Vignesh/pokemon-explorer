# 🎮 Pokémon Explorer  
*A modern, animated, lightning-fast Pokédex built with React, Vite, Zustand, GSAP & Tailwind CSS.*

---

## 🔗 Live Demo
👉 **https://thepokemonexplorer.vercel.app/**

Explore Pokémon by name, ID, type, and infinite scrolling.

---

## ✨ Features

### 🔍 Smart Search
- Search Pokémon by **name or ID**
- Live suggestions & instant navigation
- Works with keyboard and mouse

### 🌀 Advanced Type Filters
- Filter Pokémon by **types** (up to 2 at once)
- Efficient filtering with pagination
- Smooth animated interactions

### ♾️ Infinite Scroll
- Automatically loads Pokémon as you scroll
- Optimized fetching with minimal re-renders

### 🎨 Modern UI & Animations
- Smooth animations using **GSAP**
- Hover effects, floating particles, card transitions
- Clean, responsive, glass-style design

### 📘 Pokémon Details Page
Each Pokémon page includes:
- Official artwork
- Animated base stats
- Abilities (including hidden abilities)
- Moves list (partial + full)
- Height, weight, base experience
- Region badge (Kanto, Johto, Hoenn, etc.)
- Type-based theme colors

### ⚡ High Performance
- Built with **Vite**
- Global state handled using **Zustand**
- Fast routing with React Router

---

## 🛠 Tech Stack

| Category | Tools |
|--------|------|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Animations | GSAP + ScrollTrigger |
| State Management | Zustand |
| Routing | React Router |
| API | PokéAPI |
| Deployment | Vercel |

---

## 📸 Screenshots
*(Add screenshots here if needed)*

---

## 🚀 Installation & Setup

### 1️⃣ Clone the repository
git clone https://github.com/A-S-Vignesh/pokemon-explorer.git
cd pokemon-explorer


### 2️⃣ Install dependencies

```bash
npm install
```
### 3️⃣ Run development server
```bash
npm run dev
```
### 4️⃣ Build for production
```bash
npm run build
```
### 5️⃣ Preview production build
```bash
npm run preview
```
---

## 📁 Project Structure

```text
pokemon-explorer/
├── public/
│
├── screenshots/
│   ├── home.png
│   ├── details.png
│   └── filter.png
│
├── src/
│   ├── components/
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
├── vercel.json
├── package.json
└── README.md
```
---

## 🌟 Future Improvements
- Evolution chain visualization
- Favorites system
- Shiny Pokémon toggle
- Sorting by stats
- Pokémon comparison feature

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!  
Feel free to fork the repository and submit a pull request.

---

## 📜 License
This project is licensed under the **MIT License**.

---

## 💛 Credits
- Pokémon data from **PokeAPI.co**
- Pokémon © Nintendo / Game Freak / The Pokémon Company

---

## 👨‍💻 Developed by
**Vignesh A S**  
GitHub: https://github.com/A-S-Vignesh

---
