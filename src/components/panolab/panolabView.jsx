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
  Label
} from "reactstrap";
import axios from "axios";
class PanolabView extends Component {
  constructor() {
    super();
    this.state = {
      datosPanolab: {},
      visible: false
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }
  onDismiss() {
    this.setState({ visible: false });
  }

  async handleDelete() {
    const cod = this.props.match.params.codpanolab; //direccto accedes, yaa, y eso nomas es, que te falta ahora?
    const url1 = "http://127.0.0.1:8000/api/panolab/";
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
    const cod = this.props.match.params.codpanolab;
    console.log("Esto se imprimer porque carga la view");
    const url1 = "http://127.0.0.1:8000/api/panolab?codpanolab=";
    let datosPanolab = {};

    console.log(cod);
    await axios
      .get(url1 + cod)
      .then(function(response) {
        console.log(response.data[0]);
        datosPanolab = response.data[0];
      })
      .catch(function(error) {
        console.log(error);
      });

    this.setState({
      datosPanolab: datosPanolab
    });
    console.log(this.state.datosPanolab); //trae bien, trae bien? el cod digo no el contenido
  }
  render() {
    return (
      <Container>
        <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
          La Panorámica de Laboratorio fue eliminada con con exito!
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
                      <strong>Prótesis:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.protesis}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Hb:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.hemoglobina}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Hto:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.hemotocrito}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>VCM:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.vcm}</p>
                  </FormGroup>
                </Col>

                <Col>
                  <FormGroup>
                    <Label>
                      <strong>GB:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.globlanco}</p>
                  </FormGroup>
                </Col>

                <Col>
                  <FormGroup>
                    <Label>
                      <strong>N/L:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.nl}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Plaq:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.plaqueta}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>GOT</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Desde:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.gotdesde}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Hasta:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.gothasta}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>GPT</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Desde:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.gptdesde}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Hasta:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.gpthasta}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>bilirrubina:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.bilirrubina}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>BT:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.bilirrubina}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Urea:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.uresa}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>VSG:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.vsg}</p>
                  </FormGroup>
                </Col>

                <Col>
                  <FormGroup>
                    <Label>
                      <strong>PCR:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.pcr}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Glic:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.glicemia}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>CT:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.coleste}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>LDL:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.ldl}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>HDL:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.hdl}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>VLDL:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.vldl}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>TG:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.trigliceri}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Ac. Úrico</strong>
                    </Label>
                    <p>{this.state.datosPanolab.acidourico}</p>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col>
                  <h5>FR</h5>
                </Col>
              </Row>

              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Desde:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.frdesde}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Hasta:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.frhasta}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>Anti CCP</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Negativo:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.anticcpneg}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Positivo:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.anticcppost}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Titulo:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.anticcpposd}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>ANA</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Negativo:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.ananeg}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Positivo:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.anaposit}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>AntiDNA</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Negativo:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.antidnaneg}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Positivo:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.antidnapos}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Prot 24:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.prot24}</p>
                  </FormGroup>
                </Col>

                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Observación:</strong>
                    </Label>
                    <p>{this.state.datosPanolab.observacion}</p>
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

export default PanolabView;
