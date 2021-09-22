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

  return (
    <header className="header" ref={headerShrink}>
      <div className="container">
        <div className="header__content">
          <div className="header__content__mobile">
            <i className="header__content__mobile__image bx bx-menu"></i>
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
