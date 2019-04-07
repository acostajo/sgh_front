import React, { Component } from "react";
import manito from "./manito.jpg";
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
import "bootstrap/dist/css/bootstrap.css";
import "./estilos.css";

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
      sientepaci: "Sin Dolor", //	escala del 0 (sin dolor) al 10 (máximo dolor)
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
                <Col>
                  <FormGroup>
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
                        active={this.state.rSelected}
                      >
                        Dolor severo
                      </Button>
                      <Button
                        color="info"
                        onClick={() => this.onRadioBtnClick("Dolor muy severo")}
                        active={this.state.rSelected}
                      >
                        Dolor muy severo
                      </Button>
                      <Button
                        color="danger"
                        onClick={() => this.onRadioBtnClick("Máximo dolor")}
                        active={this.state.rSelected}
                      >
                        Máximo dolor
                      </Button>
                    </ButtonGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <h5>Datos para los Scores</h5>
                    <Row>
                      <Col>
                        <h6>NAD</h6>
                      </Col>
                      <Col>
                        <h6>NAT</h6>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="contenedorPrincipal">
                          <img src={manito} width="500" height="300" />
                          <input
                            type="checkbox"
                            className="checkBox1"
                            name="checkNAD1"
                          />
                          <input
                            type="checkbox"
                            className="checkBox2"
                            name="checkNAD2"
                          />
                          <input
                            type="checkbox"
                            className="checkBox3"
                            name="checkNAD3"
                          />
                          <input
                            type="checkbox"
                            className="checkBox4"
                            name="checkNAD4"
                          />
                          <input
                            type="checkbox"
                            className="checkBox5"
                            name="checkNAD5"
                          />
                          <input
                            type="checkbox"
                            className="checkBox6"
                            name="checkNAD6"
                          />
                          <input
                            type="checkbox"
                            className="checkBox7"
                            name="checkNAD7"
                          />
                          <input
                            type="checkbox"
                            className="checkBox8"
                            name="checkNAD8"
                          />
                          <input
                            type="checkbox"
                            className="checkBox9"
                            name="checkNAD9"
                          />
                          <input
                            type="checkbox"
                            className="checkBox10"
                            name="checkNAD10"
                          />
                          <input
                            type="checkbox"
                            className="checkBox11"
                            name="checkNAD11"
                          />
                          <input
                            type="checkbox"
                            className="checkBox12"
                            name="checkNAD12"
                          />
                          <input
                            type="checkbox"
                            className="checkBox13"
                            name="checkNAD13"
                          />
                          <input
                            type="checkbox"
                            className="checkBox14"
                            name="checkNAD14"
                          />
                          <input
                            type="checkbox"
                            className="checkBox15"
                            name="checkNAD15"
                          />
                          <input
                            type="checkbox"
                            className="checkBox16"
                            name="checkNAD16"
                          />
                          <input
                            type="checkbox"
                            className="checkBox17"
                            name="checkNAD17"
                          />
                          <input
                            type="checkbox"
                            className="checkBox18"
                            name="checkNAD18"
                          />
                          <input
                            type="checkbox"
                            className="checkBox19"
                            name="checkNAD19"
                          />
                          <input
                            type="checkbox"
                            className="checkBox20"
                            name="checkNAD20"
                          />
                          <input
                            type="checkbox"
                            className="checkBox21"
                            name="checkNAD21"
                          />
                          <input
                            type="checkbox"
                            className="checkBox22"
                            name="checkNAD22"
                          />
                          <input
                            type="checkbox"
                            className="checkBox23"
                            name="checkNAD23"
                          />
                          <input
                            type="checkbox"
                            className="checkBox24"
                            name="checkNAD24"
                          />
                          <input
                            type="checkbox"
                            className="checkBox25"
                            name="checkNAD25"
                          />
                          <input
                            type="checkbox"
                            className="checkBox26"
                            name="checkNAD26"
                          />
                          <input
                            type="checkbox"
                            className="checkBox27"
                            name="checkNAD27"
                          />
                          <input
                            type="checkbox"
                            className="checkBox28"
                            name="checkNAD28"
                          />
                        </div>
                      </Col>
                      <Col>
                        <div className="contenedorPrincipal">
                          <img src={manito} width="500" height="300" />
                          <input
                            type="checkbox"
                            className="checkBox1"
                            name="checkNAT1"
                          />
                          <input
                            type="checkbox"
                            className="checkBox2"
                            name="checkNAT2"
                          />
                          <input
                            type="checkbox"
                            className="checkBox3"
                            name="checkNAT3"
                          />
                          <input
                            type="checkbox"
                            className="checkBox4"
                            name="checkNAT4"
                          />
                          <input
                            type="checkbox"
                            className="checkBox5"
                            name="checkNAT5"
                          />
                          <input
                            type="checkbox"
                            className="checkBox6"
                            name="checkNAT6"
                          />
                          <input
                            type="checkbox"
                            className="checkBox7"
                            name="checkNAT7"
                          />
                          <input
                            type="checkbox"
                            className="checkBox8"
                            name="checkNAT8"
                          />
                          <input
                            type="checkbox"
                            className="checkBox9"
                            name="checkNAT9"
                          />
                          <input
                            type="checkbox"
                            className="checkBox10"
                            name="checkNAT10"
                          />
                          <input
                            type="checkbox"
                            className="checkBox11"
                            name="checkNAT11"
                          />
                          <input
                            type="checkbox"
                            className="checkBox12"
                            name="checkNAT12"
                          />
                          <input
                            type="checkbox"
                            className="checkBox13"
                            name="checkNAT13"
                          />
                          <input
                            type="checkbox"
                            className="checkBox14"
                            name="checkNAT14"
                          />
                          <input
                            type="checkbox"
                            className="checkBox15"
                            name="checkNAT15"
                          />
                          <input
                            type="checkbox"
                            className="checkBox16"
                            name="checkNAT16"
                          />
                          <input
                            type="checkbox"
                            className="checkBox17"
                            name="checkNAT17"
                          />
                          <input
                            type="checkbox"
                            className="checkBox18"
                            name="checkNAT18"
                          />
                          <input
                            type="checkbox"
                            className="checkBox19"
                            name="checkNAD19"
                          />
                          <input
                            type="checkbox"
                            className="checkBox20"
                            name="checkNAT20"
                          />
                          <input
                            type="checkbox"
                            className="checkBox21"
                            name="checkNAT21"
                          />
                          <input
                            type="checkbox"
                            className="checkBox22"
                            name="checkNAT22"
                          />
                          <input
                            type="checkbox"
                            className="checkBox23"
                            name="checkNAT23"
                          />
                          <input
                            type="checkbox"
                            className="checkBox24"
                            name="checkNAT24"
                          />
                          <input
                            type="checkbox"
                            className="checkBox25"
                            name="checkNAT25"
                          />
                          <input
                            type="checkbox"
                            className="checkBox26"
                            name="checkNAT26"
                          />
                          <input
                            type="checkbox"
                            className="checkBox27"
                            name="checkNAT27"
                          />
                          <input
                            type="checkbox"
                            className="checkBox28"
                            name="checkNAT28"
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>
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
