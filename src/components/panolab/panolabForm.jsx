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
  Input,
  Fade
} from "reactstrap";
import axios from "axios";

class Panolab extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      datosPanolab: {
        //datos correspondientes a la panoramica de laboratorio
        codusuario: null, //	código interno de usuario, para saber quién agrego la ficha panorámica de laboratorio, q esta bien el null aca
        codficha: 0, // capaz y no le gustaba que se le pase aca
        protesis: "", //	el paciente tiene prótesis, sí o no
        hemoglobina: 0, //	cantidad hemoglobina
        hemotocrito: 0, //	cantidad hematocrito
        vcm: 0, //	cantidad de volumen corpuscular medio
        globlanco: 0, //	cantidad de glóbulos blancos
        nl: 0, //	cantidad de neutrófilos/linfocitos
        plaqueta: 0, //	cantidad de plaquetas
        gotdesde: 0, //	transaminasa glutámico-oxalacética desde
        gothasta: 0, //	transaminasa glutámico-oxalacética hasta
        gptdesde: 0, //	transaminasa glutámico-pirúvica desde
        gpthasta: 0, //	transaminasa glutámico-pirúvica hasta
        bilirrubina: 0, //	cantidad total de bilirrubina
        uresa: 0, //	cantidad de urea
        vsg: 0, //	velocidad de sedimentación globular
        pcr: 0, //	cantidad de proteína c reactiva
        glicemia: 0, //	cantidad de glicemia
        coleste: 0, //	cantidad total de colesterol
        ldl: 0, //	low density lipoprotein
        hdl: 0, //	high density lipoprotein
        vldl: 0, //	very low density lipoprotein
        trigliceri: 0, //	cantidad de triglicéridos
        acidourico: 0, //	cantidad de ácido úrico
        frdesde: 0, //	factor reumatoide desde
        frhasta: 0, //	factor reumatoide hasta
        anticcpneg: 0, //	cantidad de anticuerpo anti péptido citrulinado cíclico negativo
        anticcppost: 0, //	cantidad de anticuerpo anti péptido citrulinado cíclico positivo
        anticcpposd: "", //	descripción para el anticcppost
        anaposit: 0, //	cantidad de anticuerpo anti nuclear positivo
        ananeg: 0, //	cantidad de anticuerpo anti nuclear negativo
        antidnapos: 0, //	cantidad de anticuerpo anti DNA positivo
        antidnaneg: 0, //	cantidad de anticuerpo anti DNA negativo
        prot24: 0, //	proteinuria de 24hs
        observacion: "", //	información adicional que se puede incluir
        fechacreada: 0 //	fecha de creación de la orden de medicamento
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.onDismissVisivle = this.onDismissVisivle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    let fields = this.state.datosPanolab;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    fields[name] = value;

