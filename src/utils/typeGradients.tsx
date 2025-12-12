import type { JSX } from "react";
import {
  Zap,
  Flame,
  Droplets,
  Leaf,
  Star,
  Sparkles,
  Wind,
  Sword,
  Skull,
  Cog,
  Ghost,
  LandPlot,
  Mountain,
  Bug,
  Wand2,
  Moon,
  Snowflake,
  PawPrint,
} from "lucide-react";

export const typeGradients: Record<
  string,
  {
    bg: string;
    icon: JSX.Element;
    accent: string;
    color: string;
  }
> = {
  fire: {
    bg: "bg-linear-to-br from-orange-500 via-red-500 to-amber-500",
    icon: <Flame className="w-5 h-5" />,
    accent: "from-orange-400 to-red-500",
    color: "text-orange-500",
  },

  water: {
    bg: "bg-linear-to-br from-blue-500 via-cyan-500 to-sky-500",
    icon: <Droplets className="w-5 h-5" />,
    accent: "from-blue-400 to-cyan-500",
    color: "text-blue-500",
  },

  grass: {
    bg: "bg-linear-to-br from-green-500 via-emerald-500 to-lime-500",
    icon: <Leaf className="w-5 h-5" />,
    accent: "from-green-400 to-emerald-500",
    color: "text-green-500",
  },

  electric: {
    bg: "bg-linear-to-br from-yellow-400 via-amber-500 to-orange-400",
    icon: <Zap className="w-5 h-5" />,
    accent: "from-yellow-300 to-amber-400",
    color: "text-yellow-500",
  },

  psychic: {
    bg: "bg-linear-to-br from-purple-500 via-pink-500 to-rose-500",
    icon: <Sparkles className="w-5 h-5" />,
    accent: "from-purple-400 to-pink-500",
    color: "text-purple-500",
  },

  ice: {
    bg: "bg-linear-to-br from-cyan-300 via-blue-300 to-sky-400",
    icon: <Snowflake className="w-5 h-5" />,
    accent: "from-cyan-200 to-blue-300",
    color: "text-cyan-500",
  },

  dragon: {
    bg: "bg-linear-to-br from-indigo-500 via-purple-500 to-violet-600",
    icon: <PawPrint  className="w-5 h-5" />,
    accent: "from-indigo-400 to-purple-500",
    color: "text-indigo-500",
  },

  dark: {
    bg: "bg-linear-to-br from-gray-700 via-gray-800 to-black",
    icon: <Moon className="w-5 h-5" />,
    accent: "from-gray-600 to-gray-800",
    color: "text-gray-700",
  },

  fairy: {
    bg: "bg-linear-to-br from-pink-300 via-rose-400 to-pink-500",
    icon: <Wand2 className="w-5 h-5" />,
    accent: "from-pink-200 to-rose-400",
    color: "text-pink-500",
  },

  bug: {
    bg: "bg-linear-to-br from-lime-400 via-green-500 to-emerald-500",
    icon: <Bug className="w-5 h-5" />,
    accent: "from-lime-300 to-green-400",
    color: "text-lime-500",
  },

  normal: {
    bg: "bg-linear-to-br from-gray-300 via-gray-400 to-gray-500",
    icon: <Star className="w-5 h-5" />,
    accent: "from-gray-200 to-gray-400",
    color: "text-gray-500",
  },

  rock: {
    bg: "bg-linear-to-br from-yellow-600 via-amber-700 to-yellow-800",
    icon: <Mountain className="w-5 h-5" />,
    accent: "from-yellow-500 to-amber-600",
    color: "text-amber-700",
  },

  ground: {
    bg: "bg-linear-to-br from-orange-300 via-yellow-600 to-amber-600",
    icon: <LandPlot className="w-5 h-5" />,
    accent: "from-orange-200 to-yellow-500",
    color: "text-orange-600",
  },

  ghost: {
    bg: "bg-linear-to-br from-purple-700 via-indigo-600 to-purple-800",
    icon: <Ghost className="w-5 h-5" />,
    accent: "from-purple-600 to-indigo-500",
    color: "text-purple-700",
  },

  steel: {
    bg: "bg-linear-to-br from-gray-400 via-gray-500 to-gray-600",
    icon: <Cog className="w-5 h-5" />,
    accent: "from-gray-300 to-gray-500",
    color: "text-gray-600",
  },

  poison: {
    bg: "bg-linear-to-br from-purple-400 via-violet-500 to-purple-600",
    icon: <Skull className="w-5 h-5" />,
    accent: "from-purple-300 to-violet-400",
    color: "text-purple-600",
  },

  fighting: {
    bg: "bg-linear-to-br from-red-500 via-red-600 to-red-700",
    icon: <Sword className="w-5 h-5" />,
    accent: "from-red-400 to-red-600",
    color: "text-red-600",
  },

  flying: {
    bg: "bg-linear-to-br from-sky-300 via-sky-400 to-blue-400",
    icon: <Wind className="w-5 h-5" />,
    accent: "from-sky-200 to-blue-300",
    color: "text-sky-500",
  },
};
