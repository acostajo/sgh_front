import React, { Component } from "react";
import {
  Card,
  Alert,
  Button,
  CardHeader,
  CardBody,
  Container,
  Row,
  Fade,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import axios from "axios";

class Ficha extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      aviso: false,
      avisoFechaDiag: false,
      avisoDiag: false,
      avisoFechaInc: false,
      avisoNhc: false,
      avisoNombres: false,
      avisoApellido: false,
      avisoNroDoc: false,
      //datos correspondientes al paciente
      codpaciente: "", //código interno único para el paciente
      codusuario: "", //#código interno de usuario, para saber quién agrego la ficha
      nombres: "", //#nombres completos del paciente
      apellidos: "", //#apellidos completos del paciente
      tipodocumento: "Cédula de Identidad", //#tipo de documento
      nrodocumento: "", //#cédula de identidad del paciente
      sexo: "F", // #sexo del paciente
      fechainclusion: "", // #fecha de inclusión del paciente
      procedencia: null, //#procedencia del paciente
      nacionalidad: null, // #nacionalidad del paciente
      escolaridad: "Escolar Media", // #escolaridad del paciente
      diagnostico: "", //#diagnóstico inicial del paciente
      fechadiagnos: "", // #fecha del diagnostico
      fechanaci: null, //#fecha de nacimiento del paciente
      estadocivil: null, //#estado civil del paciente
      profesion: null, // #profesión del paciente
      telefono: null, // #número de teléfono del paciente

      // datos correspondientes a la ficha

      codpatron: null, //#código interno único para anapatron, para saber que patron tiene asociada la ficha HA
      codusuario: null, // #código interno de usuario, para saber quién agrego la ficha
      nhc: "", // #número de historial clínico, código externo de la ficha, por el cual se manejan los usuarios
      iniciosint: null, //#Fecha en el que el Paciente empezó a notar síntomas
      formainic: "", //#Descripción de los síntomas del paciente
      apf: "", // #Antecedentes Patológicos Familiares
      apfcv: "", // #Antecedentes patológicos familiares cardiovasculares
      appfractura: "", // #Antecedentes patológicos personales de fracturas
      apffractura: "", // #Antecedentes patológicos familiares de fracturas
      protesissitio: "", // #Datos de prótesis del Paciente
      protefecha: null, // #Datos de prótesis del Paciente
      apfneoplasias: "", // #Antecedentes familiares de neoplasias (tumores)
      tabaquismo: false, // #Si el Paciente es tabaquista
      sedentarismo: false, // #Si el Paciente es sedentario
      actifisica: false, //#Si el Paciente realiza actividad física
      tabaqfecha: null, //#Fecha que comenzo a fumar
      tabnumero: 0, //#Número  de paquetes que fuma/fumo por dia
      extabaq: false, //#Si fue fumador
      menarca: 0, // #Edad de primera menstruación
      menopausia: 0, // #Edad de menopausia
      edadvidasex: 0, //#A los cuantos años comenzó a tener actividad sexual
      gestas: 0, //#Cantidad de gestas
      partos: 0, //#Cantidad de partos
      cesareas: 0, //#Cantidad de Cesáreas
      abortos: 0, //#Cantidad de abortos
      hisjospost: false, //#sí o no, tuvo hijos
      factorreuma_pos: "", //#factor reumatoide
      factorreuma_neg: "", //#factor reumatoide
      factorreuma_nivel: "", //#factor reumatoide
      acp_pos: "", // #anticuerpos antipéptidos cíclicos citrulinados
      acp_neg: "", // #anticuerpos antipéptidos cíclicos citrulinados
      acp_nivel: "", // #anticuerpo antinuclear
      ana_pos: "", //ANA patron
      ana_neg: "", //ANA patron
      ana_patron: "", //ANA patron
      rxmanos: false, //#erecciones sí o no
      rxmanosfecha: null, //#la fecha que tuvo las erecciones ----------> wtf erecciones hei
      rxpies: false, //#erecciones sí o no
      rxpiesfecha: null, //#la fecha que tuvo las erecciones
      deshabilitar: false,
      deshabilitartaba: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.onDismissVisivle = this.onDismissVisivle.bind(this);
    this.onDismissAviso = this.onDismissAviso.bind(this);
    this.validarCedula = this.validarCedula.bind(this);
    this.validarInputs = this.validarInputs.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async validarCedula(e) {
    const url1 = "http://127.0.0.1:8000/api/paciente?nrodocumento=";
    const value = e.target.value;

    this.setState({
      nrodocumento: value
    });

    console.log(e.target);
    let aviso;
    await axios
      .get(url1 + value)
      .then(function(response) {
        console.log(response.data.length);
        if ((response.data.length > 0) & (value !== "")) {
          console.log(response.data);
          aviso = true;
        } else {
          aviso = false;
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

  handleChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
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

    if ((name === "tabaquismo") & (value === true)) {
      console.log(value);
      this.setState({ deshabilitartaba: !this.state.deshabilitartaba });
    } else if ((name === "tabaquismo") & (value === false)) {
      this.setState({
        deshabilitartaba: !this.state.deshabilitartaba,
        tabaqfecha: "",
        tabnumero: ""
      });
    }
  }

  validarInputs() {}

  handleSubmit() {
    if (
      function() {
        console.log("se ejecuta el validar");
        if (this.state.fechadiagnos === "") {
          this.setState({
            avisoFechaDiag: !this.state.avisoFechaDiag,
            todoOk: false
          });
        } else {
          this.setState({ avisoFechaDiag: false, todoOk: true });
        }
        if (this.state.diagnostico === "") {
          this.setState({ avisoDiag: !this.state.avisoDiag, todoOk: false });
        } else {
          this.setState({ avisoDiag: false, todoOk: true });
        }
        if (this.state.fechainclusion === "") {
          this.setState({
            avisoFechaInc: !this.state.avisoFechaInc,
            todoOk: false
          });
        } else {
          this.setState({ avisoFechaInc: false, todoOk: true });
        }
        if (this.state.nhc === "") {
          this.setState({ avisoNhc: !this.state.avisoNhc, todoOk: false });
        } else {
          this.setState({ avisoNhc: false, todoOk: true });
        }
        if (this.state.nombres === "") {
          this.setState({
            avisoNombres: !this.state.avisoNombres,
            todoOk: false
          });
        } else {
          this.setState({ avisoNombres: false, todoOk: true });
        }
        if (this.state.apellidos === "") {
          this.setState({
            avisoApellido: !this.state.avisoApellido,
            todoOk: false
          });
        } else {
          this.setState({ avisoApellido: false, todoOk: true });
        }
        if (this.state.nrodocumento === "") {
          this.setState({
            avisoNroDoc: !this.state.avisoNroDoc,
            todoOk: false
          });
        } else {
          this.setState({ avisoNroDoc: false, todoOk: true });
        }
        if (this.state.todoOk === true) {
          return true;
        } else {
          return false;
        }
      }
    ) {
      this.handleAdd();
    }
  }

  async handleAdd() {
    const paciente = {
      codusuario: 999,
      nombres: this.state.nombres,
      apellidos: this.state.apellidos,
      tipodocumento: this.state.tipodocumento,
      nrodocumento: this.state.nrodocumento,
      sexo: this.state.sexo,
      fechainclusion: this.state.fechainclusion,
      procedencia: this.state.procedencia,
      nacionalidad: this.state.nacionalidad,
      escolaridad: this.state.escolaridad,
      diagnostico: this.state.diagnostico,
      fechadiagnos: this.state.fechadiagnos,
      fechanaci: this.state.fechanaci,
      estadocivil: this.state.estadocivil,
      profesion: this.state.profesion,
      telefono: this.state.telefono
    };
    await fetch("http://127.0.0.1:8000/api/paciente/", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(paciente), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error))
      .then(response => {
        this.setState({ codpaciente: response.codpaciente });
      });

    const ficha = {
      codpaciente: this.state.codpaciente, //#codigo del paciente
      codpatron: this.state.codpatron, //#código interno único para anapatron, para saber que patron tiene asociada la ficha HA
      codusuario: this.state.codusuario, // #código interno de usuario, para saber quién agrego la ficha
      nhc: this.state.nhc, // #número de historial clínico, código externo de la ficha, por el cual se manejan los usuarios
      iniciosint: this.state.iniciosint, //#Fecha en el que el Paciente empezó a notar síntomas
      formainic: this.state.formainic, //#Descripción de los síntomas del paciente
      apf: this.state.apf, // #Antecedentes Patológicos Familiares
      apfcv: this.state.apfcv, // #Antecedentes patológicos familiares cardiovasculares
      appfractura: this.state.appfractura, // #Antecedentes patológicos personales de fracturas
      apffractura: this.state.apffractura, // #Antecedentes patológicos familiares de fracturas
      protesissitio: this.state.protesissitio, // #Datos de prótesis del Paciente
      protefecha: this.state.protefecha, // #Datos de prótesis del Paciente
      apfneoplasias: this.state.apfneoplasias, // #Antecedentes familiares de neoplasias (tumores)
      tabaquismo: this.state.tabaquismo, // #Si el Paciente es tabaquista
      sedentarismo: this.state.sedentarismo, // #Si el Paciente es sedentario
      actifisica: this.state.actifisica, //#Si el Paciente realiza actividad física
      tabaqfecha: this.state.tabaqfecha, //#Fecha que comenzo a fumar
      tabnumero: this.state.tabnumero, //#Número  de paquetes que fuma/fumo por dia
      extabaq: this.state.extabaq, //#Si fue fumador
      menarca: this.state.menarca, // #Edad de primera menstruación
      menopausia: this.state.menopausia, // #Edad de menopausia
      edadvidasex: this.state.edadvidasex, //#A los cuantos años comenzó a tener actividad sexual
      gestas: this.state.gestas, //#Cantidad de gestas
      partos: this.state.partos, //#Cantidad de partos
      cesareas: this.state.cesareas, //#Cantidad de Cesáreas
      abortos: this.state.abortos, //#Cantidad de abortos
      hisjospost: this.state.hisjospost, //#sí o no, tuvo hijos
      factorreuma_pos: "", //#factor reumatoide
      factorreuma_neg: "", //#factor reumatoide
      factorreuma_nivel: "", //#factor reumatoide
      acp_pos: "", // #anticuerpos antipéptidos cíclicos citrulinados
      acp_neg: "", // #anticuerpos antipéptidos cíclicos citrulinados
      acp_nivel: "", // #anticuerpo antinuclear
      ana_pos: "", //ANA patron
      ana_neg: "", //ANA patron
      ana_patron: "", //ANA patron
      rxmanos: this.state.rxmanos, //#erecciones sí o no
      rxmanosfecha: this.state.rxmanosfecha, //#la fecha que tuvo las erecciones ----------> wtf erecciones hei
      rxpies: this.state.rxpies, //#erecciones sí o no
      rxpiesfecha: this.state.rxpiesfecha //#la fecha que tuvo las erecciones
    };

    await fetch("http://127.0.0.1:8000/api/ficha/", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(ficha), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error))
      .then(response => {
        console.log(response);
      });
    this.setState({ visible: !this.state.visible });
  }

  render() {
    return (
      <Container>
        <Alert
          color="info"
          isOpen={this.state.visible}
          toggle={this.onDismissVisivle}
        >
          La Ficha fue cargada con exito!
        </Alert>
        <Alert
          color="danger"
          isOpen={this.state.aviso}
          toggle={this.onDismissAviso}
        >
          El Nro de documento ya esta asociada a otra ficha...
        </Alert>
        <Card>
          <CardHeader>
            <h3>Datos personales</h3>
          </CardHeader>
          <CardBody>
            <Form>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="nombres">Nombre</Label>
                    <Input
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.nombres}
                      name="nombres"
                      id="nombres"
                    />
                    <Fade in={this.state.avisoNombres}>
                      <Label style={{ color: "red" }}>Campo requerido</Label>
                    </Fade>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="apellidos">Apellidos</Label>
                    <Input
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.apellidos}
                      name="apellidos"
                      id="apellidos"
                    />
                    <Fade in={this.state.avisoApellido}>
                      <Label style={{ color: "red" }}>Campo requerido</Label>
                    </Fade>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="nhc">NHC</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.nhc}
                      name="nhc"
                      id="nhc"
                    />
                    <Fade in={this.state.avisoNhc}>
                      <Label style={{ color: "red" }}>Campo requerido</Label>
                    </Fade>
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
                      value={this.state.fechainclusion}
                      name="fechainclusion"
                      id="fechainclusion"
                    />
                    <Fade in={this.state.avisoFechaInc}>
                      <Label style={{ color: "red" }}>Campo requerido</Label>
                    </Fade>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="tipodocumento">Tipo Documento</Label>
                    <Input
                      type="select"
                      onChange={this.handleChange}
                      value={this.state.tipodocumento}
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
                      value={this.state.nrodocumento}
                      name="nrodocumento"
                      id="nrodocumento"
                    />
                    <Fade in={this.state.avisoNroDoc}>
                      <Label style={{ color: "red" }}>Campo requerido</Label>
                    </Fade>
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
                      value={this.state.procedencia}
                      name="procedencia"
                      id="procedencia"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="fechanaci">FN</Label>
                    <Input
                      type="date"
                      onChange={this.handleChange}
                      value={this.state.fechanaci}
                      name="fechanaci"
                      id="fechanaci"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="telefono">Teléf</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.telefono}
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
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.nacionalidad}
                      name="nacionalidad"
                      id="nacionalidad"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="estadocivil">E. Civil</Label>
                    <Input
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.estadocivil}
                      name="estadocivil"
                      id="estadocivil"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="sexo">Sexo</Label>
                    <Input
                      type="select"
                      name="sexo"
                      onChange={this.handleChange}
                      value={this.state.sexo}
                      id="sexo"
                      defaultValue="F"
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
                      value={this.state.escolaridad}
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
                      value={this.state.profesion}
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
                      value={this.state.diagnostico}
                      name="diagnostico"
                      id="diagnostico"
                    />
                    <Fade in={this.state.avisoDiag}>
                      <Label style={{ color: "red" }}>Campo requerido</Label>
                    </Fade>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="fechadiagnos">Fecha de Dx</Label>
                    <Input
                      type="date"
                      onChange={this.handleChange}
                      value={this.state.fechadiagnos}
                      name="fechadiagnos"
                      id="fechadiagnos"
                    />
                    <Fade in={this.state.avisoFechaDiag}>
                      <Label style={{ color: "red" }}>Campo requerido</Label>
                    </Fade>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
        <hr />
        <Card>
          <CardHeader>
            <h3>Datos de la Ficha HA</h3>
          </CardHeader>
          <CardBody>
            <Form>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="iniciosint">Fecha Inicio de los Síntomas</Label>
                    <Input
                      type="date"
                      onChange={this.handleChange}
                      value={this.state.iniciosint}
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
                      value={this.state.formainic}
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
                      value={this.state.apf}
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
                      value={this.state.apfcv}
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
                      value={this.state.appfractura}
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
                      value={this.state.apffractura}
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
                      value={this.state.protesissitio}
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
                      value={this.state.protefecha}
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
                      value={this.state.apfneoplasias}
                      name="apfneoplasias"
                      id="apfneoplasias"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>APF-Comorbilidades </h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup check>
                    <Input
                      type="checkbox"
                      onChange={this.handleChange}
                      value={this.state.sedentarismo}
                      name="sedentarismo"
                      id="sedentarismo"
                    />
                    <Label check>Sedentarismo</Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup check>
                    <Input
                      type="checkbox"
                      onChange={this.handleChange}
                      value={this.state.actifisica}
                      name="actifisica"
                      id="actifisica"
                    />
                    <Label check>Actividad Fisica</Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup check>
                    <Input
                      type="checkbox"
                      onChange={this.handleChange}
                      value={this.state.tabaquismo}
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
                      disabled={this.state.deshabilitartaba}
                      type="date"
                      onChange={this.handleChange}
                      value={this.state.tabaqfecha}
                      name="tabaqfecha"
                      id="tabaqfecha"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="tabnumero">N° paq/año</Label>
                    <Input
                      disabled={this.state.deshabilitartaba}
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.tabnumero}
                      name="tabnumero"
                      id="tabnumero"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup check>
                    <Input
                      type="checkbox"
                      onChange={this.handleChange}
                      value={this.state.extabaq}
                      name="extabaq"
                      id="extabaq"
                    />
                    <Label check>Ex Tabaquista</Label>
                  </FormGroup>
                </Col>
              </Row>
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
                      value={this.state.menarca}
                      name="menarca"
                      id="menarca"
                    />
                  </FormGroup>
                </Col>
                <hr marginLeft={50} />
                <Col>
                  <FormGroup>
                    <Label for="menopausia">Menopausia</Label>
                    <Input
                      disabled={this.state.deshabilitar}
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.menopausia}
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
                      value={this.state.edadvidasex}
                      name="edadvidasex"
                      id="edadvidasex"
                    />
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
                      value={this.state.gestas}
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
                      value={this.state.partos}
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
                      value={this.state.cesareas}
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
                      value={this.state.abortos}
                      name="abortos"
                      id="abortos"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ marginBottom: 20 }}>
                <Col>
                  <FormGroup check>
                    <Input
                      disabled={this.state.deshabilitar}
                      type="checkbox"
                      onChange={this.handleChange}
                      value={this.state.hisjospost}
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
                    <Label for="factorreuma_pos">FR (+)</Label>
                    <Input
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.factorreuma_pos}
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
                      value={this.state.factorreuma_neg}
                      name="factorreuma_neg"
                      id="factorreuma_neg"
                    />
                  </FormGroup>
                </Col>
                <hr
                  text="line style"
                  lineStyle={{
                    backgroundColor: "blue",
                    height: 10
                  }}
                />
                <Col style={{ borderLeftWidth: 5, borderLeftColor: "#37474F" }}>
                  <FormGroup>
                    <Label for="acpa_pos">ACPA (+)</Label>
                    <Input
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.acpa_pos}
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
                      value={this.state.acpa_neg}
                      name="acpa_neg"
                      id="acpa_neg"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="ana_pos">ANA (+)</Label>
                    <Input
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.ana_pos}
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
                      value={this.state.ana_neg}
                      name="ana_neg"
                      id="ana_neg"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="factorreuma_nivel">nivel/VR</Label>
                    <Input
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.factorreuma_nivel}
                      name="factorreuma_nivel"
                      id="factorreuma_nivel"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="acpa_nivel">nivel/VR</Label>
                    <Input
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.acpa_nivel}
                      name="acpa_nivel"
                      id="acpa_nivel"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="ana_patron">Dilución/Patrón</Label>
                    <Input
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.ana_patron}
                      name="ana_patron"
                      id="ana_patron"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup check>
                    <Input
                      type="checkbox"
                      onChange={this.handleChange}
                      value={this.state.rxmanos}
                      name="rxmanos"
                      id="rxmanos"
                    />
                    <Label check>RX Manos </Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup check>
                    <Input
                      type="checkbox"
                      onChange={this.handleChange}
                      value={this.state.rxpies}
                      name="rxpies"
                      id="rxpies"
                    />
                    <Label check>RX Pies </Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="rxmanosfecha">Fecha de RX Manos</Label>
                    <Input
                      type="date"
                      onChange={this.handleChange}
                      value={this.state.rxmanosfecha}
                      name="rxmanosfecha"
                      id="rxmanosfecha"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="rxpiesfecha">Fecha de RX Pies</Label>
                    <Input
                      type="date"
                      onChange={this.handleChange}
                      value={this.state.rxpiesfecha}
                      name="rxpiesfecha"
                      id="rxpiesfecha"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
        <Button onClick={this.handleSubmit} color="primary">
          Crear
        </Button>
      </Container>
    );
  }
}

export default Ficha;