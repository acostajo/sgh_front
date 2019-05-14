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
import axios from "axios";
import { Uploader, Icon, SelectPicker } from "rsuite";
import "flatpickr/dist/themes/material_blue.css";
import Calendar from "react-calendar";
import { FormInput } from "semantic-ui-react";
class OrdenEstudioViewLab extends Component {
  constructor() {
    super();
    this.state = {
      datosOrdenEstudio: {},
      datosTurno: [],
      datosTurnoDist: [],
      datosTurnoDistSelect: [],
      turnoAgregar: {},
      archivo: {},
      turno: "",
      fechaTurno: "",
      numeroTruno: "",
      horarioTurno: ""
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.upload = this.upload.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validarTurno = this.validarTurno.bind(this);
    this.onSelectTurno = this.onSelectTurno.bind(this);
    this.onSelectNumTurno = this.onSelectNumTurno.bind(this);
    this.handleAddTurno = this.handleAddTurno.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  handleDrop(fileList) {
    this.setState({ archivo: fileList[0] });
    console.log(this.state.archivo);
  }

  handleChange(e) {
    const target = e.target;
    let fields = this.state;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    fields[name] = value;

    this.setState({
      datosFicha: fields
    });
  }

  async upload() {
    console.log(this.state.archivo);
    let data = new FormData();
    const file = this.state.archivo;
    data.append("archivo", file.blobFile);
    data.append("codordenestudio", 1);

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    const url = "http://127.0.0.1:8000/api/archivo/";

    await axios.post(url, data, config).then(res => {
      console.log(res);
      console.log(res.data);
    });
  }

  async handleDelete() {
    const cod = this.props.match.params.codordenestudio; //direccto accedes, yaa, y eso nomas es, que te falta ahora?
    const url1 = "http://127.0.0.1:8000/api/ordenestudio/";
    await fetch(url1 + cod + "/", { method: "DELETE" }) //este es el method para borar y se le pasa el cod nomas
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          return new Error("No se recibio la respuesta esperada ...");
        }
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        this.setState({ visible: !this.state.visible }); // aca despues de mandarle al server para elminar le setea en true
      });
  }

  validarTurno() {
    var turnos = this.state.datosTurno;
    var list = turnos.filter(item => {
      return item.fechaturno === this.state.fechaTurno;
    });

    if (list.length !== 0) {
      console.log("validar que no sea el mismo turno");
    }
  }

  onSelectTurno(value, item, event) {
    var list = this.state.datosTurnoDist;
    var list2 = this.state.datosTurno.filter(item => {
      return item.fechaturno === this.state.fechaTurno;
    });
    var listTurnos = [];

    var turnos = list.filter(item => {
      return item.turno === value;
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

    this.setState({ turno: value, datosTurnoDistSelect: listTurnos });
  }

  onSelectNumTurno(value, item, event) {
    const turno = {
      codturnodist: value.codturnodist,
      codficha: this.props.match.params.codficha,
      codordenestudio: this.props.match.params.codordenestudio,
      turno: value.turno,
      fechaTurno: this.state.fechaTurno,
      numeroTruno: value.desturno,
      horarioTurno: value.horaturno,
      estado: "Agendado"
    };
    this.setState({ turnoAgregar: turno });
    console.log(turno);
  }

  async handleAddTurno() {
    const url = "http://127.0.0.1:8000/api/turno/";
    const url2 =
      "http://127.0.0.1:8000/api/ordenestudio/" +
      this.props.match.params.codordenestudio +
      "/";
    await axios
      .post(url, this.state.turnoAgregar)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    await axios
      .put(url2, { estado: "Agendado" })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  async componentWillMount() {
    const cod = this.props.match.params.codordenestudio;
    const url1 = "http://127.0.0.1:8000/api/ordenestudio?codordenestudio=";
    const url2 = "http://127.0.0.1:8000/api/turno_dist";
    const url3 = "http://127.0.0.1:8000/api/turno";
    let datosOrdenEstudio = {};
    let datosTurnoDist = [];
    let datosTurno = [];
    //datos de la orden de estudio
    await axios
      .get(url1 + cod)
      .then(function(response) {
        datosOrdenEstudio = response.data[0];
      })
      .catch(function(error) {
        console.log(error);
      });
    //datos de la distribucion de turnos
    await axios
      .get(url2)
      .then(function(response) {
        datosTurnoDist = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    //datos de los turnos existentes
    await axios
      .get(url3)
      .then(function(response) {
        datosTurno = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    //se asignan los states
    this.setState({
      datosOrdenEstudio: datosOrdenEstudio,
      datosTurnoDist: datosTurnoDist,
      datosTurno: datosTurno
    });
    console.log(this.state.datosOrdenEstudio);
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
      <Container>
        <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
          La Orden de Estudio fue eliminada con con exito!
        </Alert>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <h3>Datos</h3>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>
                          <strong>Fecha:</strong>
                        </Label>
                        <p>{this.state.datosOrdenEstudio.fechaordenestudio}</p>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>
                          <strong>Estado:</strong>
                        </Label>
                        <p>{this.state.datosOrdenEstudio.estado}</p>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>
                          <strong>Observación:</strong>
                        </Label>
                        <p>{this.state.datosOrdenEstudio.observacion}</p>
                      </FormGroup>
                    </Col>
                  </Row>
                  {this.state.datosOrdenEstudio.estado === "Agendado" ? (
                    <Row>
                      <Col>
                        <Card style={{ padding: 20, marginBottom: 10 }}>
                          <h5>Agregar Archivo</h5>
                          <Uploader
                            autoUpload={false}
                            action="http://127.0.0.1:8000/archivo/upload/"
                            onChange={this.handleDrop}
                          >
                            <Icon icon="file" style={{ fontSize: 40 }} />
                          </Uploader>
                        </Card>
                        <Button onClick={this.upload}> Subir</Button>
                      </Col>
                    </Row>
                  ) : null}
                </Form>
              </CardBody>
            </Card>
          </Col>
          {this.state.datosOrdenEstudio.estado === "Pendiente" ? (
            <Col>
              <Card style={{ padding: 20 }}>
                <Row>
                  <Col style={{ paddingLeft: 90 }}>
                    <Calendar
                      onChange={e => {
                        var fechaTurno = e.toISOString().substr(0, 10);
                        this.setState({ fechaTurno: fechaTurno });
                      }}
                      name="fechaTurno"
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Col>
                    <h3>Fecha: {this.state.fechaTurno}</h3>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label>Turno </Label>
                      <FormInput>
                        <SelectPicker
                          data={data}
                          style={{ width: 224 }}
                          searchable={false}
                          defaultValue={data[0]}
                          placeholder="Seleccionar"
                          onSelect={this.onSelectTurno}
                        />
                      </FormInput>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label>Numero de Turno</Label>
                      <FormInput>
                        <SelectPicker
                          data={this.state.datosTurnoDistSelect}
                          style={{ width: 224 }}
                          onSelect={this.onSelectNumTurno}
                          placeholder="Seleccionar"
                          searchable={false}
                          defaultValue={this.state.datosTurnoDistSelect[0]}
                        />
                      </FormInput>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Button onClick={this.handleAddTurno}>Agendar</Button>
                    </FormGroup>
                  </Col>
                </Row>
              </Card>
            </Col>
          ) : null}
        </Row>
      </Container>
    );
  }
}

export default OrdenEstudioViewLab;
