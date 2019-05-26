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
import { FlexboxGrid, Button, Divider, Icon, Col } from "rsuite";
import { Link } from "react-router-dom";
import { Table, IconButton, CustomWhisper } from "rsuite";
import axios from "axios";
import NavBarMenuLab from "../navbarlab";
const { Column, HeaderCell, Cell } = Table;
//import "rsuite/dist/styles/rsuite.css";

class MenuLab extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {}
  async componentWillMount() {
    await this.getDatosAgenda();
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

  render() {
    const ButtonLink = props => <Button componentClass={Link} {...props} />;

    return (
      <div>
        <NavBarMenuLab />
        <FlexboxGrid colspan={8}>
          <FlexboxGrid.Item style={{ paddingBottom: 10 }}>
            <div
              style={{
                padding: 0,
                borderLeft: "5px solid",
                marginBottom: 15,
                marginLeft: 50,

                width: 350,
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
                  data={this.state.datosAgenda}
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
                        const handleAgendar = () => {
                          this.handleAgendar(rowData);
                        };

                        return (
                          <span>
                            <IconButton
                              appearance="subtle"
                              onClick={handleAgendar}
                              icon={<Icon icon="calendar-check-o" />}
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
          <FlexboxGrid.Item colspan={8}>
            <div
              style={{
                padding: 0,
                textDecorationColor: "#43a26f",
                stopColor: "#43a26f",
                borderLeft: "5px solid",
                colorAdjust: "#43a26f",
                marginBottom: 15,
                marginLeft: 50,
                width: 350,
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
          <FlexboxGrid.Item colspan={8}>
            <div
              style={{
                padding: 0,
                borderLeft: "5px solid",
                marginBottom: 15,
                marginLeft: 50,
                width: 350,
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
                              icon={<Icon icon="file-text-o" />}
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
