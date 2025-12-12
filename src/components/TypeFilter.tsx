import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Filter, X, ChevronDown } from "lucide-react";
import { typeGradients } from "../utils/typeGradients";
import { usePokedexStore } from "../store/pokedexStore";

interface TypeFilterProps {
  className?: string;
}

const TypeFilter: React.FC<TypeFilterProps> = ({ className = "" }) => {
  const selectedTypes = usePokedexStore((s) => s.selectedTypes);
  const toggleType = usePokedexStore((s) => s.toggleType);
  const resetFilters = usePokedexStore((s) => s.resetFilters);


  const [isExpanded, setIsExpanded] = useState(false);

  // Smooth expand animation
  useGSAP(() => {
    gsap.to(".type-filter-grid", {
      opacity: isExpanded ? 1 : 0,
      height: isExpanded ? "auto" : 0,
      duration: 0.4,
      ease: "power2.out",
    });
  }, [isExpanded]);

  const handleSelect = (type: string) => {
    const alreadySelected = selectedTypes.includes(type);

    // Shake if max reached
    if (!alreadySelected && selectedTypes.length >= 2) {
      gsap.fromTo(
        ".type-filter-area",
        { x: -4 },
        { x: 4, repeat: 3, yoyo: true, duration: 0.08 }
      );
      return;
    }

    // Just toggle — Zustand will fetch the Pokémon
    toggleType(type);

    // Animate click
    gsap.to(`.type-${type}`, {
      scale: 1.15,
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      ease: "back.out(1.6)",
    });
  };


  const clearAll = () => {
    resetFilters();

    gsap.to(".type-chip", {
      opacity: 0,
      scale: 0,
      duration: 0.25,
      stagger: 0.05,
    });
  };

  return (
    <div className={`type-filter-area relative ${className}`}>
      {/* Header */}
      <div className="bg-linear-to-r from-amber-50 to-yellow-50 rounded-2xl p-4 border border-amber-100 shadow-sm">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-linear-to-r from-amber-400 to-yellow-300">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-gray-800">Filter by Type</h3>
              <p className="text-sm text-gray-600">
                {selectedTypes.length > 0
                  ? `${selectedTypes.length} type${
                      selectedTypes.length === 1 ? "" : "s"
                    } selected`
                  : "Select Pokémon types"}
              </p>
            </div>
          </div>

          <ChevronDown
            className={`w-5 h-5 text-amber-500 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Selected Type Chips */}
        {selectedTypes.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={clearAll}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-linear-to-r from-amber-500 to-yellow-400 text-white text-sm font-semibold hover:shadow-md"
            >
              <X className="w-3 h-3" />
              Clear All
            </button>

            {selectedTypes.map((type) => {
              const info = typeGradients[type];
              return (
                <div
                  key={type}
                  className={`type-chip flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-sm font-semibold ${info?.bg}`}
                >
                  {info?.icon}
                  <span className="capitalize">{type}</span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(type);
                    }}
                    className="hover:scale-125 transition-transform"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Expanded Type Grid */}
      <div className="type-filter-grid opacity-0 h-0 overflow-hidden mt-2">
        <div className="bg-white rounded-2xl p-4 border border-amber-100 shadow-lg">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {Object.entries(typeGradients).map(([type, info]) => (
              <button
                key={type}
                className={`type-${type} flex flex-col items-center justify-center p-3 rounded-xl transition-all ${
                  selectedTypes.includes(type)
                    ? `bg-linear-to-br ${info.bg} text-white shadow-lg scale-105`
                    : "bg-linear-to-br from-amber-50 to-yellow-50 hover:scale-105"
                }`}
                onClick={() => handleSelect(type)}
              >
                <div
                  className={`p-2 rounded-full ${
                    selectedTypes.includes(type) ? "bg-white/20" : "bg-white"
                  }`}
                >
                  <div
                    className={
                      selectedTypes.includes(type) ? "text-white" : info.color
                    }
                  >
                    {info.icon}
                  </div>
                </div>

                <span className="text-xs font-semibold capitalize mt-1">
                  {type}
                </span>

                {selectedTypes.includes(type) && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-linear-to-r from-amber-400 to-yellow-400 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeFilter;
