import React, { Component } from "react";
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
  Label,
  Input
} from "reactstrap";
import { Modal } from "rsuite";
import axios from "axios";
import Estudio from "./../estudio/estudioForm";
import Joi from "joi-browser";
import { AutoComplete } from "primereact/autocomplete";
import BootstrapTable from "react-bootstrap-table-next";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import SweetAlert from "react-bootstrap-sweetalert";
import { Alert } from "rsuite";
import { withRouter } from "react-router-dom";
const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 150,
      width: 2,
      borderleft: 1
    }}
  />
);

class OrdenEstudio extends Component {
  constructor() {
    super();
    this.state = {
      //alert
      alertCreado: false,
      errores: {},
      aviso: false,
      toggleEstudio: false,
      codOrdenReturn: "",
      visible: false,
      datosOrdenEstudio: {
        //datos correspondientes a la orden de estudio
        codusuario: null, //	código interno de usuario, para saber quién agrego la ficha panorámica de laboratorio, q esta bien el null aca
        codficha: 0, // capaz y no le gustaba que se le pase aca
        codestudio: null,
        observacion: "", //	información adicional que se puede incluir
        estado: "Pendiente", //	Pendiente, Listo, Inactivo
        fechaordenestudio: "" //fecha de la orden de estudio
      },
      aux: false,
      archivo: {},
      deshabilitar: false,
      deshabilitartaba: true,
      suggestions: [],
      estudioSelected: null,
      estudio: "",
      estudioList: [],
      estudioListTable: [],
      estudioListTableSelected: "",
      columnsEstudio: [
        {
          dataField: "codestudio",
          hidden: true
        },
        {
          dataField: "nombre",
          text: "Nombre"
        },
        {
          dataField: "descripcion",
          text: "Descripcion"
        }
      ]
    };
    this.schema = {
      fechaordenestudio: Joi.string()
        .required()
        .label("Fecha de la Orden de Estudio no puede estar vacía")
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.toggleEstudio = this.toggleEstudio.bind(this);
    this.filterEstudio = this.filterEstudio.bind(this);
    this.onSelectEstudio = this.onSelectEstudio.bind(this);
    this.onChangeEstudio = this.onChangeEstudio.bind(this);
    this.addEstudioToList = this.addEstudioToList.bind(this);
    this.eliminarEstudio = this.eliminarEstudio.bind(this);
    this.onDismissVisivle = this.onDismissVisivle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.alertConfirm = this.alertConfirm.bind(this);
  }
  alertConfirm() {
    this.setState({ alertCreado: false });
    this.props.history.push(
      "/menu_ficha/" +
        parseInt(this.props.match.params.codficha) +
        "/buscar_ordenestudio/" +
        parseInt(this.props.match.params.codficha) +
        "/ordenestudio_view/" +
        this.state.codOrdenReturn +
        "/" +
        parseInt(this.props.match.params.codficha)
    );
  }

  handleDrop(fileList) {
    this.setState({ archivo: fileList[0] });
    console.log(this.state.archivo);
  }

  eliminarEstudio() {
    console.log(this.state.estudioListTableSelected);
    let list = this.state.estudioListTable;
    list.splice(this.state.estudioListTableSelected, 1);
    this.setState({ estudioListTable: list });
    console.log(list);
  }

  componentDidMount() {
    this.getEstudioList();
  }

  async getEstudioList() {
    const urlEstudio = "http://127.0.0.1:8000/api/estudio/";
    let listaEstudio;
    await axios
      .get(urlEstudio)
      .then(function(response) {
        listaEstudio = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });

    this.setState({ estudioList: listaEstudio });
    console.log(listaEstudio);
  }

  filterEstudio(event) {
    var results = this.state.estudioList.filter(estudio => {
      return estudio.nombre.toLowerCase().startsWith(event.query.toLowerCase());
    });

    this.setState({ suggestions: results });
  }

  onSelectEstudio(e) {
    this.setState({ estudioSelected: e.value }, function() {
      console.log("console 1" + this.state.estudioSelected);
    });
  }

  onChangeEstudio(e) {
    this.getEstudioList();
    this.setState({ estudio: e.value });
  }

  addEstudioToList() {
    let estudioList = this.state.estudioListTable;
    if (this.state.estudioSelected === null) {
      {
        Alert.warning("El Tipo Estudio esta vacío", 5000);
        console.log("vacio");
        return;
      }
    } else {
      for (let index = 0; index < estudioList.length; index++) {
        if (
          estudioList[index].codestudio ===
          this.state.estudioSelected.codestudio
        ) {
          Alert.warning("El Tipo Estudio ya fue agregado", 3000);
          return;
        }
      }
      const estudio = {
        codestudio: this.state.estudioSelected.codestudio,
        nombre: this.state.estudioSelected.nombre,
        descripcion: this.state.estudioSelected.descripcion
      };
      estudioList.push(estudio);
      console.log("estudio a ser agregado" + this.state.estudioSelected.nombre);
      this.setState({ estudioListTable: estudioList });
    }
  }

  onDismissVisivle() {
    this.setState({ visible: !this.state.visible });
  }
  onDismissAviso() {
    this.setState({ aviso: !this.state.visible });
  }

  validar = () => {
    const result = Joi.validate(
      {
        fechaordenestudio: this.state.datosOrdenEstudio.fechaordenestudio
      },
      this.schema,
      {
        abortEarly: false
      }
    );
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details)
      errors[item.path[0]] = item.context.label;
    return errors;
  };

