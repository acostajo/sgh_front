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
      url1 + this.state.fechaPanolab + codficha + this.props.codficha;
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
        listaPanolab: listado,
        fadeIn: !this.state.fadeIn,
        alert: false
      });
    }
    console.log(url1 + this.state.fechaPanolab);
  }

  render() {
    let list = [];
    list = this.state.listaPanolab;
    console.log(list);
    return (
      <Container>
        <Alert color="danger" isOpen={this.state.alert} toggle={this.onDismiss}>
          No se encontro la Panorámica de Laboratorio!
        </Alert>
        <Row>
          <Col>
            <FormGroup>
              <Label for="fechaPanolab">
                Buscar por Fecha Panorámica de Laboratorio
              </Label>
              <Input
                type="date"
                onChange={this.handleChange}
                value={this.state.fechaPanolab}
                name="fechaPanolab"
                id="fechaPanolab"
              />
            </FormGroup>
            <Button onClick={this.handleSearch} color="primary">
              Buscar
            </Button>
          </Col>
          <Col>
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
                  <ListGroupItem>
                    <ListGroupItemHeading>
                      <Link to={`/panolab_view/${item.codpanolab}`}>
                        {" "}
                        <h4>{item.fechapanolab}</h4>
                      </Link>
                    </ListGroupItemHeading>
                    <ListGroupItemText>
                      <p>
                        <strong>Prótesis: </strong> {item.protesis}
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

export default BuscarPanolab;
