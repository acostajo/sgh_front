import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Nav, Navbar, Icon, Header } from "rsuite";
import "rsuite/dist/styles/rsuite.min.css";

class NavBarMenu extends Component {
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
    const NavLink = props => <Nav.Item componentClass={Link} {...props} />;
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
              backgroundColor: "#0B1A25"
            }}
          >
            <Navbar.Body>
              <Nav>
                <NavLink icon={<Icon icon="home" />} to="/modulos">
                  Inicio
                </NavLink>
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
