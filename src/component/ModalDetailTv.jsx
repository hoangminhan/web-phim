import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Iframe from "react-iframe";
import { API_KEY, URL_API, URL_IMG_BIG } from "../constant";
import getTypeFilm from "../ultils/getType";
import SimilarMovie from "./SimilarMovie";

ModalDetailTv.propTypes = {};

function ModalDetailTv(props) {
  const { checkDetail, dataDetail, dataSimilar } = props;
  const history = useHistory();
  const [dataVideo, setDataVideo] = useState();
  const [type, setType] = useState("movie");

  const handleClickModal = () => {
    const modalDetail = document.querySelector(".modal__detail.active");
    const modalOverlay = document.querySelector(".overlay__modal");
    modalOverlay.classList.remove("visible");
    modalDetail.classList.remove("active");
    setDataVideo("");
  };

  const getVideoTv = async () => {
    const url = `${URL_API}/tv/${checkDetail}/videos${API_KEY}`;
    const result = await axios(url);
    const index = result?.data?.results.length - 1;
    const data = result?.data?.results[index]?.key
      ? result?.data?.results[index]?.key
      : "LvUu7_R5sAE";
    setDataVideo(data);
  };
  const getVideo = async () => {
    const url = `${URL_API}/${type}/${checkDetail}/videos${API_KEY}`;
    const result = await axios(url);
    const index = result?.data?.results.length;
    debugger;
    if (index === 0) {
      getVideoTv();
    } else {
      const data = result?.data?.results[index - 1]?.key
        ? result?.data?.results[index - 1]?.key
        : "LvUu7_R5sAE";
      setDataVideo(data);
    }
  };

  useEffect(() => {
    const { location } = history;
    console.log(location);
    if (location.pathname == "/tv-show") {
      setType("tv");
    } else if (location.pathname == "/movies") {
      setType("movie");
    }
    if (checkDetail) {
      const modalDetail = document.querySelector(".modal__detail");
      const modalOverlay = document.querySelector(".overlay__modal");
      modalDetail.classList.add("active");
      modalOverlay.classList.add("visible");
    }
  }, [checkDetail]);

  const handleDetail = (item) => {
    const { location } = history;
    const name = item.name
      ? item.name.replaceAll(" ", "-")
      : item.title.replaceAll(" ", "-");
    getVideo();
  };
  return (
    <>
      <div className="overlay__modal">
        <div className={checkDetail ? "modal__detail active" : "modal__detail"}>
          <div className="modal__detail__icon" onClick={handleClickModal}>
            <i className="bx bx-x"></i>
          </div>

          {dataVideo ? (
            <Iframe
              url={`https://www.youtube.com/embed/${dataVideo}`}
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
            />
          ) : (
            <>
              <div className="modal__detail__image">
                <img
                  src={`${URL_IMG_BIG}${dataDetail?.backdrop_path}`}
                  alt=""
                />

                <div className="modal__detail__image__header">
                  <h2 className="modal__detail__image__header__title">
                    {dataDetail?.title
                      ? dataDetail.title
                      : dataDetail?.name
                      ? dataDetail?.name
                      : dataDetail?.original_name}
                  </h2>
                  <div className="modal__detail__image__header__content">
                    <div
                      className="modal__detail__image__header__content__btn"
                      onClick={() => handleDetail(dataDetail)}
                    >
                      <button>
                        <i className="bx bx-play"></i> <span>Play</span>
                      </button>
                    </div>
                    <div className="modal__detail__image__header__content__icon">
                      <p className="modal__detail__image__header__content__icon__item">
                        <i className="bx bx-plus"></i>
                      </p>
                      <p className="modal__detail__image__header__content__icon__item">
                        <i className="bx bx-like"></i>
                      </p>
                      <p className="modal__detail__image__header__content__icon__item">
                        <i className="bx bx-dislike"></i>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal__detail__content">
                <div className="modal__detail__content__item">
                  <div className="modal__detail__content__item__content">
                    <div className="modal__detail__content__item__rate">
                      <p>{dataDetail?.vote_average}</p>
                      <i className="bx bxs-star"></i>
                    </div>
                    <p className="modal__detail__content__item__date">
                      {dataDetail?.release_date}
                    </p>
                  </div>
                  <p className="modal__detail__content__item__overview">
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
                    {dataDetail
                      ? getTypeFilm(dataDetail.production_companies)
                      : ""}
                  </p>
                  <p className="modal__detail__content__item__country">
                    <strong>Country: </strong>
                    {dataDetail
                      ? getTypeFilm(dataDetail.production_countries)
                      : ""}
                  </p>
                </div>
              </div>
            </>
          )}

          <SimilarMovie dataSimilar={dataSimilar} />
        </div>
      </div>
    </>
  );
}

export default ModalDetailTv;
