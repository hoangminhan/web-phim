import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Iframe from "react-iframe";

import { API_KEY, URL_API, URL_IMG_BIG } from "../../constant";
import getTypeFilm from "../../ultils/getType";
import SimilarMovie from "../SimilarMovie";
import loadingVideo from "../../assets/images/loadingvideo.jpg";

ModalDetail.propTypes = {};

function ModalDetail(props) {
  const { checkDetail, dataDetail, dataSimilar } = props;
  const [check, setCheck] = useState(false);
  const history = useHistory();
  const [dataVideo, setDataVideo] = useState();
  const [type, setType] = useState("movie");

  const handleClickModal = () => {
    const modalDetail = document.querySelector(".modal__detail.active");
    const modalOverlay = document.querySelector(".overlay__modal");
    modalOverlay.classList.remove("visible");
    modalDetail.classList.remove("active");
    setDataVideo("");
    setCheck(true);
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
    try {
      const url = `${URL_API}/${type}/${checkDetail}/videos${API_KEY}`;
      const result = await axios(url);
      const index = result?.data?.results.length;
      if (index === 0) {
        getVideoTv();
      } else {
        const data = result?.data?.results[index - 1]?.key
          ? result?.data?.results[index - 1]?.key
          : "LvUu7_R5sAE";
        setDataVideo(data);
      }
    } catch (error) {}
  };

  const handleDetail = (item) => {
    const name = item?.name
      ? item?.name.replaceAll(" ", "-")
      : item?.title.replaceAll(" ", "-");
    getVideo();
  };
  const handleMoviePlay = (res) => {
    (async function getData() {
      const url = `${URL_API}/movie/${res.id}/videos${API_KEY}`;
      const result = await axios(url);
      const index = result?.data?.results.length - 1;
      const data = result?.data?.results[index]?.key
        ? result?.data?.results[index]?.key
        : "LvUu7_R5sAE";
      setDataVideo(data);
    })();
  };
  useEffect(() => {
    const { location } = history;
    if (location.pathname == "/tv-show") {
      setType("tv");
    } else if (location.pathname == "/movies") {
      setType("movie");
    }
    // if (checkDetail) {
    //   const modalDetail = document.querySelector(".modal__detail");
    //   const modalOverlay = document.querySelector(".overlay__modal");
    //   modalDetail.classList.add("active");
    //   modalOverlay.classList.add("visible");
    // }
  }, [checkDetail]);

  const handleClickPlay = () => {
    console.log("play");
  };
  return (
    <>
      <div className="overlay__modal">
        {/* <div className={checkDetail ? "modal__detail active" : "modal__detail"}> */}
        <div className="modal__detail">
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
                  src={
                    dataDetail?.backdrop_path
                      ? `${URL_IMG_BIG}${dataDetail?.backdrop_path}`
                      : loadingVideo
                  }
                  alt=""
                  style={{ width: "100%" }}
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

          <SimilarMovie dataSimilar={dataSimilar} moviePlay={handleMoviePlay} />
        </div>
      </div>
    </>
  );
}

export default ModalDetail;
