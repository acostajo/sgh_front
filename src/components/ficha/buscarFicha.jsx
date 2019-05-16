import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Card,
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
    const url = "http://127.0.0.1:8000/api/ficha/";

    const parametro = this.state.parametro;
    var listado;
    var fichas;

    switch (this.state.tipoBusqueda) {
      case "Nro. Documento":
        await axios
          .get(url)
          .then(function(response) {
            listado = response.data;
            console.log(listado);
          })
          .catch(function(error) {
            console.log(error);
          });

        fichas = listado.filter(item => {
          //return item.nrodocumento === parametro;
          return item.nrodocumento
            .toLowerCase()
            .startsWith(parametro.toLowerCase());
        });

        if (fichas.length === 0) {
          Alert.warning(
            "No se encontró el Paciente con ese Nro. Documento",
            5000
          );
        } else {
          //aviso = false;
        }
        console.log(fichas);
        this.setState({ datosficha: fichas, parametro: "" });
        break;

      case "Nombre":
        await axios
          .get(url)
          .then(function(response) {
            listado = response.data;
          })
          .catch(function(error) {
            console.log(error);
          });
        fichas = listado.filter(item => {
          return item.nombres.toLowerCase().startsWith(parametro.toLowerCase());
        });

        if (fichas.length === 0) {
          Alert.warning("No se encontró el Paciente con ese Nombre", 5000);
        } else {
          //aviso = false;
        }

        console.log(fichas);
        this.setState({ datosficha: fichas, parametro: "" });
        break;

      case "Apellido":
        await axios
          .get(url)
          .then(function(response) {
            listado = response.data;
          })
          .catch(function(error) {
            console.log(error);
          });
        fichas = listado.filter(item => {
          return item.apellidos
            .toLowerCase()
            .startsWith(parametro.toLowerCase());
        });

        if (fichas.length === 0) {
          Alert.warning("No se encontró el Paciente con ese Apellido", 5000);
        } else {
          //aviso = false;
        }
        console.log(fichas);
        this.setState({ datosficha: fichas, parametro: "" });
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
          <Col xs="2.5">
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
                <Row key={item.codficha}>
                  <Col>
                    <Card style={{ backgroundColor: "#F9FCFB" }}>
                      <Panel style={{ backgroundColor: "#F9FCFB" }}>
                        <Col>
                          <Link to={`/menu_ficha/${item.codficha}`}>
                            <h3>
                              {item.nombres} {item.apellidos}{" "}
                            </h3>
                          </Link>
                        </Col>
                        <Row>
                          <Col>
                            <FormGroup>
                              <strong>Nro. Documento: </strong>{" "}
                              {item.nrodocumento}
                            </FormGroup>
                          </Col>
                          <Col>
                            <FormGroup>
                              <strong>Fecha de Inclusión: </strong>{" "}
                              {item.fechainclusion}
                            </FormGroup>
                          </Col>
                          <Col>
                            <FormGroup>
                              <strong>Forma Inicio: </strong> {item.formainic}
                            </FormGroup>
                          </Col>
                          <Col>
                            <FormGroup>
                              <strong>Fecha Diagnóstico: </strong>
                              {item.fechadiagnos}
                            </FormGroup>
                          </Col>
                          <Col>
                            <FormGroup>
                              <strong>Diagnóstico: </strong>
                              {item.diagnostico}
                            </FormGroup>
                          </Col>
                        </Row>
                      </Panel>
                    </Card>
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
