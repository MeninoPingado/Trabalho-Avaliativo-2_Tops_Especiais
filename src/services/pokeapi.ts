const BASE = 'https://pokeapi.co/api/v2';
export interface PokemonItem { id: number; name: string; image: string }
interface Resource { name: string; url: string }
interface PokemonList { results: Resource[] }
export interface Pokemon {
  id: number; name: string; height: number; weight: number;
  sprites: { front_default: string | null; other?: { 'official-artwork'?: { front_default: string | null } } };
  types: { type: Resource }[];
  abilities: { ability: Resource; is_hidden: boolean }[];
  stats: { base_stat: number; stat: Resource }[];
}
export function artwork(id: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}
async function get<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${BASE}/${path}`, { signal });
  if (!response.ok) throw new Error(`Não foi possível consultar a API (${response.status}).`);
  return await response.json() as T;
}
// A primeira geração mantém a lista leve e permite pesquisar todos os 151 resultados.
export async function listPokemon(signal?: AbortSignal): Promise<PokemonItem[]> {
  const data = await get<PokemonList>('pokemon?limit=151&offset=0', signal);
  return data.results.map(({name, url}) => {
    const id = Number(url.split('/').filter(Boolean).pop());
    return { id, name, image: artwork(id) };
  });
}
export function getPokemon(id: number, signal?: AbortSignal) {
  return get<Pokemon>(`pokemon/${id}/`, signal);
}
export const pretty = (name: string) => name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
export const numberLabel = (id: number) => `#${String(id).padStart(3, '0')}`;
