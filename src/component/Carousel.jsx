import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { URL_IMG } from "../constant";

Carousel.propTypes = {};

function Carousel(props) {
  const { dataCarousel, title, settings } = props;
  const [toggleClass, setToggleClass] = useState(false);
  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDisLike, setToggleDisLike] = useState(false);
  const modalDetailElement = document.querySelector(".modal__detail");

  const handleClick = (data) => {
    console.log("click");
    props.handleClickCarousel(data);
  };

  return (
    <div style={{ paddingTop: "64px" }}>
      <h2 className="carousel__title">{title}</h2>
      <Slider {...settings}>
        {dataCarousel &&
          dataCarousel.map((item, index) => {
            return (
              <div key={index} className="carousel__content">
                <div className="carousel__content__item">
                  <img
                    className="carousel__content__item__img"
                    src={`${URL_IMG}${item.poster_path}`}
                    alt=""
                  />
                  <div className="carousel__content__item__body">
                    <img
                      className="carousel__content__item__body__img"
                      src={`${URL_IMG}${item.poster_path}`}
                      alt=""
                    />
                  </div>

                  <div className="carousel__content__item__header">
                    <div className="carousel__content__item__header__content">
                      <p className="carousel__content__item__header__content__evaluate">
                        <i className="bx bxs-star"></i>
                        <span>{item.vote_average}</span>
                      </p>
                    </div>
                    <div className="carousel__content__item__header__content">
                      <p className="carousel__content__item__header__content__love">
                        <i className="bx bxs-heart"></i>
                        <span>{item.vote_count}</span>
                      </p>
                    </div>
                  </div>

                  <div className="carousel__content__item__footer">
                    <div
                      className={
                        toggleClass
                          ? `carousel__content__item__footer__item active`
                          : "carousel__content__item__footer__item"
                      }
                      onClick={() => handleClick(item.id)}
                    >
                      <p className="carousel__content__item__footer__item--play">
                        <i className="bx bx-right-arrow"></i>
                      </p>
                    </div>
                    <div
                      className={
                        toggleLike
                          ? `carousel__content__item__footer__item active`
                          : "carousel__content__item__footer__item"
                      }
                    >
                      <p className="carousel__content__item__footer__item--play">
                        <i className="bx bx-like"></i>
                      </p>
                    </div>
                    <div
                      className={
                        toggleDisLike
                          ? `carousel__content__item__footer__item active`
                          : "carousel__content__item__footer__item"
                      }
                    >
                      <p className="carousel__content__item__footer__item--play">
                        <i className="bx bx-dislike"></i>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="carousel__content__footer">
                  <p className="carousel__content__footer__title">
                    <strong>
                      {" "}
                      {item.original_title
                        ? item.original_title
                        : item.name}{" "}
                    </strong>
                  </p>
                  <p className="carousel__content__footer__date">
                    <strong>
                      <p>
                        (
                        {item.release_date
                          ? item.release_date
                          : item.first_air_date}
                        )
                      </p>
                    </strong>
                  </p>
                </div>
              </div>
            );
          })}
      </Slider>
    </div>
  );
}

export default Carousel;
