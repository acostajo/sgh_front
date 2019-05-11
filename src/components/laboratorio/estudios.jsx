import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Alert,
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

class ListaEstudios extends Component {
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
      this.setState({
        alert: !this.state.alert,
        fadeIn: !this.state.fadeIn
      });
    } else {
      this.setState({
        listaOrdenEstudio: listado,
        fadeIn: !this.state.fadeIn,
        alert: false
      });
    }
    console.log(url1 + this.state.fechaOrdenEstudio);
  }

  render() {
    let list = [];
    list = this.state.listaOrdenEstudio;
    console.log(list);
    return (
      <Container>
        <Alert color="danger" isOpen={this.state.alert} toggle={this.onDismiss}>
          No se encontro la Orden de Estudio!
        </Alert>
        <Row>
          <Col>
            <FormGroup>
              <Label for="fechaOrdenEstudio">
                Buscar por Fecha Orden de Estudio
              </Label>
              <Input
                type="date"
                onChange={this.handleChange}
                value={this.state.fechaOrdenEstudio}
                name="fechaOrdenEstudio"
                id="fechaOrdenEstudio"
              />
            </FormGroup>
            <Button onClick={this.handleSearch} color="primary">
              Buscar
            </Button>
            {"   "}
            <Button onClick={this.handleAdd} color="primary">
              <Link
                to={`/ordenestudio/${this.props.codficha}`}
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
                  <ListGroupItem>
                    <ListGroupItemHeading>
                      <Link
                        to={`/ordenestudio_view_lab/${item.codordenestudio}`}
                      >
                        {" "}
                        <h4>{item.fechaordenestudio}</h4>
                      </Link>
                    </ListGroupItemHeading>
                    <ListGroupItemText>
                      <p>
                        <strong>Estado: </strong> {item.estado}
                      </p>
                      <p>
                        <strong>Observación: </strong> {item.observacion}
                      </p>
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

export default ListaEstudios;
