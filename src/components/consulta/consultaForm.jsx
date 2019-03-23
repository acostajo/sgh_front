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
  ButtonGroup,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import axios from "axios";

class Example extends Component {
  constructor(props) {
    super(props);

    this.state = { cSelected: [] };

    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }
}

class Consulta extends Component {
  constructor() {
    super();
    this.state = {
      datospaciente: {},
      visible: false,
      aviso: false,
      //datos correspondientes a la consulta
      edad: 0, //edad del paciente
      codconsulta: 0, //	código interno único para la ficha consulta
      codficha: "", //	código interno único para la ficha HA, para saber a qué ficha HA está asociada la ficha de consulta
      codusuario: "", //	código interno de usuario, para saber quién agrego la ficha de consulta
      fechaconsulta: "", //	fecha en la cual se emitió la consulta
      diagnostico: "", //	descripción diagnostico
      tratamientoactual: "", //	descripción tratamiento actual
      evolucion: "", //	descripción de la evolución
      limitacion: "", //	descripción de las limitaciones que posee el Paciente
      limitacionmotivo: "", //	descripción de las limitaciones que posee el Paciente
      presionarte: null, //	medida de la presión arterial
      frescresp: null, //	medida de la frecuencia cardíaca
      freccardia: null, //	medida de la frecuencia respiratoria
      peso: null, //	peso
      talla: null, //	talla
      nad: null, //	número de articulaciones dolorosas
      nat: null, //	número de articulaciones tumefactas
      eva: null, //	escala visual analógica
      vgp: null, //	valoración global del Paciente
      vgm: null, //	valoración global del médico
      cdai: null, //	clinical disease activity index
      sdai: null, //	simple disease activity index
      haq: null, //	health assessment questionnaire
      das28pcr: null, //	disease activity score 28 - proteína c reactiva
      das28vsg: null, //	disease activity score 28 - velocidad de sedimentación globular
      sientepaci: null, //	escala del 0 (sin dolor) al 10 (máximo dolor)
      plan: null, //	descripción del plan para el paciente
      fechacreada: 0, //	fecha de creación de la consulta
      deshabilitar: false,
      deshabilitartaba: true,
      fechanacipaciente: ""
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
      codficha: parseInt(this.props.match.params.codficha), //y lpara este el codficha, por eso necesitabamos que pase los dos
      codusuario: 999,
      edad: this.state.edad,
      fechaconsulta: this.state.fechaconsulta,
      diagnostico: this.state.diagnostico,
      tratamientoactual: this.state.tratamientoactual,
      evolucion: this.state.evolucion,
      limitacion: this.state.limitacion,
      limitacionmotivo: this.state.limitacionmotivo,
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
      fechacreada: this.state.fechacreada,
      fecha: this.state.datospaciente.fechanaci
    };
    await fetch("http://127.0.0.1:8000/api/consulta/", {
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
      });
  }

  async componentWillMount() {
    const url1 = "http://127.0.0.1:8000/api/ficha?codficha=";
    let datopaciente = {};
    await axios
      .get(url1 + this.props.match.params.codficha) //para este necesitamos el codpaciente
      .then(function(response) {
        console.log(response.data[0]);
        datopaciente = response.data[0];
      })
      .catch(function(error) {
        console.log(error);
      });
    this.setState({ datospaciente: datopaciente });

    //calcular
    var hoy = new Date();
    var cumpleanos = new Date(this.state.datospaciente.fechanaci);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();

    if (hoy.getDate() < cumpleanos.getDate()) {
      edad--;
    }
    this.setState({ edad: edad });
    console.log(this.props.match.params.codficha);
  }

