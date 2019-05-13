import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Input
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { Panel, Fade } from "rsuite";
import { Alert } from "rsuite";

class BuscarFicha extends Component {
  constructor() {
    super();
    this.state = {
      parametro: "", //aca no falta nrodocumento, no porque yao le pasa el 1 que le ponemos osea , moira nomas
      nombre: "",
      apellido: "",
      tipoBusqueda: "Nro. Documento",
      datosficha: [],
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

    this.setState(
      {
        [name]: value
      },
      () => {
        console.log("new state", this.state);
      }
    );
    console.log(this.state.parametro);
  }

  filterMani(event) {
    var results = this.state.maniList.filter(mani => {
      return mani.nombre.toLowerCase().startsWith(event.query.toLowerCase());
    });

    this.setState({ suggestions: results });
  }

  async handleSearch() {
    const urlNroDoc = "http://127.0.0.1:8000/api/ficha?nrodocumento=";
    const urlNombre = "http://127.0.0.1:8000/api/ficha?nombres=";
    const urlApellido = "http://127.0.0.1:8000/api/ficha?apellidos=";
    const parametro = this.state.parametro;
    var listado;
    var fichas;

    switch (this.state.tipoBusqueda) {
      case "Nro. Documento":
        await axios
          .get(urlNroDoc)
          .then(function(response) {
            listado = response.data;
          })
          .catch(function(error) {
            console.log(error);
          });

        fichas = listado.filter(item => {
          return item.nrodocumento
            .toLowerCase()
            .startsWith(parametro.toLowerCase());
        });
        break;

      case "Nombre":
        await axios
          .get(urlNombre)
          .then(function(response) {
            listado = response.data;
          })
          .catch(function(error) {
            console.log(error);
          });
        console.log(listado);
        break;

      case "Apellido":
        await axios
          .get(urlApellido)
          .then(function(response) {
            listado = response.data;
          })
          .catch(function(error) {
            console.log(error);
          });
        console.log(listado);
        break;
    }

    console.log(this.state.tipoBusqueda);

    //aca validamos que metodo de busqueda se esta usando
  }

  render() {
    let list = this.state.datosficha;

    return (
      <Container>
        <Row style={{ marginBottom: 20 }}>
          <Col>
            <h3>Búsqueda de Paciente</h3>
          </Col>
        </Row>
        <Row>
          <Col xs="4">
            <FormGroup>
              <Input
                type="text"
                onChange={this.handleChange}
                value={this.state.parametro}
                name="parametro"
                id="parametro"
              />
            </FormGroup>
          </Col>
          <Col xs="2">
            <FormGroup>
              <Input
                type="select"
                onChange={this.handleChange}
                value={this.state.tipoBusqueda}
                name="tipoBusqueda"
                id="tipoBusqueda"
              >
                <option>Nro. Documento</option>
                <option>Nombre</option>
                <option>Apellido</option>
              </Input>
            </FormGroup>
          </Col>
          <Col>
            <Button onClick={this.handleSearch} color="primary">
              Buscar
            </Button>
          </Col>
        </Row>

        <hr />
        <Container>
          <Row>
            <Col>
              {list.map(item => (
                <Row>
                  <Col>
                    <Panel
                      header="Datos del Paciente"
                      bordered
                      style={{ backgroundColor: "#F9FCFB" }}
                    >
                      <Link to={`/menu_ficha/${item.codficha}`}>
                        <h4>
                          {item.nombres} {item.apellidos}{" "}
                        </h4>
                      </Link>
                      <p>
                        <strong>Sexo: </strong> {item.sexo}
                      </p>
                      <p>
                        <strong>Nacionalidad: </strong>
                        {item.nacionalidad}
                      </p>
                      <p>
                        <strong>Estado Civil: </strong>
                        {item.estadocivil}
                      </p>
                      <p>
                        <strong>Profesión: </strong>
                        {item.profesion}
                      </p>
                      <p>
                        <strong>Diagnóstico: </strong>
                        {item.diagnostico}
                      </p>
                    </Panel>
                  </Col>
                </Row>
              ))}
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

export default BuscarFicha;
