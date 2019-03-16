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
    const url1 = "http://127.0.0.1:8000/api/consulta?fechaconsulta";
    let listado = [];
    let respuesta;

    await axios
      .get(url1)
      .then(function(response) {
        // console.log(response.data);
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
        listaConsulta: listado,
        fadeIn: !this.state.fadeIn,
        alert: false
      });
    }
  }

  render() {
    let list = [];
    list = this.state.listaConsulta;
    console.log(list);
    return (
      <Container>
        <Alert color="danger" isOpen={this.state.alert} toggle={this.onDismiss}>
          no se encontro la consulta!
        </Alert>
        <Row>
          <Col>
            <FormGroup>
              <Label for="nrodocumento">Buscar por CI</Label>
              <Input
                type="date"
                onChange={this.handleChange}
                value={this.state.fechaConsulta}
                name="fechaConsulta"
                id="fechaConsulta"
              />
            </FormGroup>
            <Button onClick={this.handleSearch} color="primary">
              Buscar
            </Button>
          </Col>
        </Row>
        <hr />
        <Container>
          <Row>
            <Col>
              <ListGroup>
                {list.map(item => (
                  <ListGroupItem />
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

export default BuscarConsulta;

{
  /* <ListGroupItemHeading>
                      <Link
                        to={`/ficha_view/${this.state.datosficha.codficha}`}
                      >
                        <h4>
                          {this.state.datosficha.nombres}{" "}
                          {this.state.datosficha.apellidos}{" "}
                        </h4>
                      </Link>
                    </ListGroupItemHeading> */
}
