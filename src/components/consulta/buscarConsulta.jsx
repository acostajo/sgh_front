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
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { Alert } from "rsuite";
import { Panel } from "rsuite";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Consulta from "../consulta/consultaForm";

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
    const url1 = "http://127.0.0.1:8000/api/consulta?fechaconsulta=";
    const codficha = "&codficha=";
    let listado = [];
    let respuesta;
    console.log(this.props.match.params.codficha); //y en esta parte del handle search de los demas nomas tenes que tocarle,

    await axios
      .get(
        url1 +
          this.state.fechaConsulta +
          codficha +
          this.props.match.params.codficha
      ) //y asi queda concatenado todo, si no hay fecha igual trae solo lo de esa ficha, vamos a probar
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

    /* if (respuesta === null) {
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
*/

    if (respuesta === null) {
      Alert.warning("No se encontra la Consulta");
    } else {
      this.setState({
        listaConsulta: listado
      });
    }
    console.log(
      url1 + this.state.fechaConsulta + codficha + this.props.codficha
    );
  }

  render() {
    let list = [];
    list = this.state.listaConsulta;
    console.log(list);
    return (
      <Container style={{ marginTop: 20, marginLeft: 100 }}>
        <Row>
          <Col>
            <h3>Búsqueda por Fecha Consulta</h3>
          </Col>
        </Row>

        <div class="col-50 align-self-center" style={{ display: "flex" }}>
          <Row>
            <Col xs="5">
              <FormGroup>
                <Label for="fechaConsulta" />
                <Input
                  type="date"
                  onChange={this.handleChange}
                  value={this.state.fechaConsulta}
                  name="fechaConsulta"
                  id="fechaConsulta"
                />
              </FormGroup>
            </Col>

            <Col xs="2" style={{ marginTop: 20 }}>
              <Button onClick={this.handleSearch} color="primary">
                Buscar
              </Button>
            </Col>
            <Col style={{ marginTop: 20 }}>
              <Button
                style={{ float: "rigth" }}
                onClick={this.handleAdd}
                color="primary"
              >
                <Link
                  to={`/consulta/${this.props.codficha}`}
                  style={{ color: "white" }}
                >
                  Agregar Consulta
                </Link>
              </Button>
            </Col>
          </Row>
        </div>

        <hr />
        <Container style={{ marginTop: 20 }}>
          <Row>
            <Col>
              {list.map(item => (
                <ListGroupItem
                  style={{ backgroundColor: "#F9FCFB", marginBottom: 20 }}
                >
                  <ListGroupItemHeading style={{ backgroundColor: "#F9FCFB" }}>
                    {/*<Link to={`/consulta_view/${item.codconsulta}`}>
                        {" "}
                        <h4>{item.fechaconsulta}</h4>
                </Link>*/}
                    <Link
                      to={`/consulta_view/${item.codconsulta}/${item.codficha}`}
                    >
                      <h4>{item.fechaconsulta}</h4>
                    </Link>
                  </ListGroupItemHeading>
                  <ListGroupItemText>
                    <Row>
                      <Col>
                        <strong>Diagnóstico: </strong> {item.diagnostico}
                      </Col>
                      <Col>
                        <strong>Limitación: </strong> {item.limitacion}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>Motivo Limitación: </strong>{" "}
                        {item.limitacionmotivo}
                      </Col>
                      <Col>
                        <strong>Tratamiento Actual: </strong>{" "}
                        {item.tratamientoactual}
                      </Col>
                    </Row>
                  </ListGroupItemText>
                </ListGroupItem>
              ))}
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

export default BuscarConsulta;
