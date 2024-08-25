export const fetchData = async <T>(urls: string[]): Promise<T[]> => {
  const requests = urls.map((url) =>
    fetch(url)
      .then((res) => res.json())
      .catch((err) => {
        console.error(`Failed to fetch ${url}:`, err);
        return null;
      })
  );
  const data = await Promise.all(requests);
  return data.filter(
    (item): item is T => item !== null
  );
};