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
import OrdenEstudioViewLab from "./ordenestudioViewLab";
import { FlexboxGrid, Button, Divider, Icon, Col, Modal } from "rsuite";
import { Link } from "react-router-dom";
import { Table, IconButton, CustomWhisper } from "rsuite";
import axios from "axios";
import NavBarMenuLab from "../navbarlab";
const { Column, HeaderCell, Cell } = Table;
//import "rsuite/dist/styles/rsuite.css";

class MenuLab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datosOrdenPendiente: [],
      datosOrdenAgendado: [],
      datosEstudio: [],
      datosPaciente: [],
      datosAgendarTurno: [],
      datosPendienteResultado: [],
      toggleOrdenAgendar: false,
      codOrdenAgendar: 0,
      codFichaAgendar: 0
    };

    this.toggleOrdenAgendar = this.toggleOrdenAgendar.bind(this);
  }

  async componentWillMount() {
    await this.getDatosOrden();
    await this.getDatosEstudio();
    await this.getDatosPaciente();
    this.generarListaAgendar();
  }

  async getDatosPaciente() {
    const url1 = "http://127.0.0.1:8000/api/ficha";
    let datosPaciente = [];

    await axios //osea es traer esto vd? asi mismi pero ahi no le vas a hacer el
      .get(url1)
      .then(function(response) {
        datosPaciente = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });

    this.setState({
      datosPaciente: datosPaciente
    });
    console.log(datosPaciente);
  }

  async getDatosEstudio() {
    const url1 = "http://127.0.0.1:8000/api/estudio";
    let datosEstudio = [];

    await axios //osea es traer esto vd? asi mismi pero ahi no le vas a hacer el
      .get(url1)
      .then(function(response) {
        datosEstudio = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });

    this.setState({
      datosEstudio: datosEstudio
    });
    console.log(datosEstudio);
  }

  async getDatosOrden() {
    const url1 = "http://127.0.0.1:8000/api/ordenestudio";
    let datosOrden = [];

    await axios //osea es traer esto vd? asi mismi pero ahi no le vas a hacer el
      .get(url1)
      .then(function(response) {
        datosOrden = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });

    this.setState({
      datosOrdenPendiente: datosOrden.filter(item => {
        return item.estado === "Pendiente";
      }),
      datosOrdenAgendado: datosOrden.filter(item => {
        return item.estado === "Agendado";
      })
    });
    console.log(datosOrden);
  }

  toggleOrdenAgendar() {
    this.setState({
      toggleOrdenAgendar: !this.state.toggleOrdenAgendar
    });
  }

  generarListaAgendar() {
    let lista1 = this.state.datosOrdenPendiente;
    let lista2 = this.state.datosOrdenAgendado;
    let estudios = this.state.datosEstudio;
    let pacientes = this.state.datosPaciente;

    let listAgendar = [];
    let listPendiente = [];

    console.log(lista1);

    for (let i = 0; i < lista1.length; i++) {
      const element = {
        codordenestudio: lista1[i].codordenestudio,
        codficha: lista1[i].codficha,
        estudio: estudios.filter(item => {
          return lista1[i].codestudio === item.codestudio;
        })[0].nombre,
        nombre:
          pacientes.filter(item => {
            return lista1[i].codficha === item.codficha;
          })[0].nombres +
          " " +
          pacientes.filter(item => {
            return lista1[i].codficha === item.codficha;
          })[0].apellidos,
        estado: lista1[i].estado
      };
      listAgendar.push(element);
    }

    for (let i = 0; i < lista2.length; i++) {
      const element = {
        codordenestudio: lista2[i].codordenestudio,
        estudio: estudios.filter(item => {
          return lista2[i].codestudio === item.codestudio;
        })[0].nombre,
        nombre:
          pacientes.filter(item => {
            return lista2[i].codficha === item.codficha;
          })[0].nombres +
          " " +
          pacientes.filter(item => {
            return lista2[i].codficha === item.codficha;
          })[0].apellidos,
        estado: lista2[i].estado
      };
      listPendiente.push(element);
    }
    console.log(listPendiente);
    this.setState({
      datosAgendarTurno: listAgendar,
      datosPendienteResultado: listPendiente
    });
  }

  render() {
    return (
      <div>
        <Modal
          show={this.state.toggleOrdenAgendar}
          onHide={() => {
            this.setState({
              toggleOrdenAgendar: !this.state.toggleOrdenAgendar
            });
            this.getDatosOrden();
            this.getDatosEstudio();
            this.getDatosPaciente();
            this.generarListaAgendar();
          }}
          style={{ width: "80%" }}
        >
          <Modal.Body>
            <OrdenEstudioViewLab
              codordenestudio={this.state.codOrdenAgendar}
              codficha={this.state.codFichaAgendar}
            />
          </Modal.Body>
        </Modal>
        <NavBarMenuLab />
        <FlexboxGrid align="center">
          <FlexboxGrid.Item colSpan={8} style={{ paddingBottom: 10 }}>
            <div
              style={{
                padding: 0,
                borderLeft: "5px solid",
                width: 480,
                borderLeftColor: "#ff7a00", //"rgba(90, 154, 255, 0.6)",
                borderRadius: "5px",
                borderTop: "0.5px solid",
                borderRight: "0.5px solid",
                borderBottom: "0.5px solid",
                borderTopColor: "#eee",
                borderRightColor: "#eee",
                borderBottomColor: "#eee",
                fontSize: 12

                // color: "#eee"
              }}
            >
              <FormGroup className="text-center">
                <h3>Agendar Turno</h3>
                <Label style={{ margin: 5 }}>Total Pacientes: </Label>
                <Badge pill>4</Badge>
              </FormGroup>
              <div>
                <Table
                  height={500}
                  data={this.state.datosAgendarTurno}
                  style={{
                    color: "#3c763d",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "none"
                    }
                  }}
                >
                  <Column width={50} resizable>
                    <HeaderCell> </HeaderCell>
                    <Cell>
                      {rowData => {
                        const toggle = () => {
                          this.toggleOrdenAgendar();
                          this.setState({
                            codOrdenAgendar: rowData.codordenestudio,
                            codFichaAgendar: rowData.codficha
                          });
                        };
                        return (
                          <span>
                            <IconButton
                              appearance="subtle"
                              onClick={toggle}
                              icon={<Icon icon="calendar-check-o" />}
                            />
                          </span>
                        );
                      }}
                    </Cell>
                  </Column>
                  <Column width={100} resizable>
                    <HeaderCell>Estudio</HeaderCell>
                    <Cell dataKey="estudio" />
                  </Column>
                  <Column width={180} resizable>
                    <HeaderCell>Nombres</HeaderCell>
                    <Cell dataKey="nombre" />
                  </Column>
                  <Column width={90} resizable>
                    <HeaderCell>Estado</HeaderCell>
                    <Cell dataKey="estado" />
                  </Column>
                </Table>
              </div>
            </div>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colSpan={8}>
            <div
              style={{
                padding: 0,
                textDecorationColor: "#43a26f",
                stopColor: "#43a26f",
                borderLeft: "5px solid",
                colorAdjust: "#43a26f",

                width: 480,
                borderLeftColor: "#43a26f", //"rgba(90, 154, 255, 0.6)",
                borderRadius: "5px",
                borderTop: "0.5px solid",
                borderRight: "0.5px solid",
                borderBottom: "0.5px solid",
                borderTopColor: "#eee",
                borderRightColor: "#eee",
                borderBottomColor: "#eee",
                fontSize: 12
                // color: "#eee"
              }}
            >
              <FormGroup className="text-center">
                <h3>Pendientes de Estudio</h3>
                <Label style={{ margin: 5 }}>Total Pacientes: </Label>
                <Badge pill>4</Badge>
              </FormGroup>
              <div>
                <Table height={500} data={this.state.datosAgenda}>
                  <Column width={50} resizable>
                    <HeaderCell> </HeaderCell>

                    <Cell>
                      {rowData => {
                        const handleAgendar = () => {
                          this.handleAgendar(rowData);
                        };

                        return (
                          <span>
                            <IconButton
                              appearance="subtle"
                              onClick={handleAgendar}
                              icon={<Icon icon="user-analysis" />}
                            />
                          </span>
                        );
                      }}
                    </Cell>
                  </Column>
                  <Column width={100} resizable>
                    <HeaderCell>Estudio</HeaderCell>
                    <Cell dataKey="orden" />
                  </Column>
                  <Column width={180} resizable>
                    <HeaderCell>Nombres</HeaderCell>
                    <Cell dataKey="nombres" />
                  </Column>
                  <Column width={180} resizable>
                    <HeaderCell>Apellidos</HeaderCell>
                    <Cell dataKey="apellidos" />
                  </Column>

                  <Column width={100} resizable>
                    <HeaderCell>Nro. Docu</HeaderCell>
                    <Cell dataKey="orden" />
                  </Column>
                </Table>
              </div>
            </div>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colSpan={8}>
            <div
              style={{
                padding: 0,
                borderLeft: "5px solid",

                width: 480,
                borderLeftColor: "#8dcdff", //"rgba(90, 154, 255, 0.6)",
                borderRadius: "5px",
                borderTop: "0.5px solid",
                borderRight: "0.5px solid",
                borderBottom: "0.5px solid",
                borderTopColor: "#eee",
                borderRightColor: "#eee",
                borderBottomColor: "#eee",
                fontSize: 12
                // color: "#eee"
              }}
            >
              <FormGroup className="text-center">
                <h3>Pendientes de Resultado de Estudio</h3>
                <Label style={{ margin: 5 }}>Total Pacientes: </Label>
                <Badge pill>4</Badge>
              </FormGroup>
              <div>
                <Table
                  height={500}
                  data={this.state.datosPendienteResultado}
                  style={{
                    color: "#3c763d",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "none"
                    }
                  }}
                >
                  <Column width={50} resizable>
                    <HeaderCell> </HeaderCell>
                    <Cell>
                      {rowData => {
                        const toggle = () => {
                          this.toggleOrdenAgendar();
                          this.setState({
                            codOrdenAgendar: rowData.codordenestudio,
                            codFichaAgendar: rowData.codficha
                          });
                        };
                        return (
                          <span>
                            <IconButton
                              appearance="subtle"
                              onClick={toggle}
                              icon={<Icon icon="calendar-check-o" />}
                            />
                          </span>
                        );
                      }}
                    </Cell>
                  </Column>
                  <Column width={100} resizable>
                    <HeaderCell>Estudio</HeaderCell>
                    <Cell dataKey="estudio" />
                  </Column>
                  <Column width={180} resizable>
                    <HeaderCell>Nombres</HeaderCell>
                    <Cell dataKey="nombre" />
                  </Column>
                  <Column width={90} resizable>
                    <HeaderCell>Estado</HeaderCell>
                    <Cell dataKey="estado" />
                  </Column>
                </Table>
              </div>
            </div>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </div>
    );
  }
}

