import React, { Component } from "react";

// import Home from "./components/home";
// import { ,Route, Switch } from "react-router-dom";
// import Ficha from "./components/ficha/fichaForm";
// import Consulta from "./components/consulta/consultaForm";
// import BuscarFicha from "./components/ficha/buscarFicha";
import FichaView from "../ficha/fichaView";
// import FichaEdit from "./components/ficha/fichaEdit";
// import Panolab from "./components/panolab/panolabForm";
import { Nav, Icon } from "rsuite";
import { Card, CardBody, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import classnames from "classnames";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  withRouter,
  NavLink
} from "react-router-dom";
import NavBarMenu from "../navbar"; // le falto .. sep
//import NavBarMenu from "./../components/navbar";
import { FlexboxGrid } from "rsuite";
import axios from "axios";
import BuscarPanolab from "./../panolab/buscarPanolab";
import BuscarConsulta from "../consulta/buscarConsulta";
import BuscarOrdenEstudio from "./../ordenestudio/buscarOrdenEstudio";
import "bootstrap/dist/css/bootstrap.min.css";
import blank_pic from "./blank_pic.png";
import Consulta from "../consulta/consultaForm";
import ConsultaView from "../consulta/consultaView";
import Panolab from "../panolab/panolabForm";
import PanolabView from "../panolab/panolabView";

import OrdenEstudio from "../ordenestudio/ordenestudioForm";
import OrdenEstudioView from "../ordenestudio/ordenestudioView";
import FichaEdit from "../ficha/fichaEdit";

//import { Col } from "rsuite";
import Resumen from "./../resumen/resumen";
import NavBarFresca from "./../navFresca";
import Haq from "./../cuestionarios/haq";
import Egc from "./../cuestionarios/egc";
import Mbg from "./../cuestionarios/mbg";
import BuscarEGC from "./../cuestionarios/buscarEgc";
import BuscarMBG from "./../cuestionarios/buscarMBG";
import BuscarHAQ from "./../cuestionarios/buscarHAQ";

