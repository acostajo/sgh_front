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
  CardTitle,
  CardText,
  Button,
  CardHeader,
  Card,
  CardBody,
  Container,
  Row,
  Form,
  FormGroup,
  Label,
  Col
} from "reactstrap";
import classnames from "classnames";
import axios from "axios";
import Panolab from "./../panolab/panolabForm";
import BuscarPanolab from "./../panolab/buscarPanolab";
import BuscarConsulta from "../consulta/buscarConsulta";
import BuscarOrdenEstudio from "./../ordenestudio/buscarOrdenEstudio";
import "bootstrap/dist/css/bootstrap.min.css";
import blank_pic from "./blank_pic.png";

class MenuFicha extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      codficha: this.props.match.params.codficha,
      datosFicha: {}
    };
  }

  async componentWillMount() {
    //const cod = this.props.match.params.codconsulta;
    const cod = this.state.codficha;
    const url1 = "http://127.0.0.1:8000/api/ficha?codficha=";
    let datosFicha = {};

    await axios
      .get(url1 + cod)
      .then(function(response) {
        console.log(response.data[0]);
        datosFicha = response.data[0];
      })
      .catch(function(error) {
        console.log(error);
      });

    this.setState({
      datosFicha: datosFicha
    });
    console.log(this.state.datosFicha); //trae bien, trae bien? el cod digo no el contenido
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
        <div>
          <Container>
            <div
              class="card mb-3 "
              style={{
                borderBlockColor: "#091833",
                backgroundColor: "#F9FCFB"
              }}
            >
              <div class="row no-gutters">
                <div class="col-md-2">
                  <img src={blank_pic} class="card-img" alt="..." />
                </div>
                <div class="col-md-10">
                  <div class="card-body">
                    <h4 class="card-title" style={{ color: "#133E7C" }}>
                      {this.state.datosFicha.nombres}{" "}
                      {this.state.datosFicha.apellidos}{" "}
                    </h4>
                    <p class="card-text">
                      <Col>
                        <Row>
                          <Row>
                            <FormGroup>
                              <Col>
                                <Label>
                                  <strong>Nro. Documento: </strong>
                                  {this.state.datosFicha.nrodocumento}
                                </Label>
                              </Col>
                            </FormGroup>
                            <FormGroup>
                              <Col>
                                <Label>
                                  <strong>Fecha de Inclusión: </strong>
                                  {this.state.datosFicha.fechainclusion}
                                </Label>
                              </Col>
                            </FormGroup>
                          </Row>
                          <Row>
                            <FormGroup>
                              <Col>
                                <Label>
                                  <strong>Dx: </strong>
                                  {this.state.datosFicha.diagnostico}
                                </Label>
                              </Col>
                            </FormGroup>
                            <FormGroup>
                              <Col>
                                <Label>
                                  <strong>Fecha de Dx: </strong>
                                  {this.state.datosFicha.fechadiagnos}
                                </Label>
                              </Col>
                            </FormGroup>
                          </Row>
                        </Row>
                      </Col>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>

        <div>
          <Container />
          <Nav tabs style={{ marginBottom: 20 }}>
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
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === "4" })}
                onClick={() => {
                  this.toggle("4");
                }}
              >
                Orden de Estudio
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
              <BuscarPanolab codficha={this.state.codficha} />
            </TabPane>
            <TabPane tabId="4">
              <BuscarOrdenEstudio codficha={this.state.codficha} />
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}

export default MenuFicha;
