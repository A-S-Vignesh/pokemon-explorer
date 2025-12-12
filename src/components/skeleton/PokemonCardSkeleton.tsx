export default function PokemonCardSkeleton() {
  return (
    <div className="relative w-full rounded-2xl shadow-xl border border-white/20 bg-linear-to-br from-yellow-200/30 to-amber-300/30 p-4 overflow-hidden">
      {/* Shine sweep */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div className="absolute -inset-full bg-linear-to-r from-transparent via-white/20 to-transparent animate-[shine_1.5s_linear_infinite] z-10" />
      </div>

      {/* Top Section */}
      <div className="flex justify-between items-start mb-2">
        <div className="space-y-2">
          <div className="h-5 w-24 bg-white/30 rounded-md shimmer" />
          <div className="flex items-center gap-3 mt-1">
            <div className="h-5 w-16 bg-white/20 rounded-full shimmer" />
            <div className="h-4 w-10 bg-white/20 rounded shimmer" />
          </div>
        </div>

        {/* Favorite Button Placeholder */}
        <div className="w-8 h-8 rounded-full bg-white/20 shimmer" />
      </div>

      {/* Pokémon Image Circle */}
      <div className="flex justify-center my-4">
        <div className="relative">
          <div className="w-40 h-40 rounded-full bg-white/20 shimmer" />
        </div>
      </div>

      {/* Type Badges */}
      <div className="flex justify-center gap-3 my-4">
        <div className="h-7 w-20 bg-white/20 rounded-full shimmer" />
        <div className="h-7 w-20 bg-white/20 rounded-full shimmer" />
      </div>

      {/* Bottom Info (HT & WT placeholder) */}
      <div className="flex justify-center gap-8 mt-2 bg-white/10 rounded-full px-3 py-2 border border-white/20 backdrop-blur-sm">
        <div className="space-y-1 text-center">
          <div className="h-3 w-6 bg-white/20 rounded shimmer" />
          <div className="h-4 w-10 bg-white/30 rounded shimmer" />
        </div>
        <div className="space-y-1 text-center">
          <div className="h-3 w-6 bg-white/20 rounded shimmer" />
          <div className="h-4 w-10 bg-white/30 rounded shimmer" />
        </div>
      </div>
    </div>
  );
}
