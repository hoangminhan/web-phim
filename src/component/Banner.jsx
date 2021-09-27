import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// import bannerNetflix from "../assets/images/bannerNetflix.jpg";
import bannerMovie from "../assets/images/trailer.jpg";
import banner3 from "../assets/images/banner3.jpg";
import { API_KEY, URL_API, URL_IMG_BIG } from "../constant";
import { useHistory } from "react-router-dom";

Banner.propTypes = {};

function Banner({ handleClickBanner, dataBanner }) {
  const [data, setData] = useState();
  useEffect(() => {
    const getData = setInterval(() => {
      console.log(dataBanner);
      if (dataBanner) {
        setData(dataBanner[randomBaner()]);
      }
    }, 10000);
    return () => {
      clearInterval(getData);
    };
  }, [data]);

  const randomBaner = () => {
    const index = Math.floor(Math.random() * 10);
    return index;
  };
  const handleClick = (id) => {
    console.log(id);
    handleClickBanner(id);
  };
  const history = useHistory();
  console.log("document.title", history.location.pathname);

  return (
    <div className="banner__content">
      <div className="banner__content__image">
        {data ? (
          <img src={`${URL_IMG_BIG}${data?.backdrop_path}`} alt="" />
        ) : (
          <img src={bannerMovie} alt="" style={{ maxHeight: "800px" }} />
        )}
      </div>
      <div className="banner__content__body">
        <div className="banner__content__body__title">
          {data ? (
            <h2>{data?.title || data?.name}</h2>
          ) : (
            <h2
              style={{ fontSize: "2rem", bottom: "60%", position: "absolute" }}
            >
              Welcome to the movie <br /> trailer website
            </h2>
          )}
        </div>
        <div className="banner__content__body__overview">
          <p>{data?.overview}</p>
        </div>
        {data && (
          <div className="banner__content__body__action">
            <p
              className="banner__content__body__action__play"
              onClick={() => {
                handleClick(data.id);
              }}
            >
              <i className="bx bx-play"></i>
              <span>Play</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Banner;
