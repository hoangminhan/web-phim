import React from "react";
import PropTypes from "prop-types";
import { URL_IMG } from "../constant";
import Grid from "./Grid";

MovieList.propTypes = {
  Pagination: PropTypes.func,
};

function MovieList(props) {
  const { dataMovie, title, Pagination, page, type } = props;

  const modalDetail = document.querySelector(".modal__detail");
  const modalOverlay = document.querySelector(".overlay__modal");
  const handlePagination = (data) => {
    props.Pagination(data);
    const bannerElement = document.querySelector(".banner__content");
    // console.log([bannerElement]);
    document.documentElement.scrollTop = bannerElement.clientHeight;
  };
  const handleClickDetail = (item) => {
    props.showDetailMovie(item.id);

    document.documentElement.scrollTop = 80;

    if (modalOverlay) {
      modalDetail.classList.add("active");
      modalOverlay.classList.add("visible");
    }
  };

  return (
    <div className="list__movie">
      <h2 className="list__movie__title"># {title}</h2>

      <Grid col={6} smCol={2} mdCol={4} gap={16}>
        {dataMovie &&
          dataMovie.map((item, index) => {
            return (
              <div key={index} className="list__movie__item">
                <div className="list__movie__item__image">
                  <img src={`${URL_IMG}${item.poster_path}`} alt="abc" />
                </div>
                <div className="list__movie__item__content">
                  <h3 className="list__movie__item__content__title">
                    {item.title ? item.title : item.name}
                  </h3>
                  <p className="list__movie__item__content__data">
                    (
                    {item.release_date
                      ? item.release_date
                      : item.first_air_date}
                    )
                  </p>
                </div>
                <div className="list__movie__item__hover">
                  <div className="list__movie__item__hover__content">
                    <div className="list__movie__item__hover__content__item">
                      <div className="list__movie__item__hover__content__item-icon">
                        <p
                          style={{ color: "#000", backgroundColor: "#fff" }}
                          onClick={() => {
                            handleClickDetail(item);
                          }}
                        >
                          <i className="bx bxs-right-arrow"></i>
                        </p>
                        <p>
                          <i className="bx bx-like"></i>
                        </p>
                        <p>
                          <i className="bx bx-dislike"></i>
                        </p>
                        <p>
                          <i className="bx bx-plus"></i>
                        </p>
                      </div>
                    </div>
                    <div className="list__movie__item__hover__content__item">
                      <p className="list__movie__item__hover__content__item__title">
                        {item.title ? item.title : item.name}
                      </p>
                      <p className="list__movie__item__hover__content__item__date">
                        (
                        {item.release_date
                          ? item.release_date
                          : item.first_air_date}
                        )
                      </p>
                    </div>
                    <div className="list__movie__item__hover__content__item">
                      <div className="list__movie__item__hover__content__item__rate">
                        <p>
                          <i className="bx bxs-star"></i>
                          {item.vote_average}
                        </p>
                        <p style={{ marginLeft: "auto" }}>
                          <i className="bx bxs-heart"></i>
                          {item.vote_count}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </Grid>
      {Pagination && (
        <div className="list__movie__pagination">
          <button
            disabled={page == 1}
            className="list__movie__pagination__button"
            onClick={() => {
              const data = page > 1 ? page - 1 : page;
              handlePagination(data);
            }}
          >
            <i
              className="bx bxs-left-arrow"
              style={{ paddingRight: "10px" }}
            ></i>
            Previous
          </button>
          <button
            className="list__movie__pagination__button"
            onClick={() => {
              const data = page + 1;
              handlePagination(data);
            }}
          >
            Next
            <i
              className="bx bxs-right-arrow"
              style={{ paddingLeft: "10px" }}
            ></i>
          </button>
        </div>
      )}
    </div>
  );
}

export default MovieList;
