import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Row,
  Fade,
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

  render() {
    let list = [];
    list = this.state.listaOrdenEstudio;
    console.log(list);
    return (
      <Container style={{ marginTop: 20, marginLeft: 100 }}>
        <Row>
          <Col>
            <h3>Búsqueda por Fecha Orden de Estudio</h3>
          </Col>
        </Row>
        <Row>
          <Col xs="5">
            <FormGroup>
              <Label for="fechaOrdenEstudio" />
              <Input
                type="date"
                onChange={this.handleChange}
                value={this.state.fechaOrdenEstudio}
                name="fechaOrdenEstudio"
                id="fechaOrdenEstudio"
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
                to={`/menu_ficha/${
                  this.props.match.params.codficha
                }/buscar_ordenestudio/${
                  this.props.match.params.codficha
                }/ordenestudio/${this.props.match.params.codficha}`}
                style={{ color: "white" }}
              >
                Agregar Orden de Estudio
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
                        to={`/menu_ficha/${item.codficha}/buscar_ordenestudio/${
                          item.codficha
                        }/ordenestudio_view/${item.codordenestudio}`}
                      >
                        {" "}
                        <h4>{item.fechaordenestudio}</h4>
                      </Link>
                    </ListGroupItemHeading>
                    <ListGroupItemText>
                      <Row>
                        <Col>
                          <strong>Estado: </strong> {item.estado}
                        </Col>
                        <Col>
                          <strong>Tipo Estudio: </strong> {item.estudio}
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

export default BuscarOrdenEstudio;
