import type { SwapiPeopleResponse } from '@/types/swapi';

const SWAPI_BASE_URL = 'https://swapi.dev/api/people/';

export const searchPeople = async (
  query: string,
  signal?: AbortSignal,
): Promise<SwapiPeopleResponse> => {
  const encodedQuery = encodeURIComponent(query.trim());
  const url = `${SWAPI_BASE_URL}?search=${encodedQuery}`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error('Failed to fetch Star Wars characters.');
  }

  return (await response.json()) as SwapiPeopleResponse;
};
