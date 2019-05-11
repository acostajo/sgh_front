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

import { Calendar } from "react-calendar";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

class Turnos extends Component {
  constructor() {
    super();
    this.state = {
      datosOrdenEstudio: {},
      visible: false,
      date: "",
      turno: "",
      data: [
        {
          cod: "1",
          nombre: "Jazmin",
          apellido: "Insfran",
          turno: "Mañana",
          numeroTurno: "Turno-1",
          tipoEstudio: "Rayos x Rodilla"
        },
        {
          cod: "2",
          nombre: "Joel",
          apellido: "Acosta",
          turno: "Tarde",
          numeroTurno: "Turno-5",
          tipoEstudio: "Rayos x Codo"
        },
        {
          cod: "3",
          nombre: "Jazmin",
          apellido: "Insfran",
          turno: "Mañana",
          numeroTurno: "Turno-1",
          tipoEstudio: "Rayos x Rodilla"
        },
        {
          cod: "4",
          nombre: "Joel",
          apellido: "Acosta",
          turno: "Tarde",
          numeroTurno: "Turno-5",
          tipoEstudio: "Rayos x Codo"
        },
        {
          cod: "5",
          nombre: "Jazmin",
          apellido: "Insfran",
          turno: "Mañana",
          numeroTurno: "Turno-1",
          tipoEstudio: "Rayos x Rodilla"
        },
        {
          cod: "6",
          nombre: "Joel",
          apellido: "Acosta",
          turno: "Tarde",
          numeroTurno: "Turno-5",
          tipoEstudio: "Rayos x Codo"
        },
        {
          cod: "7",
          nombre: "Jazmin",
          apellido: "Insfran",
          turno: "Mañana",
          numeroTurno: "Turno-1",
          tipoEstudio: "Rayos x Rodilla"
        },
        {
          cod: "8",
          nombre: "Joel",
          apellido: "Acosta",
          turno: "Tarde",
          numeroTurno: "Turno-5",
          tipoEstudio: "Rayos x Codo"
        },
        {
          cod: "9",
          nombre: "Jazmin",
          apellido: "Insfran",
          turno: "Mañana",
          numeroTurno: "Turno-1",
          tipoEstudio: "Rayos x Rodilla"
        },
        {
          cod: "10",
          nombre: "Joel",
          apellido: "Acosta",
          turno: "Tarde",
          numeroTurno: "Turno-5",
          tipoEstudio: "Rayos x Codo"
        },
        {
          cod: "11",
          nombre: "Jazmin",
          apellido: "Insfran",
          turno: "Mañana",
          numeroTurno: "Turno-1",
          tipoEstudio: "Rayos x Rodilla"
        },
        {
          cod: "12",
          nombre: "Joel",
          apellido: "Acosta",
          turno: "Tarde",
          numeroTurno: "Turno-5",
          tipoEstudio: "Rayos x Codo"
        }
      ],
      columns: [
        {
          dataField: "cod",
          hidden: true
        },
        {
          dataField: "nombre",
          text: "Nombre"
        },
        {
          dataField: "apellido",
          text: "Apellido"
        },
        {
          dataField: "turno",
          text: "Turno"
        },
        {
          dataField: "numeroTurno",
          text: "Numero de Turno"
        },
        {
          dataField: "tipoEstudio",
          text: "Tipo Estudio"
        }
      ]
    };
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Card style={{ padding: 20 }}>
              <CardHeader
                style={{
                  backgroundColor: "#0B1A25",
                  color: "white",
                  marginBottom: 20
                }}
              >
                <h3>Gestion de Turnos</h3>
              </CardHeader>
              <Row>
                <Col xs="4">
                  <Label>
                    <h3>Fecha</h3>
                  </Label>
                  <Calendar value={this.state.date} name="date" />
                </Col>
                <Col xs="8">
                  <Label>
                    <h3>Turnos</h3>
                  </Label>
                  <BootstrapTable
                    keyField="cod"
                    data={this.state.data}
                    columns={this.state.columns}
                    selectRow={{
                      mode: "radio",
                      clickToSelect: true
                    }}
                    pagination={paginationFactory({ sizePerPage: 5 })}
                  />
                  <Button color="danger">Eliminar</Button>{" "}
                  <Button color="success">Modificar</Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Turnos;
