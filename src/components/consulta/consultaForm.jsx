import React, { Component } from "react";
import foto from "./jaz.jpg";
import {
  Card,
  Alert,
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
import axios from "axios";

class Ficha extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      aviso: false,
      //datos correspondientes a la consulta
      edad: "", //edad del paciente
      codconsulta: 0, //	código interno único para la ficha consulta
      codficha: "", //	código interno único para la ficha HA, para saber a qué ficha HA está asociada la ficha de consulta
      codusuario: "", //	código interno de usuario, para saber quién agrego la ficha de consulta
      fechaconsulta: "", //	fecha en la cual se emitió la consulta
      diagnostico: "", //	descripción diagnostico
      evolucion: "", //	descripción de la evolución
      limitacion: "", //	descripción de las limitaciones que posee el Paciente
      presionarte: 0, //	medida de la presión arterial
      frescresp: 0, //	medida de la frecuencia cardíaca
      freccardia: 0, //	medida de la frecuencia respiratoria
      peso: 0, //	peso
      talla: 0, //	talla
      nad: 0, //	número de articulaciones dolorosas
      nat: 0, //	número de articulaciones tumefactas
      eva: 0, //	escala visual analógica
      vgp: 0, //	valoración global del Paciente
      vgm: 0, //	valoración global del médico
      cdai0: 0, //	clinical disease activity index
      sdai0: 0, //	simple disease activity index
      haq: 0, //	health assessment questionnaire
      das28pcr: 0, //	disease activity score 28 - proteína c reactiva
      das28vsg: 0, //	disease activity score 28 - velocidad de sedimentación globular
      sientepaci: 0, //	escala del 0 (sin dolor) al 10 (máximo dolor)
      plan: 0, //	descripción del plan para el paciente
      fechacreada: 0, //	fecha de creación de la consulta
      deshabilitar: false,
      deshabilitartaba: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }
  handleChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  async handleAdd() {
    const consulta = {
      codficha: this.props.match.params.codficha,
      codusuario: 999,
      edad: this.state.edad,
      fechaconsulta: this.state.fechaconsulta,
      diagnostico: this.state.diagnostico,
      evolucion: this.state.evolucion,
      limitacion: this.state.limitacion,
      presionarte: this.state.presionarte,
      frescresp: this.state.frescresp,
      freccardia: this.state.freccardia,
      peso: this.state.peso,
      talla: this.state.talla,
      nad: this.state.nad,
      nat: this.state.nat,
      eva: this.state.eva,
      vgp: this.state.vgp,
      vgm: this.state.vgm,
      cdai: this.state.cdai,
      sdai: this.state.sdai,
      haq: this.state.haq,
      das28pcr: this.state.das28pcr,
      das28vsg: this.state.das28vsg,
      sientepaci: this.state.sientepaci,
      plan: this.state.plan,
      fechacreada: this.state.fechacreada
    };
    await fetch("http://127.0.0.1:8000/api/paciente/", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(consulta), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error))
      .then(response => {
        console.log("El paciente fue cargado con exito:", response);
        this.setState({ codpaciente: response.codpaciente });
      });
  }

  render() {
    return (
      <Container>
        <Alert
          color="info"
          isOpen={this.state.visible}
          toggle={this.onDismissVisivle}
        >
          La Consulta fue cargada con exito!
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
                    <Label for="edad">Edad</Label>
                    <Input
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.edad}
                      name="edad"
                      id="edad"
                    />
                  </FormGroup>
                </Col>
                {this.props.match.params.codficha}
              </Row>
            </Form>
          </CardBody>
        </Card>

        <Button onClick={this.handleAdd} color="primary">
          <img src={foto} />
        </Button>
      </Container>
    );
  }
}

export default Ficha;
