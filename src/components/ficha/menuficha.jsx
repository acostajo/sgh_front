import React, { Component } from "react";
// import NavBar from "./components/navbar";
// import Home from "./components/home";
// import { ,Route, Switch } from "react-router-dom";
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
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Link,
  withRouter
} from "react-router-dom";
import axios from "axios";
import Panolab from "./../panolab/panolabForm";
import BuscarPanolab from "./../panolab/buscarPanolab";
import BuscarConsulta from "../consulta/buscarConsulta";
import BuscarOrdenEstudio from "./../ordenestudio/buscarOrdenEstudio";

import "bootstrap/dist/css/bootstrap.min.css";
import blank_pic from "./blank_pic.png";
import Consulta from "../consulta/consultaForm";
import ConsultaView from "../consulta/consultaView";
//import { Col } from "rsuite";

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
        <Row>
          <div>
            <Container style={{ marginLeft: 100, marginTop: 20 }}>
              <div
                class="card"
                style={{
                  borderBlockColor: "#091833",
                  backgroundColor: "#F9FCFB",
                  width: "20rem"
                }}
              >
                <div class="row no-gutters">
                  <div class="card">
                    <img src={blank_pic} class="card-img-top" alt="..." />
                  </div>
                  <div class="col-md-100">
                    <div class="card-body">
                      <h4 class="card-title" style={{ color: "#133E7C" }}>
                        {this.state.datosFicha.nombres}{" "}
                        {this.state.datosFicha.apellidos}{" "}
                      </h4>
                      <p class="card-text">
                        <Row>
                          <Col>
                            <Label>
                              <strong>Tipo Docu: </strong>
                              {this.state.datosFicha.tipodocumento}
                            </Label>
                          </Col>
                          <Col>
                            <Label>
                              <strong>Nro. Docu: </strong>
                              {this.state.datosFicha.nrodocumento}
                            </Label>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col>
                            <Label>
                              <strong>Fecha de Incl: </strong>
                              {this.state.datosFicha.fechainclusion}
                            </Label>
                          </Col>

                          <Col>
                            <Label>
                              <strong>Fecha de Dx: </strong>
                              {this.state.datosFicha.fechadiagnos}
                            </Label>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col>
                            <Label>
                              <strong>Dx: </strong>
                              {this.state.datosFicha.diagnostico}
                            </Label>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col>
                            <Label>
                              <strong>Procedencia: </strong>
                              {this.state.datosFicha.procedencia}
                            </Label>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col>
                            <Label>
                              <strong>FN: </strong>
                              {this.state.datosFicha.fechanaci}
                            </Label>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col>
                            <Label>
                              <strong>Sexo: </strong>
                              {this.state.datosFicha.sexo}
                            </Label>
                          </Col>
                          <Col>
                            <Label>
                              <strong>Telef: </strong>
                              {this.state.datosFicha.telefono}
                            </Label>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col>
                            <Label>
                              <strong>Nacionalidad: </strong>
                              {this.state.datosFicha.nacionalidad}
                            </Label>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col>
                            <Label>
                              <strong>E. Civil: </strong>
                              {this.state.datosFicha.estadocivil}
                            </Label>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col>
                            <Label>
                              <strong>Profesión: </strong>
                              {this.state.datosFicha.profesion}
                            </Label>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col>
                            <Label>
                              <strong>Escolaridad: </strong>
                              {this.state.datosFicha.escolaridad}
                            </Label>
                          </Col>
                        </Row>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>

          <div>
            <Container />
            <Nav tabs>
              <NavItem active>
                <NavLink
                  tag={Link}
                  to={`/menu_ficha/${
                    this.state.datosFicha.codficha
                  }/ficha_view/${this.state.datosFicha.codficha}`}
                >
                  Datos Ficha
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={Link}
                  to={`/menu_ficha/${
                    this.state.datosFicha.codficha
                  }/buscar_consulta/${this.state.datosFicha.codficha}`}
                >
                  Consulta
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={Link}
                  to={`/menu_ficha/${
                    this.state.datosFicha.codficha
                  }/buscar_panolab/${this.state.datosFicha.codficha}`}
                >
                  Panorámica de Laboratorio
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={Link}
                  to={`/menu_ficha/${
                    this.state.datosFicha.codficha
                  }/buscar_ordenestudio/${this.state.datosFicha.codficha}`}
                >
                  Orden de Estudio
                </NavLink>
              </NavItem>
            </Nav>

            <div className="content">
              <Switch>
                <Route
                  path="/menu_ficha/:codficha/ficha_view/:codficha"
                  component={FichaView}
                />
                <Route
                  path="/menu_ficha/:codficha/buscar_consulta/:codficha"
                  component={BuscarConsulta}
                />
                <Route
                  path="/menu_ficha/:codficha/buscar_panolab/:codficha"
                  component={BuscarPanolab}
                />
                <Route
                  path="/menu_ficha/:codficha/buscar_ordenestudio/:codficha"
                  component={BuscarOrdenEstudio}
                />
              </Switch>
            </div>
          </div>
        </Row>
      </div>
    );
  }
}

export default withRouter(MenuFicha);
