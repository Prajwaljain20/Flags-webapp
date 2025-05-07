export interface IDetailsCard {
  name: { common: string };
  population: number;
  currencies: { [key: string]: { name: string } };
  region: string;
  subregion: string;
  capital: string[];
  languages: Object;
  tld: string[];
  borders: string[];
  flags: IFlag;
  altSpellings: string[];
}

export interface IFlag {
  png: string;
  svg: string;
  alt: string;
}
