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
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Alert, Icon } from "rsuite";

class BuscarEGC extends Component {
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
    // const url1 = "http://127.0.0.1:8000/api/panolab?fechapanolab=";
    // const codficha = "&codficha=";
    // let listado = [];
    // let respuesta;
    // const url_usar =
    //   url1 +
    //   this.state.fechaPanolab +
    //   codficha +
    //   this.props.match.params.codficha;
    // console.log(url_usar);
    // await axios
    //   .get(url_usar) //y asi queda concatenado todo, si no hay fecha igual trae solo lo de esa ficha, vamos a probar
    //   .then(function(response) {
    //     if (response.data[0] === undefined) {
    //       respuesta = null;
    //     } else {
    //       listado = response.data;
    //     }
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
    // if (respuesta === null) {
    //   Alert.warning("No se encontra la Ficha Panorámica");
    // } else {
    //   this.setState({
    //     listaPanolab: listado
    //   });
    // }
    // console.log(url1 + this.state.fechaPanolab);
    // console.log(this.props.match.params.codficha);
    // console.log(this.props.match.params.codpanolab);
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
                  backgroundColor: "#FF4C58",
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
            }/buscar_grc/grc/`}
            style={{ color: "white" }}
          >
            <Button
              style={{ backgroundColor: "#FF4C58", color: "white" }}
              onClick={this.handleAdd}
            >
              Agregar EGC
            </Button>
          </Link>
        </Form>

        <hr />
      </Container>
    );
  }
}

export default BuscarEGC;
