import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Carousel from "../component/Carousel";
import axios from "axios";
import { URL_API, API_KEY, URL_IMG, URL_IMG_BIG } from "../constant";
import MovieList from "../component/MovieList";

HomePage.propTypes = {};

function HomePage(props) {
  const [dataPopular, setDataPopular] = useState();
  const [dataTopRate, setDataTopRate] = useState();
  const [dataMovieNow, setDataMovieNow] = useState();
  const [filterPopular, setFilterPopular] = useState({
    page: 1,
  });
  const [dataDetail, setDataDetail] = useState();
  const [checkDetail, setCheckDetail] = useState();

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
      console.log(filterPopular.page);
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
      const url = `${URL_API}/tv/popular${API_KEY}`;

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
    const fetchData = async () => {
      const url = `${URL_API}/movie/${checkDetail}${API_KEY}`;

      try {
        const result = await axios(url);
        console.log(result.data);
        setDataDetail(result.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [checkDetail]);
  const settings = {
    // dots: true,
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
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const Pagination = (data) => {
    console.log(data);
    setFilterPopular({
      ...filterPopular,
      page: data,
    });
  };
  const showDetailMovie = (data) => {
    console.log(data);
    setCheckDetail(data);
    document.documentElement.scrollTop = 0;
  };
  const getTypeFilm = (genres) => {
    const result = genres.map((item, index) => {
      return item.name;
    });
    console.log(result);
    return result.toString().replaceAll(",", ", ");
  };
  return (
    <div className="main">
      <div className="content__home">
        <div className="container">
          <div className="content__home__popular">
            <Carousel
              dataCarousel={dataPopular}
              title="Movie Popular"
              settings={settings}
            />
            <MovieList
              dataTopRate={dataTopRate}
              title="Top Rate"
              // Pagination={Pagination}
              page={filterPopular.page}
              showDetailMovie={showDetailMovie}
            />

            {/* <MovieList
              dataTopRate={dataMovieNow}
              title="TV Shows"
              // Pagination={Pagination}
            /> */}
          </div>
        </div>
      </div>
      <div className={checkDetail ? "modal__detail active" : "modal__detail"}>
        <div className="modal__detail__icon">
          <i class="bx bx-x"></i>
        </div>

        <div className="modal__detail__image">
          <img src={`${URL_IMG_BIG}${dataDetail?.backdrop_path}`} alt="" />
        </div>

        <div className="modal__detail__header">
          <h2 className="modal__detail__header__title">{dataDetail?.title}</h2>
          <div className="modal__detail__header__content">
            <div className="modal__detail__header__content__btn">
              <button>
                <i class="bx bx-play"></i> <span>Play</span>
              </button>
            </div>
            <div className="modal__detail__header__content__icon">
              <p className="modal__detail__header__content__icon__item">
                <i class="bx bx-plus"></i>
              </p>
              <p className="modal__detail__header__content__icon__item">
                <i class="bx bx-like"></i>
              </p>
              <p className="modal__detail__header__content__icon__item">
                <i class="bx bx-dislike"></i>
              </p>
            </div>
          </div>
        </div>

        <div className="modal__detail__content">
          <div className="modal__detail__content__item">
            <div className="modal__detail__content__item__rate">
              <p>{dataDetail?.vote_average}</p>
              <i class="bx bxs-star"></i>
            </div>
            <p className="modal__detail__content__item__date">
              {dataDetail?.release_date}
            </p>
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
      </div>
    </div>
  );
}

export default HomePage;
