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
  console.log(data);
  return (
    <div className="similar__movie">
      <Grid col={4} smCol={1} mdCol={2} gap={15}>
        {dataSimilar &&
          dataSimilar.map((item, index) => {
            return (
              <div key={index} className="similar__movie__item">
                <div className="similar__movie__item__image">
                  <img src={`${URL_IMG__300}${item.poster_path}`} alt="" />
                  <p className="similar__movie__item__image__play">
                    <i class="bx bx-play"></i>
                  </p>
                </div>
                <div className="similar__movie__item__content">
                  <div className="similar__movie__item__content__item">
                    <div className="similar__movie__item__content__item__title">
                      <h2>{item.title}</h2>
                    </div>
                    <div className="similar__movie__item__content__item__content">
                      <p className="similar__movie__item__content__item__content-rate">
                        <i class="bx bxs-star"></i>
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
