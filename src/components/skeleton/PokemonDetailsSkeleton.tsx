export default function PokemonDetailsSkeleton() {
  return (
    <div className="animate-pulse max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Card Skeleton */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-amber-200/30 rounded-3xl blur-xl" />

        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-xl">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Image Skeleton */}
            <div className="lg:w-1/3 flex justify-center">
              <div className="w-64 h-64 rounded-full bg-amber-100/60" />
            </div>

            {/* Text Skeleton */}
            <div className="lg:w-2/3 w-full space-y-6">
              {/* Title */}
              <div className="h-10 w-48 bg-amber-100 rounded-lg" />
              <div className="h-7 w-28 bg-amber-100 rounded-md" />

              {/* Type Pills */}
              <div className="flex gap-3">
                <div className="h-10 w-24 bg-amber-100 rounded-full" />
                <div className="h-10 w-24 bg-amber-100 rounded-full" />
              </div>

              {/* Description */}
              <div className="space-y-3">
                <div className="h-6 w-40 bg-amber-100 rounded-md" />
                <div className="h-4 w-full bg-amber-100 rounded-md" />
                <div className="h-4 w-3/4 bg-amber-100 rounded-md" />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    className="bg-amber-50 rounded-2xl p-4 border border-amber-100 space-y-3"
                    key={i}
                  >
                    <div className="h-5 w-24 bg-amber-100 rounded-md" />
                    <div className="h-7 w-16 bg-amber-200 rounded-md" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="mb-8">
        <div className="flex gap-3 bg-amber-50 rounded-2xl p-2 border border-amber-100">
          <div className="h-10 w-24 bg-amber-100 rounded-xl" />
          <div className="h-10 w-24 bg-amber-100 rounded-xl" />
          <div className="h-10 w-24 bg-amber-100 rounded-xl" />
          <div className="h-10 w-24 bg-amber-100 rounded-xl" />
        </div>
      </div>

      {/* Stats Skeleton Block */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-xl space-y-6">
        <div className="h-8 w-40 bg-amber-100 rounded-md" />

        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="h-6 w-52 bg-amber-100 rounded-md" />
            <div className="h-4 w-full bg-amber-100 rounded-md" />
          </div>
        ))}
      </div>

      {/* Sprite Skeleton */}
      <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/30 shadow-xl">
        <div className="h-8 w-52 bg-amber-100 rounded-md mb-6" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-amber-50 rounded-2xl p-6 border border-amber-100"
            >
              <div className="w-24 h-24 mx-auto bg-amber-200 rounded-full" />
              <div className="h-4 w-20 mx-auto mt-4 bg-amber-100 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
