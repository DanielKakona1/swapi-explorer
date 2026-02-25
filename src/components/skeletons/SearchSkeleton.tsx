interface SearchSkeletonProps {
  rows?: number;
}

export const SearchSkeleton = ({ rows = 3 }: SearchSkeletonProps) => {
  return (
    <div className="space-y-2 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-md dark:border-slate-700 dark:bg-slate-900/95">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="h-9 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700"
        />
      ))}
    </div>
  );
};
