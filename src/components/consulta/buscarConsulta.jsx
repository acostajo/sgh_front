import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Row,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { Alert, Icon } from "rsuite";
import { Panel } from "rsuite";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Consulta from "../consulta/consultaForm";

class BuscarConsulta extends Component {
  constructor() {
    super();
    this.state = {
      fechaConsulta: "",
      nombre: "",
      listaConsulta: [],
      fadeIn: false,
      alert: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  async handleSearch() {
    const url1 = "http://127.0.0.1:8000/api/consulta?fechaconsulta=";
    const codficha = "&codficha=";
    let listado = [];
    let respuesta;
    console.log(this.props.match.params.codficha); //y en esta parte del handle search de los demas nomas tenes que tocarle,

    await axios
      .get(
        url1 +
          this.state.fechaConsulta +
          codficha +
          this.props.match.params.codficha
      ) //y asi queda concatenado todo, si no hay fecha igual trae solo lo de esa ficha, vamos a probar
      .then(function(response) {
        if (response.data[0] === undefined) {
          respuesta = null;
        } else {
          listado = response.data;
        }
      })
      .catch(function(error) {
        console.log(error);
      });

    /* if (respuesta === null) {
      this.setState({
        alert: !this.state.alert,
        fadeIn: !this.state.fadeIn
      });

    } else {
      this.setState({
        listaConsulta: listado,
        fadeIn: !this.state.fadeIn,
        alert: false
      });
*/

    if (respuesta === null) {
      Alert.warning("No se encontra la Consulta");
    } else {
      this.setState({
        listaConsulta: listado
      });
    }
    console.log(
      url1 + this.state.fechaConsulta + codficha + this.props.codficha
    );
    console.log(this.state.codconsulta);
  }

  formatDate(date) {
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + " " + monthNames[monthIndex] + " " + year;
  }
  render() {
    let list = [];
    list = this.state.listaConsulta;

    console.log(list);
    console.log(this.props.match.params.codficha);
    return (
      <Container style={{ marginTop: 20, marginLeft: 100 }}>
        <Row>
          <Col>
            <h3>Búsqueda por Fecha Consulta</h3>
          </Col>
        </Row>

        <div class="col-50 align-self-center" style={{ display: "flex" }}>
          <Row>
            <Col xs="5">
              <FormGroup>
                <Label for="fechaConsulta" />
                <Input
                  type="date"
                  onChange={this.handleChange}
                  value={this.state.fechaConsulta}
                  name="fechaConsulta"
                  id="fechaConsulta"
                />
              </FormGroup>
            </Col>

            <Col xs="2" style={{ marginTop: 20 }}>
              <Button onClick={this.handleSearch} color="primary">
                Buscar
              </Button>
            </Col>
            <Col style={{ marginTop: 20 }}>
              <Button
                style={{ float: "rigth" }}
                onClick={this.handleAdd}
                color="primary"
              >
                <Link
                  to={`/menu_ficha/${
                    this.props.match.params.codficha
                  }/buscar_consulta/${
                    this.props.match.params.codficha
                  }/consulta/${this.props.match.params.codficha}`}
                  style={{ color: "white" }}
                >
                  Agregar Consulta
                </Link>
              </Button>
            </Col>
          </Row>
        </div>

        <hr />
        <Container style={{ marginTop: 20 }}>
          <Row>
            <Col>
              {list.map(item => (
                <div
                  style={{
                    borderLeft: "6px solid",
                    marginBottom: 15,
                    padding: 10,
                    borderLeftColor: "#00b33c",
                    borderRadius: "5px",
                    borderTop: "0.5px solid",
                    borderRight: "0.5px solid",
                    borderBottom: "0.5px solid",
                    borderTopColor: "#b3b3b3",
                    borderRightColor: "#b3b3b3",
                    borderBottomColor: "#b3b3b3"
                  }}
                >
                  <Link
                    style={{
                      color: "#00b33c",
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "none"
                      }
                    }}
                    to={`/menu_ficha/${item.codficha}/buscar_consulta/${
                      item.codficha
                    }/consulta_view/${item.codconsulta}/${item.codficha}`}
                  >
                    <h4>
                      <strong>Fecha Consulta: </strong>{" "}
                      {this.formatDate(new Date(item.fechaconsulta))}
                      <Icon
                        icon="angle-double-right"
                        size="2x"
                        style={{ float: "right" }}
                      />
                    </h4>
                    <div
                      style={{
                        color: "#666666"
                      }}
                    >
                      <Row>
                        <Col>
                          <strong>Diagnóstico: </strong> {item.diagnostico}
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <strong>Limitación: </strong> {item.limitacion}
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <strong>Motivo Limitación: </strong>{" "}
                          {item.limitacionmotivo}
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <strong>Tratamiento Actual: </strong>{" "}
                          {item.tratamientoactual}
                        </Col>
                      </Row>
                    </div>
                  </Link>
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

export default BuscarConsulta;
