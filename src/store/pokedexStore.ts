// src/store/pokedexStore.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface PokemonSummary {
  name: string;
  url: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  sprites: any;
  types: any[];
  height: number;
  weight: number;
  stats: any[];
  moves: any[];
  base_experience?: number;
  abilities?: any[];
}

interface PokedexState {
  pokemonList: PokemonDetails[]; // UI list
  filteredPokemon: PokemonDetails[]; // when filtered
  selectedTypes: string[]; // max 2 types
  nextUrl: string | null;
  loading: boolean;
  isLoadingMore: boolean;
  filterIndex: number;

  // actions
  toggleType: (t: string) => Promise<void>;
  resetFilters: () => void;

  fetchInitialPage: () => Promise<void>;
  fetchNextPage: () => Promise<void>;
  fetchFilteredPokemons: () => Promise<void>;
}

const FIRST_URL = "https://pokeapi.co/api/v2/pokemon?limit=20";

export const usePokedexStore = create<PokedexState>()(
  devtools(
    (set, get) => ({
      pokemonList: [],
      filteredPokemon: [],
      selectedTypes: [],
      nextUrl: FIRST_URL,
      loading: false,
      isLoadingMore: false,
      filterIndex: 20,

      // -------------------------------------------------------------------
      // 🔥 Toggle Type (max 2 types) + auto-fetch filtered results
      // -------------------------------------------------------------------
      toggleType: (type) => {
        const s = get();

        let newTypes = s.selectedTypes.includes(type)
          ? s.selectedTypes.filter((t) => t !== type)
          : [...s.selectedTypes, type];

        if (newTypes.length > 2) return Promise.resolve(); // important

        set({ selectedTypes: newTypes });

        // If none selected → reset
        if (newTypes.length === 0) {
          set({
            filteredPokemon: [],
            pokemonList: [],
            nextUrl: FIRST_URL,
            filterIndex: 20,
          });

          return get().fetchInitialPage();
        }

        // Otherwise fetch filtered
        return get().fetchFilteredPokemons();
      },

      // -------------------------------------------------------------------
      // 🔥 Reset all filters
      // -------------------------------------------------------------------
      resetFilters: () => {
        set({
          selectedTypes: [],
          filteredPokemon: [],
          pokemonList: [], // clear UI immediately
          filterIndex: 20,
          nextUrl: FIRST_URL,
        });

        // fetch default first page again
        get().fetchInitialPage();
      },

      // -------------------------------------------------------------------
      // 🔥 Fetch first 20 Pokémon (default)
      // -------------------------------------------------------------------
      fetchInitialPage: async () => {
        set({ loading: true });
        try {
          const res = await fetch(FIRST_URL);
          const data = await res.json();

          const detailed = await Promise.all(
            data.results.map((p: PokemonSummary) =>
              fetch(p.url).then((r) => r.json())
            )
          );

          set({
            pokemonList: detailed,
            nextUrl: data.next || null,
          });
        } finally {
          set({ loading: false });
        }
      },

      // -------------------------------------------------------------------
      // 🔥 Fetch next page (infinite scroll)
      // -------------------------------------------------------------------
      fetchNextPage: async () => {
        const s = get();

        // If filtering → paginate from filteredPokemon
        if (s.selectedTypes.length > 0) {
          const start = s.filterIndex;
          const slice = s.filteredPokemon.slice(start, start + 20);

          if (slice.length === 0) return;

          set({ isLoadingMore: true });

          const details = await Promise.all(
            slice.map((p: any) => fetch(p.url).then((r) => r.json()))
          );

          set({
            pokemonList: [...s.pokemonList, ...details],
            filterIndex: start + 20,
          });

          set({ isLoadingMore: false });
          return;
        }

        // Not filtered → normal infinite scroll
        if (!s.nextUrl) return;

        set({ isLoadingMore: true });

        try {
          const res = await fetch(s.nextUrl);
          const data = await res.json();

          const detailed = await Promise.all(
            data.results.map((p: PokemonSummary) =>
              fetch(p.url).then((r) => r.json())
            )
          );

          set({
            pokemonList: [...s.pokemonList, ...detailed],
            nextUrl: data.next || null,
          });
        } finally {
          set({ isLoadingMore: false });
        }
      },

      // -------------------------------------------------------------------
      // 🔥 Fetch Pokémon by selected types (1 or 2 types)
      // -------------------------------------------------------------------
      fetchFilteredPokemons: async () => {
        const s = get();
        const types = s.selectedTypes;

        set({ loading: true });

        try {
          // 1️⃣ Fetch type lists
          const responses = await Promise.all(
            types.map((t) =>
              fetch(`https://pokeapi.co/api/v2/type/${t}`).then((r) => r.json())
            )
          );

          // 2️⃣ Extract URL list
          let list = responses[0].pokemon.map((p: any) => p.pokemon);

          // 3️⃣ If 2 types selected → intersect lists
          if (types.length === 2) {
            const names2 = new Set(
              responses[1].pokemon.map((p: any) => p.pokemon.name)
            );
            list = list.filter((p: any) => names2.has(p.name));
          }

          // ❗ STORE ONLY URL LIST NOW
          set({
            filteredPokemon: list, // only URLs (lightweight)
            pokemonList: [], // clear current UI
            filterIndex: 0, // reset pagination
          });

          // 4️⃣ Fetch ONLY first 20 detailed Pokémon
          const first20 = list.slice(0, 20);

          const details = await Promise.all(
            first20.map((p: any) => fetch(p.url).then((r) => r.json()))
          );

          // 5️⃣ Put first 20 into UI
          set({
            pokemonList: details,
            filterIndex: 20,
          });
        } finally {
          set({ loading: false });
        }
      },
    })
    // {
    //   name: "pokedex-store",
    //   partialize: (state) => ({
    //     selectedTypes: state.selectedTypes, // only persist filters
    //   }),
    // }
  )
);