  onRadioBtnClick(rSelected) {
    this.setState({ sientepaci: rSelected });
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
                <Col>
                  <FormGroup>
                    <Label for="fechaconsulta">Fecha de Consulta</Label>
                    <Input
                      type="date"
                      onChange={this.handleChange}
                      value={this.state.fechaconsulta}
                      name="fechaconsulta"
                      id="fechaconsulta"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="diagnostico">Diagnóstico</Label>
                    <Input
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.diagnostico}
                      name="diagnostico"
                      id="diagnostico"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="tratamientoactual">Tratamiento Actual</Label>
                    <Input
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.tratamientoactual}
                      name="tratamientoactual"
                      id="tratamientoactual"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="evolucion">Evolución</Label>
                    <Input
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.evolucion}
                      name="evolucion"
                      id="evolucion"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="limitacion">Limitación</Label>
                    <Input
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.limitacion}
                      name="limitacion"
                      id="limitacion"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="limitacionmotivo">Motivo</Label>
                    <Input
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.limitacionmotivo}
                      name="limitacionmotivo"
                      id="limitacionmotivo"
                    />
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
                    <Label for="presionarte">PA</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.presionarte}
                      name="presionarte"
                      id="presionarte"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="frescresp">FC</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.frescresp}
                      name="frescresp"
                      id="frescresp"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="freccardia">FR</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.freccardia}
                      name="freccardia"
                      id="freccardia"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="peso">Peso</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.peso}
                      name="peso"
                      id="peso"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="talla">Talla</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.talla}
                      name="talla"
                      id="talla"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="nad">NAD</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.nad}
                      name="nad"
                      id="nad"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="nat">NAT</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.nat}
                      name="nat"
                      id="nat"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="eva">EVA</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.eva}
                      name="eva"
                      id="eva"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="vgp">VGP</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.vgp}
                      name="vgp"
                      id="vgp"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="vgm">VGM</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.vgm}
                      name="vgm"
                      id="vgm"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="cdai">CDAI</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.cdai}
                      name="cdai "
                      id="cdai"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="sdai">SDAI</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.sdai}
                      name="sdai"
                      id="sdai"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="haq">HAQ</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.haq}
                      name="haq"
                      id="haq"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="das28pcr">DAS28 (PCR)</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.das28pcr}
                      name="das28pcr"
                      id="das28pcr"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="das28vsg">DAS28 (VSG)</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.das28vsg}
                      name="das28vsg"
                      id="das28vsg"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <div>
                  <h5>¿Como se siente el Paciente?</h5>
                  <ButtonGroup>
                    <Button
                      color="secondary"
                      onClick={() => this.onRadioBtnClick("Sin dolor")}
                      active={this.state.rSelected === "Sin dolor"}
                    >
                      Sin dolor
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => this.onRadioBtnClick("Dolor leve")}
                      active={this.state.rSelected === "Dolor leve"}
                    >
                      Dolor leve
                    </Button>
                    <Button
                      color="warning"
                      onClick={() => this.onRadioBtnClick("Dolor moderado")}
                      active={this.state.rSelected === "Dolor moderado"}
                    >
                      Dolor moderado
                    </Button>
                    <Button
                      color="success"
                      onClick={() => this.onRadioBtnClick("Dolor severo")}
                      active={this.state.rSelected === "Dolor severo"}
                    >
                      Dolor severo
                    </Button>
                    <Button
                      color="info"
                      onClick={() => this.onRadioBtnClick("Dolor muy severo")}
                      active={this.state.rSelected === "Dolor muy severo"}
                    >
                      Dolor muy severo
                    </Button>
                    <Button
                      color="danger"
                      onClick={() => this.onRadioBtnClick("Máximo dolor")}
                      active={this.state.rSelected === "Máximo dolor"}
                    >
                      Máximo dolor
                    </Button>
                  </ButtonGroup>
                </div>
              </Row>
              {/*<Row>
                <Col>
                  <FormGroup>
                    <Label for="sientepaci">Como se siente el Paciente</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.sientepaci}
                      name="sientepaci"
                      id="sientepaci"
                    />
                  </FormGroup>
                </Col>
              </Row>*/}
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="plan">Plan</Label>
                    <Input
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.plan}
                      name="plan"
                      id="plan"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>

        <Button onClick={this.handleAdd} color="primary">
          Agregar
        </Button>
      </Container>
    );
  }
}

export default Consulta;
