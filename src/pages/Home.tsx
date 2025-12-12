import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PokemonCard from "../components/PokemonCard";
import {
  Sparkles,
  Zap,
  Flame,
  Droplets,
  Leaf,
  ChevronDown,
  Search,
  Filter,
} from "lucide-react";
import FilterDropdown from "../components/FilterDropdown";
import SearchDropdown from "../components/SearchDropdown";
import PokemonCardSkeleton from "../components/skeleton/PokemonCardSkeleton";
import { usePokedexStore } from "../store/pokedexStore";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Home() {
  const pokemonList = usePokedexStore((s) => s.pokemonList);
  const loading = usePokedexStore((s) => s.loading);
  const selectedTypes = usePokedexStore((s) => s.selectedTypes);
  const isLoadingMore = usePokedexStore((s) => s.isLoadingMore);

  const fetchInitialPage = usePokedexStore((s) => s.fetchInitialPage);
  const fetchNextPage = usePokedexStore((s) => s.fetchNextPage);

  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useGSAP(() => {
    // Hero animation
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      ".hero-element",
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        delay: 0.3,
      }
    );

    // Floating particles
    gsap.to(".floating-particle", {
      y: "-=20",
      x: "+=10",
      rotation: "+=5",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.1,
    });

    // Card animations on scroll
    gsap.fromTo(
      ".pokemon-card",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  // const fetchPokemons = async () => {
  //   setIsLoadingMore(true);
  //   const res = await fetch(nextUrl);
  //   const data: PokemonAPIResponse = await res.json();

  //   const detailedResults = await Promise.all(
  //     data.results.map(async (p) => {
  //       const details = await fetch(p.url).then((r) => r.json());
  //       return details;
  //     })
  //   );

  //   setPokemonList((prev) => [...prev, ...detailedResults]);
  //   if (data.next) setNextUrl(data.next);
  //   setIsLoadingMore(false);

  //   // Animate new cards
  //   gsap.fromTo(
  //     ".pokemon-card:nth-last-child(-n+" + detailedResults.length + ")",
  //     { y: 30, opacity: 0 },
  //     {
  //       y: 0,
  //       opacity: 1,
  //       duration: 0.6,
  //       stagger: 0.05,
  //     }
  //   );
  // };

  // useEffect(() => {
  //   // load summaries once (for search suggestions)

  //   // initial paged load
  //   if (pokemonList.length === 0) fetchInitialPage();

  //   // infinite scroll
  //   const onScroll = () => {
  //     const nearBottom =
  //       window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
  //     if (nearBottom) fetchNextPage();
  //   };
  //   window.addEventListener("scroll", onScroll);
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);
  useEffect(() => {
    // Always fetch first page if no data OR data came from storage but is incomplete
    if (pokemonList.length === 0) {
      fetchInitialPage();
    } else {
      // force set loading false to avoid stuck skeleton
      usePokedexStore.setState({ loading: false });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const bottom = document.body.offsetHeight - 200;

      if (scrollPosition >= bottom && !isLoadingMore) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoadingMore, fetchNextPage]);

  const scrollToTop = () => {
    gsap.to(window, { duration: 1, scrollTo: 0, ease: "power2.inOut" });
  };

  const typeIcons = [
    { type: "electric", icon: <Zap className="w-4 h-4" /> },
    { type: "fire", icon: <Flame className="w-4 h-4" /> },
    { type: "water", icon: <Droplets className="w-4 h-4" /> },
    { type: "grass", icon: <Leaf className="w-4 h-4" /> },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-linear-to-b from-amber-50 via-white to-yellow-50"
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="floating-particle absolute w-3 h-3 bg-yellow-300 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-yellow-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="hero-element relative">
                <div className="w-10 h-10 rotate-45 flex items-center justify-center">
                  <img src="/images/logo/logo.png" alt="logo" />
                </div>
                {/* <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div> */}
              </div>
              <h1
                ref={titleRef}
                className="md:text-3xl text-xl font-bold bg-linear-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent"
              >
                Pokémon Explorer
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => {
                    setShowSearch(true);
                    setShowFilter(false);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-linear-to-r from-amber-500 to-yellow-400 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
                <SearchDropdown
                  isOpen={showSearch}
                  onClose={() => setShowSearch(false)}
                />
              </div>

              <div className="relative">
                <button
                  onClick={() => {
                    setShowFilter(true);
                    setShowSearch(false);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-linear-to-r from-yellow-400 to-amber-300 text-amber-900 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>

                {/* 🔥 FILTER COUNT BADGE */}
                {selectedTypes.length > 0 && (
                  <span
                    className="
                      absolute -top-2 -right-2 
                      bg-red-500 text-white 
                      text-xs font-bold 
                      w-6 h-6 rounded-full 
                      flex items-center justify-center 
                      shadow-lg animate-pulse
                    "
                  >
                    {selectedTypes.length}
                  </span>
                )}

                <FilterDropdown
                  isOpen={showFilter}
                  onClose={() => setShowFilter(false)}
                />
              </div>
            </div>

            {/* Overlay for mobile */}
            {(showSearch || showFilter) && (
              <div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                onClick={() => {
                  setShowSearch(false);
                  setShowFilter(false);
                }}
              />
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
              <span className="bg-linear-to-r from-amber-600 via-yellow-500 to-amber-400 bg-clip-text text-transparent">
                Discover & Explore
              </span>
              <br />
              <span className="text-gray-800">Amazing Pokémon</span>
            </h2>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dive into the ultimate Pokédex experience. Search, filter, and
              explore beautifully animated Pokémon cards with detailed stats,
              abilities, evolutions, and more
            </p>

            {/* Quick Type Filters */}
            <div className="flex flex-wrap justify-center gap-3 pt-8">
              {typeIcons.map(({ type, icon }) => (
                <button
                  key={type}
                  className="flex items-center space-x-2 px-4 py-2 bg-linear-to-br from-yellow-50 to-amber-50 rounded-xl border border-yellow-200 hover:border-yellow-400 hover:shadow-md transition-all duration-300 hover:scale-105"
                >
                  {icon}
                  <span className="capitalize font-medium text-amber-800">
                    {type}
                  </span>
                </button>
              ))}
            </div>

            {/* Scroll Indicator */}
            <div className="pt-12">
              <div className="animate-bounce w-10 h-16 border-2 border-amber-300 rounded-full mx-auto flex items-start justify-center pt-3">
                <ChevronDown className="w-5 h-5 text-amber-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Hero Background Pattern */}
        <div className="absolute inset-0 -z-10 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-linear-to-r from-yellow-300 to-amber-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div
            className="absolute bottom-0 right-0 w-72 h-72 bg-linear-to-l from-yellow-400 to-amber-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>
      </section>

      {/* Stats Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-linear-to-r from-amber-500 to-yellow-400 rounded-2xl p-6 shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                {pokemonList.length}
              </div>
              <div className="text-amber-100 font-medium">Pokémon Loaded</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">9</div>
              <div className="text-amber-100 font-medium">Types Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">∞</div>
              <div className="text-amber-100 font-medium">Combinations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">150+</div>
              <div className="text-amber-100 font-medium">Animations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pokémon Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-16"
        >
          {loading
            ? Array.from({ length: 20 }).map((_, i) => (
                <PokemonCardSkeleton key={i} />
              ))
            : pokemonList.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              ))}
        </div>
        {isLoadingMore && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-16">
            {Array.from({ length: 20 }).map((_, i) => (
              <PokemonCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {/* <div className="flex justify-center pb-20">
          {isLoadingMore ? (
            <button className="px-8 py-4 bg-linear-to-r from-amber-400 to-yellow-300 rounded-2xl shadow-lg flex items-center space-x-3">
              <Loader2 className="w-5 h-5 text-white animate-spin" />
              <span className="font-bold text-white">Loading Pokémon...</span>
            </button>
          ) : (
            <button
              onClick={fetchPokemons}
              className="group px-8 py-4 bg-linear-to-r from-amber-500 to-yellow-400 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10">Load More Pokémon</span>
              <div className="absolute inset-0 bg-linear-to-r from-yellow-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -inset-1 bg-linear-to-r from-amber-600 to-yellow-500 rounded-2xl blur opacity-30 group-hover:opacity-70 transition-opacity duration-300" />
            </button>
          )}
        </div> */}
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 bg-linear-to-r from-amber-500 to-yellow-400 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 hover:rotate-180 transition-all duration-300 z-40"
        >
          <ChevronDown className="w-6 h-6 transform rotate-180" />
        </button>
      )}

      {/* Footer */}
      <footer className="border-t border-yellow-100 bg-linear-to-b from-white to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-linear-to-r from-yellow-400 to-amber-500 rounded-lg rotate-45"></div>
              <span className="font-bold text-gray-800">Pokédex Modern</span>
            </div>
            <div className="text-gray-600 text-sm">
              Pokémon data from PokeAPI • Made with ❤️ for Pokémon fans
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
