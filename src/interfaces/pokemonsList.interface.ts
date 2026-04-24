import { IApiResponse } from "../common/interfaces/apiResponse.interface";

export interface IPokemonListItemResponse{
    name:string;
    url:string;
}
export type IPokemonListResponse = IApiResponse<IPokemonListItemResponse>