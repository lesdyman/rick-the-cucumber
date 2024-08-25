import { fetchData } from "./fetchData";

export async function getContent<T>(url: string, page: number): Promise<{ results: T[], info: { pages: number } }> {
  try {
    const fullUrl = `${url}?page=${page}`;
    const [data] = await fetchData<{ results: T[], info: { pages: number } }>([fullUrl]);
    return data;
  } catch (error) {
    console.error('Error occurred while fetching data:', error);
    throw error;
  }
}