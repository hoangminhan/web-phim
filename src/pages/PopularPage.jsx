import axios from "axios";
import React, { useEffect, useState } from "react";
import Banner from "../component/Banner";
import Carousel from "../component/Carousel";
import ModalDetail from "../component/common/ModalDetail";
import ModalDetailTv from "../component/ModalDetailTv";
import MovieList from "../component/MovieList";
import { API_KEY, URL_API } from "../constant";
import bannerLoading from "../assets/images/loadingvideo.jpg";

PopularPage.propTypes = {};

function PopularPage(props) {
  const [dataMoviePopular, setDataMoviePopular] = useState();
  const [dataTvShowPopular, setDataTvShowPopular] = useState();
  const [dataDetail, setDataDetail] = useState();
  const [dataDetailTv, setDataDetailTv] = useState();
  const [checkDetail, setCheckDetail] = useState();
  const [dataSimilar, setDataSimilar] = useState();
  const [dataSimilarTv, setDataSimilarTv] = useState();
  const [filterMoviePopular, setFilterMoviePopular] = useState({ page: 1 });

  const modalDetail = document.querySelector(".modal__detail");
  const modalOverlay = document.querySelector(".overlay__modal");

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", right: "-10px" }}
        onClick={onClick}
      />
    );
  }
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", left: "-10px" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        },
      },
    ],
  };

  useEffect(() => {
    document.title = "New And Title";
    const getData = async () => {
      const url = `${URL_API}/movie/upcoming${API_KEY}&page=${filterMoviePopular.page}`;
      const result = await axios(url);
      setDataMoviePopular(result.data.results);
    };
    const getDataTvShow = async () => {
      const url = `${URL_API}/tv/popular${API_KEY}&page=2`;
      const result = await axios(url);
      setDataTvShowPopular(result.data.results);
    };
    getData();
    getDataTvShow();
  }, [filterMoviePopular]);

  useEffect(() => {
    if (checkDetail) {
      const getDataDetail = async () => {
        const url = `${URL_API}/movie/${checkDetail}${API_KEY}`;
        const result = await axios(url);
        setDataDetail(result.data);
      };
      const getDataSimilar = async () => {
        const url = `${URL_API}/movie/${checkDetail}/similar${API_KEY}`;
        const result = await axios(url);
        setDataSimilar(result.data.results);
      };
      getDataSimilar();
      getDataDetail();
    }
  }, [checkDetail]);
  useEffect(() => {
    if (checkDetail) {
      const getDataDetail = async () => {
        const url = `${URL_API}/tv/${checkDetail}${API_KEY}`;
        const result = await axios(url);
        setDataDetailTv(result.data);
        console.log(result.data);
      };
      const getDataSimilar = async () => {
        const url = `${URL_API}/tv/${checkDetail}/similar${API_KEY}`;
        const result = await axios(url);
        setDataSimilarTv(result.data.results);
      };
      getDataSimilar();
      getDataDetail();
    }
  }, [checkDetail]);

  const handleShowDetailMovie = (id) => {
    setCheckDetail(id);
  };
  const handleClickCarousel = (id) => {
    console.log(id);
    setCheckDetail(id);
  };
  const handleClickBanner = (id) => {
    console.log(id);
    setCheckDetail(id);
    if (modalOverlay) {
      modalDetail.classList.add("active");
      modalOverlay.classList.add("visible");
    }
  };

  return (
    <>
      {dataMoviePopular ? (
        <div className="main">
          <Banner
            dataBanner={dataMoviePopular}
            handleClickBanner={handleClickBanner}
          />
          <div className="content__new">
            <div className="container">
              <div className="content__new__upcoming">
                <MovieList
                  dataMovie={dataMoviePopular}
                  title="Movie Popular"
                  page={filterMoviePopular.page}
                  showDetailMovie={handleShowDetailMovie}
                />
                <Carousel
                  dataCarousel={dataTvShowPopular}
                  title="# Tv Shows Popular"
                  settings={settings}
                  handleClickCarousel={handleClickCarousel}
                />
              </div>
            </div>
          </div>
          <ModalDetail
            checkDetail={checkDetail}
            dataDetail={dataDetail}
            dataSimilar={dataSimilar}
          />
        </div>
      ) : (
        <img src={bannerLoading} alt="" />
      )}
    </>
  );
}

export default PopularPage;
