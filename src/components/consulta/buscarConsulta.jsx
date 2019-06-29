import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Row,
  InputGroup,
  InputGroupAddon,
  Col,
  Form,
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
    let list = [];
    list = this.state.listaConsulta;

    console.log(list);
    console.log(this.props.match.params.codficha);
    return (
      <Container style={{ marginTop: 20 }}>
        <Row>
          <Col>
            <Form inline>
              <InputGroup>
                <Input
                  type="date"
                  onChange={this.handleChange}
                  value={this.state.fechaConsulta}
                  name="fechaConsulta"
                  id="fechaConsulta"
                />
                <InputGroupAddon addonType="append">
                  <Button
                    onClick={this.handleSearch}
                    style={{
                      marginRight: 10,
                      backgroundColor: "#3c763d",
                      float: "rigth",
                      color: "white"
                    }}
                  >
                    Buscar
                  </Button>
                </InputGroupAddon>
              </InputGroup>
              <Link
                to={`/menu_ficha/${
                  this.props.match.params.codficha
                }/buscar_consulta/${
                  this.props.match.params.codficha
                }/consulta/${this.props.match.params.codficha}`}
                style={{ color: "white" }}
              >
                <Button
                  onClick={this.handleAdd}
                  style={{
                    backgroundColor: "#3c763d",
                    float: "rigth",
                    color: "white"
                  }}
                >
                  Agregar Consulta
                </Button>
              </Link>
            </Form>
          </Col>
        </Row>

        <hr />

        <Row style={{ marginTop: 20 }}>
          <Col lg="7" md="7" sm="7">
            {list.map(item => (
              <div
                style={{
                  borderLeft: "5px solid",
                  marginBottom: 15,
                  padding: 10,
                  borderLeftColor: "#3c763d",
                  borderRadius: "5px",
                  borderTop: "0.5px solid",
                  borderRight: "0.5px solid",
                  borderBottom: "0.5px solid",
                  borderTopColor: "#eee",
                  borderRightColor: "#eee",
                  borderBottomColor: "#eee"
                  // color: "#eee"
                }}
              >
                <Link
                  style={{
                    color: "#3c763d",
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
    );
  }
}

export default BuscarConsulta;
