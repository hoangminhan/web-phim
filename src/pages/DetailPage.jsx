import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

DetailPage.propTypes = {};

function DetailPage(props) {
  const { name } = useParams();
  console.log("param", name);
  return (
    <div style={{ height: "50vh", marginTop: "130px", color: "red" }}>
      Đây là detail
    </div>
  );
}

export default DetailPage;
