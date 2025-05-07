import { useEffect, useState } from "react";
import { Loader } from "../loader/loader";
import { ICard, ISearch } from "../../models/card-interface";
import { getData } from "../../services/data";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { Card } from "../card/card";

export const Home = () => {
  const filters: string[] = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  const [current, setCurrent] = useState(
    localStorage.getItem("current") || "1"
  );
  const [loading, setLoading] = useState(true);
  const [cardObj, setCardObj] = useState<ICard[]>([]);
  const [searchList, setSearchList] = useState<ISearch[]>([]);
  const [pages, setPages] = useState(0);
  const [sortedData, setSortedData] = useState<ICard[]>([]);
  const [filteredData, setFilteredData] = useState<ICard[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getData().then((res) => {
      setResponseData(res);
    });
  }, []);

  const setResponseData = (data: ICard[]) => {
    setCardObj(data);
    if (data.length > 0) setLoading(false);
    setPages(Math.ceil(data.length / 20));
    setSortedData(data);
    setFilteredData(
      data.slice((parseInt(current) - 1) * 20, parseInt(current) * 20)
    );
  };

  const onSearchInput = (value: string) => {
    const searchKeyword = value;
    if (searchKeyword.length > 0) {
      setSearchList(
        cardObj
          .filter((card) => {
            return (
              card.name.common?.toLowerCase().includes(searchKeyword) ||
              card.capital[0]?.toLowerCase().includes(searchKeyword) ||
              card.region?.toLowerCase().includes(searchKeyword)
            );
          })
          .map((card) => ({ name: card.name, cca3: card.cca3 }))
      );
    } else {
      setSearchList([]);
    }
  };

  const sortData = (value: string) => {
    const region = value;
    setCurrent("1");
    if (region !== "") {
      setSortedData(cardObj.filter((card) => card.region === region));
    } else {
      setSortedData(cardObj);
    }
    setPages(Math.ceil(sortedData.length / 20));
    formatPages();
  };

  const formatPages = () => {
    setFilteredData(
      sortedData.slice((parseInt(current) - 1) * 20, parseInt(current) * 20)
    );
  };

  const changePage = (action: string) => {
    if (action === "previous") {
      setCurrent((parseInt(current) - 1).toString());
    } else {
      setCurrent((parseInt(current) + 1).toString());
    }
    formatPages();
  };

  useEffect(() => {
    localStorage.setItem("current", current);
  }, [current]);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <>
          <div className="text-fields">
            <input
              type="text"
              className="search textbox"
              placeholder="Search for a country..."
              onChange={(e) => onSearchInput(e.target.value)}
            />
            <div className="search-icon"></div>
            <div className="search-list">
              {searchList.map((list, index) => {
                return (
                  <div key={index}>
                    <h4
                      className="sub-heading"
                      onClick={() => navigate(`card/${list.cca3}`)}
                    >
                      {list.name.common}
                    </h4>
                    {index !== searchList.length - 1 && (
                      <hr className="horizontal-row" />
                    )}
                  </div>
                );
              })}
            </div>
            <select
              className="search filter"
              onChange={(e) => sortData(e.target.value)}
              value=""
            >
              <option value="" disabled hidden>
                Filter By Region
              </option>
              {filters.map((filter, index) => (
                <option value={filter} key={index}>
                  {filter}
                </option>
              ))}
            </select>
          </div>
          {cardObj.length > 0 && (
            <div className="main-container">
              {filteredData.map((card, index) => {
                return (
                  <div
                    onClick={() => navigate(`card/${card.cca3}`)}
                    key={index}
                  >
                    <Card card={card} />
                  </div>
                );
              })}
            </div>
          )}
          <div className="pagination-container">
            <button
              className="arrow"
              onClick={() => changePage("previous")}
              disabled={current === "1"}
            >
              {"<"}
            </button>
            <div className="numbers">{current + " of " + pages}</div>
            <button
              className="arrow"
              onClick={() => changePage("next")}
              disabled={current === pages.toString()}
            >
              {">"}
            </button>
          </div>
        </>
      )}
    </>
  );
};
