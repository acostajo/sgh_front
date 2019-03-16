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
      nrodocumento: "",
      nombre: "",
      listaConsulta: {},
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
        console.log(response.data[0]);
        if (response.data[0] === undefined) {
          respuesta = null;
        } else {
          listado = response.data[0];
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
    return (
      <Container>
        <Alert color="danger" isOpen={this.state.alert} toggle={this.onDismiss}>
          no se encontro el paciente!
        </Alert>
        <Row>
          <Col>
            <FormGroup>
              <Label for="nrodocumento">Buscar por CI</Label>
              <Input
                type="text"
                onChange={this.handleChange}
                value={this.state.nrodocumento}
                name="nrodocumento"
                id="nrodocumento"
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
              <Fade in={this.state.fadeIn}>
                <ListGroup>
                  <ListGroupItem>
                    <ListGroupItemHeading>
                      <Link
                        to={`/ficha_view/${this.state.datosficha.codpaciente}`}
                      >
                        <h4>
                          {this.state.datosficha.nombres}{" "}
                          {this.state.datosficha.apellidos}{" "}
                        </h4>
                      </Link>
                    </ListGroupItemHeading>
                    <ListGroupItemText>
                      <p>
                        <strong>Sexo: </strong> {this.state.datosficha.sexo}
                      </p>
                      <p>
                        <strong>Nacionalidad: </strong>
                        {this.state.datosficha.nacionalidad}
                      </p>
                      <p>
                        <strong>Estado Civil: </strong>
                        {this.state.datosficha.estadocivil}
                      </p>
                      <p>
                        <strong>Profesion: </strong>
                        {this.state.datosficha.profesion}
                      </p>
                      <p>
                        <strong>Diagnostico: </strong>
                        {this.state.datosficha.diagnostico}
                      </p>
                    </ListGroupItemText>
                  </ListGroupItem>
                </ListGroup>
              </Fade>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button onClick={this.handleAdd} color="primary">
                <Link to={`/consulta/${this.state.datosficha.codficha}`}>
                  Agregar Consulta
                </Link>
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

export default BuscarConsulta;
