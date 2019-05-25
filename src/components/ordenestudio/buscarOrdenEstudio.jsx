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

class BuscarOrdenEstudio extends Component {
  constructor() {
    super();
    this.state = {
      fechaOrdenEstudio: "",
      listaOrdenEstudio: [],
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
    const url1 = "http://127.0.0.1:8000/api/ordenestudio?fechaordenestudio=";
    const codficha = "&codficha=";
    let listado = [];
    let respuesta;

    const url_usar =
      url1 +
      this.state.fechaOrdenEstudio +
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
      Alert.warning("No se encontra la Orden de Estudio");
    } else {
      this.setState({
        listaOrdenEstudio: listado
      });
    }

    console.log(url1 + this.state.fechaOrdenEstudio);

    console.log(this.props.match.params.codficha);
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

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + " " + monthNames[monthIndex] + " " + year;
  }
  render() {
    let list = [];
    list = this.state.listaOrdenEstudio;
    console.log(list);
    return (
      <Container style={{ marginTop: 20 }}>
        <Form inline>
          <InputGroup>
            <Input
              type="date"
              onChange={this.handleChange}
              value={this.state.fechaOrdenEstudio}
              name="fechaOrdenEstudio"
              id="fechaOrdenEstudio"
            />
            <InputGroupAddon addonType="append">
              <Button
                onClick={this.handleSearch}
                style={{ marginRight: 10, backgroundColor: "#337ab7" }}
              >
                Buscar
              </Button>
            </InputGroupAddon>
          </InputGroup>

          <Link
            to={`/menu_ficha/${
              this.props.match.params.codficha
            }/buscar_ordenestudio/${
              this.props.match.params.codficha
            }/ordenestudio/${this.props.match.params.codficha}`}
            style={{ color: "white" }}
          >
            <Button
              onClick={this.handleAdd}
              style={{ backgroundColor: "#337ab7" }}
            >
              Agregar Orden
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
                    borderLeftColor: "#337ab7",
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
                      color: "#337ab7",
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "none"
                      }
                    }}
                    to={`/menu_ficha/${item.codficha}/buscar_ordenestudio/${
                      item.codficha
                    }/ordenestudio_view/${item.codordenestudio}`}
                  >
                    <h4>
                      <strong>Fecha: </strong>{" "}
                      {this.formatDate(new Date(item.fechaordenestudio))}
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
                          <strong>Estado: </strong> {item.estado}
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <strong>Tipo Estudio: </strong> {item.estudio}
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

export default BuscarOrdenEstudio;
