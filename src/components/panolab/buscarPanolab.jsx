import React, { Component } from "react";

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
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Link,
  withRouter
} from "react-router-dom";
import { Alert, Icon } from "rsuite";
import PanolabView from "./panolabView";

class BuscarPanolab extends Component {
  constructor() {
    super();
    this.state = {
      fechaPanolab: "",
      listaPanolab: [],
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
    const url1 = "http://127.0.0.1:8000/api/panolab?fechapanolab=";
    const codficha = "&codficha=";

    let listado = [];
    let respuesta;

    const url_usar =
      url1 +
      this.state.fechaPanolab +
      codficha +
      this.props.match.params.codficha;
    console.log(url_usar);
    await axios
      .get(url_usar) //y asi queda concatenado todo, si no hay fecha igual trae solo lo de esa ficha, vamos a probar
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

    if (respuesta === null) {
      Alert.warning("No se encontra la Ficha Panorámica");
    } else {
      this.setState({
        listaPanolab: listado
      });
    }
    console.log(url1 + this.state.fechaPanolab);
    console.log(this.props.match.params.codficha);
    console.log(this.props.match.params.codpanolab);
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
      "Augusto",
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
    list = this.state.listaPanolab;
    console.log(list);

    return (
      <Container style={{ marginTop: 20 }}>
        <Form inline>
          <InputGroup>
            <Input
              type="date"
              onChange={this.handleChange}
              value={this.state.fechaPanolab}
              name="fechaPanolab"
              id="fechaPanolab"
            />
            <InputGroupAddon addonType="append">
              <Button
                onClick={this.handleSearch}
                style={{
                  marginRight: 10,
                  backgroundColor: "#563d7c",
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
            }/buscar_panolab/${this.props.match.params.codficha}/panolab/${
              this.props.match.params.codficha //aca tiene que ser codpanolab, no ficha es. ese es para agregar nomas y todavia no vas a tener el codpanolab ,cierto
            }`}
            style={{ color: "white" }}
          >
            <Button
              style={{ backgroundColor: "#563d7c", color: "white" }}
              onClick={this.handleAdd}
            >
              Agregar Panorámica
            </Button>
          </Link>
        </Form>

        <hr />
        <Container style={{ marginTop: 20 }}>
          <Row>
            <Col lg="7" md="7" sm="7">
              {list.map(item => (
                <div
                  style={{
                    borderLeft: "5px solid",
                    marginBottom: 15,
                    padding: 10,
                    borderLeftColor: "#563d7c",
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
                      color: "#563d7c",
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "none"
                      }
                    }}
                    to={`/menu_ficha/${item.codficha}/buscar_panolab/${
                      item.codficha
                    }/panolab_view/${item.codpanolab}/${item.codficha}`}
                  >
                    <h4>
                      <strong>Fecha: </strong>{" "}
                      {this.formatDate(new Date(item.fechapanolab))}
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
                          <strong>Prótesis: </strong> {item.protesis}
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <strong>Observación: </strong> {item.observacion}
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

export default BuscarPanolab;
