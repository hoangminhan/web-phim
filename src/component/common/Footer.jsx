import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Grid from "../Grid";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

Footer.propTypes = {};

function Footer(props) {
  const backTop = useRef();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 1000 ||
        document.documentElement.scrollTop > 1000
      ) {
        backTop.current.classList.add("active");
      } else {
        backTop.current.classList.remove("active");
      }
    });
  });
  const handleBackTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <span className="footer__content__title">
            <Link to="#">Bạn có câu hỏi? Liên hệ với chúng tôi</Link>
          </span>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            <ul className="footer__content__item">
              <li className="footer__content__item__question">
                <Link to="#">Câu hỏi thường gặp</Link>
              </li>
              <li className="footer__content__item__question">
                <Link to="#">Quan hệ với nhà đầu tư</Link>
              </li>
              <li className="footer__content__item__question">
                <Link to="#">Quyền riêng tư</Link>
              </li>
              <li className="footer__content__item__question footer__content__item__question--padding">
                <Link to="#"> Kiểm tra tốc độ</Link>
              </li>

              <div className="footer__content__item__language">
                <div className="footer__content__item__language__input">
                  <i className="bx bx-basketball footer__content__item__language__input-icon"></i>
                  <input
                    type="text"
                    placeholder="Tiếng Việt"
                    className="footer__content__item__language__input-input"
                  />
                  <ul className="footer__content__item__language__input-select">
                    <li>Tiếng Việt</li>
                    <li>Tiếng Anh</li>
                  </ul>
                  <i className="bx bxs-down-arrow footer__content__item__language__input-arrow"></i>
                </div>
              </div>
            </ul>
            <ul className="footer__content__item">
              <li className="footer__content__item__info">
                <Link to="#"> Trung tâm hỗ trợ</Link>
              </li>
              <li className="footer__content__item__info">
                <Link to="#"> Việc làm</Link>
              </li>
              <li className="footer__content__item__info">
                <Link to="#"> Tuỳ chọn cookie</Link>
              </li>
              <li className="footer__content__item__info">
                <Link to="#"> Thông báo pháp lý</Link>
              </li>
            </ul>
            <ul className="footer__content__item">
              <li className="footer__content__item__account">
                <Link to="#">Tài khoản</Link>
              </li>
              <li className="footer__content__item__account">
                <Link to="#">Các cách xem</Link>
              </li>
              <li className="footer__content__item__account">
                <Link to="#">Thông tin doanh nghiệp </Link>
              </li>
              <li className="footer__content__item__account">
                <Link to="#">Chỉ có trên Netflix </Link>
              </li>
            </ul>

            <ul className="footer__content__item">
              <li className="footer__content__item__contact">
                <Link to="#">Trung tâm đa phương tiện</Link>
              </li>
              <li className="footer__content__item__contact">
                <Link to="#">Điều khoản sử dụng</Link>
              </li>
              <li className="footer__content__item__contact">
                <Link to="#">Liên hệ với chúng tôi</Link>
              </li>
              <div className="footer__content__item__image">
                <img src={logo} alt="" />
              </div>
            </ul>
          </Grid>
        </div>
      </div>

      <div className="footer__backtop" ref={backTop}>
        <p className="footer__backtop__icon" onClick={handleBackTop}>
          <i className="bx bxs-up-arrow-circle"></i>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
