import React from "react";
import PropTypes from "prop-types";
import Grid from "./Grid";
import { URL_IMG, URL_IMG__300 } from "../constant";

SimilarMovie.propTypes = {};

function SimilarMovie(props) {
  const { dataSimilar } = props;
  let data = [];
  for (let i = 0; i < 8; i++) {
    if (dataSimilar) {
      data = [...data, dataSimilar[i]];
    }
  }
  const handlePlay = (data) => {
    props.moviePlay(data);
    const modalDetail = document.querySelector(".modal__detail");
    const modalSearch = document.querySelector(".modal__search");
    modalDetail.scrollTop = 0;
    modalSearch.scrollTop = 0;
  };

  return (
    <div className="similar__movie">
      <h2
        style={{ color: "#fff", paddingBottom: "32px", letterSpacing: "1px" }}
      >
        More Like This
      </h2>
      <Grid col={4} smCol={1} mdCol={2} gap={15}>
        {dataSimilar &&
          dataSimilar.map((item, index) => {
            return (
              <div key={index} className="similar__movie__item">
                <div className="similar__movie__item__image">
                  <img src={`${URL_IMG__300}${item.poster_path}`} alt="" />
                  <p
                    className="similar__movie__item__image__play"
                    onClick={() => handlePlay(item)}
                  >
                    <i className="bx bx-play"></i>
                  </p>
                </div>
                <div className="similar__movie__item__content">
                  <div className="similar__movie__item__content__item">
                    <div className="similar__movie__item__content__item__title">
                      <h2>{item.title}</h2>
                    </div>
                    <div className="similar__movie__item__content__item__content">
                      <p className="similar__movie__item__content__item__content-rate">
                        <i className="bx bxs-star"></i>
                        <p>{item.vote_average}</p>
                      </p>
                      <p className="similar__movie__item__content__item__content-date">
                        {item.release_date}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="similar__movie__item__overview">
                  <p>{item.overview}</p>
                </div>
              </div>
            );
          })}
      </Grid>
    </div>
  );
}

export default SimilarMovie;
