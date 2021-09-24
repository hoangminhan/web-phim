import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { API_KEY, URL_API } from "../constant";
import axios from "axios";
import MovieList from "../component/MovieList";
import ModalDetail from "../component/common/ModalDetail";
import Banner from "../component/Banner";

ShowPage.propTypes = {};

function ShowPage(props) {
  const [dataTvShow, setDataTvShow] = useState();
  const [dataDetail, setDataDetail] = useState();
  const [checkDetail, setCheckDetail] = useState();
  const [dataSimilar, setDataSimilar] = useState();
  const [filterTvShow, setFilterTvShow] = useState({ page: 1 });

  useEffect(() => {
    document.title = "Tv Shows";
    const url = `${URL_API}/tv/top_rated${API_KEY}&page=${filterTvShow.page}`;
    const getData = async () => {
      const result = await axios(url);
      setDataTvShow(result.data.results);
    };
    getData();
  }, [filterTvShow]);
  useEffect(() => {
    if (checkDetail) {
      const getDataDetail = async () => {
        const url = `${URL_API}/tv/${checkDetail}${API_KEY}`;
        const result = await axios(url);
        setDataDetail(result.data);
        console.log(result.data);
      };
      const getDataSimilar = async () => {
        const url = `${URL_API}/tv/${checkDetail}/similar${API_KEY}`;
        const result = await axios(url);
        console.log(result.data);
        setDataSimilar(result.data.results);
      };
      getDataSimilar();
      getDataDetail();
    }
  }, [checkDetail]);
  const handlePagination = (page) => {
    setFilterTvShow({
      ...filterTvShow,
      page,
    });
  };
  const handleShowDetailMovie = (id) => {
    setCheckDetail(id);
  };
  return (
    <div className="main">
      {/* <Banner /> */}
      <div className="content__tv">
        <div className="container">
          <div className="content__tv__popular">
            <MovieList
              dataMovie={dataTvShow}
              title="Tv Shows"
              Pagination={handlePagination}
              page={filterTvShow.page}
              showDetailMovie={handleShowDetailMovie}
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

export default ShowPage;
