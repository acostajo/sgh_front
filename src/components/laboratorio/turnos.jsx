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
import { FormInput } from "semantic-ui-react";
import { Modal, SelectPicker } from "rsuite";
import Select from "react-select";
import { Calendar } from "react-calendar";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import axios from "axios";

class Turnos extends Component {
  constructor() {
    super();
    this.state = {
      toggleEvento: false,
      datosTurnoDistSelect: [],
      datosOrdenEstudio: [],
      datosTurnosDist: [],
      datosTurnos: [],
      datosFicha: [],
      dataTurno: [],
      datosEstudio: [],
      fechaTurno: "",
      visible: false,
      date: "",
      turno: "",
      turnoAgregar: {},
      turnoSelected: 0,
      data: [],

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
    this.onFechaChange = this.onFechaChange.bind(this);
    this.actualizarTodo = this.actualizarTodo.bind(this);
    this.eliminarTurno = this.eliminarTurno.bind(this);
    this.modificarTurno = this.modificarTurno.bind(this);
    this.toggleEvento = this.toggleEvento.bind(this);
    this.onSelectTurno = this.onSelectTurno.bind(this);
    this.onSelectNumTurno = this.onSelectNumTurno.bind(this);
  }

  async actualizarTodo() {
    var datosTurnos;
    var datosTurnosDist;
    var datosOrdenEstudio;
    var datosFicha;
    var datosEstudio;
    const url = "http://127.0.0.1:8000/api/turno/";
    const url1 = "http://127.0.0.1:8000/api/turno_dist/";
    const url2 = "http://127.0.0.1:8000/api/ordenestudio/";
    const url3 = "http://127.0.0.1:8000/api/ficha/";
    const url4 = "http://127.0.0.1:8000/api/estudio/";

    await axios
      .get(url)
      .then(function(response) {
        datosTurnos = response.data;
        console.log(datosTurnos);
      })
      .catch(function(error) {
        console.log(error);
      });

    await axios
      .get(url1)
      .then(function(response) {
        datosTurnosDist = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });

    await axios
      .get(url2)
      .then(function(response) {
        datosOrdenEstudio = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });

    await axios
      .get(url3)
      .then(function(response) {
        datosFicha = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });

    await axios
      .get(url4)
      .then(function(response) {
        datosEstudio = response.data;
        console.log(datosEstudio);
      })
      .catch(function(error) {
        console.log(error);
      });

    var turnos = [];

    for (let i = 0; i < datosTurnos.length; i++) {
      console.log(this.state.datosTurnos[i]);
      var codturno = datosTurnos[i].codturno;
      var nombre = datosFicha.filter(item => {
        return item.codficha === datosTurnos[i].codficha;
      })[0].nombres;
      var apellido = datosFicha.filter(item => {
        return item.codficha === datosTurnos[i].codficha;
      })[0].apellidos;
      var turno = datosTurnosDist.filter(item => {
        return item.codturnodist === datosTurnos[i].codturnodist;
      })[0].turno;
      var numeroTurno = datosTurnosDist.filter(item => {
        return item.codturnodist === datosTurnos[i].codturnodist;
      })[0].desturno;
      /*var codEstudio = datosOrdenEstudio.filter(item => {
        return item.codordenestudio === datosTurnos[i].codordenestudio;
      })[0].codestudio;
      var tipoEstudio = datosEstudio.filter(item => {
        return item.codestudio === codEstudio;
      })[0].nombre;*/

      const turno = {
        codturno: codturno,
        nombre: nombre,
        apellido: apellido,
        turno: turno,
        numeroTurno: numeroTurno,
        /*tipoEstudio: tipoEstudio,*/
        fechaturno: datosTurnos[i].fechaturno
      };
      turnos.push(turno);
      console.log(turno);
    }

    this.setState({
      datosTurnos: datosTurnos,
      datosTurnosDist: datosTurnosDist,
      datosOrdenEstudio: datosOrdenEstudio,
      datosFicha: datosFicha,
      dataTurno: turnos,
      datosEstudio: datosEstudio
    });
  }

  async componentWillMount() {
    await this.actualizarTodo();
  }

  async eliminarTurno() {
    const url =
      "http://127.0.0.1:8000/api/turno/" + this.state.turnoSelected + "/";

    var codordenestudio = this.state.datosTurnos.filter(item => {
      return item.codturno === this.state.turnoSelected;
    })[0].codordenestudio;
    const url1 =
      "http://127.0.0.1:8000/api/ordenestudio/" + codordenestudio + "/";

    await axios
      .delete(url)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    this.actualizarTodo();
    await axios
      .put(url1, { estado: "Pendiente" })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  async modificarTurno() {
    const url =
      "http://127.0.0.1:8000/api/turno/" + this.state.turnoSelected + "/";
    await axios
      .put(url, this.state.turnoAgregar)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    this.actualizarTodo();
  }

  onFechaChange(e) {
    var turnos = [];
    for (let i = 0; i < this.state.datosTurnos.length; i++) {
      var codturno = this.state.datosTurnos[i].codturno;
      var nombre = this.state.datosFicha.filter(item => {
        return item.codficha === this.state.datosTurnos[i].codficha;
      })[0].nombres;
      var apellido = this.state.datosFicha.filter(item => {
        return item.codficha === this.state.datosTurnos[i].codficha;
      })[0].apellidos;
      var turno = this.state.datosTurnosDist.filter(item => {
        return item.codturnodist === this.state.datosTurnos[i].codturnodist;
      })[0].turno;
      var numeroTurno = this.state.datosTurnosDist.filter(item => {
        return item.codturnodist === this.state.datosTurnos[i].codturnodist;
      })[0].desturno;
      /* var codEstudio = this.state.datosOrdenEstudio.filter(item => {
        return (
          item.codordenestudio === this.state.datosTurnos[i].codordenestudio
        );
      })[0].codestudio;
      var tipoEstudio = this.state.datosEstudio.filter(item => {
        return item.codestudio === codEstudio;
      })[0].nombre;*/

      const turno = {
        codturno: codturno,
        nombre: nombre,
        apellido: apellido,
        turno: turno,
        numeroTurno: numeroTurno,
        /*  tipoEstudio: tipoEstudio,*/
        fechaturno: this.state.datosTurnos[i].fechaturno
      };
      turnos.push(turno);
      console.log(turno);
    }

    var fechaTurno = e.toISOString().substr(0, 10);
    var turnosList = turnos.filter(item => {
      return item.fechaturno === fechaTurno;
    });
    this.setState({ dataTurno: turnosList, fechaTurno: fechaTurno }, () => {
      console.log(this.state.dataTurno);
    });
  }

  onSelectTurno(value, item, event) {
    console.log(value.value);
    var list = this.state.datosTurnosDist;

    var list2 = this.state.datosTurnos.filter(item => {
      return item.fechaturno === this.state.fechaTurno;
    });
    console.log(list2);
    var listTurnos = [];

    var turnos = list.filter(item => {
      return item.turno === value.value;
    });

    for (let i = 0; i < turnos.length; i++) {
      const obj = {
        label: turnos[i].desturno,
        value: turnos[i]
      };
      if (list2.length === 0) {
        listTurnos.push(obj);
      } else {
        for (let j = 0; j < list2.length; j++) {
          if (obj.value.codturnodist !== list2[j].codturnodist) {
            listTurnos.push(obj);
          }
        }
      }
    }
    this.setState({
      turno: value.value,
      datosTurnoDistSelect: listTurnos
    });
  }

  onSelectNumTurno(value, item, event) {
    var turnoaux = this.state.datosTurnos.filter(item => {
      return item.codturno === this.state.turnoSelected;
    })[0];

    const turno = {
      codficha: turnoaux.codficha,
      codordenestudio: turnoaux.codordenestudio,
      estado: turnoaux.codordenestudio,
      codturnodist: value.value.codturnodist,
      fechaturno: this.state.fechaTurno
    };
    console.log(turno);
    this.setState({ turnoAgregar: turno });
  }

  toggleEvento() {
    this.setState({
      toggleEvento: !this.state.toggleEvento
    });
  }
  formatDate(date) {
    var monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "April",
      "Mayo",
      "Junio",
      "Julio",
      "Augusto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ];

    var day = date.getUTCDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + " " + monthNames[monthIndex] + " " + year;
  }
  render() {
    const data = [
      {
        label: "Mañana",
        value: "Mañana"
      },
      {
        label: "Tarde",
        value: "Tarde"
      }
    ];
    return (
      <Container style={{ marginTop: 20 }}>
        <Card style={{ backgroundColor: "#F9FCFB" }}>
          <CardHeader style={{ backgroundColor: "#07689F" }}>
            <h2 style={{ backgroundColor: "#07689F", color: "#FFFFFF" }}>
              Gestión de Turnos
            </h2>
          </CardHeader>
          <Row>
            <Col xs="4" style={{ padding: 20 }}>
              <Label>
                <h4>Seleccione una Fecha Especifica</h4>
              </Label>
              <Calendar onChange={this.onFechaChange} />
            </Col>
            <Col xs="8" style={{ padding: 20 }}>
              <Label>
                <h4>Turnos Agendados</h4>
              </Label>
              <BootstrapTable
                keyField="codturno"
                data={this.state.dataTurno}
                columns={this.state.columns}
                selectRow={{
                  mode: "radio",
                  clickToSelect: true,
                  onSelect: (row, isSelect, rowIndex, e) => {
                    this.setState({
                      turnoSelected: row.codturno
                    });
                  }
                }}
                pagination={paginationFactory({ sizePerPage: 5 })}
              />
              <Button color="danger" onClick={this.eliminarTurno}>
                Eliminar
              </Button>{" "}
              <Button color="success" onClick={this.toggleEvento}>
                Modificar
              </Button>
              <Modal show={this.state.toggleEvento} onHide={this.toggleEvento}>
                <Card style={{ padding: 20 }}>
                  <Row>
                    <Col style={{ paddingLeft: 90 }}>
                      <Calendar
                        onChange={e => {
                          var fechaTurno = e.toISOString().substr(0, 10);
                          var fechaTurnoFormateado = this.formatDate(
                            new Date(e)
                          );
                          this.setState({ fechaTurno: fechaTurno });
                        }}
                        name="fechaTurno"
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginTop: 20 }}>
                    <Col>
                      <h3>
                        Fecha:
                        {this.formatDate(new Date(this.state.fechaTurno))}{" "}
                      </h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Turno </Label>
                        <FormInput>
                          <Select
                            value={this.state.turnoName}
                            onChange={this.onSelectTurno}
                            options={data}
                            isSearchable={false}
                          />
                        </FormInput>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Número de Turno</Label>
                        <FormInput>
                          <Select
                            value={this.state.turnoNumName}
                            onChange={this.onSelectNumTurno}
                            options={this.state.datosTurnoDistSelect}
                            isSearchable={false}
                          />
                        </FormInput>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Button
                          onClick={this.modificarTurno}
                          color="primary"
                          style={{ marginTop: 20 }}
                        >
                          Agendar
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </Card>
              </Modal>
            </Col>
          </Row>
        </Card>
      </Container>
    );
  }
}

export default Turnos;
