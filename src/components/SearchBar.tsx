import { useState, useRef, useEffect } from "react";
import type { ChangeEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  Search,
  X,
  Sparkles,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { allPokemon } from "../utils/allPokemon";
import { useNavigate } from "react-router-dom";
import { popularPokemon } from "../utils/allPokemon";

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<
    { name: string; url: string }[]
  >([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<null | {
    name: string;
    url: string;
  }>(null);


  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Popular Pokémon for suggestions

  // GSAP Animations
  useGSAP(() => {
    // Initial animation
    gsap.fromTo(
      containerRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.2)" }
    );

    // Focus animation
    if (isFocused) {
      gsap.to(containerRef.current, {
        scale: 1.02,
        boxShadow: "0 20px 60px -15px rgba(245, 158, 11, 0.5)",
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(".search-icon", {
        scale: 1.2,
        duration: 0.2,
        ease: "back.out(1.7)",
      });
    } else {
      gsap.to(containerRef.current, {
        scale: 1,
        boxShadow: "0 10px 40px -5px rgba(245, 158, 11, 0.2)",
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(".search-icon", {
        scale: 1,
        duration: 0.2,
      });
    }
  }, [isFocused]);

  // Suggestions animation
  useGSAP(() => {
    if (showSuggestions && suggestionsRef.current) {
      gsap.fromTo(
        suggestionsRef.current,
        {
          opacity: 0,
          y: -10,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        ".suggestion-item",
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
        }
      );
    }
  }, [showSuggestions, suggestions]);

  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();

    if (term === "") {
      setSuggestions(popularPokemon);
      setSelectedSuggestion(null);
      return;
    }

    // Name matches
    let filtered = allPokemon.filter((p) =>
      p.name.toLowerCase().includes(term)
    );

    // Number match (1–1025)
    const num = parseInt(term);
    if (!isNaN(num) && num >= 1 && num <= 1025) {
      //ignore p is not declared problem
      const matchById = allPokemon.find((p, index) => index + 1 === num);
      if (matchById) filtered = [matchById, ...filtered];
    }

    setSuggestions(filtered.slice(0, 20));
  }, [searchTerm]);
  console.log("Selected suggession", selectedSuggestion);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim() || isSearching) return;
    navigate(`/pokemon/${searchTerm.toLowerCase()}`);
  };

  const resetSearch = async () => {
    setSearchTerm("");
    setSuggestions(popularPokemon);
    setSelectedSuggestion(null);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };
  const isExactPokemonName = (name: string) => {
    return allPokemon.some(
      (p) => p.name.toLowerCase() === name.trim().toLowerCase()
    );
  };

  return (
    <div className={`relative`}>
      {/* Main Search Container */}
      <div
        ref={containerRef}
        className="relative bg-linear-to-br from-white to-amber-50 rounded-2xl p-2 shadow-lg border border-amber-100"
      >
        <form onSubmit={handleSearch} className="relative">
          <div className="flex flex-col md:flex-row items-center">
            {/* Search Icon */}
            <div className="relative flex items-center">
              <div className="search-icon pl-4 pr-3">
                {isSearching ? (
                  <Loader2 className="w-5 h-5 text-amber-500 animate-spin" />
                ) : (
                  <Search className="w-5 h-5 text-amber-500" />
                )}
              </div>

              {/* Search Input */}
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                onFocus={() => {
                  setIsFocused(true);
                  setShowSuggestions(true);
                }}
                onBlur={() => {
                  setTimeout(() => setIsFocused(false), 200);
                  setTimeout(() => setShowSuggestions(false), 300);
                }}
                placeholder="Search Pokémon by name or ID..."
                className="flex-1 py-4 px-2 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-base md:text-lg capitalize"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={resetSearch}
                  className="p-2 mr-2 rounded-full hover:bg-amber-100 transition-colors"
                >
                  <X className="w-5 h-5 text-amber-500" />
                </button>
              )}
            </div>

            {/* Clear Button */}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={
                isSearching ||
                !searchTerm ||
                (!selectedSuggestion && !isExactPokemonName(searchTerm))
              }
              className="ml-2 px-6 py-3 bg-linear-to-r from-amber-500 to-yellow-400 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSearching ? "Searching..." : "Search"}
            </button>
          </div>
        </form>

        {/* Animated Border */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-amber-300/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-amber-100 overflow-hidden z-50"
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-semibold text-gray-600">
                  {searchTerm ? "Suggestions" : "Popular Pokémon"}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>

            <div className="space-y-1 max-h-60 overflow-y-auto">
              {suggestions.length === 0 ? (
                <div className="px-4 py-3 text-gray-400 italic">
                  No matches found
                </div>
              ) : (
                suggestions.map((suggestion, index) => (
                  <button
                    type="button"
                    key={suggestion.name + index}
                    className="suggestion-item w-full text-left px-4 py-3 rounded-lg hover:bg-amber-50 transition-colors flex items-center justify-between group"
                    // ⭐ IMPORTANT FIX HERE ⭐
                    onClick={() => {
                      setSearchTerm(suggestion.name);
                      setSelectedSuggestion(suggestion); // REQUIRED
                      setShowSuggestions(false); // close dropdown
                    }}
                  >
                    <span className="capitalize text-gray-700">
                      {suggestion.name} ({suggestion.url.split("/")[6]})
                    </span>

                    <ChevronDown className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transform rotate-90" />
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Gradient Bottom */}
          <div className="h-1 bg-linear-to-r from-amber-400 to-yellow-400" />
        </div>
      )}

      {/* Search Tips */}
      <div className="mt-4 text-sm text-gray-500 flex items-center justify-center gap-4">
        <div className="flex items-center gap-1">
          <span className="px-2 py-1 bg-amber-100 rounded">Tip</span>
          <span>Try searching by name or ID</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="px-2 py-1 bg-amber-100 rounded">Tip</span>
          <span>Click type icons to filter</span>
        </div>
      </div>

      {/* Particles Container */}
      <div
        id="particles-container"
        className="absolute inset-0 pointer-events-none z-10"
      />
    </div>
  );
};

export default SearchBar;
