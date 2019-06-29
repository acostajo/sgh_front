import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import { Dropdown, Nav, Navbar, Icon, Header } from "rsuite";
import "../themes/fresca.css";
import { Modal } from "rsuite";
import axios from "axios";
import Turnos from "./laboratorio/turnos";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  withRouter,
  NavLink
} from "react-router-dom";

class NavBarFrescaLab extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      toggleListaPaciente: false,
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
    this.toggleListaPaciente = this.toggleListaPaciente.bind(this);
  }
  toggleListaPaciente() {
    this.setState({
      toggleListaPaciente: !this.state.toggleListaPaciente
    });
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
        <div style={{ marginTop: 40 }}>
          <Modal
            show={this.state.toggleListaPaciente}
            onHide={this.toggleListaPaciente}
            style={{ width: "60%" }}
          >
            <Modal.Body>
              <Turnos />
            </Modal.Body>
          </Modal>
        </div>
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
              <a class="nav-link" href="/menu_lab">
                Inicio
              </a>
            </li>
            <li class="nav-item ">
              <a class="nav-link-resalted" onClick={this.toggleListaPaciente}>
                Gestionar Turnos
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Configuración
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Perfil
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Cerrar Sesión
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBarFrescaLab;
