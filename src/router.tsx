import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { PageSkeleton } from '@/components/skeletons/PageSkeleton';

const HomePage = lazy(() => import('@/pages/HomePage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<PageSkeleton />}>
        <HomePage />
      </Suspense>
    ),
  },
]);
