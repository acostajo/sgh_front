import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import { Dropdown, Nav, Navbar, Icon, Header } from "rsuite";
import "rsuite/dist/styles/rsuite.min.css";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  withRouter,
  NavLink
} from "react-router-dom";
class NavBarMenu extends Component {
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
    const NavLi = props => <Nav.Item componentClass={NavLink} {...props} />;
    return (
      <div>
        <Header>
          <Navbar
            appearance="inverse"
            style={{
              top: 0,
              position: "fixed",
              zIndex: 3,

              width: "100%",
              backgroundColor: "#133E7C",
              "&:hover": {
                textDecoration: "none"
              }
            }}
          >
            <Navbar.Body>
              <Nav>
                <img
                  src={logo}
                  alt="..."
                  style={{
                    width: "24%",
                    height: "35%"
                  }}
                />

                <NavLi
                  icon={<Icon icon="home" />}
                  to="/modulos"
                  style={{ color: "white", textDecoration: "none" }}
                  activeStyle={this.state.activeStyleConsulta}
                >
                  Inicio
                </NavLi>
              </Nav>
              <Nav pullRight>
                <Nav.Item icon={<Icon icon="cog" />}>Configuracion</Nav.Item>
                <Dropdown title="Usuario">
                  <Dropdown.Item>Perfil</Dropdown.Item>
                  <Dropdown.Item>Cerrar Sesión</Dropdown.Item>
                </Dropdown>
              </Nav>
            </Navbar.Body>
          </Navbar>
        </Header>
      </div>
    );
  }
}

export default NavBarMenu;