export default MenuLab;

/*
        <div>
          <FlexboxGrid align="center" style={{ marginTop: 200 }}>
            <FlexboxGrid.Item>
              <ButtonLink
                to="/buscar_paciente"
                style={{ height: 400, width: 400 }}
                onclick={this.handleClick}
              >
                <Icon
                  icon="search"
                  style={{
                    fontSize: 190,
                    color: "#156895",
                    marginBottom: 10,
                    paddingTop: 80
                  }}
                />
                <Col>
                  <h3>Buscar Paciente</h3>
                </Col>
              </ButtonLink>
            </FlexboxGrid.Item>
            <Divider vertical style={{ height: 400 }} />
            <FlexboxGrid.Item>
              <ButtonLink to="/turnos" style={{ height: 400, width: 400 }}>
                <Icon
                  icon="calendar-check-o"
                  style={{
                    fontSize: 190,
                    color: "#599815",
                    marginBottom: 10,
                    paddingTop: 80
                  }}
                />
                <Col>
                  <h3>Gestionar Turnos</h3>
                </Col>
              </ButtonLink>
            </FlexboxGrid.Item>
            <Divider vertical style={{ height: 400 }} />
            <FlexboxGrid.Item>
              <ButtonLink to="/turnos" style={{ height: 400, width: 400 }}>
                <Icon
                  icon="calendar"
                  style={{
                    fontSize: 190,
                    color: "#597015",
                    marginBottom: 10,
                    paddingTop: 80
                  }}
                />
                <Col>
                  <h3>Pendientes: 12</h3>
                </Col>
              </ButtonLink>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </div>  */
