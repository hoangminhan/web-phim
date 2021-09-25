import React from "react";
import { URL_IMG1 } from "../constant";

MovieSearch.propTypes = {};

function MovieSearch(props) {
  const { dataSearch } = props;

  const inputElement = document.querySelector(
    ".header__content__search__input"
  );
  const historyElement = document.querySelector(
    ".header__content__search__history"
  );

  const handleWatch = (data) => {
    props.handleDataModal({
      type: data.media_type,
      id: data.id,
    });
    historyElement.style.display = "none";

    const modalOverlay = document.querySelector(".overlay__modal");
    modalOverlay.classList.add("visible");
  };
  if (inputElement) {
    inputElement.addEventListener("click", () => {
      historyElement.style.display = "block";

      Object.assign(historyElement.style, {
        display: "block",
        transform: "translateX(0)",
      });
    });
  }

  return (
    <>
      <h2 className="header__content__search__history__title">
        <i className="header__content__search__history__title__icon bx bxs-exit"></i>
        <span>Tìm kiếm nhiều nhất</span>
      </h2>
      <ul className="header__content__search__history__list">
        {dataSearch &&
          dataSearch.map((item, index) => {
            return (
              <li
                key={index}
                className="header__content__search__history__list__item"
                onClick={() => handleWatch(item)}
              >
                <div className="header__content__search__history__list__item__image">
                  <img src={`${URL_IMG1}${item.poster_path}`} alt="" />
                </div>
                <div className="header__content__search__history__list__item__content">
                  <p>{item.name ? item.name : item.title}</p>
                </div>
                <p className="header__content__search__history__list__item__play">
                  <i className="bx bx-play"></i>
                </p>
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default MovieSearch;
