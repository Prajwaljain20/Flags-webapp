import { FC } from "react";
import { ICard } from "../../models/card-interface";
import "./card.css";

interface CardProps {
  card: ICard;
}

export const Card: FC<CardProps> = ({ card }) => {
  return (
    <div className="card">
      <div
        className="flag"
        style={{
          background: `url(${card.flags.svg}) no-repeat center / cover`,
        }}
      ></div>
      <div className="details">
        <h3 className="card-heading">{card.name.common}</h3>
        <h5 className="card-sub-heading">
          Population: <span>{card.population}</span>
        </h5>
        <h5>
          Region: <span className="value">{card.region}</span>
        </h5>
        <h5>
          Capital: <span className="value">{card.capital}</span>
        </h5>
      </div>
    </div>
  );
};
