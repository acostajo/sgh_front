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
const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 70,
      width: 2,
      borderleft: 1
    }}
  />
);

class FichaView extends Component {
  constructor() {
    super();
    this.state = {
      datosficha: {},
      visible: false
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }
  onDismiss() {
    this.setState({ visible: false });
  }

  async handleDelete() {
    const cod = this.props.codficha; //direccto accedes, yaa, y eso nomas es, que te falta ahora?
    const url1 = "http://127.0.0.1:8000/api/ficha/";
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
    const cod = this.props.codficha;
    const url1 = "http://127.0.0.1:8000/api/ficha?codficha=";
    let datosficha = {};

    await axios
      .get(url1 + cod)
      .then(function(response) {
        console.log(response.data[0]);
        datosficha = response.data[0];
      })
      .catch(function(error) {
        console.log(error);
      });

    this.setState({
      datosficha: datosficha
    });
    console.log(this.state.datosficha);
  }
  render() {
    return (
      <Container>
        <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
          La Ficha fue eliminada con con exito!
        </Alert>
        <Card>
          <CardHeader>
            <h3>Datos personales</h3>
          </CardHeader>
          <CardBody>
            <Form>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Nombres:</strong>
                    </Label>
                    <p>{this.state.datosficha.nombres}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Apellidos:</strong>
                    </Label>
                    <p>{this.state.datosficha.apellidos}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Fecha de Inclusión:</strong>
                    </Label>
                    <p>{this.state.datosficha.fechainclusion}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Tipo Documento:</strong>
                    </Label>
                    <p>{this.state.datosficha.tipodocumento}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Nro. Documento:</strong>
                    </Label>
                    <p>{this.state.datosficha.nrodocumento}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Procedencia:</strong>
                    </Label>
                    <p>{this.state.datosficha.procedencia}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>FN:</strong>
                    </Label>
                    <p>{this.state.datosficha.fechanaci}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Telef:</strong>
                    </Label>
                    <p>{this.state.datosficha.telefono}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Nacionalidad:</strong>
                    </Label>
                    <p>{this.state.datosficha.nacionalidad}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>E. Civil:</strong>
                    </Label>
                    <p>{this.state.datosficha.estadocivil}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Sexo:</strong>
                    </Label>
                    <p>{this.state.datosficha.sexo}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Escolaridad:</strong>
                    </Label>
                    <p>{this.state.datosficha.escolaridad}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Profesión:</strong>
                    </Label>
                    <p>{this.state.datosficha.profesion}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Dx:</strong>
                    </Label>
                    <p>{this.state.datosficha.diagnostico}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Fecha de Dx:</strong>
                    </Label>
                    <p>{this.state.datosficha.fechadiagnos}</p>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
        <hr />
        <Card>
          <CardHeader>
            <h3>Datos de la Ficha HA</h3>
          </CardHeader>
          <CardBody>
            <Form>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Fecha Inicio de los Síntomas:</strong>
                    </Label>
                    <p>{this.state.datosficha.iniciosint}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Forma de Inicio:</strong>
                    </Label>
                    <p>{this.state.datosficha.formainic}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>APF Reumáticos de Interés:</strong>
                    </Label>
                    <p>{this.state.datosficha.apf}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>APF CV:</strong>
                    </Label>
                    <p>{this.state.datosficha.apfcv}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>APP de Fractura:</strong>
                    </Label>
                    <p>{this.state.datosficha.appfractura}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>APFs de Fractura:</strong>
                    </Label>
                    <p>{this.state.datosficha.apffractura}</p>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Protesis Articulares - Sitio:</strong>
                    </Label>
                    <p>{this.state.datosficha.protesissitio}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Protesis Articulares - Fecha:</strong>
                    </Label>
                    <p>{this.state.datosficha.protefecha}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>APF de Neoplasias:</strong>
                    </Label>
                    <p>{this.state.datosficha.apfneoplasias}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup check>
                    <Input
                      disabled
                      type="checkbox"
                      value={this.state.datosficha.sedentarismo}
                    />
                    <Label check>
                      <strong>Sedentarismo</strong>
                    </Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup check>
                    <Input
                      disabled
                      type="checkbox"
                      value={this.state.datosficha.actifisica}
                    />
                    <Label check>
                      <strong>Actividad Fisica</strong>
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup check>
                    <Input
                      disabled
                      type="checkbox"
                      value={this.state.datosficha.tabaquismo}
                    />
                    <Label check>
                      <strong>Tabaquisimo:</strong>
                    </Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Fecha Inicio:</strong>
                    </Label>
                    <p>{this.state.datosficha.tabaqfecha}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>N° paq/año:</strong>
                    </Label>
                    <p>{this.state.datosficha.tabnumero}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup check>
                    <Input
                      disabled
                      type="checkbox"
                      value={this.state.datosficha.extabaq}
                    />
                    <Label check>
                      <strong>Ex Tabaquista:</strong>
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>Antecedentes Ginecológicos</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Menarca:</strong>
                    </Label>
                    <p>{this.state.datosficha.menarca}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Menopausia:</strong>
                    </Label>
                    <p>{this.state.datosficha.menopausia}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Edad de Inicio de Actividad Sexual:</strong>
                    </Label>
                    <p>{this.state.datosficha.edadvidasex}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Gestas:</strong>
                    </Label>
                    <p>{this.state.datosficha.gestas}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Parto:</strong>
                    </Label>
                    <p>{this.state.datosficha.partos}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Cesáreas:</strong>
                    </Label>
                    <p>{this.state.datosficha.cesareas}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Abortos:</strong>
                    </Label>
                    <p>{this.state.datosficha.abortos}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup check>
                    <Input
                      disabled
                      type="checkbox"
                      value={this.state.datosficha.hisjospost}
                    />
                    <Label check>
                      <strong>Hijos después del diagnóstico de AR</strong>
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Row>
                      <Col>
                        <Label>
                          <strong>FR(+):</strong>
                        </Label>
                        <p>{this.state.datosficha.factorreuma_pos}</p>
                      </Col>
                      <Col>
                        <Label>
                          <strong>FR(-):</strong>
                        </Label>
                        <p>{this.state.datosficha.factorreuma_neg}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Label>
                          <strong>Nivel/VR:</strong>
                        </Label>
                        <p>{this.state.datosficha.factorreuma_nivel}</p>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <ColoredLine color="grey" />
                <Col>
                  <FormGroup>
                    <Row>
                      <Col>
                        <Label>
                          <strong>ACPA (+):</strong>
                        </Label>
                        <p>{this.state.datosficha.acp_pos}</p>
                      </Col>
                      <Col>
                        <Label>
                          <strong>ACPA (-):</strong>
                        </Label>
                        <p>{this.state.datosficha.acp_neg}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Label>
                          <strong>Nivel/VR:</strong>
                        </Label>
                        <p>{this.state.datosficha.acpa_nivel}</p>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <ColoredLine color="grey" />
                <Col>
                  <FormGroup>
                    <Row>
                      <Col>
                        <Label>
                          <strong>ANA (+):</strong>
                        </Label>
                        <p>{this.state.datosficha.ana_pos}</p>
                      </Col>
                      <Col>
                        <Label>
                          <strong>ANA (-):</strong>
                        </Label>
                        <p>{this.state.datosficha.ana_neg}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Label>
                          <strong>Dilución/Patrón:</strong>
                        </Label>
                        <p>{this.state.datosficha.ana_patron}</p>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col>
                  <FormGroup check>
                    <Input
                      disabled
                      type="checkbox"
                      value={this.state.datosficha.rxmanos}
                    />
                    <Label check>
                      <strong>RX Manos</strong>
                    </Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Fecha de RX Manos:</strong>
                    </Label>
                    <p>{this.state.datosficha.rxmanosfecha}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup check>
                    <Input
                      disabled
                      type="checkbox"
                      value={this.state.datosficha.rxpies}
                    />
                    <Label check>
                      <strong>RX Pies</strong>
                    </Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Fecha de RX Pies:</strong>
                    </Label>
                    <p>{this.state.datosficha.rxpiesfecha}</p>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
        <hr />
        <FormGroup>
          <Link to={`/ficha_edit/${this.state.datosficha.codficha}`}>
            <Button color="success">Modificar</Button>
          </Link>
          {"      "}
          <Button onClick={this.handleDelete} color="danger">
            Eliminar
          </Button>
        </FormGroup>
      </Container>
    );
  }
}

export default FichaView;
