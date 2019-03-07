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
class FichaView extends Component {
  constructor() {
    super();
    this.state = {
      datospaciente: {},
      datosficha: {}
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }
  onDismiss() {
    this.setState({ visible: false });
  }

  async handleDelete() {
    const cod = this.props.match.params.codpaciente;
    const url1 = "http://127.0.0.1:8000/api/paciente/";
    await fetch(url1 + cod + "/", { method: "DELETE" })
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
        this.setState({ visible: !this.state.visible });
      });
  }

  async componentWillMount() {
    const cod = this.props.match.params.codpaciente;
    const url1 = "http://127.0.0.1:8000/api/paciente?codpaciente=";
    const url2 = "http://127.0.0.1:8000/api/ficha?codpaciente=";
    let datospaciente = {};
    let datosficha = {};

    await fetch(url1 + cod)
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          return new Error("No se recibio la respuesta esperada ...");
        }
      })
      .then(function(response) {
        datospaciente = response[0];
      })
      .catch(error => console.log(error));

    if (datospaciente !== undefined) {
      await fetch(url2 + cod)
        .then(function(response) {
          if (response.ok) {
            return response.json();
          } else {
            return new Error("No se recibio la respuesta esperada ...");
          }
        })
        .then(function(response) {
          datosficha = response[0];
        })
        .catch(error => console.log(error));
      this.setState({
        datosficha: datosficha,
        datospaciente: datospaciente
      });
    } else {
      return 0;
    }

    console.log(this.state.datosficha);
    console.log(this.state.datospaciente);
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
                    <p>{this.state.datospaciente.nombres}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Apellidos:</strong>
                    </Label>
                    <p>{this.state.datospaciente.apellidos}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>CI:</strong>
                    </Label>
                    <p>{this.state.datospaciente.cedula}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Sexo:</strong>
                    </Label>
                    <p>{this.state.datospaciente.sexo}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Fecha de Inclusion :</strong>
                    </Label>
                    <p>{this.state.datospaciente.fechainclusion}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Procedencia:</strong>
                    </Label>
                    <p>{this.state.datospaciente.procedencia}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Nacionalidad:</strong>
                    </Label>
                    <p>{this.state.datospaciente.nacionalidad}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Escolaridad:</strong>
                    </Label>
                    <p>{this.state.datospaciente.escolaridad}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Diagnostico:</strong>
                    </Label>
                    <p>{this.state.datospaciente.diagnostico}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Fecha de Diagnostico:</strong>
                    </Label>
                    <p>{this.state.datospaciente.fechadiagnos}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Fecha de Nacimiento:</strong>
                    </Label>
                    <p>{this.state.datospaciente.fechanaci}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Estado Civil:</strong>
                    </Label>
                    <p>{this.state.datospaciente.estadocivil}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Profesion:</strong>
                    </Label>
                    <p>{this.state.datospaciente.profesion}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Telefono:</strong>
                    </Label>
                    <p>{this.state.datospaciente.telefono}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Linea Baja:</strong>
                    </Label>
                    <p>{this.state.datospaciente.lineabaja}</p>
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
                      <strong>Numero de Historial Clinico:</strong>
                    </Label>
                    <p>{this.state.datosficha.nhc}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Inicio de los Sintomas:</strong>
                    </Label>
                    <p>{this.state.datosficha.iniciosint}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Forma de Inicio de los Sintomas:</strong>
                    </Label>
                    <p>{this.state.datosficha.formainic}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Antecedentes Patologicos Familiares:</strong>
                    </Label>
                    <p>{this.state.datosficha.apf}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Antecedentes Patologicos Familiares CV:</strong>
                    </Label>
                    <p>{this.state.datosficha.apfcv}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Antecedentes Patologicos de Fractura:</strong>
                    </Label>
                    <p>{this.state.datosficha.appfractura}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>
                        Antecedentes Patologicos Familiares de Fractura:
                      </strong>
                    </Label>
                    <p>{this.state.datosficha.apffractura}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Datos de Protesis:</strong>
                    </Label>
                    <p>{this.state.datosficha.protesissitio}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Fecha de Protesis:</strong>
                    </Label>
                    <p>{this.state.datosficha.protefecha}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Antecedentes Familiares de Neoplasia:</strong>
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
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Fecha Inicio Tabaquismo:</strong>
                    </Label>
                    <p>{this.state.datosficha.tabaqfecha}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Paquetes por dia:</strong>
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
                      <strong>Ex Tabaquismo</strong>
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Edad Menarca:</strong>
                    </Label>
                    <p>{this.state.datosficha.menarca}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Edad Menopausia:</strong>
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
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Cantidad de Gestas:</strong>
                    </Label>
                    <p>{this.state.datosficha.gestas}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Cantidad de Partos:</strong>
                    </Label>
                    <p>{this.state.datosficha.partos}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Cantidad de Abortos:</strong>
                    </Label>
                    <p>{this.state.datosficha.abortos}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Cantidad de Cesareas:</strong>
                    </Label>
                    <p>{this.state.datosficha.cesareas}</p>
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
                      <strong>Hijos</strong>
                    </Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Factor Reumatoide:</strong>
                    </Label>
                    <p>{this.state.datosficha.factorreuma}</p>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>ACP:</strong>
                    </Label>
                    <p>{this.state.datosficha.acp}</p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Nivel ACP:</strong>
                    </Label>
                    <p>{this.state.datosficha.acp_nivel}</p>
                  </FormGroup>
                </Col>
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
          <Link to={`/ficha_edit/${this.state.datosficha.codpaciente}`}>
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
