import { Filter, X } from "lucide-react";
import { useEffect, useRef } from "react";
import TypeFilter from "./TypeFilter";

interface TypeFilterProps {
  isOpen: any;
  onClose: any;
}

const FilterDropdown = ({
  isOpen,
  onClose,
}: TypeFilterProps) => {
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
      className="fixed md:absolute top-20 md:top-12 right-4 md:right-0 w-[calc(100vw-2rem)] md:w-[550px] bg-white rounded-2xl shadow-2xl p-6 border border-yellow-100 z-50 max-h-[80vh] overflow-y-auto"
    >
      <div className="flex items-center justify-between mb-5 sticky top-0 bg-white pb-5 border-b border-amber-100">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-300">
            <Filter className="w-5 h-5 text-amber-900" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Filter Pokémon</h3>
            <p className="text-sm text-gray-500">
              Select types to filter the collection
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

      <TypeFilter />

      <div className="mt-6 pt-5 border-t border-amber-100">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-1">
              Filter Tips
            </h4>
            <p className="text-xs text-gray-500">
              Combine multiple types for advanced filtering
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-amber-600">18 Types</div>
            <div className="text-xs text-gray-500">Available</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;
