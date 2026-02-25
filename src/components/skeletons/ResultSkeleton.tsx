export const ResultSkeleton = () => {
  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-lg dark:border-slate-700 dark:bg-slate-800/70">
      <div className="mb-4 h-7 w-56 animate-pulse rounded-md bg-slate-300 dark:bg-slate-600" />
      <div className="grid gap-3 sm:grid-cols-2">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-12 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700"
          />
        ))}
      </div>
    </div>
  );
};
