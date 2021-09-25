import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import logo from "../../assets/images/logo.png";
import Menu from "./../Menu";
import { API_KEY, URL_API, URL_IMG, URL_SEARCH } from "../../constant";
import axios from "axios";
import MovieSearch from "../MovieSearch";
import ModalDetail from "./ModalDetail";
import ModalSearch from "../ModalSearch";

const getFilm = (data) => {
  const result = data.map((item, index) => {
    if (index < 10) {
      return item;
    }
  });
  return result.filter((item) => {
    return item !== undefined;
  });
};

function Header(props) {
  const [checkClick, setCheckClick] = useState(false);
  const headerShrink = useRef();
  const [dataInput, setDataInput] = useState("");
  const [checkToggle, setCheckToggle] = useState(false);
  const history = useHistory();
  const [dataSearch, setDataSearch] = useState();
  const [filterSearch, setFilterSearch] = useState();
  const [dataDetail, setDataDetail] = useState();
  const [checkDetail, setCheckDetail] = useState();
  const [dataSimilar, setDataSimilar] = useState();
  const [showModal, setShowModal] = useState(false);

  const [video, setVideo] = useState();
  const [type, setType] = useState("movie");

  const modalElement = document.querySelector(".modal__search");
  console.log(modalElement);

  useEffect(() => {
    const getData = async () => {
      const url = `${URL_SEARCH}${API_KEY}&language=en-US&query=${
        filterSearch ? filterSearch : "c"
      }&page=1&include_adult=false`;
      try {
        const result = await axios(url);
        setDataSearch(getFilm(result.data.results));
      } catch (error) {
        console.log("error", error);
      }
    };
    getData();
  }, [filterSearch]);
  useEffect(() => {
    const searchElement = document.querySelector(
      ".header__content__search__history"
    );
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 70 ||
        document.documentElement.scrollTop > 70
      ) {
        headerShrink.current.classList.add("shrink");
        if (searchElement) {
          searchElement.style.top = "64px";
        }
      } else {
        headerShrink.current.classList.remove("shrink");
        if (searchElement) {
          searchElement.style.top = "130px";
        }
      }
    });
  }, []);

  // handle toggle Menu
  const handleToggleNav = (data) => {
    const navElement = document.querySelector(".nav__bar");

    if (data === true) {
      navElement.classList.add("active");
      setCheckToggle(!checkToggle);
    } else {
      navElement?.classList.remove("active");
      setCheckToggle(!checkToggle);
    }
  };
  const handleDisplay = (data) => {
    const inputElement = document.querySelector(
      ".header__content__search__input"
    );
    if (data == true) {
      const styles = {
        display: "block",
      };

      Object.assign(inputElement.style, styles);
      setCheckClick(!checkClick);
    } else {
      inputElement.style.display = "none";
      setCheckClick(!checkClick);
    }
  };
  const handleDataModal = (data) => {
    console.log("dataHeader", data);
    setCheckDetail(data.id);
    setType(data.type);
    setShowModal(true);
    if (modalElement) {
      modalElement.style.display = "block";
    }
  };

  useEffect(() => {
    if (checkDetail) {
      const url = `${URL_API}/${type}/${checkDetail}${API_KEY}`;
      const urlSimliar = `${URL_API}/${type}/${checkDetail}/similar${API_KEY}`;

      const getDataDetail = async () => {
        try {
          const response = await axios.get(url);
          setDataDetail(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      const getDataSimilar = async () => {
        try {
          const response = await axios.get(urlSimliar);
          console.log(response);
          setDataSimilar(response.data.results);
        } catch (error) {
          console.log(error);
        }
      };

      getDataDetail();
      getDataSimilar();
    }
  }, [checkDetail]);

  return (
    <header className="header" ref={headerShrink}>
      <div className="container">
        <div className="header__content">
          <div className="header__content__mobile">
            <i
              className="header__content__mobile__image bx bx-menu"
              onClick={() => handleToggleNav(!checkToggle)}
            ></i>
          </div>
          <div className="header__content__logo">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="header__content__menu">
            <Menu />
          </div>
          <div className="header__content__search">
            <i
              className="header__content__search__icon bx bx-search"
              onClick={() => {
                handleDisplay(!checkClick);
              }}
            ></i>
            <input
              type="text"
              className="header__content__search__input"
              placeholder="Tìm kiếm phim..."
              name="filterSearch"
              value={filterSearch}
              onChange={(e) => {
                console.log(e.target.value);
                const data = e.target.value;
                setFilterSearch(data);
              }}
            />
            <div className="header__content__search__history">
              <MovieSearch
                dataSearch={dataSearch}
                handleDataModal={handleDataModal}
              />
            </div>

            <ModalSearch
              // dataVideo={video}
              idMovie={checkDetail}
              dataDetail={dataDetail}
              dataSimilar={dataSimilar}
              type={type}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
