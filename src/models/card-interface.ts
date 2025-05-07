import { IFlag } from "./details-card-interface";

export interface ICard {
  cca3: string;
  name: { common: string };
  population: number;
  region: string;
  capital: string[];
  flags: IFlag;
}

export interface ISearch {
  name: { common: string };
  cca3: string;
}
