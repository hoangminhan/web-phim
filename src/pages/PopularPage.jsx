import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "../component/Carousel";
import ModalDetail from "../component/common/ModalDetail";
import MovieList from "../component/MovieList";
import { API_KEY, URL_API } from "../constant";

PopularPage.propTypes = {};

function PopularPage(props) {
  const [dataMoviePopular, setDataMoviePopular] = useState();
  const [dataTvShowPopular, setDataTvShowPopular] = useState();
  const [dataDetail, setDataDetail] = useState();
  const [checkDetail, setCheckDetail] = useState();
  const [dataSimilar, setDataSimilar] = useState();
  const [filterMoviePopular, setFilterMoviePopular] = useState({ page: 1 });

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: false,
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
    const getDataDetail = async () => {
      const url = `${URL_API}/movie/${checkDetail}${API_KEY}`;
      const result = await axios(url);
      setDataDetail(result.data);
      console.log(result.data);
    };
    const getDataSimilar = async () => {
      const url = `${URL_API}/movie/${checkDetail}/similar${API_KEY}`;
      const result = await axios(url);
      console.log(result.data);
      setDataSimilar(result.data.results);
    };
    getDataSimilar();
    getDataDetail();
  }, [checkDetail]);
  const handlePagination = (page) => {
    setFilterMoviePopular({
      ...filterMoviePopular,
      page,
    });
  };
  const handleShowDetailMovie = (id) => {
    setCheckDetail(id);
  };
  const handleClickCarousel = (id) => {
    console.log(id);
    setCheckDetail(id);
  };

  return (
    <div className="main">
      <div className="content__new">
        <div className="container">
          <div className="content__new__upcoming">
            <MovieList
              dataMovie={dataMoviePopular}
              title="Movie Popular"
              // Pagination={handlePagination}
              page={filterMoviePopular.page}
              showDetailMovie={handleShowDetailMovie}
            />
            <Carousel
              dataCarousel={dataTvShowPopular}
              title="Tv Shows Popular"
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
  );
}

export default PopularPage;
