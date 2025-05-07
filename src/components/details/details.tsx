import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IDetailsCard, IFlag } from "../../models/details-card-interface";
import { IBorder } from "../../models/border-interface";
import { getBorderByCode, getDataByCode } from "../../services/data";
import { Loader } from "../loader/loader";
import "./details.css";

export const Details = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [borderLoading, setBorderLoading] = useState(true);
  const [card, setCard] = useState<IDetailsCard>();
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [image, setImage] = useState<IFlag>({ svg: "", png: "", alt: "" });
  const [borderCountries, setBorderCountries] = useState<IBorder[]>([]);
  const navigation = useNavigate();

  useEffect(() => {
    setLoading(true);
    getDataByCode(id!)
      .then((res) => {
        setFetchData(res[0]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const setFetchData = (data: IDetailsCard) => {
    setCard(data);
    setImage({
      png: "",
      alt: data.flags.alt,
      svg: `url(${data.flags.svg}) no-repeat center / contain`,
    });
    setLanguages(Object.values(data.languages));
    const currency = Object.keys(data.currencies);
    setCurrencies(currency.map((currency) => data.currencies[currency].name));
    setBorders(data.borders);
  };

  const setBorders = (borders: string[]) => {
    let countries: IBorder[] = [];
    setBorderLoading(true);
    borders.forEach((border) => {
      getBorderByCode(border)
        .then((res) => {
          countries.push(res[0]);
        })
        .finally(() => {
          setBorderCountries(countries);
          setBorderLoading(false);
        });
    });
  };

  const goBack = () => {
    navigation("..");
  };

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <>
          <div className="back" onClick={goBack}>
            <span className="detail-arrow">&larr;</span> Back
          </div>
          <div className="detail-container">
            <div
              className="detail-flag"
              style={{ background: image.svg }}
            ></div>
            <div className="detail-content">
              <div className="grid1">
                <h2>{card?.name.common}</h2>
                <h5>
                  Native Name:{" "}
                  <span className="detail-content-value">
                    {card?.altSpellings[1]}
                  </span>
                </h5>
                <h5>
                  Population:{" "}
                  <span className="detail-content-value">
                    {card?.population}
                  </span>
                </h5>
                <h5>
                  Region:{" "}
                  <span className="detail-content-value">{card?.region}</span>
                </h5>
                <h5>
                  Sub Region:{" "}
                  <span className="detail-content-value">
                    {card?.subregion}
                  </span>
                </h5>
                <h5>
                  Capital:{" "}
                  <span className="detail-content-value">{card?.capital}</span>
                </h5>
              </div>
              <div className="grid2">
                <h5>
                  Top Level Domain:{" "}
                  <span className="detail-content-value">
                    {card!.tld.join(", ")}
                  </span>
                </h5>
                <h5>
                  Currencies:{" "}
                  <span className="detail-content-value">
                    {currencies.join(", ")}
                  </span>
                </h5>
                <h5>
                  Languages:{" "}
                  <span className="detail-content-value">
                    {languages.join(", ")}
                  </span>
                </h5>
              </div>
              {!borderLoading && (
                <div className="border">
                  <h5>Border Countries: </h5>
                  {borderCountries.map((country) => (
                    <div className="country">
                      <span
                        className="border-card"
                        onClick={() => navigation(`/card/${country.cca3}`)}
                      >
                        {country.name.common}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {borderLoading && <Loader />}
            </div>
          </div>
        </>
      )}
    </>
  );
};
