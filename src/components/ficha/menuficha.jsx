import React, { Component } from "react";
// import NavBar from "./components/navbar";
// import Home from "./components/home";
// import { Route, Switch } from "react-router-dom";
// import Ficha from "./components/ficha/fichaForm";
// import Consulta from "./components/consulta/consultaForm";
// import BuscarFicha from "./components/ficha/buscarFicha";
import FichaView from "../ficha/fichaView";
// import FichaEdit from "./components/ficha/fichaEdit";
// import Panolab from "./components/panolab/panolabForm";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";
import Panolab from "./../panolab/panolabForm";
import BuscarConsulta from "../consulta/buscarConsulta";

class MenuFicha extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      codficha: this.props.match.params.codficha
    };
  }
  toggle(tab) {
    console.log(this.state.codficha);
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Datos Ficha
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Consulta
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "3" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              Panorámica de Laboratorio
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <FichaView codficha={this.state.codficha} />
          </TabPane>
          <TabPane tabId="2">
            <BuscarConsulta codficha={this.state.codficha} />
          </TabPane>
          <TabPane tabId="3">
            <Panolab codficha={this.state.codficha} />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default MenuFicha;
