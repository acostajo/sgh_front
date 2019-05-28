import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import logo from "./logo.png";
import { Dropdown, Nav, Navbar, Icon, Header } from "rsuite";
import "rsuite/dist/styles/rsuite.min.css";

class NavBarMenuLab extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
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
              backgroundColor: "#002b80"
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
                <Nav.Item icon={<Icon icon="home" />} to="/modulos">
                  Inicio
                </Nav.Item>
              </Nav>
              <Nav pullRight>
                <NavLi
                  to="/turnos"
                  icon={<Icon icon="calendar" />}
                  style={{
                    backgroundColor: "#00b300"
                  }}
                >
                  Gestionar Turno
                </NavLi>
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

export default NavBarMenuLab;
