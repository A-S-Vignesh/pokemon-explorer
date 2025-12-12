import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { FC } from "react";
import { useGSAP } from "@gsap/react";
import { typeGradients } from "../utils/typeGradients";
import gsap from "gsap";
import { Heart, Star } from "lucide-react";
import { getPokemonRegion } from "../utils/getRegion";

interface PokemonCardProps {
  pokemon: {
    id: number;
    name: string;
    sprites: {
      front_default?: string;
      other?: {
        "official-artwork"?: {
          front_default?: string;
        };
        dream_world?: {
          front_default?: string;
        };
      };
    };
    types: { type: { name: string } }[];
    height?: number;
    weight?: number;
  };
  className?: string;
}

const PokemonCard: FC<PokemonCardProps> = ({ pokemon, className = "" }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const mainType = pokemon.types?.[0]?.type?.name || "normal";
  const typeData = typeGradients[mainType] || typeGradients["normal"];
  const imageUrl =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.other?.["dream_world"]?.front_default ||
    pokemon.sprites.front_default ||
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png";

  // GSAP Animations
  useGSAP(() => {
    if (!cardRef.current) return;

    // Card entrance animation
    gsap.fromTo(
      cardRef.current,
      {
        y: 50,
        opacity: 0,
        scale: 0.9,
        rotationY: -20,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 0.8,
        ease: "back.out(1.2)",
        delay: Math.random() * 0.2,
      }
    );

    // Floating animation for image
    gsap.to(imageRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  // Hover animations
  useGSAP(() => {
    if (!cardRef.current || !isHovered) return;

    gsap.to(cardRef.current, {
      scale: 1.05,
      y: -10,
      rotationY: 5,
      duration: 0.3,
      ease: "power2.out",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    });

    gsap.to(".type-badge", {
      scale: 1.1,
      duration: 0.2,
      stagger: 0.1,
      ease: "back.out(1.7)",
    });
  }, [isHovered]);

  // Leave animations
  useGSAP(() => {
    if (!cardRef.current || isHovered) return;

    gsap.to(cardRef.current, {
      scale: 1,
      y: 0,
      rotationY: 0,
      duration: 0.3,
      ease: "power2.out",
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
    });
  }, [isHovered]);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);

    // Animation for favorite toggle
    gsap.to(e.currentTarget, {
      scale: 1.3,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
    });
  };

  const region = getPokemonRegion(pokemon.id);

  return (
    <Link to={`/pokemon/${pokemon.name}`} className="block">
      <div
        ref={cardRef}
        className={`relative group cursor-pointer pokemon-card hover:scale-105 hover:shadow-2xl transition-all duration-300 rounded-2xl transform-gpu ${className}`}
        // onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated Background Glow */}
        {/* <div className="absolute -inset-1 bg-linear-to-r from-yellow-400 to-amber-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500" /> */}

        {/* Shine Effect */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <div
            className="absolute -inset-full bg-linear-to-r from-transparent via-white/20 to-transparent 
          group-hover:animate-[shine_1.5s_linear_infinite] z-10"
          />
        </div>

        {/* Main Card */}
        <div
          className={`relative rounded-2xl p-4 text-white overflow-hidden ${typeData.bg} 
        shadow-xl group-hover:shadow-2xl transition-shadow duration-300
        border border-white/20 backdrop-blur-sm`}
        >
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%)`,
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          {/* Top Section */}
          <div className="relative z-20 flex justify-between items-start mb-2">
            <div>
              <h2 className="capitalize text-xl font-bold tracking-tight drop-shadow-lg">
                {pokemon.name}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
                  {typeData.icon}
                  <span className="text-xs font-semibold capitalize">
                    {mainType}
                  </span>
                </div>
                <span className="text-white/70 text-sm">
                  #{pokemon.id.toString().padStart(3, "0")}
                </span>
              </div>
            </div>

            {/* Favorite Button */}
            <button
              onClick={handleFavorite}
              className="relative p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors z-30"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-white"
                }`}
              />
              {isFavorite && (
                <div className="absolute inset-0 animate-ping bg-red-500/30 rounded-full" />
              )}
            </button>
          </div>

          {/* Pokémon Image */}
          <div
            ref={imageRef}
            className="relative z-10 flex justify-center my-4"
          >
            <div className="relative">
              {/* Image Glow */}
              {/* <div className="absolute inset-0 bg-linear-to-r from-yellow-400 to-amber-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" /> */}

              {/* Image Container */}
              <div className="relative bg-linear-to-b from-white/20 to-transparent rounded-full p-2">
                <div className="relative bg-linear-to-b from-white/10 to-white/5 rounded-full p-3 backdrop-blur-sm">
                  <img
                    src={imageUrl}
                    alt={pokemon.name}
                    className="w-36 h-36 drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-3 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                <div className="text-center">
                  <div className="text-xs opacity-80">HT</div>
                  <div className="font-bold text-sm">
                    {(pokemon.height || 0) / 10}m
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs opacity-80">WT</div>
                  <div className="font-bold text-sm">
                    {(pokemon.weight || 0) / 10}kg
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Type Badges */}
          <div className="relative z-20 flex flex-row gap-2 justify-evenly my-6">
            {pokemon.types.map((t, index) => {
              const type = t.type.name;
              const typeInfo = typeGradients[type] || typeGradients["normal"];

              return (
                <div
                  key={type}
                  className="type-badge flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold text-sm
                  bg-linear-to-r bg-white/20 backdrop-blur-md border border-white/30
                  hover:scale-105 transition-transform duration-200"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {typeInfo.icon}
                  <span className="capitalize">{type}</span>
                </div>
              );
            })}
          </div>

          {/* Hover Indicator */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-1 text-white/60 text-xs">
              <span>Click to view details</span>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/30 rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/30 rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/30 rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/30 rounded-br-2xl" />
        </div>

        {/* Rarity Badge (Optional) */}
        {/* Region Badge */}
        {region !== "Unknown" && (
          <div className="absolute -top-2 -right-2 z-30">
            <div className="flex items-center gap-1 bg-linear-to-r from-yellow-500 to-amber-500 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg">
              <Star className="w-3 h-3 fill-white" />
              <span>{region}</span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default PokemonCard;
