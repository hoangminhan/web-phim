import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { URL_IMG } from "../constant";

Carousel.propTypes = {};

function Carousel(props) {
  const { dataCarousel, title, settings } = props;
  const [toggleClass, setToggleClass] = useState(false);
  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDisLike, setToggleDisLike] = useState(false);
  const activeRef = useRef(null);
  // const handleClick = (e) => {
  //   // activeRef.current.classList.toggle("active");
  //   const receive = e;
  //   if (receive === "play") {
  //     // setToggleClass(!toggleClass);
  //     // setToggleDisLike(false);
  //     // setToggleLike(false);
  //   } else if (receive === "like") {
  //     setToggleLike(!toggleLike);
  //     setToggleDisLike(false);
  //     setToggleClass(false);
  //   } else {
  //     setToggleLike(false);
  //     setToggleDisLike(!toggleDisLike);
  //     setToggleClass(false);
  //   }
  // };
  const handleClick = (data) => {
    props.handleClickCarousel(data);
  };

  return (
    <div>
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
                        <i class="bx bxs-star"></i>
                        <span>{item.vote_average}</span>
                      </p>
                    </div>
                    <div className="carousel__content__item__header__content">
                      <p className="carousel__content__item__header__content__love">
                        <i class="bx bxs-heart"></i>
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
                      // ref={activeRef}
                      onClick={() => handleClick(item.id)}
                    >
                      <p className="carousel__content__item__footer__item--play">
                        <i class="bx bx-right-arrow"></i>
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
                        <i class="bx bx-like"></i>
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
                        <i class="bx bx-dislike"></i>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="carousel__content__footer">
                  <p className="carousel__content__footer__title">
                    <strong> {item.original_title} </strong>
                  </p>
                  <p className="carousel__content__footer__date">
                    <strong>
                      <p>({item.release_date})</p>
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
