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
import Joi from "joi-browser";
import { Modal, Alert } from "rsuite";
import axios from "axios";
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

class FichaEdit extends Component {
  constructor() {
    super();
    this.state = {
      errores: {},
      //rxmanos: true,
      aviso: false,
      visible: false,
      nroDocOriginal: 0,
      //datos correspondientes al paciente
      datosFicha: {},
      deshabilitar: false,
      deshabilitartaba: true,
      deshabilitarrxpies: true,
      deshabilitarrxmanos: true
    };

    this.schema = {
      nombres: Joi.string()
        .required()
        .label("Nombres no puede estar vacío"),
      apellidos: Joi.string()
        .required()
        .label("Apellidos no puede estar vacío"),
      nhc: Joi.number()
        .required()
        .label("NHC no puede estar vacío"),
      fechadiagnos: Joi.string()
        .required()
        .label("Fecha Diagnostico no puede estar vacío"),
      fechainclusion: Joi.string()
        .required()
        .label("Fecha Inclusion no puede estar vacío"),
      diagnostico: Joi.string()
        .required()
        .label("Diagnostico no puede estar vacío"),
      nrodocumento: Joi.number()
        .required()
        .label("Nro de Documento no puede estar vacío"),
      fechanaci: Joi.string()
        .required()
        .label("Fecha de Nacimiento no puede estar vacío")
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onDismissVisivle = this.onDismissVisivle.bind(this);
    this.onDismissAviso = this.onDismissAviso.bind(this);
    this.validarCedula = this.validarCedula.bind(this);
  }

  handleSubmit() {
    const errors = this.validar();
    this.setState({ errores: errors || {} });
    if (errors) return;
    this.handleAdd();
  }

  async validarCedula(e) {
    const url1 = "http://127.0.0.1:8000/api/ficha?nrodocumento=";
    const value = e.target.value;
    const name = e.target.name;
    const nro = this.state.nroDocOriginal;
    let fields = this.state.datosFicha;
    fields[name] = value;

    this.setState({
      datosFicha: fields
    });

    let resp;
    let aviso;
    await axios
      .get(url1 + value)
      .then(function(response) {
        console.log(response.data);

        /* if ((response.data.length > 0) & (value !== "")) {
          // si pasa este es porque trajo algo, entonces tenemos que comparar, pero tenemos que comparar adentro, entonces vamos a poner asi
          if (value === nro) {
            //si el valor que metio es igual al nro que ya HTMLTableCaptionElement, entonces no tiene que hacer nada
            aviso = false;
          } else {
            // si no comrpueba que el nro de documento no exista ya
            if (response.data[0].nrodocumento === value) {
              aviso = true;
              console.log("imprime si entra aca");
            } else {
              aviso = false;
            }
          }
        } else {
          aviso = false;
          return;
        }*/

        if ((response.data.length > 0) & (value !== "")) {
          //aviso = true;
          Alert.warning(
            "El Nro de documento ya esta asociada a otra ficha...",
            10000
          );
        } else {
          //aviso = false;
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    this.setState({ aviso: aviso });
  }
  onDismissVisivle() {
    this.setState({ visible: !this.state.visible });
  }
  onDismissAviso() {
    this.setState({ aviso: !this.state.visible });
  }
  async componentDidMount() {
    const cod = this.props.match.params.codficha; // asi nomas, mas abajo vas a tener que borrarle y copiar como esta en ficha form, ahora vamos a ver como el manda
    const url2 = "http://127.0.0.1:8000/api/ficha?codficha="; //no se puede sacar de aca, osea aca es donde carga como estaban los datos ori, cierto justo pense en eso tambienvamos a rriba
    let datosficha = {};

    await fetch(url2 + cod)
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          return new Error("No se recibio la respuesta esperada ...");
        }
      })
      .then(function(response) {
        datosficha = response[0];
      })
      .catch(error => console.log(error));

    this.setState({
      datosFicha: datosficha,
      nroDocOriginal: datosficha.nrodocumento
    });

    console.log(this.state.datosFicha);
  }

  validar = () => {
    const result = Joi.validate(
      {
        nombres: this.state.datosFicha.nombres,
        apellidos: this.state.datosFicha.apellidos,
        nhc: this.state.datosFicha.nhc,
        fechadiagnos: this.state.datosFicha.fechadiagnos,
        fechainclusion: this.state.datosFicha.fechainclusion,
        diagnostico: this.state.datosFicha.diagnostico,
        nrodocumento: this.state.datosFicha.nrodocumento,
        fechanaci: this.state.datosFicha.fechanaci
      },
      this.schema,
      {
        abortEarly: false
      }
    );
    console.log(result.error);
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details)
      errors[item.path[0]] = item.context.label;
    return errors;
  };

