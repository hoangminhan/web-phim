import React, { useEffect, useState } from "react";
import { URL_IMG_BIG } from "../../constant";
import getTypeFilm from "../../ultils/getType";
import SimilarMovie from "../SimilarMovie";

ModalDetail.propTypes = {};

function ModalDetail(props) {
  const { checkDetail, dataDetail, dataSimilar } = props;
  const [check, setCheck] = useState(false);
  console.log("cehck", checkDetail);

  const handleClickModal = () => {
    const modalDetail = document.querySelector(".modal__detail.active");
    const modalOverlay = document.querySelector(".overlay__modal");
    modalOverlay.classList.remove("visible");
    modalDetail.classList.remove("active");
    setCheck(true);
    console.log(modalDetail);
  };
  useEffect(() => {
    if (checkDetail) {
      console.log("detail", checkDetail);
      const modalDetail = document.querySelector(".modal__detail");
      const modalOverlay = document.querySelector(".overlay__modal");
      modalDetail.classList.add("active");
      modalOverlay.classList.add("visible");
    }
  }, [checkDetail]);
  return (
    <>
      <div className="overlay__modal">
        <div className={checkDetail ? "modal__detail active" : "modal__detail"}>
          <div className="modal__detail__icon" onClick={handleClickModal}>
            <i class="bx bx-x"></i>
          </div>

          <div className="modal__detail__image">
            <img src={`${URL_IMG_BIG}${dataDetail?.backdrop_path}`} alt="" />

            <div className="modal__detail__image__header">
              <h2 className="modal__detail__image__header__title">
                {dataDetail?.title
                  ? dataDetail.title
                  : dataDetail?.name
                  ? dataDetail?.name
                  : dataDetail?.original_name}
              </h2>
              <div className="modal__detail__image__header__content">
                <div className="modal__detail__image__header__content__btn">
                  <button>
                    <i class="bx bx-play"></i> <span>Play</span>
                  </button>
                </div>
                <div className="modal__detail__image__header__content__icon">
                  <p className="modal__detail__image__header__content__icon__item">
                    <i class="bx bx-plus"></i>
                  </p>
                  <p className="modal__detail__image__header__content__icon__item">
                    <i class="bx bx-like"></i>
                  </p>
                  <p className="modal__detail__image__header__content__icon__item">
                    <i class="bx bx-dislike"></i>
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
                  <i class="bx bxs-star"></i>
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
                {dataDetail ? getTypeFilm(dataDetail.production_companies) : ""}
              </p>
              <p className="modal__detail__content__item__country">
                <strong>Country: </strong>
                {dataDetail ? getTypeFilm(dataDetail.production_countries) : ""}
              </p>
            </div>
          </div>

          <SimilarMovie dataSimilar={dataSimilar} />
        </div>
      </div>
    </>
  );
}

export default ModalDetail;
