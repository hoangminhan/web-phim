import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { API_KEY, URL_API, URL_IMG_BIG } from "../constant";
import loadingVideo from "../assets/images/loadingvideo.jpg";
import Iframe from "react-iframe";
import getTypeFilm from "../ultils/getType";
import SimilarMovie from "./SimilarMovie";
import axios from "axios";

ModalSearch.propTypes = {};

function ModalSearch(props) {
  const { dataVideo, dataDetail, dataSimilar, type, idMovie } = props;
  const [video, setVideo] = useState("");

  const modalElement = document.querySelector(".modal__search");
  const modalOverlay = document.querySelector(".overlay__modal");

  const handleCloseModal = () => {
    if (modalElement) {
      modalElement.style.display = "none";
      setVideo("");
      modalOverlay.classList.remove("visible");
    }
  };
  const getVideo = async (id) => {
    const urlVideo = `${URL_API}/${type}/${id}/videos${API_KEY}`;

    const response = await axios(urlVideo);
    const index = response?.data?.results.length - 1;
    const data = response?.data?.results[index]?.key
      ? response?.data?.results[index]?.key
      : "LvUu7_R5sAE";
    setVideo(data);
  };

  const handleGetVideo = () => {
    getVideo(idMovie);
    const modalSearch = document.querySelector(".modal__search");
    modalSearch.scrollTop = 0;
  };

  const handleMoviePlay = (res) => {
    getVideo(res.id);
  };

  const historyElement = document.querySelector(
    ".header__content__search__history"
  );
  const iconModalElement = document.querySelector(
    ".header__content__search__history__title__icon"
  );

  if (iconModalElement) {
    iconModalElement.addEventListener("click", () => {
      Object.assign(historyElement.style, {
        // display: "none",
        transform: "translateX(100%)",
      });

      // overlayElement.style.display = "none";
      // historyElement.style.display = "none";
    });
  }

  return (
    <div className="modal__search">
      <div className="modal__search__icon" onClick={handleCloseModal}>
        <i className="bx bx-x"></i>
      </div>
      {video ? (
        <Iframe
          url={`https://www.youtube.com/embed/${video}`}
          width="100%"
          height="100%"
          id="myId"
          className="myClassname"
          display="initial"
          styles={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          // position="relative"
        />
      ) : (
        <div className="modal__search__image">
          <img
            src={
              dataDetail?.backdrop_path
                ? `${URL_IMG_BIG}${dataDetail.backdrop_path}`
                : loadingVideo
            }
            alt=""
          />
          <div className="modal__search__image__header">
            <h2 className="modal__search__image__header__title">
              {dataDetail?.title
                ? dataDetail.title
                : dataDetail?.name
                ? dataDetail?.name
                : dataDetail?.original_name}
            </h2>
            <div className="modal__search__image__header__content">
              <div
                className="modal__search__image__header__content__btn"
                onClick={handleGetVideo}
              >
                <button>
                  <i className="bx bx-play"></i> <span>Play</span>
                </button>
              </div>
              <div className="modal__search__image__header__content__icon">
                <p className="modal__search__image__header__content__icon__item">
                  <i className="bx bx-plus"></i>
                </p>
                <p className="modal__search__image__header__content__icon__item">
                  <i className="bx bx-like"></i>
                </p>
                <p className="modal__search__image__header__content__icon__item">
                  <i className="bx bx-dislike"></i>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="modal__detail__content">
        <div className="modal__detail__content__item">
          <div className="modal__detail__content__item__content">
            <div className="modal__detail__content__item__rate">
              <p>{dataDetail?.vote_average}</p>
              <i className="bx bxs-star"></i>
            </div>
            <p className="modal__detail__content__item__date">
              {dataDetail?.release_date
                ? dataDetail?.release_date
                : dataDetail?.last_air_date}
            </p>
          </div>
          <p className="modal__detail__content__item__overview">
            <span style={{ paddingRight: "10px" }}>Overview:</span>
            {dataDetail?.overview}
          </p>
        </div>
        <div className="modal__detail__content__item">
          <p className="modal__detail__content__item__type">
            <strong>Genres: </strong>
            {dataDetail ? getTypeFilm(dataDetail.genres) : ""}
          </p>
          <p className="modal__detail__content__item__company">
            <strong>Company: </strong>
            {dataDetail ? getTypeFilm(dataDetail.production_companies) : ""}
          </p>
          <p className="modal__detail__content__item__country">
            <strong>Country: </strong>
            {dataDetail ? getTypeFilm(dataDetail.production_countries) : ""}
          </p>
        </div>
      </div>
      <SimilarMovie dataSimilar={dataSimilar} moviePlay={handleMoviePlay} />
    </div>
  );
}

export default ModalSearch;
