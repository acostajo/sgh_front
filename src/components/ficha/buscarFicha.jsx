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

class BuscarFicha extends Component {
  constructor() {
    super();
    this.state = {
      nrodocumento: "",
      nhc: 0,
      codpaciente: 0,
      datosficha: {},
      datospaciente: {},
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
    const url1 = "http://127.0.0.1:8000/api/paciente?nrodocumento=";
    const url2 = "http://127.0.0.1:8000/api/ficha?codpaciente=";
    let datospaciente = {};
    let datosficha = {};
    let codpaciente;
    console.log(this.state.nrodocumento);
    await axios
      .get(url1 + this.state.nrodocumento)
      .then(function(response) {
        console.log(response.data[0]);
        if (response.data[0] === undefined) {
          codpaciente = null;
        } else {
          datospaciente = response.data[0];
        }
      })
      .catch(function(error) {
        console.log(error);
      });

    if (codpaciente !== null) {
      await axios
        .get(url2 + datospaciente.codpaciente)
        .then(function(response) {
          console.log(response.data[0]);
          datosficha = response.data[0];
        })
        .catch(function(error) {
          console.log(error);
        });
      this.setState({
        datosficha: datosficha,
        datospaciente: datospaciente,
        fadeIn: !this.state.fadeIn,
        alert: false
      });
    } else {
      this.setState({ alert: !this.state.alert, fadeIn: !this.state.fadeIn });
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
          {/* <Col>
            <FormGroup>
              <Label for="nhc">Buscar por NHC</Label>

              <Input
                type="number"
                onChange={this.handleChange}
                value={this.state.nhc}
                name="nhc"
                id="nhc"
              />
            </FormGroup>
          </Col> */}
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
                          {this.state.datospaciente.nombres}{" "}
                          {this.state.datospaciente.apellidos}{" "}
                        </h4>
                      </Link>
                    </ListGroupItemHeading>
                    <ListGroupItemText>
                      <p>
                        <strong>Sexo: </strong> {this.state.datospaciente.sexo}
                      </p>
                      <p>
                        <strong>Nacionalidad: </strong>
                        {this.state.datospaciente.nacionalidad}
                      </p>
                      <p>
                        <strong>Estado Civil: </strong>
                        {this.state.datospaciente.estadocivil}
                      </p>
                      <p>
                        <strong>Profesion: </strong>
                        {this.state.datospaciente.profesion}
                      </p>
                      <p>
                        <strong>Diagnostico: </strong>
                        {this.state.datospaciente.diagnostico}
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
                <Link
                  to={`/consulta/${this.state.datosficha.codpaciente}/${
                    this.state.datosficha.codficha
                  }`}
                >
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

export default BuscarFicha;
