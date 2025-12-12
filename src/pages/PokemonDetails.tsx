import { useEffect, useState, useRef } from "react";
import { typeGradients } from "../utils/typeGradients";
import { useParams, useNavigate, redirect } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  ArrowLeft,
  Heart,
  Shield,
  Sword,
  Activity,
  Weight,
  Ruler,
  Sparkles,
  Trophy,
  Target,
  Wind,
  ChevronRight,
  BookOpen,
  Layers,
  BarChart3,
} from "lucide-react";
import PokemonDetailsSkeleton from "../components/skeleton/PokemonDetailsSkeleton";
import { getPokemonRegion } from "../utils/getRegion";

export default function PokemonDetails() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [pokemon, setPokemon] = useState<any>(null);
  const [species, setSpecies] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "stats" | "moves" | "abilities" | "evolution"
  >("stats");

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useGSAP(() => {
    if (!containerRef.current || !pokemon) return;

    // Entrance animation
    gsap.fromTo(
      containerRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }
    );

    // Floating image animation
    gsap.to(imageRef.current, {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Animated background
    gsap.to(bgRef.current, {
      rotation: 360,
      duration: 120,
      repeat: -1,
      ease: "none",
    });

    // Stats bars animation
    if (activeTab === "stats" && pokemon) {
      gsap.fromTo(
        ".stat-bar",
        { width: 0, opacity: 0 },
        {
          width: "100%",
          opacity: 1,
          duration: 1.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, [pokemon]);

  useGSAP(() => {
    if (!containerRef.current || !pokemon) return;

    if (activeTab === "stats") {
      gsap.fromTo(
        ".stat-bar",
        { width: 0, opacity: 0 },
        {
          width: (i, target) => target.getAttribute("data-width"),
          opacity: 1,
          duration: 1.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, [pokemon, activeTab]);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        setLoading(true);
        const [pokemonRes, speciesRes] = await Promise.all([
          fetch(`https://pokeapi.co/api/v2/pokemon/${name}`),
          fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`),
        ]);

        const pokemonData = await pokemonRes.json();
        const speciesData = await speciesRes.json();

        setPokemon(pokemonData);
        setSpecies(speciesData);

        // Animate stats after data loads
        gsap.fromTo(
          ".stat-value",
          { scale: 0 },
          { scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" }
        );
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, [name]);

  const handleBack = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.3,
      onComplete: () => {
        navigate("/");
        return; // ensures return type is void
      },
    });
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    gsap.to(".favorite-btn", {
      scale: 1.2,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
    });
  };

  function getRarity(species: any) {
    if (species.is_mythical) return "Mythical";
    if (species.is_legendary) return "Legendary";
    if (species.is_baby) return "Baby";
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-amber-50 via-white to-yellow-50">
        <header className="sticky top-0 z-50 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-10 w-36 rounded-xl bg-amber-100/40 skeleton-pulse" />
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-100/40 skeleton-pulse" />
                <div className="h-8 w-20 rounded-full bg-amber-100/40 skeleton-pulse" />
              </div>
            </div>
          </div>

          {/* shimmer overlay */}
          <div className="header-shimmer" />
        </header>
        <PokemonDetailsSkeleton />
      </div>
    );
  }


  if (error || !pokemon) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-amber-50 to-white">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
          <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-12 h-12 text-amber-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Pokémon Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The Pokémon you're looking for doesn't exist in our Pokédex.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-linear-to-r from-amber-500 to-yellow-400 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all"
          >
            Back to Pokédex
          </button>
        </div>
      </div>
    );
  }

  
  const movesToShow = showAll ? pokemon.moves : pokemon.moves.slice(0, 30);

  const mainType = pokemon.types[0].type.name;
  const typeData = typeGradients[mainType] || typeGradients.normal;
  const imageUrl =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default;
  const flavorText =
    species?.flavor_text_entries?.find(
      (entry: any) => entry.language.name === "en"
    )?.flavor_text || "";

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-linear-to-b from-amber-50 via-white to-yellow-50"
    >
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-yellow-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-amber-50 to-yellow-50 border border-amber-200 hover:shadow-md hover:scale-105 transition-all group"
            >
              <ArrowLeft className="w-5 h-5 text-amber-600 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold text-amber-700">Back</span>
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={handleFavorite}
                className="favorite-btn p-3 rounded-full bg-linear-to-r from-amber-50 to-yellow-50 border border-amber-200 hover:shadow-md transition-all"
              >
                <Heart
                  className={`w-6 h-6 ${
                    isFavorite ? "fill-red-500 text-red-500" : "text-amber-600"
                  }`}
                />
              </button>
              {pokemon.id <= 151 && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-linear-to-r from-yellow-500 to-amber-500 text-white text-sm font-bold">
                  <Trophy className="w-4 h-4" />
                  <span>Original</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Pokémon Header */}
        <div className="relative mb-8">
          <div
            className={`absolute inset-0 ${typeData.bg} rounded-3xl blur-xl opacity-20`}
          />
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-xl">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              {/* Image Section */}
              <div className="lg:w-1/3">
                <div ref={imageRef} className="relative">
                  <div
                    className={`absolute inset-0 ${typeData.bg} rounded-full blur-2xl opacity-30`}
                  />
                  <div className="relative bg-linear-to-b from-white/20 to-transparent rounded-full p-4">
                    <div className="relative bg-linear-to-b from-white/10 to-white/5 rounded-full p-6 backdrop-blur-sm">
                      <img
                        src={imageUrl}
                        alt={pokemon.name}
                        className="w-64 h-64 drop-shadow-2xl"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="lg:w-2/3">
                <div className="flex items-center gap-4 mb-4">
                  <h1 className="text-5xl font-bold capitalize text-gray-800">
                    {pokemon.name}
                  </h1>
                  <span className="text-3xl font-bold text-amber-600">
                    #{pokemon.id.toString().padStart(3, "0")}
                  </span>

                  {/* REGION BADGE */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-linear-to-r from-amber-500 to-yellow-400 text-white text-sm font-bold shadow-md">
                    <Trophy className="w-4 h-4" />
                    <span>{getPokemonRegion(pokemon.id)}</span>
                  </div>

                  {/* RARITY BADGE */}
                  {getRarity(species) && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500 text-white text-sm font-bold shadow-md">
                      <Sparkles className="w-4 h-4" />
                      <span>{getRarity(species)}</span>
                    </div>
                  )}
                </div>

                {/* Types */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {pokemon.types.map((t: any, index: number) => {
                    const typeInfo =
                      typeGradients[t.type.name] || typeGradients.normal;
                    return (
                      <div
                        key={t.type.name}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-white ${typeInfo.bg} shadow-lg transform hover:scale-105 transition-transform`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {typeInfo.icon}
                        <span className="capitalize">{t.type.name}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Description */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-5 h-5 text-amber-600" />
                    <h3 className="text-lg font-semibold text-gray-700">
                      Description
                    </h3>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {flavorText}
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-linear-to-br from-amber-50 to-yellow-50 rounded-2xl p-4 border border-amber-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Ruler className="w-5 h-5 text-amber-600" />
                      <span className="font-semibold text-gray-700">
                        Height
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">
                      {(pokemon.height / 10).toFixed(1)} m
                    </p>
                  </div>

                  <div className="bg-linear-to-br from-amber-50 to-yellow-50 rounded-2xl p-4 border border-amber-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Weight className="w-5 h-5 text-amber-600" />
                      <span className="font-semibold text-gray-700">
                        Weight
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">
                      {(pokemon.weight / 10).toFixed(1)} kg
                    </p>
                  </div>

                  <div className="bg-linear-to-br from-amber-50 to-yellow-50 rounded-2xl p-4 border border-amber-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="w-5 h-5 text-amber-600" />
                      <span className="font-semibold text-gray-700">
                        Base XP
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">
                      {pokemon.base_experience}
                    </p>
                  </div>

                  <div className="bg-linear-to-br from-amber-50 to-yellow-50 rounded-2xl p-4 border border-amber-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-amber-600" />
                      <span className="font-semibold text-gray-700">HP</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">
                      {pokemon.stats[0].base_stat}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 bg-linear-to-r from-amber-50 to-yellow-50 rounded-2xl p-2 border border-amber-100">
            {[
              {
                id: "stats",
                label: "Stats",
                icon: <BarChart3 className="w-5 h-5" />,
              },
              {
                id: "moves",
                label: "Moves",
                icon: <Wind className="w-5 h-5" />,
              },
              {
                id: "abilities",
                label: "Abilities",
                icon: <Sparkles className="w-5 h-5" />,
              },
              {
                id: "evolution",
                label: "Evolution",
                icon: <Layers className="w-5 h-5" />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-linear-to-r from-amber-500 to-yellow-400 text-white shadow-lg"
                    : "text-amber-700 hover:bg-white hover:shadow-md"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div
          ref={statsRef}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-xl"
        >
          {activeTab === "stats" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-amber-600" />
                Base Stats
              </h2>
              <div className="grid gap-6">
                {pokemon.stats.map((stat: any) => (
                  <div key={stat.stat.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {stat.stat.name.includes("attack") ? (
                          <Sword className="w-5 h-5 text-red-500" />
                        ) : stat.stat.name.includes("defense") ? (
                          <Shield className="w-5 h-5 text-blue-500" />
                        ) : stat.stat.name.includes("hp") ? (
                          <Activity className="w-5 h-5 text-green-500" />
                        ) : (
                          <Target className="w-5 h-5 text-amber-500" />
                        )}
                        <span className="font-semibold text-gray-700 capitalize">
                          {stat.stat.name.replace("-", " ")}
                        </span>
                      </div>
                      <span className="stat-value font-bold text-2xl text-gray-800">
                        {stat.base_stat}
                      </span>
                    </div>
                    <div className="relative h-4 bg-linear-to-r from-amber-50 to-yellow-50 rounded-full overflow-hidden border border-amber-100">
                      <div
                        className="stat-bar absolute top-0 left-0 h-full rounded-full bg-linear-to-r from-amber-400 to-yellow-400"
                        style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                        data-width={`${(stat.base_stat / 255) * 100}%`}
                      >
                        <div className="absolute inset-0 bg-linear-to-r from-transparent to-white/20 animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "abilities" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-600" />
                Abilities
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {pokemon.abilities.map((ability: any) => (
                  <div
                    key={ability.ability.name}
                    className="group bg-linear-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-100 hover:border-amber-300 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-linear-to-r from-amber-400 to-yellow-300 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg capitalize text-gray-800">
                          {ability.ability.name.replace("-", " ")}
                        </h3>
                        <p className="text-sm text-amber-600 font-semibold">
                          {ability.is_hidden
                            ? "Hidden Ability"
                            : "Regular Ability"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Slot {ability.slot}</span>
                      <ChevronRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "moves" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Wind className="w-6 h-6 text-amber-600" />
                Moves ({pokemon.moves.length})
              </h2>

              {/* Moves List */}
              <div className="flex flex-wrap gap-3">
                {movesToShow.map((move: any) => (
                  <div
                    key={move.move.name}
                    className="group bg-linear-to-br from-amber-50 to-yellow-50 rounded-xl px-4 py-3 border border-amber-100 hover:border-amber-300 hover:shadow-md hover:scale-105 transition-all"
                  >
                    <span className="font-semibold text-gray-800 capitalize">
                      {move.move.name.replace("-", " ")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Show All Button */}
              {!showAll && pokemon.moves.length > 30 && (
                <div className="text-center pt-6">
                  <button
                    onClick={() => setShowAll(true)}
                    className="px-6 py-3 bg-linear-to-r from-amber-500 to-yellow-400 
                       text-white font-semibold rounded-xl 
                       hover:shadow-lg hover:scale-105 transition-all"
                  >
                    Show All {pokemon.moves.length} Moves
                  </button>
                </div>
              )}

              {/* Collapse Button */}
              {showAll && (
                <div className="text-center pt-6">
                  <button
                    onClick={() => setShowAll(false)}
                    className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl 
                       hover:shadow-lg hover:scale-105 transition-all"
                  >
                    Show Less
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "evolution" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Layers className="w-6 h-6 text-amber-600" />
                Evolution Chain
              </h2>
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-24 h-24 rounded-full bg-linear-to-r from-amber-400 to-yellow-300 flex items-center justify-center mb-4">
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
                <p className="text-gray-600 text-lg mb-4">
                  Evolution data will be available soon!
                </p>
                <button className="px-6 py-3 bg-linear-to-r from-amber-500 to-yellow-400 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all">
                  Coming Soon
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Additional Images */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Layers className="w-6 h-6 text-amber-600" />
            Sprites Gallery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Front Default", sprite: pokemon.sprites.front_default },
              { label: "Back Default", sprite: pokemon.sprites.back_default },
              { label: "Front Shiny", sprite: pokemon.sprites.front_shiny },
              { label: "Back Shiny", sprite: pokemon.sprites.back_shiny },
            ].map(
              (img) =>
                img.sprite && (
                  <div key={img.label} className="text-center">
                    <div className="bg-linear-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-100 mb-2">
                      <img
                        src={img.sprite}
                        alt={img.label}
                        className="w-24 h-24 mx-auto"
                      />
                    </div>
                    <p className="text-sm font-semibold text-gray-700">
                      {img.label}
                    </p>
                  </div>
                )
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-yellow-100 bg-linear-to-b from-white to-amber-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className="text-gray-600">
            Pokémon data from{" "}
            <span className="font-semibold text-amber-600">PokeAPI.co</span> •
            Designed with ❤️ for Pokémon fans
          </p>
        </div>
      </footer>
    </div>
  );
}
