import React from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
Menu.propTypes = {};

const menus = [
  {
    name: "Home",
    to: "/",
    exact: true,
  },
  {
    name: "TV Shows",
    to: "/tv-show",
    exact: false,
  },
  {
    name: "Movies",
    to: "/movies",
    exact: false,
  },
  {
    name: "New & Popular",
    exact: false,
    to: "/new-popular",
  },
];

const MenuLink = ({ label, to, activeMenu }) => {
  return (
    <Route
      path={to}
      exact={activeMenu}
      children={({ match }) => {
        const activeClass = "header__content__menu__item";
        return (
          <li className={match ? `${activeClass} active` : activeClass}>
            <Link to={to}>{label}</Link>
          </li>
        );
      }}
    />
  );
};

function Menu(props) {
  return (
    <ul className="nav__bar">
      {menus &&
        menus.map((item, index) => {
          return (
            <MenuLink
              label={item.name}
              key={index}
              to={item.to}
              activeMenu={item.exact}
            />
          );
        })}
    </ul>
  );
}

export default Menu;
