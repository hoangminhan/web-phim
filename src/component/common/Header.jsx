import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Menu from "./../Menu";

function Header(props) {
  const headerShrink = useRef();
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
  }, []);

  // handle toggle Menu
  const [checkToggle, setCheckToggle] = useState(false);
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
            />
            <i class="bx bx-search"></i>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
