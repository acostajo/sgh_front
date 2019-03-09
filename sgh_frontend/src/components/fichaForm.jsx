import React, { Component } from "react";
import {
  Card,
  Alert,
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

class Ficha extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      //datos correspondientes al paciente
      codpaciente: 0, //código interno único para el paciente
      codusuario: "", //#código interno de usuario, para saber quién agrego la ficha
      nombres: "", //#nombres completos del paciente
      apellidos: "", //#apellidos completos del paciente
      cedula: 0, //#cédula de identidad del paciente
      sexo: "", // #sexo del paciente
      fechainclusion: "", // #fecha de inclusión del paciente
      procedencia: "", //#procedencia del paciente
      nacionalidad: "", // #nacionalidad del paciente
      escolaridad: "", // #escolaridad del paciente
      diagnostico: "", //#diagnóstico inicial del paciente
      fechadiagnos: "", // #fecha del diagnostico
      fechanaci: "", //#fecha de nacimiento del paciente
      estadocivil: "", //#estado civil del paciente
      profesion: "", // #profesión del paciente
      telefono: 0, // #número de teléfono del paciente
      lineabaja: 0, // #número de línea baja del paciente

      // datos correspondientes a la ficha

      codpatron: 0, //#código interno único para anapatron, para saber que patron tiene asociada la ficha HA
      codusuario: 0, // #código interno de usuario, para saber quién agrego la ficha
      nhc: 0, // #número de historial clínico, código externo de la ficha, por el cual se manejan los usuarios
      iniciosint: "", //#Fecha en el que el Paciente empezó a notar síntomas
      formainic: "", //#Descripción de los síntomas del paciente
      apf: "", // #Antecedentes Patológicos Familiares
      apfcv: "", // #Antecedentes patológicos familiares cardiovasculares
      appfractura: "", // #Antecedentes patológicos personales de fracturas
      apffractura: "", // #Antecedentes patológicos familiares de fracturas
      protesissitio: "", // #Datos de prótesis del Paciente
      protefecha: "", // #Datos de prótesis del Paciente
      apfneoplasias: "", // #Antecedentes familiares de neoplasias (tumores)
      sedentarismo: false, // #Si el Paciente es sedentario
      actifisica: false, //#Si el Paciente realiza actividad física
      tabaqfecha: "", //#Fecha que comenzo a fumar
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
      factorreuma: 0, //#factor reumatoide
      acp: 0, // #anticuerpos antipéptidos cíclicos citrulinados
      acp_nivel: 0, // #anticuerpo antinuclear
      rxmanos: false, //#erecciones sí o no
      rxmanosfecha: "", //#la fecha que tuvo las erecciones ----------> wtf erecciones hei
      rxpies: false, //#erecciones sí o no
      rxpiesfecha: "" //#la fecha que tuvo las erecciones
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }
  onDismiss() {
    this.setState({ visible: false });
  }

  handleChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  async handleAdd() {
    const paciente = {
      codusuario: 999,
      nombres: this.state.nombres,
      apellidos: this.state.apellidos,
      cedula: this.state.cedula,
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
      telefono: this.state.telefono,
      lineabaja: this.state.lineabaja
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
        console.log("El paciente fue cargado con exito:", response);
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
      factorreuma: this.state.factorreuma, //#factor reumatoide
      acp: this.state.acp, // #anticuerpos antipéptidos cíclicos citrulinados
      acp_nivel: this.state.acp_nivel, // #anticuerpo antinuclear
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
        console.log("La ficha fue cargada con exito:", response);
        this.setState({ visible: true });
      });
  }

  render() {
    return (
      <Container>
        <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
          La Ficha fue cargada con exito!
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
                  </FormGroup>
                </Col>
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
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="tipodocumento">Tipo Documento</Label>
                      <Input
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.cedula}
                        name="tipodocumento"
                        id="tipodocumento"
                      >
                        <option>Cédula de Identidad</option>
                        <option>Pasaporte</option>
                        <option>No Aplica</option>
                      </Input>
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="cedula">C.I.:</Label>
                      <Input
                        type="number"
                        onChange={this.handleChange}
                        value={this.state.cedula}
                        name="cedula"
                        id="cedula"
                      />
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
                        type="text"
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
                      <Label for="profesion">Profesion</Label>
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
                      type="textarea"
                      onChange={this.handleChange}
                      value={this.state.formainic}
                      name="formainic"
                      id="formainic"
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
                    <Label for="apfneoplasias">
                      Antecedentes Familiares de Neoplasia
                    </Label>
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
                <Col>
                  <FormGroup>
                    <Label for="tabaqfecha">Fecha Inicio Tabaquismo</Label>
                    <Input
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
                    <Label for="tabnumero">Paquetes x dia</Label>
                    <Input
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
                    <Label check>Ex Tabaquismo</Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="menarca">Edad Menarca</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.menarca}
                      name="menarca"
                      id="menarca"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="menopausia">Edad Menopausia</Label>
                    <Input
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
                      Edad de Inicio de Actividad Sexual
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
                <Col>
                  <FormGroup>
                    <Label for="gestas">Cantidad de Gestas</Label>
                    <Input
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
                    <Label for="partos">Cantidad de Partos</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.partos}
                      name="partos"
                      id="partos"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="abortos">Cantidad de Abortos</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.abortos}
                      name="abortos"
                      id="abortos"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="cesareas">Cantidad de Cesareas</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.cesareas}
                      name="cesareas"
                      id="cesareas"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup check>
                    <Input
                      type="checkbox"
                      onChange={this.handleChange}
                      value={this.state.hisjospost}
                      name="hisjospost"
                      id="hisjospost"
                    />
                    <Label check>Hijos </Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="factorreuma">Factor Reumatoide</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.factorreuma}
                      name="factorreuma"
                      id="factorreuma"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="acp">ACP</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.acp}
                      name="acp"
                      id="acp"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="acp_nivel">Nivel ACP</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.acp_nivel}
                      name="acp_nivel"
                      id="acp_nivel"
                    />
                  </FormGroup>
                </Col>
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
        <hr />
        <Button onClick={this.handleAdd} color="primary">
          Crear
        </Button>
      </Container>
    );
  }
}

export default Ficha;
