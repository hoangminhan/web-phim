import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import logo from "../../assets/images/logo.png";
import Menu from "./../Menu";

function Header(props) {
  const [checkClick, setCheckClick] = useState(false);
  const headerShrink = useRef();
  const [dataInput, setDataInput] = useState("");
  const [checkToggle, setCheckToggle] = useState(false);
  const history = useHistory();
  const title = document.title;

  console.log(history);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 70 ||
        document.documentElement.scrollTop > 70
      ) {
        headerShrink.current.classList.add("shrink");
      } else {
        headerShrink.current.classList.remove("shrink");
      }
    });
    return () => {
      headerShrink.current.classList.remove("shrink");
    };
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
        paddingLeft: "2px",
        position: "absolute",
        top: "20px",
        right: 0,
        left: "10px",
      };

      Object.assign(inputElement.style, styles);
      setCheckClick(!checkClick);
    } else {
      inputElement.style.display = "none";
      setCheckClick(!checkClick);
    }
  };
  const handleChange = (e) => {
    const data = e.target.value;
    setDataInput(data);
  };

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
            <input
              type="text"
              className="header__content__search__input"
              placeholder="Tìm kiếm phim..."
              name="dataInput"
              value={dataInput}
              onChange={handleChange}
            />
            {/* <ul className="header__content__search__history">abc</ul> */}
            <i
              className="header__content__search__icon bx bx-search"
              onClick={() => {
                handleDisplay(!checkClick);
              }}
            ></i>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
