export const PageSkeleton = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-900">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-lg backdrop-blur dark:border-slate-700 dark:bg-slate-800/70">
        <div className="mb-6 h-8 w-52 animate-pulse rounded-lg bg-slate-300 dark:bg-slate-600" />
        <div className="h-14 animate-pulse rounded-2xl bg-slate-300 dark:bg-slate-600" />
        <div className="mt-6 h-40 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  );
};
