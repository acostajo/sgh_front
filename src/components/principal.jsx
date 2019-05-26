import React, { Component } from "react";
import {
  Container,
  Row,
  Card,
  ListGroupItem,
  ListGroup,
  FormGroup,
  Progress,
  Label,
  Badge
} from "reactstrap";
//import "rsuite/dist/styles/rsuite.css";
import NavBarMenu from "./navbar";
import BuscarFicha from "./ficha/buscarFicha";
import Ficha from "./ficha/fichaForm";
import { Modal, Icon } from "rsuite";
import { Bar } from "react-chartjs-2";
import { FlexboxGrid, Button, Divider, Col } from "rsuite";
import { Link } from "react-router-dom";
import { Table, IconButton, CustomWhisper } from "rsuite";
import axios from "axios";
const { Column, HeaderCell, Cell } = Table;
class MenuPrincipal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      codSelected: 0,
      toggleListaPaciente: false,
      toggleAgregarPaciente: false,
      totalPacientes: "",
      pacientesAtendidos: "",
      pacientesNoAtendidos: "",

      dataBar: {
        labels: ["Enero", "Febrero", "Marzo", "Abril"],
        datasets: [
          {
            label: "Cantidad de Consultas en el Año",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 134,159,0.4)",
              "rgba(98,  182, 239,0.4)",
              "rgba(255, 218, 128,0.4)",
              "rgba(113, 205, 205,0.4)",
              "rgba(170, 128, 252,0.4)",
              "rgba(255, 177, 101,0.4)"
            ],
            borderWidth: 2,
            borderColor: [
              "rgba(255, 134, 159, 1)",
              "rgba(98,  182, 239, 1)",
              "rgba(255, 218, 128, 1)",
              "rgba(113, 205, 205, 1)",
              "rgba(170, 128, 252, 1)",
              "rgba(255, 177, 101, 1)"
            ]
          }
        ]
      },
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              barPercentage: 1,
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)"
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)"
              },
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    };

    this.handleClick = this.handleClick.bind(this);
    this.toggleListaPaciente = this.toggleListaPaciente.bind(this);
    this.toggleAgregarPaciente = this.toggleAgregarPaciente.bind(this);
    this.filterAgenda = this.filterAgenda.bind(this);
    this.handleAsistio = this.handleAsistio.bind(this);
    this.handleNoAsistio = this.handleNoAsistio.bind(this);
  }

  filterAgenda(event) {
    //var resultado = this.state.datosAgenda.filter(agenda);
  }

  toggleListaPaciente() {
    this.setState({
      toggleListaPaciente: !this.state.toggleListaPaciente
    });
  }
  toggleAgregarPaciente() {
    this.setState({
      toggleAgregarPaciente: !this.state.toggleAgregarPaciente
    });
  }

  handleClick() {}

  async componentWillMount() {
    await this.getDatosAgenda();
    await this.calcularTotales();
  }
  async getDatosAgenda() {
    const url1 = "http://127.0.0.1:8000/api/agenda";
    let datosagenda = [];

    await axios //osea es traer esto vd? asi mismi pero ahi no le vas a hacer el
      .get(url1)
      .then(function(response) {
        datosagenda = response.data.filter(item => {
          return item.estado === 0;
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    this.setState({
      datosAgenda: datosagenda
    });
  }
  async calcularTotales() {
    const url1 = "http://127.0.0.1:8000/api/agenda";
    let datosagenda = [];
    await axios
      .get(url1)
      .then(function(response) {
        console.log(response.data);
        datosagenda = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    const countTotalPac = datosagenda.length;
    const countAtendidos = datosagenda.filter(item => {
      return item.estado === 1;
    }).length;
    const countNoAtendidos = datosagenda.filter(item => {
      return item.estado === 2;
    }).length;

    this.setState({
      totalPacientes: countTotalPac,
      pacientesAtendidos: countAtendidos,
      pacientesNoAtendidos: countNoAtendidos
    });
  }

  async handleAsistio(rowData) {
    const url = "http://127.0.0.1:8000/api/agenda/" + rowData.codagenda + "/";
    var datoAgenda = this.state.datosAgenda.filter(item => {
      return item.codagenda === rowData.codagenda;
    })[0];
    datoAgenda.estado = 1; //cambia a asistio
    await axios
      .put(url, datoAgenda)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    await this.getDatosAgenda();
    await this.calcularTotales();
  }

  async handleNoAsistio(rowData, data) {
    const url = "http://127.0.0.1:8000/api/agenda/" + rowData.codagenda + "/";
    var datoAgenda = this.state.datosAgenda.filter(item => {
      return item.codagenda === rowData.codagenda;
    })[0];
    datoAgenda.estado = 2; //cambia a no asistio
    await axios
      .put(url, datoAgenda)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    await this.getDatosAgenda();
    await this.calcularTotales();
  }

  render() {
    const ButtonLink = props => <Button componentClass={Link} {...props} />;
    const handleNoAsistio = this.handleNoAsistio;
    const handleAsistio = this.handleAsistio;

    return (
      <div style={{ marginTop: 40 }}>
        <NavBarMenu />

        <Modal
          show={this.state.toggleListaPaciente}
          onHide={this.toggleListaPaciente}
        >
          <Modal.Body>
            <BuscarFicha />
          </Modal.Body>
        </Modal>
        <Modal
          show={this.state.toggleAgregarPaciente}
          onHide={this.toggleAgregarPaciente}
          style={{ width: "90%" }}
        >
          <Modal.Body>
            <Ficha />
          </Modal.Body>
        </Modal>
        <Container>
          <Row>
            <Col xs="12" style={{ paddingBottom: 10 }}>
              <div
                style={{
                  padding: 20,
                  borderLeft: "5px solid",
                  marginBottom: 15,
                  padding: 10,
                  borderLeftColor: "#8dcdff", //"rgba(90, 154, 255, 0.6)",
                  borderRadius: "5px",
                  borderTop: "0.5px solid",
                  borderRight: "0.5px solid",
                  borderBottom: "0.5px solid",
                  borderTopColor: "#eee",
                  borderRightColor: "#eee",
                  borderBottomColor: "#eee"
                  // color: "#eee"
                }}
              >
                <FormGroup className="text-center">
                  <h3>Pacientes Agendados</h3>

                  <Button
                    onClick={() => {
                      console.log(this.state.codSelected);
                    }}
                    color="primary"
                  >
                    Actualizar Agenda
                  </Button>
                </FormGroup>
                <div>
                  <Table virtualized height={400} data={this.state.datosAgenda}>
                    <Column width={97} fixed>
                      <HeaderCell>Asistio?</HeaderCell>

                      <Cell>
                        {rowData => {
                          const handleAsistio = () => {
                            this.handleAsistio(rowData);
                          };
                          const handleNoAsistio = () => {
                            this.handleNoAsistio(rowData);
                          };
                          return (
                            <span>
                              <IconButton
                                appearance="subtle"
                                onClick={handleAsistio}
                                icon={<Icon icon="edit2" />}
                              />
                              |
                              <IconButton
                                appearance="subtle"
                                onClick={handleNoAsistio}
                                icon={<Icon icon="edit2" />}
                              />
                            </span>
                          );
                        }}
                      </Cell>
                    </Column>

                    <Column width={70} align="center" fixed>
                      <HeaderCell>Orden</HeaderCell>
                      <Cell dataKey="orden" />
                    </Column>

                    <Column width={180} fixed>
                      <HeaderCell>Nombres</HeaderCell>
                      <Cell dataKey="nombres" />
                    </Column>

                    <Column width={180}>
                      <HeaderCell>Apellidos</HeaderCell>
                      <Cell
                        dataKey="apellidos"
                        onClick={rowData => console.log(rowData.target.dataKey)}
                      />
                    </Column>
                  </Table>
                </div>
              </div>
            </Col>
            <Col xs="12">
              <div className="text-center">
                <Button
                  style={{ height: 200, width: 250 }}
                  onClick={this.toggleListaPaciente}
                >
                  <Icon
                    icon="search"
                    style={{
                      fontSize: 50,
                      color: "#007bff"
                    }}
                  />

                  <h4
                    style={{
                      color: "#111",
                      marginBottom: 10,
                      fontweigh: 200
                    }}
                  >
                    Buscar Paciente
                  </h4>
                </Button>

                <Divider vertical style={{ height: 200 }} />

                <Button
                  style={{ height: 200, width: 250 }}
                  onClick={this.toggleAgregarPaciente}
                >
                  <Icon
                    icon="user-plus"
                    style={{
                      fontSize: 50,
                      color: "#133E7C"
                    }}
                  />
                  <h4
                    style={{
                      color: "#111",
                      marginBottom: 10,
                      fontweigh: 200
                    }}
                  >
                    Agregar Paciente
                  </h4>
                </Button>

                <Divider horizontal style={{ width: 555 }} />

                <Col className="text-center">
                  <FormGroup>
                    <h4>Pacientes Atendidos</h4>
                  </FormGroup>
                  <Progress
                    value={
                      parseFloat(
                        this.state.pacientesAtendidos /
                          this.state.totalPacientes
                      ) * 100
                    }
                  />
                  <div className="text-center">
                    {parseFloat(
                      this.state.pacientesAtendidos / this.state.totalPacientes
                    ) * 100}
                    %
                  </div>
                  <Label style={{ margin: 5 }}>Total Pacientes: </Label>
                  <Badge pill>{this.state.totalPacientes}</Badge>
                  <Label style={{ margin: 5 }}>Pacientes Atendidos: </Label>
                  <Badge pill>{this.state.pacientesAtendidos}</Badge>
                  <Label style={{ margin: 5 }}>Pacientes No Atendidos: </Label>
                  <Badge pill>{this.state.pacientesNoAtendidos}</Badge>
                </Col>

                <Divider horizontal style={{ width: 555 }} />

                <Col>
                  <div style={{ height: "500" }}>
                    <Bar
                      data={this.state.dataBar}
                      options={this.state.barChartOptions}
                    />
                  </div>
                </Col>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default MenuPrincipal;

/*<FlexboxGrid align="center" style={{ marginTop: 200 }}>
          <FlexboxGrid.Item>
            <ButtonLink
              to="/ficha"
              style={{ height: 400, width: 400 }}
              onClick={this.handleClick}
            >
              <Icon
                icon="user-plus"
                style={{
                  fontSize: 190,
                  color: "#156895",
                  marginBottom: 10,
                  paddingTop: 80
                }}
              />
              <Col>
                <h3>Paciente Nuevo</h3>
              </Col>
            </ButtonLink>
          </FlexboxGrid.Item>
          <Divider vertical style={{ height: 400 }} />
          <FlexboxGrid.Item>
            <Button
              style={{ height: 400, width: 400 }}
              onClick={this.toggleListaPaciente}
            >
              <Icon
                icon="search"
                style={{
                  fontSize: 190,
                  color: "#599815",
                  marginBottom: 10,
                  paddingTop: 80
                }}
              />
              <Col>
                <h3>Busqueda de Paciente</h3>
              </Col>
            </Button>
          </FlexboxGrid.Item>
        </FlexboxGrid> */
