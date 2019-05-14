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
import { Uploader, Icon } from "rsuite";
import "flatpickr/dist/themes/material_blue.css";
import Calendar from "react-calendar";
class OrdenEstudioViewLab extends Component {
  constructor() {
    super();
    this.state = {
      datosOrdenEstudio: {},
      datosTurno: {
        codturnodist: "",
        codficha: "",
        codordenestudio: "",
        fechaTurno: "",
        turno: ""
      },
      datosTurnoDist: {
        codturnodist: "",
        desturno: "",
        horaturno: ""
      },
      visible: false,

      archivo: {},
      turno: ""
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.upload = this.upload.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    let fields = this.state.datosFicha;
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

  async componentWillMount() {
    const cod = this.props.match.params.codordenestudio;

    const url1 = "http://127.0.0.1:8000/api/ordenestudio?codordenestudio=";
    let datosOrdenEstudio = {};

    await axios
      .get(url1 + cod)
      .then(function(response) {
        datosOrdenEstudio = response.data[0];
      })
      .catch(function(error) {
        console.log(error);
      });

    this.setState({
      datosOrdenEstudio: datosOrdenEstudio
    });
  }
  render() {
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
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card style={{ padding: 20 }}>
              <Row>
                <Col style={{ paddingLeft: 90 }}>
                  <Calendar
                    onChange={e => {
                      var datosTurno = {
                        codturnodist: "",
                        codficha: "",
                        codordenestudio: "",
                        fechaTurno: e.toISOString().substr(0, 10),
                        turno: ""
                      };
                      this.setState({ datosTurno: datosTurno });
                    }}
                    name="fechaTurno"
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: 20 }}>
                <Col>
                  <h3>Fecha: {this.state.datosTurno.fechaTurno}</h3>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="turno">Turno</Label>
                    <Input
                      type="select"
                      onChange={this.handleChange}
                      value={this.state.turno}
                      name="turno"
                      id="turno"
                    >
                      <option>Mañana</option>
                      <option>Tarde</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="tipodocumento">Numero de Turno</Label>
                    <Input
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.turno}
                      name="turno"
                      id="turno"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="tipodocumento">Horario</Label>
                    <Input
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.turno}
                      name="turno"
                      id="turno"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Button>Agendar</Button>
                  </FormGroup>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default OrdenEstudioViewLab;
