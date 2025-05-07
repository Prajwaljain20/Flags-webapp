import axios from "axios";

const api = axios.create({
  baseURL: "https://restcountries.com/v3.1/",
});

export const getData = async () => {
  const response = await api.get(
    "all?fields=name,capital,population,region,flags,cca3"
  );
  return response.data;
};

export const getDataByCode = async (code: string) => {
  const response = await api.get(
    `alpha?codes=${code}&fields=name,capital,currencies,languages,population,region,subregion,tld,flags,borders,altSpellings`
  );
  return response.data;
};

export const getBorderByCode = async (code: string) => {
  const response = await api.get(`alpha?codes=${code}&fields=name,cca3`);
  return response.data;
};
