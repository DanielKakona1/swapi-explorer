import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { searchPeople } from '@/api/swapi';

export const useSwapiPeopleSearch = (query: string) => {
  const normalizedQuery = query.trim().toLowerCase();

  return useQuery({
    queryKey: ['swapi-people-search', normalizedQuery],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      searchPeople(normalizedQuery, signal),
    enabled: normalizedQuery.length >= 2,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
};
