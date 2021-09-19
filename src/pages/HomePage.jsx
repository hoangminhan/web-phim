import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Carousel from "../component/Carousel";
import axios from "axios";
import { URL_API, API_KEY, URL_IMG, URL_IMG_BIG } from "../constant";
import MovieList from "../component/MovieList";
import SimilarMovie from "../component/SimilarMovie";
import ModalDetail from "../component/common/ModalDetail";

HomePage.propTypes = {};

function HomePage(props) {
  const [dataPopular, setDataPopular] = useState();
  const [dataTopRate, setDataTopRate] = useState();
  const [dataMovieNow, setDataMovieNow] = useState();
  const [filterPopular, setFilterPopular] = useState({
    page: 1,
  });
  const [dataDetail, setDataDetail] = useState();
  const [dataSimilar, setDataSimilar] = useState();
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
        setDataDetail(result.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    const fetchDataSimilar = async () => {
      const url = `${URL_API}/movie/${checkDetail}/similar${API_KEY}`;

      try {
        const result = await axios(url);
        console.log(result.data.results);
        setDataSimilar(result.data.results);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchDataSimilar();
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
    setCheckDetail(data);
    document.documentElement.scrollTop = 0;
  };

  const handleClickCarousel = (id) => {
    console.log(id);
    setCheckDetail(id);
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
              handleClickCarousel={handleClickCarousel}
            />
            <MovieList
              dataTopRate={dataTopRate}
              title="Top Rate"
              Pagination={Pagination}
              page={filterPopular.page}
              showDetailMovie={showDetailMovie}
            />

            {/* <MovieList
              dataTopRate={dataMovieNow}
              title="TV Shows"
              showDetailMovie={showDetailMovie}
              Pagination={Pagination}
            /> */}
          </div>
        </div>
      </div>
      <ModalDetail
        checkDetail={checkDetail}
        dataDetail={dataDetail}
        dataSimilar={dataSimilar}
      />
    </div>
  );
}

export default HomePage;
