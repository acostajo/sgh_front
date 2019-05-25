import React, { Component } from "react";
import manito from "./manito.jpg";
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
  Label
} from "reactstrap";
import axios from "axios";
import { Alert } from "rsuite";
import Consulta from "./consultaForm";
import BootstrapTable from "react-bootstrap-table-next";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "./estilos.css";
import "react-input-range/lib/css/index.css";
import { render } from "react-dom";

import SweetAlert from "react-bootstrap-sweetalert";

class ConsultaView extends Component {
  constructor() {
    super();
    this.state = {
      datosConsulta: {},
      visible: false,
      showDeclarative: false,
      confirmDelete: false,
      confirmCancel: false,
      efectoSelected: {},
      efecto: "",
      efectoList: [],
      efectoListTable: [],
      efectoListTableSelected: [],
      columnsEfecto: [
        {
          dataField: "codefecad",
          hidden: true
        },
        {
          dataField: "nombre",
          text: "Nombre"
        }
      ]
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onCancelDelete = this.onCancelDelete.bind(this);
    this.alertDelete = this.alertDelete.bind(this);
    this.alertCancel = this.alertCancel.bind(this);
  }
  onDismiss() {
    this.setState({ visible: false });
  }

  async handleDelete() {
    const cod = this.props.match.params.codconsulta; //direccto accedes, yaa, y eso nomas es, que te falta ahora?
    const url1 = "http://127.0.0.1:8000/api/consulta/" + cod + "/";
    const response = await axios.delete(url1);
    console.log(this.props.match.params.codficha);
    if (response.status === 204) {
      Alert.success("La Consulta ha sido eliminada con éxito"); //con este avisascmenta nomas, ok
      this.props.history.push(
        "/menu_ficha/" +
          this.props.match.params.codficha +
          "/ficha_view/" +
          this.props.match.params.codficha // y con este mandas al menu de la fi
      );
    }
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

    //efecto adverso
    const url2 =
      "http://127.0.0.1:8000/api/efecto_adverso_consulta/?codconsulta=";
    const url3 = "http://127.0.0.1:8000/api/efecto_adverso/?codefecad=";

    let efectoConsulta = {};
    let liste = [];
    let listEfecto = [];

    await axios
      .get(url2 + cod)
      .then(function(response) {
        efectoConsulta = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });

    for (let item = 0; item < efectoConsulta.length; item++) {
      await axios
        .get(url3 + efectoConsulta[item].codefecad)
        .then(function(response) {
          liste.push(response.data[0]);
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    for (let item = 0; item < liste.length; item++) {
      const obj = {
        codefecad: liste[item].codefecad,
        nombre: liste[item].nombre
      };
      listEfecto.push(obj);
    }
    console.log(listEfecto);

    this.setState({ efectoListTable: listEfecto });
  }

  onCancelDelete = function() {
    this.setState({
      confirmCancel: !this.state.confirmCancel,
      confirmDelete: !this.state.confirmDelete
    });
  };

  alertDelete() {
    this.setState({ confirmDelete: !this.state.confirmDelete });
  }

  alertCancel = function() {
    this.setState({
      confirmCancel: !this.state.confirmCancel
    });
  };

  render() {
    return (
      <Container style={{ marginTop: 20 }}>
        <Card style={{ backgroundColor: "#F9FCFB" }}>
          <CardHeader style={{ backgroundColor: "#133E7C", color: "white" }}>
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
                    <Row>
                      <Col>
                        <BootstrapTable
                          keyField="codefecad"
                          data={this.state.efectoListTable}
                          columns={this.state.columnsEfecto}
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
              <Card style={{ padding: 10, marginBottom: 20 }}>
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
              </Card>
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
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>¿Como se siente el Paciente?:</strong>
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
                        >
                          <Row style={{}}>
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
                                  disabled
                                  type="checkbox"
                                  className="checkBox1"
                                  name="checkNAD1"
                                  checked={this.state.datosConsulta.checkNAD1}
                                  value={this.state.datosConsulta.checkNAD1}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox2"
                                  name="checkNAD2"
                                  checked={this.state.datosConsulta.checkNAD2}
                                  value={this.state.datosConsulta.checkNAD2}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox3"
                                  name="checkNAD3"
                                  checked={this.state.datosConsulta.checkNAD3}
                                  value={this.state.datosConsulta.checkNAD3}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox4"
                                  name="checkNAD4"
                                  checked={this.state.datosConsulta.checkNAD4}
                                  value={this.state.datosConsulta.checkNAD4}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox5"
                                  name="checkNAD5"
                                  checked={this.state.datosConsulta.checkNAD5}
                                  value={this.state.datosConsulta.checkNAD5}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox6"
                                  name="checkNAD6"
                                  checked={this.state.datosConsulta.checkNAD6}
                                  value={this.state.datosConsulta.checkNAD6}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox7"
                                  name="checkNAD7"
                                  checked={this.state.datosConsulta.checkNAD7}
                                  value={this.state.datosConsulta.checkNAD7}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox8"
                                  name="checkNAD8"
                                  checked={this.state.datosConsulta.checkNAD8}
                                  value={this.state.datosConsulta.checkNAD8}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox9"
                                  name="checkNAD9"
                                  checked={this.state.datosConsulta.checkNAD9}
                                  value={this.state.datosConsulta.checkNAD9}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox10"
                                  name="checkNAD10"
                                  checked={this.state.datosConsulta.checkNAD10}
                                  value={this.state.datosConsulta.checkNAD10}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox11"
                                  name="checkNAD11"
                                  checked={this.state.datosConsulta.checkNAD11}
                                  value={this.state.datosConsulta.checkNAD11}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox12"
                                  name="checkNAD12"
                                  checked={this.state.datosConsulta.checkNAD12}
                                  value={this.state.datosConsulta.checkNAD12}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox13"
                                  name="checkNAD13"
                                  checked={this.state.datosConsulta.checkNAD13}
                                  value={this.state.datosConsulta.checkNAD13}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox14"
                                  name="checkNAD14"
                                  checked={this.state.datosConsulta.checkNAD14}
                                  value={this.state.datosConsulta.checkNAD14}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox15"
                                  name="checkNAD15"
                                  checked={this.state.datosConsulta.checkNAD15}
                                  value={this.state.datosConsulta.checkNAD15}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox16"
                                  name="checkNAD16"
                                  checked={this.state.datosConsulta.checkNAD16}
                                  value={this.state.datosConsulta.checkNAD16}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox17"
                                  name="checkNAD17"
                                  checked={this.state.datosConsulta.checkNAD17}
                                  value={this.state.datosConsulta.checkNAD17}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox18"
                                  name="checkNAD18"
                                  checked={this.state.datosConsulta.checkNAD18}
                                  value={this.state.datosConsulta.checkNAD18}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox19"
                                  name="checkNAD19"
                                  checked={this.state.datosConsulta.checkNAD19}
                                  value={this.state.datosConsulta.checkNAD19}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox20"
                                  name="checkNAD20"
                                  checked={this.state.datosConsulta.checkNAD20}
                                  value={this.state.datosConsulta.checkNAD20}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox21"
                                  name="checkNAD21"
                                  checked={this.state.datosConsulta.checkNAD21}
                                  value={this.state.datosConsulta.checkNAD21}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox22"
                                  name="checkNAD22"
                                  checked={this.state.datosConsulta.checkNAD22}
                                  value={this.state.datosConsulta.checkNAD22}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox23"
                                  name="checkNAD23"
                                  checked={this.state.datosConsulta.checkNAD23}
                                  value={this.state.datosConsulta.checkNAD23}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox24"
                                  name="checkNAD24"
                                  checked={this.state.datosConsulta.checkNAD24}
                                  value={this.state.datosConsulta.checkNAD24}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox25"
                                  name="checkNAD25"
                                  checked={this.state.datosConsulta.checkNAD25}
                                  value={this.state.datosConsulta.checkNAD25}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox26"
                                  name="checkNAD26"
                                  checked={this.state.datosConsulta.checkNAD26}
                                  value={this.state.datosConsulta.checkNAD26}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox27"
                                  name="checkNAD27"
                                  checked={this.state.datosConsulta.checkNAD27}
                                  value={this.state.datosConsulta.checkNAD27}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox28"
                                  name="checkNAD28"
                                  checked={this.state.datosConsulta.checkNAD28}
                                  value={this.state.datosConsulta.checkNAD28}
                                />
                              </div>
                            </Col>
                            <Col>
                              <div className="contenedorPrincipal">
                                <img src={manito} width="500" height="300" />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox1"
                                  name="checkNAT1"
                                  checked={this.state.datosConsulta.checkNAT1}
                                  value={this.state.datosConsulta.checkNAT1}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox2"
                                  name="checkNAT2"
                                  checked={this.state.datosConsulta.checkNAT2}
                                  value={this.state.datosConsulta.checkNAT2}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox3"
                                  name="checkNAT3"
                                  checked={this.state.datosConsulta.checkNAT3}
                                  value={this.state.datosConsulta.checkNAT3}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox4"
                                  name="checkNAT4"
                                  checked={this.state.datosConsulta.checkNAT4}
                                  value={this.state.datosConsulta.checkNAT4}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox5"
                                  name="checkNAT5"
                                  checked={this.state.datosConsulta.checkNAT5}
                                  value={this.state.datosConsulta.checkNAT5}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox6"
                                  name="checkNAT6"
                                  checked={this.state.datosConsulta.checkNAT6}
                                  value={this.state.datosConsulta.checkNAT6}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox7"
                                  name="checkNAT7"
                                  checked={this.state.datosConsulta.checkNAT7}
                                  value={this.state.datosConsulta.checkNAT7}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox8"
                                  name="checkNAT8"
                                  checked={this.state.datosConsulta.checkNAT8}
                                  value={this.state.datosConsulta.checkNAT8}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox9"
                                  name="checkNAT9"
                                  checked={this.state.datosConsulta.checkNAT9}
                                  value={this.state.datosConsulta.checkNAT9}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox10"
                                  name="checkNAT10"
                                  checked={this.state.datosConsulta.checkNAT10}
                                  value={this.state.datosConsulta.checkNAT10}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox11"
                                  name="checkNAT11"
                                  checked={this.state.datosConsulta.checkNAT11}
                                  value={this.state.datosConsulta.checkNAT11}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox12"
                                  name="checkNAT12"
                                  checked={this.state.datosConsulta.checkNAT12}
                                  value={this.state.datosConsulta.checkNAT12}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox13"
                                  name="checkNAT13"
                                  checked={this.state.datosConsulta.checkNAT13}
                                  value={this.state.datosConsulta.checkNAT13}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox14"
                                  name="checkNAT14"
                                  checked={this.state.datosConsulta.checkNAT14}
                                  value={this.state.datosConsulta.checkNAT14}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox15"
                                  name="checkNAT15"
                                  checked={this.state.datosConsulta.checkNAT15}
                                  value={this.state.datosConsulta.checkNAT15}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox16"
                                  name="checkNAT16"
                                  checked={this.state.datosConsulta.checkNAT16}
                                  value={this.state.datosConsulta.checkNAT16}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox17"
                                  name="checkNAT17"
                                  checked={this.state.datosConsulta.checkNAT17}
                                  value={this.state.datosConsulta.checkNAT17}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox18"
                                  name="checkNAT18"
                                  checked={this.state.datosConsulta.checkNAT18}
                                  value={this.state.datosConsulta.checkNAT18}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox19"
                                  name="checkNAT19"
                                  checked={this.state.datosConsulta.checkNAT19}
                                  value={this.state.datosConsulta.checkNAT19}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox20"
                                  name="checkNAT20"
                                  checked={this.state.datosConsulta.checkNAT20}
                                  value={this.state.datosConsulta.checkNAT20}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox21"
                                  name="checkNAT21"
                                  checked={this.state.datosConsulta.checkNAT21}
                                  value={this.state.datosConsulta.checkNAT21}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox22"
                                  name="checkNAT22"
                                  checked={this.state.datosConsulta.checkNAT22}
                                  value={this.state.datosConsulta.checkNAT22}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox23"
                                  name="checkNAT23"
                                  checked={this.state.datosConsulta.checkNAT23}
                                  value={this.state.datosConsulta.checkNAT23}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox24"
                                  name="checkNAT24"
                                  checked={this.state.datosConsulta.checkNAT24}
                                  value={this.state.datosConsulta.checkNAT24}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox25"
                                  name="checkNAT25"
                                  checked={this.state.datosConsulta.checkNAT25}
                                  value={this.state.datosConsulta.checkNAT25}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox26"
                                  name="checkNAT26"
                                  checked={this.state.datosConsulta.checkNAT26}
                                  value={this.state.datosConsulta.checkNAT26}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox27"
                                  name="checkNAT27"
                                  checked={this.state.datosConsulta.checkNAT27}
                                  value={this.state.datosConsulta.checkNAT27}
                                />
                                <input
                                  disabled
                                  type="checkbox"
                                  className="checkBox28"
                                  name="checkNAT28"
                                  checked={this.state.datosConsulta.checkNAT28}
                                  value={this.state.datosConsulta.checkNAT28}
                                />
                              </div>
                            </Col>
                          </Row>
                        </Card>
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
            onClick={this.alertDelete}
            color="danger"
            style={{ marginTop: 20 }}
          >
            Eliminar
            <SweetAlert
              warning
              showCancel
              allowEscape
              show={this.state.confirmDelete}
              confirmBtnText="Sí, Eliminar Consulta"
              confirmBtnBsStyle="danger"
              cancelBtnBsStyle="default"
              title="Are you sure?"
              onConfirm={this.handleDelete}
              onCancel={this.onCancelDelete}
            >
              ¿Estas seguro de Eliminar la Consulta?
            </SweetAlert>
          </Button>
        </FormGroup>
      </Container>
    );
  }
}

export default ConsultaView;
