import React from "react";
import PropTypes from "prop-types";
import { URL_IMG, URL_IMG1 } from "../constant";

MovieSearch.propTypes = {};

function MovieSearch(props) {
  const handleWatch = (data) => {
    console.log("data", data);
  };
  const { dataSearch } = props;
  return (
    <>
      <h2 className="header__content__search__history__title">
        Tìm kiếm nhiều nhất
      </h2>
      <ul className="header__content__search__history__list">
        {dataSearch &&
          dataSearch.map((item, index) => {
            return (
              <li
                key={index}
                className="header__content__search__history__list__item"
                onClick={() => handleWatch(item.media_type)}
              >
                <div className="header__content__search__history__list__item__image">
                  <img src={`${URL_IMG1}${item.poster_path}`} alt="" />
                </div>
                <div className="header__content__search__history__list__item__content">
                  <p>{item.name ? item.name : item.title}</p>
                </div>
                <p className="header__content__search__history__list__item__play">
                  <i
                    className="bx bx-play"
                    onClick={() => {
                      console.log("hello");
                    }}
                  ></i>
                </p>
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default MovieSearch;