  handleChange(e) {
    const target = e.target;
    let fields = this.state.datosFicha; // y este
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    fields[name] = value;
    this.setState({
      datosFicha: fields
    });

    if ((name === "tabnumero") & (value === "")) {
      console.log(typeof value);
      fields[name] = 0;
      console.log(typeof fields[name]);
      this.setState({
        datosFicha: fields
      });
      console.log(this.state.datosFicha.tabnumero);
    }

    /*if ((name === "rxpies") & (this.state.datosFicha.rxpies === true)) {
      fields[name] = false;
      this.setState({
        datosFicha: fields
      });
    }*/

    /*if ((name === "rxmanos") & (this.state.datosFicha.rxmanos === true)) {
      fields[name] = false;
      this.setState({
        datosFicha: fields
      });
    }*/

    if ((name === "tabaqfecha") & (value === "")) {
      fields[name] = null;
      this.setState({
        datosFicha: fields
      });
    }

    if ((name === "rxpiesfecha") & (value === "")) {
      fields[name] = null;
      this.setState({
        datosFicha: fields
      });
    }
    if ((name === "rxmanosfecha") & (value === "")) {
      fields[name] = null;
      this.setState({
        datosFicha: fields
      });
    }

    if ((name === "sexo") & (value === "M")) {
      this.setState({
        deshabilitar: !this.state.deshabilitar,
        menarca: 0,
        menopausia: 0,
        gestas: 0,
        partos: 0,
        cesareas: 0,
        abortos: 0,
        hisjospost: false
      });
    } else if ((name === "sexo") & (value === "F")) {
      this.setState({
        deshabilitar: !this.state.deshabilitar
      });
    }
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  async handleUpdate() {
    const cod = this.props.match.params.codficha;
    const ficha = this.state.datosFicha;
    let codficha;
    console.log(this.state.datosFicha);

    await fetch(
      "http://127.0.0.1:8000/api/ficha/" + cod + "/", ///tenemos que recuperar el codficha para meter ahi
      {
        method: "PUT", // or 'PUT'
        body: JSON.stringify(ficha), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => res.json())
      .catch(error => console.error("Error:", error))
      /*.then(response => {
        console.log("La ficha fue cargada con exito:", response);
        this.setState({ visible: true });
      });*/
      .then(response => {
        if (response.codficha !== undefined && response.codficha !== null) {
          codficha = response.codficha;
          console.log(response);
          Alert.success("La ficha fue cargada con éxito!", 10000);
        }
      });
  }

  render() {
    return (
      <Container>
        <Card style={{ backgroundColor: "#F9FCFB" }}>
          <CardHeader style={{ backgroundColor: "#0B1A25", color: "white" }}>
            <h3>Datos personales</h3>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="nombres">Nombres</Label>
                  <Input
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.datosFicha.nombres}
                    name="nombres"
                    id="nombres"
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="apellidos">Apellidos</Label>
                  <Input
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.datosFicha.apellidos}
                    name="apellidos"
                    id="apellidos"
                  />
                </FormGroup>
              </Col>

              <Col>
                <FormGroup>
                  <Label for="nhc">NHC</Label>
                  <Input
                    type="number"
                    onChange={this.handleChange}
                    value={this.state.datosFicha.nhc}
                    name="nhc"
                    id="nhc"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="fechainclusion">Fecha de Inclusión</Label>
                  <Input
                    type="date"
                    onChange={this.handleChange}
                    value={this.state.datosFicha.fechainclusion}
                    name="fechainclusion"
                    id="fechainclusion"
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="tipodocumento">Tipo Documento</Label>
                  <Input
                    type="select"
                    onChange={this.handleChange}
                    value={this.state.datosFicha.tipodocumento}
                    name="tipodocumento"
                    id="tipodocumento"
                  >
                    <option>Cédula de Identidad</option>
                    <option>Pasaporte</option>
                    <option>No Aplica</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="nrodocumento">Nro. Documento:</Label>
                  <Input
                    type="number"
                    onChange={this.validarCedula}
                    value={this.state.datosFicha.nrodocumento}
                    name="nrodocumento"
                    id="nrodocumento"
                  />
                  <Label style={{ color: "red", fontSize: 12 }}>
                    {this.state.errores.nrodocumento}
                  </Label>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="procedencia">Procedencia</Label>
                  <Input
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.datosFicha.procedencia}
                    name="procedencia"
                    id="procedencia"
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="fechanaci">Fecha de Nacimiento</Label>
                  <Input
                    type="date"
                    onChange={this.handleChange}
                    value={this.state.datosFicha.fechanaci}
                    name="fechanaci"
                    id="fechanaci"
                  />
                  <Label style={{ color: "red", fontSize: 12 }}>
                    {this.state.errores.fechanaci}
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="telefono">Teléfono</Label>
                  <Input
                    type="number"
                    onChange={this.handleChange}
                    value={this.state.datosFicha.telefono}
                    name="telefono"
                    id="telefono"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="nacionalidad">Nacionalidad</Label>
                  <Input
                    type="select"
                    onChange={this.handleChange}
                    value={this.state.datosFicha.nacionalidad}
                    name="nacionalidad"
                    id="nacionalidad"
                  >
                    <option>Paraguaya/o</option>
                    <option>Argentina/o</option>
                    <option>Brasilero/a</option>
                    <option>Otro</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="estadocivil">Estado Civil</Label>
                  <Input
                    type="select"
                    onChange={this.handleChange}
                    value={this.state.datosFicha.estadocivil}
                    name="estadocivil"
                    id="estadocivil"
                  >
                    <option>Soltero/o</option>
                    <option>Casado/o</option>
                    <option>Viudo/a</option>
                    <option>Unido/a</option>
                    <option>Separado/a</option>
                    <option>Divorciado/a</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="sexo">Sexo</Label>
                  <Input
                    type="select"
                    name="sexo"
                    onChange={this.handleChange}
                    value={this.state.datosFicha.sexo}
                    id="sexo"
                  >
                    <option>F</option>
                    <option>M</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="escolaridad">Escolaridad</Label>
                  <Input
                    type="select"
                    onChange={this.handleChange}
                    value={this.state.datosFicha.escolaridad}
                    name="escolaridad"
                    id="escolaridad"
                  >
                    <option>Educación Inicial</option>
                    <option>Primaria</option>
                    <option>Secundaria</option>
                    <option>Escolar Básica</option>
                    <option>Escolar Media</option>
                    <option>Universitario</option>
                    <option>No Aplica</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="profesion">Profesión</Label>
                  <Input
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.datosFicha.profesion}
                    name="profesion"
                    id="profesion"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="diagnostico">Dx</Label>
                  <Input
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.datosFicha.diagnostico}
                    name="diagnostico"
                    id="diagnostico"
                  />
                  <Label style={{ color: "red", fontSize: 12 }}>
                    {this.state.errores.diagnostico}
                  </Label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="fechadiagnos">Fecha de Dx</Label>
                  <Input
                    type="date"
                    onChange={this.handleChange}
                    value={this.state.datosFicha.fechadiagnos}
                    name="fechadiagnos"
                    id="fechadiagnos"
                  />
                  <Label style={{ color: "red", fontSize: 12 }}>
                    {this.state.errores.fechadiagnos}
                  </Label>
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <hr />

        <Card style={{ backgroundColor: "#F9FCFB" }}>
          <CardHeader style={{ backgroundColor: "#0B1A25", color: "white" }}>
            <h3>Datos de la Ficha HA</h3>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="iniciosint">Fecha Inicio de los Síntomas</Label>
                  <Input
                    type="date"
                    onChange={this.handleChange}
                    value={this.state.datosFicha.iniciosint}
                    name="iniciosint"
                    id="iniciosint"
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="formainic">Forma de Inicio</Label>
                  <Input
                    type="select"
                    onChange={this.handleChange}
                    value={this.state.datosFicha.formainic}
                    name="formainic"
                    id="formainic"
                    defaultValue="Mono"
                  >
                    <option>Mono</option>
                    <option>Oligo</option>
                    <option>Poli</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="apf">APF Reumáticos de Interés</Label>
                  <Input
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.datosFicha.apf}
                    name="apf"
                    id="apf"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="apfcv">APF CV</Label>
                  <Input
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.datosFicha.apfcv}
                    name="apfcv"
                    id="apfcv"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="appfractura">APP de Fracturas</Label>
                  <Input
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.datosFicha.appfractura}
                    name="appfractura"
                    id="appfractura"
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="apffractura">APF de Fracturas</Label>
                  <Input
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.datosFicha.apffractura}
                    name="apffractura"
                    id="apffractura"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="protesissitio">
                    Prótesis Articulares - Sitio
                  </Label>
                  <Input
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.datosFicha.protesissitio}
                    name="protesissitio"
                    id="protesissitio"
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="protefecha">Prótesis Articulares - Fecha</Label>
                  <Input
                    type="date"
                    onChange={this.handleChange}
                    value={this.state.datosFicha.protefecha}
                    name="protefecha"
                    id="protefecha"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="apfneoplasias">APF de Neoplasias</Label>
                  <Input
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.datosFicha.apfneoplasias}
                    name="apfneoplasias"
                    id="apfneoplasias"
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row style={{ marginBottom: 20 }}>
              <Card style={{ padding: 20, marginLeft: 20 }}>
                <Row>
                  <Col>
                    <FormGroup check>
                      <input
                        type="checkbox"
                        checked={this.state.datosFicha.sedentarismo}
                        onChange={this.handleChange}
                        value={this.state.datosFicha.sedentarismo}
                        name="sedentarismo"
                        id="sedentarismo"
                      />
                      <Label check>Sedentarismo</Label>
                    </FormGroup>
                  </Col>

                  <Col>
                    <FormGroup check>
                      <input
                        type="checkbox"
                        checked={this.state.datosFicha.actifisica}
                        onChange={this.handleChange}
                        value={this.state.datosFicha.actifisica}
                        name="actifisica"
                        id="actifisica"
                      />
                      <Label check>Actividad Física</Label>
                    </FormGroup>
                  </Col>
                </Row>
              </Card>

              <Col>
                <Card style={{ padding: 20 }}>
                  <Row>
                    <Col>
                      <FormGroup check>
                        <input
                          type="checkbox"
                          onChange={this.handleChange}
                          checked={this.state.datosFicha.extabaq}
                          value={this.state.datosFicha.extabaq}
                          name="extabaq"
                          id="extabaq"
                        />
                        <Label check>Ex Tabaquista</Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup check>
                        <input
                          type="checkbox"
                          checked={this.state.datosFicha.tabaquismo}
                          onChange={this.handleChange}
                          value={this.state.datosFicha.tabaquismo}
                          name="tabaquismo"
                          id="tabaquismo"
                        />
                        <Label check>Tabaquismo</Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="tabaqfecha">Fecha Inicio</Label>
                        <Input
                          type="date"
                          onChange={this.handleChange}
                          value={this.state.datosFicha.tabaqfecha}
                          name="tabaqfecha"
                          id="tabaqfecha"
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="tabnumero">N° paq/año</Label>
                        <input
                          type="number"
                          onChange={this.handleChange}
                          onFocus={event => event.target.select()}
                          value={this.state.datosFicha.tabnumero}
                          name="tabnumero"
                          id="tabnumero"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <Row style={{ marginBottom: 20 }}>
              <Col>
                <Card style={{ padding: 20 }}>
                  <Row>
                    <Col>
                      <h5>Antecedentes Ginecológicos</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="menarca">Menarca</Label>
                        <Input
                          disabled={this.state.deshabilitar}
                          type="number"
                          onChange={this.handleChange}
                          value={this.state.datosFicha.menarca}
                          name="menarca"
                          id="menarca"
                        />
                      </FormGroup>
                    </Col>

                    <Col>
                      <FormGroup>
                        <Label for="menopausia">Menopausia</Label>
                        <Input
                          disabled={this.state.deshabilitar}
                          type="number"
                          onChange={this.handleChange}
                          value={this.state.datosFicha.menopausia}
                          name="menopausia"
                          id="menopausia"
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="edadvidasex">
                          Edad de Inicio de Vida Sexual
                        </Label>
                        <Input
                          type="number"
                          onChange={this.handleChange}
                          value={this.state.datosFicha.edadvidasex}
                          name="edadvidasex"
                          id="edadvidasex"
                        />
                      </FormGroup>
                    </Col>

                    <Col>
                      <FormGroup check>
                        <input
                          disabled={this.state.deshabilitar}
                          type="checkbox"
                          checked={this.state.datosFicha.hisjospost}
                          onChange={this.handleChange}
                          value={this.state.datosFicha.hisjospost}
                          name="hisjospost"
                          id="hisjospost"
                        />
                        <Label check>Hijos después del diagnóstico de AR</Label>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="gestas">Gestas</Label>
                        <Input
                          disabled={this.state.deshabilitar}
                          type="number"
                          onChange={this.handleChange}
                          value={this.state.datosFicha.gestas}
                          name="gestas"
                          id="gestas"
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="partos">Parto</Label>
                        <Input
                          disabled={this.state.deshabilitar}
                          type="number"
                          onChange={this.handleChange}
                          value={this.state.datosFicha.partos}
                          name="partos"
                          id="partos"
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="cesareas">Cesárea</Label>
                        <Input
                          disabled={this.state.deshabilitar}
                          type="number"
                          onChange={this.handleChange}
                          value={this.state.datosFicha.cesareas}
                          name="cesareas"
                          id="cesareas"
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="abortos">Abortos</Label>
                        <Input
                          disabled={this.state.deshabilitar}
                          type="number"
                          onChange={this.handleChange}
                          value={this.state.datosFicha.abortos}
                          name="abortos"
                          id="abortos"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col>
                <Card style={{ padding: 20 }}>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="factorreuma_pos">FR (+)</Label>
                        <Input
                          type="text"
                          onChange={this.handleChange}
                          value={this.state.datosFicha.factorreuma_pos}
                          name="factorreuma_pos"
                          id="factorreuma_pos"
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="factorreuma_neg">FR (-)</Label>
                        <Input
                          type="text"
                          onChange={this.handleChange}
                          value={this.state.datosFicha.factorreuma_neg}
                          name="factorreuma_neg"
                          id="factorreuma_neg"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Label for="factorreuma_nivel">Nivel/VR</Label>
                      <Input
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.datosFicha.factorreuma_nivel}
                        name="factorreuma_nivel"
                        id="factorreuma_nivel"
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>

              <Col>
                <Card
                  style={{
                    padding: 20,
                    marginLeft: 20,
                    marginRight: 20
                  }}
                >
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="acpa_pos">ACPA (+)</Label>
                        <Input
                          type="text"
                          onChange={this.handleChange}
                          value={this.state.datosFicha.acpa_pos}
                          name="acpa_pos"
                          id="acpa_pos"
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="acpa_neg">ACPA (-)</Label>
                        <Input
                          type="text"
                          onChange={this.handleChange}
                          value={this.state.datosFicha.acpa_neg}
                          name="acpa_neg"
                          id="acpa_neg"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Label for="acpa_nivel">Nivel/VR</Label>
                      <Input
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.datosFicha.acpa_nivel}
                        name="acpa_nivel"
                        id="acpa_nivel"
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>

              <Col>
                <Card style={{ padding: 20, marginBottom: 20 }}>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="ana_pos">ANA (+)</Label>
                        <Input
                          type="text"
                          onChange={this.handleChange}
                          value={this.state.datosFicha.ana_pos}
                          name="ana_pos"
                          id="ana_pos"
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="ana_neg">ANA (-)</Label>
                        <Input
                          type="text"
                          onChange={this.handleChange}
                          value={this.state.datosFicha.ana_neg}
                          name="ana_neg"
                          id="ana_neg"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Label for="ana_patron">Dilución/Patrón</Label>
                      <Input
                        type="select"
                        onChange={this.handleChange}
                        value={this.state.datosFicha.ana_patron}
                        name="ana_patron"
                        id="ana_patron"
                      >
                        <option>Nuclear Homogéneo</option>
                        <option>Nuclear Moteado o Puntillado Fino</option>
                        <option>Nuclear Moteado Grueso</option>
                        <option>Nucleolar</option>
                        <option>Centromérico</option>
                      </Input>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>

            <Row style={{ marginBottom: 20 }}>
              <Col>
                <Card style={{ padding: 20 }}>
                  <Row>
                    <Col>
                      <FormGroup check>
                        <input
                          type="checkbox"
                          checked={this.state.datosFicha.rxmanos}
                          onChange={this.handleChange}
                          value={this.state.datosFicha.rxmanos}
                          name="rxmanos"
                          id="rxmanos"
                        />
                        <Label check>RX Manos </Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <Row>
                        <FormGroup>
                          <Label for="rxmanosfecha">Fecha de RX Manos</Label>
                          <Input
                            type="date"
                            onChange={this.handleChange}
                            value={this.state.datosFicha.rxmanosfecha}
                            name="rxmanosfecha"
                            id="rxmanosfecha"
                          />
                        </FormGroup>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col>
                <Card style={{ padding: 20 }}>
                  <Row>
                    <Col>
                      <FormGroup check>
                        <input
                          type="checkbox"
                          checked={this.state.datosFicha.rxpies}
                          onChange={this.handleChange}
                          value={this.state.datosFicha.rxpies}
                          name="rxpies"
                          id="rxpies"
                        />
                        <Label check>RX Pies </Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <Row>
                        <FormGroup>
                          <Label for="rxpiesfecha">Fecha de RX Pies</Label>
                          <Input
                            type="date"
                            onChange={this.handleChange}
                            value={this.state.datosFicha.rxpiesfecha}
                            name="rxpiesfecha"
                            id="rxpiesfecha"
                          />
                        </FormGroup>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </CardBody>
        </Card>

        <Button
          onClick={this.handleUpdate}
          color="primary"
          style={{ marginTop: 20 }}
        >
          Guardar Cambios
        </Button>
      </Container>
    );
  }
}

export default FichaEdit;
