import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Alert,
  Row,
  Col,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { Panel } from "rsuite";

class BuscarFicha extends Component {
  constructor() {
    super();
    this.state = {
      nrodocumento: "",
      nombre: "",
      apellido: "",
      datosficha: {},
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
    const url_nroDoc = "http://127.0.0.1:8000/api/ficha?nrodocumento=";
    const urlNomApe = "http://127.0.0.1:8000/api/ficha?nombres=";
    const apellido = "&apellidos=";
    const nroDoc = this.state.nrodocumento;
    let datosficha = {};
    let respuesta;
    let url_usada;

    if (this.state.nrodocumento === "") {
      //si esta vacio vamos a preguntar si nombre o apellido estan con algun valor
      if (this.state.nombre !== "" || this.state.apellido !== "") {
        //si ocurre que alguno de los dos esta osea con un valor, vamos a asignarle ambos, un nombre y un apellido, no importa cual este vacio, total igual trae
        url_usada = urlNomApe + apellido + this.state.apellido; //aca le concatena todo si entiendo nomas qria decir :()
      } else {
        //aca tenemos que avisar que nigun campo este vacio
      }
    } else {
      // si no esta vacio entonces usamos la primera url
      url_usada = url_nroDoc + nroDoc;
    }

    await axios
      .get(url_usada) //ahora necesitamos agregar los inputs
      .then(function(response) {
        console.log(response.data[0]);
        if (response.data[0] === undefined) {
          respuesta = null;
        } else {
          datosficha = response.data[0];
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
        datosficha: datosficha,
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
          {/*<Col>
            <FormGroup>
              <Label for="nrodocumento">Buscar por Nombre y apellido</Label>
              <Row>
                <Col>
                  <Input
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.nombre}
                    name="nombre"
                    id="nombre"
                  />
                </Col>
                <Col>
                  <Input
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.apellido}
                    name="apellido"
                    id="apellido"
                  />
                </Col>
              </Row>
            </FormGroup>
            {/*sale feito, vmos a ponerle uno al lado del otro. yo pense q iba a ser en un so*/}
        </Row>

        <hr />
        <Container>
          <Row>
            <Col>
              <Panel
                header="Datos de La Persona"
                bordered
                style={{ backgroundColor: "#F9FCFB" }}
              >
                <Link to={`/menu_ficha/${this.state.datosficha.codficha}`}>
                  <h4>
                    {this.state.datosficha.nombres}{" "}
                    {this.state.datosficha.apellidos}{" "}
                  </h4>
                </Link>
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
              </Panel>
            </Col>
          </Row>
          <Row />
        </Container>
      </Container>
    );
  }
}

export default BuscarFicha;
