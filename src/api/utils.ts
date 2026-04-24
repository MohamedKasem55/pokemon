export function getPokemonId(url: string): number {
  const id = url.split('/').filter(Boolean).pop();
  return parseInt(id || '0');
}
export function getPokemonImageUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}