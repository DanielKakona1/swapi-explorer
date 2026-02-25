import { searchPeople } from '@/api/swapi';

describe('searchPeople', () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    if (originalFetch) {
      globalThis.fetch = originalFetch;
      return;
    }

    Reflect.deleteProperty(globalThis, 'fetch');
  });

  it('calls swapi endpoint with encoded query', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ count: 0, next: null, previous: null, results: [] }),
    } as Response);
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    await searchPeople('ja');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://swapi.dev/api/people/?search=ja',
      { signal: undefined },
    );
  });

  it('throws when request fails', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: false,
    } as Response);
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    await expect(searchPeople('ja')).rejects.toThrow(
      'Failed to fetch Star Wars characters.',
    );
  });
});
