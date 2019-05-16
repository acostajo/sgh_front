import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Sidebar, Sidenav, Nav, Icon } from "rsuite";

import "rsuite/dist/styles/rsuite.min.css";

class SideNavMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleToggle() {
    this.setState({
      expand: !this.state.expand
    });
  }
  render() {
    const NavLink = props => <Nav.Item componentClass={Link} {...props} />;
    return (
      <div className="sidebar-page">
        <Sidebar
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            backgroundColor: "#111",
            zIndex: 1,
            position: "fixed",
            overflowX: "hidden",
            marginTop: 56
          }}
          width={this.state.expand ? 200 : 56}
          collapsible
        >
          <Sidenav
            expanded={this.state.expand}
            defaultOpenKeys={["3"]}
            defaultActiveKey="2"
            appearance="subtle"
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              backgroundColor: "#111",
              zIndex: 1,
              overflowX: "hidden"
            }}
          >
            <Sidenav.Body>
              <Nav>
                <Nav.Item
                  eventKey="1"
                  active
                  icon={<Icon icon="expand-o" />}
                  onClick={this.handleToggle}
                >
                  Menu
                </Nav.Item>
                <NavLink
                  eventKey="2"
                  to="/ficha_buscar"
                  icon={<Icon icon="search" />}
                  onClick={() => {
                    console.log("Ficha component " + this.state.codficha);
                    //window.location.pathname={`/ficha_view/${this.state.codficha}`}
                  }}
                >
                  Buscar Ficha
                </NavLink>
                <NavLink to="/ficha" eventKey="3" icon={<Icon icon="plus" />}>
                  Agregar Ficha
                </NavLink>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
        </Sidebar>
      </div>
    );
  }
}

export default SideNavMenu;
