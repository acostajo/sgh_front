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
  FormGroup,
  Label,
  Input
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { Alert } from "rsuite";

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
  }

  render() {
    let list = [];
    list = this.state.listaPanolab;
    console.log(list);
    return (
      <Container style={{ marginTop: 20, marginLeft: 100 }}>
        <Row>
          <Col>
            <h3>Búsqueda por Fecha Panorámica de Laboratorio</h3>
          </Col>
        </Row>

        <Row>
          <Col xs="5">
            <FormGroup>
              <Label for="fechaPanolab" />
              <Input
                type="date"
                onChange={this.handleChange}
                value={this.state.fechaPanolab}
                name="fechaPanolab"
                id="fechaPanolab"
              />
            </FormGroup>
          </Col>
          <Col xs="2.5" style={{ marginTop: 20 }}>
            <Button onClick={this.handleSearch} color="primary">
              Buscar
            </Button>
          </Col>
          <Col style={{ marginTop: 20 }}>
            <Button onClick={this.handleAdd} color="primary">
              <Link
                to={`/panolab/${this.props.codficha}`}
                style={{ color: "white" }}
              >
                Agregar Panorámica de Laboratorio
              </Link>
            </Button>
          </Col>
        </Row>

        <hr />
        <Container>
          <Row>
            <Col>
              <ListGroup>
                {list.map(item => (
                  <ListGroupItem
                    style={{ backgroundColor: "#F9FCFB", marginBottom: 20 }}
                  >
                    <ListGroupItemHeading
                      style={{ backgroundColor: "#F9FCFB" }}
                    >
                      <Link
                        to={`/panolab_view/${item.codpanolab}/${item.codficha}`}
                      >
                        {" "}
                        <h4>{item.fechapanolab}</h4>
                      </Link>
                    </ListGroupItemHeading>
                    <ListGroupItemText>
                      <Row>
                        <Col>
                          <strong>Prótesis: </strong> {item.protesis}
                        </Col>
                        <Col>
                          <strong>Observación: </strong> {item.observacion}
                        </Col>
                      </Row>
                    </ListGroupItemText>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

export default BuscarPanolab;