    this.setState({
      datosPanolab: fields
    });
  }
  onDismissVisivle() {
    this.setState({ visible: !this.state.visible });
  }

  handleSubmit() {
    //const errors = this.validar();
    //this.setState({ errores: errors || {} });
    //if (errors) return;

    this.handleAdd();
  }

  async handleAdd() {
    let panolab = this.state.datosPanolab;

    panolab["codficha"] = this.props.codficha;

    await fetch("http://127.0.0.1:8000/api/panolab/", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(panolab), // data can be `string` or {object}!
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
          La Ficha Panorámica de Laboratorio fue cargada con exito!
        </Alert>
        <Card>
          <CardHeader>
            <h3>Datos</h3>
          </CardHeader>
          <CardBody>
            <Form>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="protesis">Prótesis</Label>
                    <Input
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.datosPanolab.protesis}
                      name="protesis"
                      id="protesis"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="hemoglobina">Hb</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.datosPanolab.hemoglobina}
                      name="hemoglobina"
                      id="hemoglobina"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="hemotocrito">Hto</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.datosPanolab.hemotocrito}
                      name="hemotocrito"
                      id="hemotocrito"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="vcm">VCM</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.datosPanolab.vcm}
                      name="vcm"
                      id="vcm"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="nl">N/L</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.datosPanolab.nl}
                      name="nl"
                      id="nl"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="plaqueta">Plaq</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.datosPanolab.plaqueta}
                      name="plaqueta"
                      id="plaqueta"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>GOT</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="gotdesde">Desde </Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.datosPanolab.gotdesde}
                      name="gotdesde"
                      id="gotdesde"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="gothasta">Hasta</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.datosPanolab.gothasta}
                      name="gothasta"
                      id="gothasta"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>GPT</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="gptdesde">Desde </Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.datosPanolab.gptdesde}
                      name="gptdesde"
                      id="gptdesde"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="gpthasta">Hasta</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.datosPanolab.gpthasta}
                      name="gpthasta"
                      id="gpthasta"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="bilirrubina">BT</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.datosPanolab.bilirrubina}
                      name="bilirrubina"
                      id="bilirrubina"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="uresa">Urea</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.datosPanolab.uresa}
                      name="uresa"
                      id="uresa"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="vsg">VSG</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.datosPanolab.vsg}
                      name="vsg"
                      id="vsg"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="pcr">PCR</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.datosPanolab.pcr}
                      name="pcr"
                      id="pcr"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="glicemia">Glic</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.datosPanolab.glicemia}
                      name="glicemia"
                      id="taglicemialla"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="coleste">CT</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.datosPanolab.coleste}
                      name="coleste"
                      id="coleste"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="ldl">LDL</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.datosPanolab.ldl}
                      name="ldl"
                      id="ldl"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="hdl">HDL</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.datosPanolab.hdl}
                      name="hdl"
                      id="hdl"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="vldl">VLDL</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.datosPanolab.vldl}
                      name="vldl"
                      id="vldl"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="trigliceri">TG</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.datosPanolab.trigliceri}
                      name="trigliceri"
                      id="trigliceri"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="acidourico">Ac Úrico</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.datosPanolab.acidourico}
                      name="acidourico "
                      id="acidourico"
                    />
                  </FormGroup>
                </Col>
                <Row>
                  <Col>
                    <h5>FR</h5>
                  </Col>
                </Row>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="frdesde">Desde </Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.datosPanolab.frdesde}
                      name="frdesde"
                      id="frdesde"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="frhasta">Hasta</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.datosPanolab.frhasta}
                      name="frhasta"
                      id="frhasta"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>Anti CCP</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="anticcpneg">Negativo </Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.datosPanolab.anticcpneg}
                      name="anticcpneg"
                      id="anticcpneg"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="anticcppost">Positivo</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.datosPanolab.anticcppost}
                      name="anticcppost"
                      id="anticcppost"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="anticcpposd">Titulo</Label>
                    <Input
                      type="texto"
                      onChange={this.handleChange}
                      value={this.state.datosPanolab.anticcpposd}
                      name="anticcpposd"
                      id="anticcpposd"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>ANA</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="ananeg">Negativo </Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.datosPanolab.ananeg}
                      name="ananeg"
                      id="ananeg"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="anaposit">Positivo</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.datosPanolab.anaposit}
                      name="anaposit"
                      id="anaposit"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5>AntiDNA</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="antidnaneg">Negativo </Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.datosPanolab.antidnaneg}
                      name="antidnaneg"
                      id="antidnaneg"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="antidnapos">Positivo</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.datosPanolab.antidnapos}
                      name="antidnapos"
                      id="antidnapos"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="prot24">Prot 24hs</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.datosPanolab.prot24}
                      name="prot24"
                      id="prot24"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="observacion">Observación</Label>
                    <Input
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.datosPanolab.observacion}
                      name="observacion"
                      id="observacion"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>

        <Button onClick={this.handleSubmit} color="primary">
          Agregar
        </Button>
      </Container>
    );
  }
}

export default Panolab;
