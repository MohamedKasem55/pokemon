import { IApiResponse } from "../common/interfaces/apiResponse.interface";
import { IAbility } from "./ability.interface";
import { IMove } from "./move.interface";
import { ISprite } from "./sprite.interface";
import { IStat } from "./stat.interface";
import { IType } from "./type.interface";

export interface IPokemonDetailsResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: ISprite;
  abilities: Array<IAbility>;
  stats: Array<IStat>;
  types: Array<IType>;
  moves: Array<IMove>;
}
export interface IPokemonListItem{
  id: number;
  name: string;
  image: string;
}

