import React, { Component } from "react";
import { Link } from "react-scroll";
import { MenuItems } from "./MenuItems";
import CameraFrontIcon from "@mui/icons-material/CameraFront";
import "./Navbar.css";

class Navbar extends Component {
  state = { clicked: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <nav className="NavbarItems">
        <h1 className="navbar-logo">
          FaceApp <CameraFrontIcon />
        </h1>
        <div className="menu-icon" onClick={this.handleClick}>
          <i
            className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>
        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index} className="nav-links">
                <Link
                  to={item.url}
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  onClick={this.handleClick}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default Navbar;
