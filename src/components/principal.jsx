import React, { Component } from "react";
import {
  Container,
  Row,
  Card,
  Col,
  ListGroupItem,
  ListGroup,
  Button,
  FormGroup,
  Progress,
  Label,
  Badge
} from "reactstrap";
//import "rsuite/dist/styles/rsuite.css";
import NavBarMenu from "./navbar";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class MenuPrincipal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataBar: {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
        datasets: [
          {
            label: "% of Votes",
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
  }

  handleClick() {}

  render() {
    return (
      <div>
        <NavBarMenu />
        <Container>
          <Row>
            <Col xs="5" style={{ paddingBottom: 10 }}>
              <div
                className="border border-secondary rounded"
                style={{ padding: 20 }}
              >
                <FormGroup className="text-center">
                  <h3>Pacientes Agendados</h3>

                  <Button color="primary">Actualizar Agenda</Button>
                </FormGroup>
                <hr className=" border-secondary rounded" />
                <ListGroup>
                  <ListGroupItem tag="a" href="#" action>
                    <strong style={{ marginLeft: 5 }}>Nombre: </strong> Jazmin
                    <strong style={{ marginLeft: 5 }}>Apellido: </strong>
                    Insfran
                    <strong style={{ marginLeft: 5 }}>Orden: </strong> 1
                  </ListGroupItem>
                  <ListGroupItem tag="a" href="#" action>
                    <strong style={{ marginLeft: 5 }}>Nombre: </strong> Jazmin
                    <strong style={{ marginLeft: 5 }}>Apellido: </strong>
                    Insfran
                    <strong style={{ marginLeft: 5 }}>Orden: </strong> 1
                  </ListGroupItem>
                  <ListGroupItem tag="a" href="#" action>
                    <strong style={{ marginLeft: 5 }}>Nombre: </strong> Jazmin
                    <strong style={{ marginLeft: 5 }}>Apellido: </strong>
                    Insfran
                    <strong style={{ marginLeft: 5 }}>Orden: </strong> 1
                  </ListGroupItem>
                  <ListGroupItem tag="a" href="#" action>
                    <strong style={{ marginLeft: 5 }}>Nombre: </strong> Jazmin
                    <strong style={{ marginLeft: 5 }}>Apellido: </strong>
                    Insfran
                    <strong style={{ marginLeft: 5 }}>Orden: </strong> 1
                  </ListGroupItem>
                </ListGroup>
              </div>
            </Col>
            <Col xs="7">
              <div
                className="border border-secondary rounded"
                style={{ padding: 10 }}
              >
                <Row>
                  <Col className="text-center">
                    <FormGroup>
                      <Button color="success" style={{ margin: 5 }}>
                        Buscar Paciente
                      </Button>
                      <Button color="success" style={{ margin: 5 }}>
                        Paciente Nuevo
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
                <hr className=" border-secondary rounded" />
                <Row>
                  <Col className="text-center">
                    <FormGroup>
                      <h4>Pacientes Atendidos</h4>
                    </FormGroup>
                    <Progress value="25" />
                    <div className="text-center">50%</div>
                    <Label style={{ margin: 5 }}>Total Pacientes: </Label>
                    <Badge pill>40</Badge>
                    <Label style={{ margin: 5 }}>Pacientes Atendidos: </Label>
                    <Badge pill>20</Badge>
                  </Col>
                </Row>
                <hr className=" border-secondary rounded" />
                <Row>
                  <Col>
                    <div style={{ height: "500" }}>
                      <Bar
                        data={this.state.dataBar}
                        options={this.state.barChartOptions}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default MenuPrincipal;
