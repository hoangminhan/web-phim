import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Carousel from "../component/Carousel";
import axios from "axios";
import { URL_API, API_KEY, URL_IMG, URL_IMG_BIG } from "../constant";
import MovieList from "../component/MovieList";
import ModalDetail from "../component/common/ModalDetail";
import Banner from "../component/Banner";
import bannerNetflix from "../assets/images/loadingvideo.jpg";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: "-10px", zIndex: 0 }}
      onClick={onClick}
    />
  );
}
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "-10px", zIndex: 0 }}
      onClick={onClick}
    />
  );
}

const settings = {
  infinite: true,
  speed: 500,
  // arrows: false,
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

HomePage.propTypes = {};

function HomePage(props) {
  const [dataPopular, setDataPopular] = useState();
  const [dataTopRate, setDataTopRate] = useState();
  const [dataMovieNow, setDataMovieNow] = useState();
  const [filterPopular, setFilterPopular] = useState({
    page: 1,
  });
  const [filterTvShow, setFilterTvShow] = useState({
    page: 1,
  });
  const [dataDetail, setDataDetail] = useState();
  const [dataSimilar, setDataSimilar] = useState();
  const [checkDetail, setCheckDetail] = useState();

  const modalDetail = document.querySelector(".modal__detail");
  const modalOverlay = document.querySelector(".overlay__modal");

  useEffect(() => {
    document.title = "Home Page";
    const fetchData = async () => {
      const url = `${URL_API}/movie/popular${API_KEY}`;

      try {
        const result = await axios(url);
        setDataPopular(result.data.results);
      } catch (error) {
        console.log("error", error);
      }
    };
    const getDataTopRate = async () => {
      const urlTopRate = `${URL_API}/movie/top_rated${API_KEY}&page=${filterPopular.page}`;

      try {
        const result = await axios(urlTopRate);
        setDataTopRate(result.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getDataTopRate();
    fetchData();
  }, [filterPopular]);
  useEffect(() => {
    const fetchData = async () => {
      const url = `${URL_API}/tv/popular${API_KEY}&page=${filterTvShow.page}`;

      try {
        const result = await axios(url);
        setDataMovieNow(result.data.results);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (checkDetail) {
      const fetchData = async () => {
        const url = `${URL_API}/movie/${checkDetail}${API_KEY}`;

        try {
          const result = await axios(url);
          setDataDetail(result.data);
        } catch (error) {
          console.log("error", error);
        }
      };
      const fetchDataSimilar = async () => {
        const url = `${URL_API}/movie/${checkDetail}/similar${API_KEY}`;

        try {
          const result = await axios(url);
          setDataSimilar(result.data.results);
        } catch (error) {
          console.log("error", error);
        }
      };
      fetchDataSimilar();
      fetchData();
    }
  }, [checkDetail]);

  const showDetailMovie = (data) => {
    setCheckDetail(data);
    document.documentElement.scrollTop = 0;
  };

  const handleClickCarousel = (id) => {
    console.log("id", id);
    setCheckDetail(id);
    if (modalOverlay) {
      modalDetail.classList.add("active");
      modalOverlay.classList.add("visible");
    }
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
      {dataTopRate ? (
        <div className="main">
          <Banner
            handleClickBanner={handleClickBanner}
            dataBanner={dataTopRate}
          />
          <div className="content__home">
            <div className="container">
              <div className="content__home__popular">
                <Carousel
                  dataCarousel={dataPopular}
                  title="# Movie Popular"
                  settings={settings}
                  handleClickCarousel={handleClickCarousel}
                />
                <MovieList
                  dataMovie={dataTopRate}
                  title="Top Rate"
                  // Pagination={Pagination}
                  page={filterPopular.page}
                  type="movie"
                  showDetailMovie={showDetailMovie}
                />

                <MovieList
                  dataMovie={dataMovieNow}
                  title="TV Shows"
                  type="tv"
                  showDetailMovie={showDetailMovie}
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
        <img src={bannerNetflix} alt="" />
      )}
    </>
  );
}

export default HomePage;
