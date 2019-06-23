import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import { Dropdown, Nav, Navbar, Icon, Header } from "rsuite";
import "../themes/fresca.css";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  withRouter,
  NavLink
} from "react-router-dom";

class NavBarFresca extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,

      activeStyleConsulta: {
        textDecoration: "none",

        color: "#3c763d",
        "&:hover": {
          textDecoration: "none",
          color: "#3c763d",
          backgroundcolor: "#FFFF",
          backgroundColor: "#FFFF"
        }
      }
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <nav
        class="navbar navbar-expand-md navbar-dark bg-primary mb-2"
        style={{
          top: 0,
          position: "fixed",
          zIndex: 3,
          width: "100%"
        }}
      >
        <nav class="nav-logo">
          <img
            src={logo}
            alt="..."
            style={{
              width: "14%",
              height: "28%",
              zIndex: 3
            }}
          />
        </nav>

        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse" id="navbarColor02">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="/menu/" title="Current breakpoint tier">
                Inicio
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" title="Current breakpoint tier">
                Configuración
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" title="Current breakpoint tier">
                Perfil
              </a>
            </li>
            <li class="nav-item">
              <NavLink
                className="nav-link"
                to="/login"
                onClick={this.props.logout}
              >
                Cerrar Sesión
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(NavBarFresca)
);
