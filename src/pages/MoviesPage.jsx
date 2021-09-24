import axios from "axios";
import React, { useEffect, useState } from "react";
import Banner from "../component/Banner";
import ModalDetail from "../component/common/ModalDetail";
import MovieList from "../component/MovieList";
import { API_KEY, URL_API } from "../constant";

MoviesPage.propTypes = {};

function MoviesPage(props) {
  const [movieFilter, setMovieFilter] = useState({
    page: 1,
  });
  const [dataMovie, setDataMovie] = useState();
  const [dataDetail, setDataDetail] = useState();
  const [checkDetail, setCheckDetail] = useState();
  const [dataSimilar, setCheckDataSimilar] = useState();

  useEffect(() => {
    const getData = async () => {
      document.title = "Movies";
      const url = `${URL_API}/movie/popular${API_KEY}&page=${movieFilter.page}`;
      try {
        const result = await axios(url);
        setDataMovie(result.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [movieFilter]);
  useEffect(() => {
    if (checkDetail) {
      const getDataSimilar = async () => {
        const url = `${URL_API}/movie/${checkDetail}/similar${API_KEY}`;
        try {
          const result = await axios(url);
          setCheckDataSimilar(result.data.results);
        } catch (error) {
          console.log(error);
        }
      };
      const getDataDetail = async () => {
        const url = `${URL_API}/movie/${checkDetail}${API_KEY}`;
        try {
          const result = await axios(url);
          setDataDetail(result.data);
        } catch (error) {
          console.log(error);
        }
      };
      getDataSimilar();
      getDataDetail();
    }
  }, [checkDetail]);

  const Pagination = (page) => {
    setMovieFilter({
      ...movieFilter,
      page,
    });
  };
  const showDetailMovie = (id) => {
    setCheckDetail(id);
    document.documentElement.scrollTop = 0;
  };
  return (
    <div className="main">
      {/* <Banner /> */}
      <div className="content__movie">
        <div className="container">
          <div className="content__movie__popular">
            <MovieList
              title="Movie Top Rate"
              dataMovie={dataMovie}
              Pagination={Pagination}
              page={movieFilter.page}
              showDetailMovie={showDetailMovie}
            />
          </div>
        </div>
      </div>
      <ModalDetail
        checkDetail={checkDetail}
        dataSimilar={dataSimilar}
        dataDetail={dataDetail}
      />
    </div>
  );
}

export default MoviesPage;
