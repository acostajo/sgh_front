import React, { Component } from "react";
import {
  Card,
  Button,
  CardHeader,
  CardBody,
  Container,
  Row,
  Alert,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
class ConsultaView extends Component {
  constructor() {
    super();
    this.state = {
      datosConsulta: {},
      visible: false
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }
  onDismiss() {
    this.setState({ visible: false });
  }

  async handleDelete() {
    const cod = this.props.match.params.codconsulta; //direccto accedes, yaa, y eso nomas es, que te falta ahora?
    const url1 = "http://127.0.0.1:8000/api/consulta/";
    await fetch(url1 + cod + "/", { method: "DELETE" }) //este es el method para borar y se le pasa el cod nomas
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          return new Error("No se recibio la respuesta esperada ...");
        }
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        this.setState({ visible: !this.state.visible }); // aca despues de mandarle al server para elminar le setea en true
      });
  }

  async componentWillMount() {
    const cod = this.props.match.params.codconsulta;
    console.log(cod);
    const url1 = "http://127.0.0.1:8000/api/consulta?codconsulta=";
    let datosConsulta = {};

    await axios
      .get(url1 + cod)
      .then(function(response) {
        console.log(response.data[0]);
        datosConsulta = response.data[0];
      })
      .catch(function(error) {
        console.log(error);
      });

    this.setState({
      datosConsulta: datosConsulta
    });
    console.log(this.state.datosConsulta); //trae bien, trae bien? el cod digo no el contenido
  }
  render() {
    return (
      <Container>
        <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
          La Consulta fue eliminada con con exito!
        </Alert>
        <Card>
          <CardHeader>
            <h3>Datos</h3>
          </CardHeader>
          <CardBody>
            <Form>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Edad:</strong>
                    </Label>
                    <p>{this.state.datosConsulta.edad}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Fecha de Consulta:</strong>
                    </Label>
                    <p>{this.state.datosConsulta.fechaconsulta}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Diagnóstico:</strong>
                    </Label>
                    <p>{this.state.datosConsulta.diagnostico}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Tratamiento Actual:</strong>
                    </Label>
                    <p>{this.state.datosConsulta.tratamientoactual}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Evolución:</strong>
                    </Label>
                    <p>{this.state.datosConsulta.evolucion}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Limitación:</strong>
                    </Label>
                    <p>{this.state.datosConsulta.limitacion}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Motivo:</strong>
                    </Label>
                    <p>{this.state.datosConsulta.limitacionmotivo}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>Examen Físico</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>PA:</strong>
                    </Label>
                    <p>{this.state.datosConsulta.presionarte}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>FC:</strong>
                    </Label>
                    <p>{this.state.datosConsulta.frescresp}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>FR:</strong>
                    </Label>
                    <p>{this.state.datosConsulta.freccardia}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Peso:</strong>
                    </Label>
                    <p>{this.state.datosConsulta.peso}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Talla:</strong>
                    </Label>
                    <p>{this.state.datosConsulta.talla}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>NAD:</strong>
                    </Label>
                    <p>{this.state.datosConsulta.nad}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>NAT:</strong>
                    </Label>
                    <p>{this.state.datosConsulta.nat}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>EVA:</strong>
                    </Label>
                    <p>{this.state.datosConsulta.eva}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>VGP:</strong>
                    </Label>
                    <p>{this.state.datosConsulta.vgp}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>VGM:</strong>
                    </Label>
                    <p>{this.state.datosConsulta.vgm}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>CDAI:</strong>
                    </Label>
                    <p>{this.state.datosConsulta.cdai}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>SDAI:</strong>
                    </Label>
                    <p>{this.state.datosConsulta.sdai}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>HAQ:</strong>
                    </Label>
                    <p>{this.state.datosConsulta.haq}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>DAS28 (PCR):</strong>
                    </Label>
                    <p>{this.state.datosConsulta.das28pcr}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>DAS28 (VSG):</strong>
                    </Label>
                    <p>{this.state.datosConsulta.das28vsg}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Como se siente el Paciente:</strong>
                    </Label>
                    <p>{this.state.datosConsulta.sientepaci}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Plan:</strong>
                    </Label>
                    <p>{this.state.datosConsulta.plan}</p>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
        <hr />
        <FormGroup>
          <Button onClick={this.handleDelete} color="danger">
            Eliminar
          </Button>
        </FormGroup>
      </Container>
    );
  }
}

export default ConsultaView;
