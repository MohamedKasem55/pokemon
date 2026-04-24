export interface IStat {
  base_stat: number;
  effort: number;
  stat: {
    name: 'hp' | 'attack' | 'defense' | 'special-attack' | 'special-defense' | 'speed';
    url: string;
  };
}