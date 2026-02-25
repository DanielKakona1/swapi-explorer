import { Suspense, lazy, memo } from 'react';

import { SEARCH_LOTTIE_URL } from '@/constants/lottie';

const LottiePlayer = lazy(async () => {
  const module = await import('@lottiefiles/react-lottie-player');
  return { default: module.Player };
});

export const EmptyState = memo(() => {
  return (
    <section className="mt-6 rounded-2xl border border-dashed border-cyan-300 bg-white/75 p-5 text-center dark:border-cyan-700 dark:bg-slate-900/70">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
        Start your Star Wars search
      </h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Type at least 2 characters to see instant suggestions.
      </p>
      <div className="mx-auto mt-4 h-48 w-48">
        <Suspense
          fallback={
            <div className="h-full w-full animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-700" />
          }
        >
          <LottiePlayer
            autoplay
            loop
            src={SEARCH_LOTTIE_URL}
            className="h-full w-full"
            data-testid="empty-state-lottie"
          />
        </Suspense>
      </div>
    </section>
  );
});

EmptyState.displayName = 'EmptyState';
