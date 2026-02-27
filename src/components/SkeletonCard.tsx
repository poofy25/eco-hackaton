export default function SkeletonCard() {
  return (
    <div className="flex flex-col rounded-xl bg-chalk shadow-warm overflow-hidden">
      <div className="aspect-[4/3] skeleton-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 skeleton-pulse" />
        <div className="h-3 w-1/2 skeleton-pulse" />
        <div className="flex items-center justify-between pt-2">
          <div className="h-5 w-16 skeleton-pulse" />
          <div className="h-3 w-20 skeleton-pulse" />
        </div>
        <div className="flex items-center gap-2 pt-2 border-t border-stone/10">
          <div className="h-5 w-5 rounded-full skeleton-pulse" />
          <div className="h-3 w-24 skeleton-pulse" />
        </div>
      </div>
    </div>
  );
}