class MenuFicha extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabactive: "ficha",
      codficha: this.props.match.params.codficha,
      datosFicha: {},

      activeStyleFicha: {
        textDecoration: "none",
        color: "#133E7C",
        fontSize: "17px",
        "&:hover": {
          textDecoration: "none"
        }
      },
      activeStyleConsulta: {
        textDecoration: "none",
        fontSize: "17px",
        color: "#3c763d",
        "&:hover": {
          textDecoration: "none"
        }
      },
      activeStylePanolab: {
        textDecoration: "none",
        fontSize: "17px",
        color: "#563d7c",
        "&:hover": {
          textDecoration: "none"
        }
      },
      activeStyleOrden: {
        textDecoration: "none",
        fontSize: "17px",
        color: "#337ab7",
        "&:hover": {
          textDecoration: "none"
        }
      },
      activeStyleMbg: {
        textDecoration: "none",
        fontSize: "17px",
        color: "#497665",
        "&:hover": {
          textDecoration: "none"
        }
      },
      activeStyleHaq: {
        textDecoration: "none",
        fontSize: "17px",
        color: "#FFA630",
        "&:hover": {
          textDecoration: "none"
        }
      },
      activeStyleEgc: {
        textDecoration: "none",
        fontSize: "17px",
        color: "#FF4C58",
        "&:hover": {
          textDecoration: "none"
        }
      }
    };
    this.onSelectActive = this.onSelectActive.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }

  async componentWillMount() {
    //const cod = this.props.match.params.codconsulta;
    const cod = this.state.codficha;
    const url1 = "http://127.0.0.1:8000/api/ficha?codficha=";
    let datosFicha = {};

    await axios
      .get(url1 + cod)
      .then(function(response) {
        datosFicha = response.data[0];
      })
      .catch(function(error) {
        console.log(error);
      });

    this.setState({
      datosFicha: datosFicha
    });
  }

  onSelectActive(e) {
    console.log(e);
    this.setState({ tabactive: e });
  }

  formatDate(date) {
    var monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "April",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ];

    var day = date.getUTCDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + " " + monthNames[monthIndex] + " " + year;
  }
  render() {
    const NavLi = props => <Nav.Item componentClass={NavLink} {...props} />;
    return (
      <div>
        <NavBarFresca />
        <FlexboxGrid
          style={{ fontFamily: "Arial, sans-serif" }}
          justify="center"
        >
          <FlexboxGrid.Item colspan={4}>
            <Card
              style={{
                alignItems: "center"
              }}
            >
              <img
                src={blank_pic}
                alt="..."
                style={{
                  borderRadius: "50%",
                  width: "60%",
                  marginTop: 10
                }}
              />
              <CardBody>
                <h4 style={{ color: "#133E7C" }}>
                  <strong>
                    {this.state.datosFicha.nombres}{" "}
                    {this.state.datosFicha.apellidos}{" "}
                  </strong>
                </h4>
                <hr />

                <ListGroup style={{ fontSize: 13, color: "#666666" }}>
                  <ListGroupItem>
                    <strong>Nro. Doc: </strong>
                    {this.state.datosFicha.nrodocumento}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Tipo Doc: </strong>
                    {this.state.datosFicha.tipodocumento}{" "}
                  </ListGroupItem>

                  <ListGroupItem>
                    <strong>Fecha de Inclución: </strong>
                    {this.formatDate(
                      new Date(this.state.datosFicha.fechainclusion)
                    )}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Fecha de Diagnóstico: </strong>
                    {this.formatDate(
                      new Date(this.state.datosFicha.fechadiagnos)
                    )}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Diagnóstico: </strong>
                    {this.state.datosFicha.diagnostico}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Procedencia: </strong>
                    {this.state.datosFicha.procedencia}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Fecha de Nacimiento: </strong>
                    {this.formatDate(new Date(this.state.datosFicha.fechanaci))}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Sexo: </strong>
                    {this.state.datosFicha.sexo}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Telef: </strong>
                    {this.state.datosFicha.telefono}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Nacionalidad: </strong>
                    {this.state.datosFicha.nacionalidad}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>E. Civil: </strong>
                    {this.state.datosFicha.estadocivil}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Profesión: </strong>
                    {this.state.datosFicha.profesion}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Escolaridad: </strong>
                    {this.state.datosFicha.escolaridad}
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={18}>
            <Nav
              appearance="tabs"
              activeKey={this.state.tabactive}
              onSelect={this.onSelectActive}
              style={{ marginLeft: 10 }}
            >
              <NavLi
                eventKey="resumen"
                to={`/menu_ficha/${this.state.datosFicha.codficha}/resumen/${
                  this.state.datosFicha.codficha
                }`}
                activeStyle={this.state.activeStyleFicha}
                icon={<Icon icon="dashboard" />}
              >
                Resumen
              </NavLi>

              <NavLi
                eventKey="ficha"
                to={`/menu_ficha/${this.state.datosFicha.codficha}/ficha_view/${
                  this.state.datosFicha.codficha
                }`}
                activeStyle={this.state.activeStyleFicha}
                icon={<Icon icon="list-alt" />}
              >
                Datos Ficha
              </NavLi>

              <NavLi
                eventKey="consulta"
                to={`/menu_ficha/${
                  this.state.datosFicha.codficha
                }/buscar_consulta/${this.state.datosFicha.codficha}`}
                activeStyle={this.state.activeStyleConsulta}
                icon={<Icon icon="stethoscope" />}
              >
                Consulta
              </NavLi>

              <NavLi
                eventKey="panolab"
                to={`/menu_ficha/${
                  this.state.datosFicha.codficha
                }/buscar_panolab/${this.state.datosFicha.codficha}`}
                activeStyle={this.state.activeStylePanolab}
                icon={<Icon icon="flask" />}
              >
                Panorámica de Laboratorio
              </NavLi>

              <NavLi
                eventKey="orden"
                to={`/menu_ficha/${
                  this.state.datosFicha.codficha
                }/buscar_ordenestudio/${this.state.datosFicha.codficha}`}
                activeStyle={this.state.activeStyleOrden}
                icon={<Icon icon="file-text-o" />}
              >
                Orden de Estudio
              </NavLi>
              <NavLi
                eventKey="haq"
                to={`/menu_ficha/${this.state.datosFicha.codficha}/buscar_haq/`}
                activeStyle={this.state.activeStyleHaq}
                icon={<Icon icon="file-text-o" />}
              >
                HAQ
              </NavLi>
              <NavLi
                eventKey="haq"
                to={`/menu_ficha/${this.state.datosFicha.codficha}/buscar_grc/`}
                activeStyle={this.state.activeStyleEgc}
                icon={<Icon icon="file-text-o" />}
              >
                GRC
              </NavLi>
              <NavLi
                eventKey="haq"
                to={`/menu_ficha/${this.state.datosFicha.codficha}/buscar_mbg/`}
                activeStyle={this.state.activeStyleMbg}
                icon={<Icon icon="file-text-o" />}
              >
                MBG
              </NavLi>
            </Nav>

            <Switch>
              <Route
                path="/menu_ficha/:codficha/resumen/:codficha"
                component={Resumen}
              />
              <Route
                path="/menu_ficha/:codficha/ficha_edit/:codficha"
                component={FichaEdit}
              />
              <Route
                path="/menu_ficha/:codficha/ficha_view/:codficha"
                component={FichaView}
              />

              <Route
                path="/menu_ficha/:codficha/buscar_consulta/:codficha/consulta_view/:codconsulta/:codficha"
                component={ConsultaView}
              />
              <Route
                path="/menu_ficha/:codficha/buscar_consulta/:codficha/consulta/:codficha"
                component={Consulta}
              />
              <Route
                path="/menu_ficha/:codficha/buscar_consulta/:codficha"
                component={BuscarConsulta}
              />
              <Route
                path="/menu_ficha/:codficha/buscar_panolab/:codficha/panolab_view/:codpanolab/:codficha"
                component={PanolabView}
              />
              <Route
                path="/menu_ficha/:codficha/buscar_panolab/:codficha/panolab/:codficha"
                component={Panolab}
              />
              <Route
                path="/menu_ficha/:codficha/buscar_panolab/:codficha"
                component={BuscarPanolab}
              />
              <Route
                path="/menu_ficha/:codficha/buscar_ordenestudio/:codficha/ordenestudio_view/:codordenestudio"
                component={OrdenEstudioView}
              />

              <Route
                path="/menu_ficha/:codficha/buscar_ordenestudio/:codficha/ordenestudio/:codficha"
                component={OrdenEstudio}
              />
              <Route
                path="/menu_ficha/:codficha/buscar_ordenestudio/:codficha"
                component={BuscarOrdenEstudio}
              />
              <Route
                path="/menu_ficha/:codficha/buscar_haq/haq/"
                component={Haq}
              />
              <Route
                path="/menu_ficha/:codficha/buscar_haq/"
                component={BuscarHAQ}
              />
              <Route
                path="/menu_ficha/:codficha/buscar_grc/grc/"
                component={Egc}
              />
              <Route
                path="/menu_ficha/:codficha/buscar_grc/"
                component={BuscarEGC}
              />
              <Route
                path="/menu_ficha/:codficha/buscar_mbg/mbg/"
                component={Mbg}
              />
              <Route
                path="/menu_ficha/:codficha/buscar_mbg/"
                component={BuscarMBG}
              />
            </Switch>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </div>
    );
  }
}

export default withRouter(MenuFicha);