  handleChange(e) {
    const target = e.target;
    let fields = this.state.datosOrdenEstudio;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    fields[name] = value;

    this.setState({
      datosOrdenEstudio: fields
    });
  }

  handleSubmit() {
    const errors = this.validar();
    this.setState({ errores: errors || {} });
    if (errors) return;
    this.handleAdd();
  }

  async handleAdd() {
    var url = "http://127.0.0.1:8000/api/ordenestudio/";
    let ordenestudio = this.state.datosOrdenEstudio;
    let codordenestudio;
    console.log(ordenestudio);
    ordenestudio.codestudio = this.state.estudioListTable[0].codestudio;
    ordenestudio.codficha = this.props.match.params.codficha;

    // ordenestudio["codficha"] = parseInt(this.props.match.params.codficha); //vamos a dejarle nomas jaja si vamos aprovar si func

    await fetch("http://127.0.0.1:8000/api/ordenestudio/", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(ordenestudio), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error))
      // .then(response => {
      // console.log(response);
      // });
      .then(response => {
        if (response.codficha !== undefined && response.codficha !== null) {
          codordenestudio = response.codordenestudio;
          console.log(response);
          this.setState({
            alertCreado: true,
            codOrdenReturn: codordenestudio
          });
        }
      });

    /*
    await axios
      .post(url, ordenestudio)
      .then(function(response) {
        if (response.codficha !== undefined && response.codficha !== null) {
          codordenestudio = response.data.codordenestudio;
          console.log(response);
          this.setState({
            alertCreado: true,
            codOrdenReturn: codordenestudio
          });
        }
        console.log(codordenestudio);
        console.log(response.data);
      })

      .catch(function(error) {
        console.log(error);
      });*/
  }

  async handleAddEstudio(codficha) {
    const list = this.state.estudioListTable;
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

    console.log(this.props.match.params.codficha);
  }

  toggleEstudio() {
    this.setState({
      toggleEstudio: !this.state.toggleEstudio
    });
  }

  render() {
    return (
      <Container style={{ marginTop: 20 }}>
        <Card style={{ backgroundColor: "#F9FCFB" }}>
          <CardHeader style={{ backgroundColor: "#133E7C", color: "white" }}>
            <h3>Datos</h3>
          </CardHeader>
          <CardBody>
            <Form>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="fechaordenestudio">
                      Fecha Orden de Estudio
                    </Label>
                    <Input
                      style={{
                        width: 300
                      }}
                      type="date"
                      onChange={this.handleChange}
                      value={this.state.datosOrdenEstudio.fechaordenestudio}
                      name="fechaordenestudio"
                      id="fechaordenestudio"
                    />
                    <Label style={{ color: "red", fontSize: 12 }}>
                      {this.state.errores.fechaordenestudio}
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ marginBottom: 20 }}>
                <Col>
                  <h5>Tipo Estudio</h5>
                  <Card style={{ padding: 10 }}>
                    <Row style={{ marginBottom: 10 }}>
                      <Col>
                        <AutoComplete
                          value={this.state.estudio}
                          suggestions={this.state.suggestions}
                          completeMethod={this.filterEstudio}
                          field="nombre"
                          size={40}
                          placeholder="Estudio"
                          minLength={1}
                          onChange={this.onChangeEstudio}
                          onSelect={this.onSelectEstudio}
                        />
                        <Button
                          color="primary"
                          onClick={this.addEstudioToList}
                          style={{ marginLeft: 5 }}
                        >
                          Agregar
                        </Button>
                        <Button
                          color="success"
                          onClick={this.toggleEstudio}
                          style={{ marginLeft: 5 }}
                        >
                          Nuevo Estudio
                        </Button>
                      </Col>
                      <Modal
                        show={this.state.toggleEstudio}
                        onHide={this.toggleEstudio}
                      >
                        <Modal.Body>
                          <Estudio />
                        </Modal.Body>
                      </Modal>
                    </Row>
                    <Row>
                      <Col>
                        <BootstrapTable
                          keyField="codestudio"
                          data={this.state.estudioListTable}
                          columns={this.state.columnsEstudio}
                          selectRow={{
                            mode: "radio",
                            clickToSelect: true,
                            onSelect: (row, isSelect, rowIndex, e) => {
                              console.log("row.id" + row.codestudio);
                              console.log("isSelect" + isSelect);
                              console.log("rowIndex" + rowIndex);
                              this.setState({
                                estudioListTableSelected: rowIndex
                              });
                            }
                          }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button onClick={this.eliminarEstudio}>Eliminar</Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>

              <Row>
                <Col>
                  <FormGroup>
                    <Label for="observacion">Observación</Label>
                    <Input
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.datosOrdenEstudio.observacion}
                      name="observacion"
                      id="observacion"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>

        <Button
          onClick={this.handleSubmit}
          color="primary"
          style={{ marginTop: 20 }}
        >
          Eviar a Laboratorio
        </Button>
        <SweetAlert
          success
          onConfirm={this.alertConfirm}
          show={this.state.alertCreado}
        >
          Orden de Estudio enviada a Laboratorio con éxito!
        </SweetAlert>
        {"      "}
        <Button
          onClick={this.props.history.goBack}
          appearance="primary"
          style={{ marginTop: 20 }}
        >
          Atras
        </Button>
      </Container>
    );
  }
}

export default OrdenEstudio;
