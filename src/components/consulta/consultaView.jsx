import React, { Component } from "react";
import {
  Card,
  Button,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { Alert } from "rsuite";
import Consulta from "./consultaForm";
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
        Alert.success("La Consulta ha sido eliminada con éxito"); //con este avisas
        this.props.history.push(
          "/menu_ficha/" + this.props.match.params.codficha // esta parte no manda a ficha
        );
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
        <Card style={{ backgroundColor: "#F9FCFB" }}>
          <CardHeader style={{ backgroundColor: "#0B1A25", color: "white" }}>
            <h3>Datos Consulta</h3>
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
              <Row style={{ marginBottom: 20 }}>
                <Col>
                  <h5>Efectos Adversos</h5>
                  <Card style={{ padding: 10 }}>
                    <Row style={{ marginBottom: 10 }} />
                    <Row>
                      <Col />
                    </Row>
                    <Row />
                  </Card>
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
                      <strong>EVA:</strong>
                    </Label>
                    <p>{this.state.datosConsulta.eva}</p>
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
              <Row style={{ marginBottom: 10 }}>
                <Col>
                  <FormGroup>
                    <h5>Datos para los Scores</h5>
                    <Row>
                      <Col>
                        <Card
                          style={{
                            textAlign: "center",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 10
                          }}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ marginBottom: 20 }}>
                <Col>
                  <Card style={{ padding: 20 }}>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label>
                            <strong>CRP:</strong>
                          </Label>
                          <p>{this.state.datosConsulta.crp}</p>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label>
                            <strong>VSG:</strong>
                          </Label>
                          <p>{this.state.datosConsulta.vsg}</p>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>

              <Row style={{ marginBottom: 20 }}>
                <Col>
                  <Card style={{ padding: 20 }}>
                    <Row>
                      <FormGroup>
                        <Col>Variables para CDAI y SDAI</Col>
                      </FormGroup>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label>
                            <strong>VGP:</strong>
                          </Label>
                          <p>{this.state.datosConsulta.vgp1}</p>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label>
                            <strong>VGM:</strong>
                          </Label>
                          <p>{this.state.datosConsulta.vgm1}</p>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Card>
                </Col>

                <Col>
                  <Card style={{ padding: 20 }}>
                    <Row>
                      <FormGroup>
                        <Col>Variables para DAS28-PCR y DAS28-VSG</Col>
                      </FormGroup>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label>
                            <strong>VGM:</strong>
                          </Label>
                          <p>{this.state.datosConsulta.vgm2}</p>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label>
                            <strong>VGP:</strong>
                          </Label>
                          <p>{this.state.datosConsulta.vgp2}</p>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
              <Row style={{ marginBottom: 20 }}>
                <Col>
                  <Card style={{ padding: 20, textAlign: "center" }}>
                    <h4>CDAI</h4>
                    <h1
                      style={{
                        color: "blue"
                      }}
                    >
                      <p>{this.state.datosConsulta.cdai}</p>
                    </h1>
                    <h3
                      style={{
                        color: "blue"
                      }}
                    >
                      <p>{this.state.datosConsulta.CDAI_RANGO}</p>
                    </h3>
                  </Card>
                </Col>
                <Col>
                  <Card style={{ padding: 20, textAlign: "center" }}>
                    <h4>SDAI</h4>
                    <h1
                      style={{
                        color: "green"
                      }}
                    >
                      <p>{this.state.datosConsulta.sdai}</p>
                    </h1>
                    <h3
                      style={{
                        color: "green"
                      }}
                    >
                      <p>{this.state.datosConsulta.SDAI_RANGO}</p>
                    </h3>
                  </Card>
                </Col>
                <Col>
                  <Card style={{ padding: 20, textAlign: "center" }}>
                    <h4>DAS28-PCR</h4>
                    <h1
                      style={{
                        color: "orange"
                      }}
                    >
                      <p>{this.state.datosConsulta.das28pcr}</p>
                    </h1>
                    <h3
                      style={{
                        color: "orange"
                      }}
                    >
                      <p>{this.state.datosConsulta.DAS28_PCR_RANGO}</p>
                    </h3>
                  </Card>
                </Col>
                <Col>
                  <Card style={{ padding: 20, textAlign: "center" }}>
                    <h4>DAS28-VSG</h4>
                    <h1
                      style={{
                        color: "violet"
                      }}
                    >
                      <p>{this.state.datosConsulta.das28vsg}</p>
                    </h1>
                    <h3
                      style={{
                        color: "violet"
                      }}
                    >
                      <p>{this.state.datosConsulta.DAS28_VSG_RANGO}</p>
                    </h3>
                  </Card>
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

        <FormGroup>
          <Button
            onClick={this.handleDelete}
            color="danger"
            style={{ marginTop: 20 }}
          >
            Eliminar
          </Button>
        </FormGroup>
      </Container>
    );
  }
}

export default ConsultaView;
