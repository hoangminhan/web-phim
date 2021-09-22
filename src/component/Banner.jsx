import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import bannerNetflix from "../assets/images/bannerNetflix.jpg";
import banner from "../assets/images/banner.jpg";
import banner3 from "../assets/images/banner3.jpg";

Banner.propTypes = {};

function Banner(props) {
  const [data, setData] = useState();
  //   useEffect(()=>{

  //   },[])
  setInterval(() => {
    setData();
  }, 1000);
  return (
    <div className="banner__content">
      <div className="banner__content__image">
        <img src={bannerNetflix} alt="" />
      </div>
    </div>
  );
}

export default Banner;
