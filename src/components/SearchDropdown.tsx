import { useEffect, useRef } from "react";
import SearchBar from "./SearchBar";
import { Search, X } from "lucide-react";

interface TypeSearchProps {
  isOpen: boolean;
  onClose: any;
}

const SearchDropdown = ({
  isOpen,
  onClose,
}: TypeSearchProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="fixed md:absolute top-20 md:top-12 right-4 md:right-0 w-[calc(100vw-2rem)] md:w-[500px] bg-white rounded-2xl shadow-2xl p-6 border border-yellow-100 z-50"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-linear-to-r from-amber-500 to-yellow-400">
            <Search className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Search Pokémon</h3>
            <p className="text-sm text-gray-500">
              Find your favorite Pokémon by name or ID
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-amber-50 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <SearchBar />

      <div className="mt-6 pt-5 border-t border-amber-100">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">
          Search Examples
        </h4>
        <div className="flex flex-wrap gap-2">
          {["Pikachu", "Charizard", "Mewtwo", "25", "150", "Eevee"].map(
            (example) => (
              <span
                key={example}
                className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-medium"
              >
                {example}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchDropdown;
