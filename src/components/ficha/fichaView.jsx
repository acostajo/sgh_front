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
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Alert } from "rsuite";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import EventoCardiovascular from "./../eventocardiovascular/eventocardiovascularForm";
import { createHashHistory } from "history";
import SweetAlert from "react-bootstrap-sweetalert";
const history = createHashHistory();

class FichaView extends Component {
  constructor() {
    super();
    this.state = {
      datosficha: {},
      visible: false,
      showDeclarative: false,
      confirmDelete: false,
      confirmCancel: false,
      famesListTable: [],
      columnsFames: [
        {
          dataField: "codfame",
          hidden: true
        },
        {
          dataField: "nombre",
          text: "Nombre"
        },
        {
          dataField: "descripcion",
          text: "Descripción"
        },
        {
          dataField: "fameDesde",
          text: "Fecha Desde"
        },
        {
          dataField: "fameHasta",
          text: "Fecha Hasta"
        }
      ],
      eventListTable: [],
      columnsEvent: [
        {
          dataField: "codeventocardio",
          hidden: true
        },
        {
          dataField: "nombre",
          text: "Nombre"
        }
      ],
      maniListTable: [],
      columnsMani: [
        {
          dataField: "codmanif",
          hidden: true
        },
        {
          dataField: "nombre",
          text: "Nombre"
        },
        {
          dataField: "descripcion",
          text: "Descripción"
        }
      ],
      comorListTable: [],
      columnsComor: [
        {
          dataField: "codenfermedad",
          hidden: true
        },
        {
          dataField: "nombre",
          text: "Nombre"
        },
        {
          dataField: "fechadiagnostico",
          text: "Fecha Diagnóstico "
        }
      ]
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onCancelDelete = this.onCancelDelete.bind(this);
    this.alertDelete = this.alertDelete.bind(this);
    this.alertCancel = this.alertCancel.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }
  onDismiss() {
    this.setState({ visible: false });
  }

  async handleDelete() {
    //const cod = this.props.codficha; //direccto accedes, yaa, y eso nomas es, que te falta ahora?
    const cod = this.props.match.params.codficha;
    const url1 = "http://127.0.0.1:8000/api/ficha/";
    const response = await axios.delete(url1 + cod);
    console.log(response.status);
    if (response.status === 204) {
      Alert.success("La Ficha ha sido eliminada con éxito"); //con este avisas

      this.props.history.push("/modulos");
    }
  }

  async componentWillMount() {
    //const cod = this.props.codficha;
    console.log(this.props.match.params.codficha);
    const cod = this.props.match.params.codficha;
    const url1 = "http://127.0.0.1:8000/api/ficha?codficha=";
    const url2 = "http://127.0.0.1:8000/api/famesficha/?codficha=";
    const url3 = "http://127.0.0.1:8000/api/fames/?codfame=";
    const url2e = "http://127.0.0.1:8000/api/eventocardio_ficha/?codficha=";
    const url3e = "http://127.0.0.1:8000/api/eventocardio/?codeventocardio=";
    const url2m = "http://127.0.0.1:8000/api/manif/?codficha=";
    const url3m = "http://127.0.0.1:8000/api/manif_extra_art/?codmanif=";
    const url2c = "http://127.0.0.1:8000/api/comorbilidad/?codficha=";
    const url3c = "http://127.0.0.1:8000/api/enfermedad/?codenfermedad=";
    let datosficha = {};
    let famesFicha = {};
    let listf = [];
    let listFame = [];
    let eventoFicha = {};
    let liste = [];
    let listEvento = [];
    let maniFicha = {};
    let listm = [];
    let listManifestacion = [];
    let comorFicha = {};
    let listc = [];
    let listComor = [];

    //comorbilidad
    await axios
      .get(url1 + cod)
      .then(function(response) {
        datosficha = response.data[0];
      })
      .catch(function(error) {
        console.log(error);
      });
    this.setState({
      datosficha: datosficha
    });

    await axios
      .get(url2c + cod)
      .then(function(response) {
        comorFicha = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });

    for (let item = 0; item < comorFicha.length; item++) {
      await axios
        .get(url3c + comorFicha[item].codenfermedad)
        .then(function(response) {
          listc.push(response.data[0]);
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    for (let item = 0; item < listc.length; item++) {
      const obj = {
        codenfermedad: listc[item].codenfermedad,
        nombre: listc[item].nombre,
        descripcion: listc[item].descripcion,
        fechadiagnostico: comorFicha[item].fechadiagnostico
      };
      listComor.push(obj);
    }
    console.log(listComor);

    this.setState({ comorListTable: listComor });

    //manifestaciones
    await axios
      .get(url1 + cod)
      .then(function(response) {
        datosficha = response.data[0];
      })
      .catch(function(error) {
        console.log(error);
      });
    this.setState({
      datosficha: datosficha
    });

    await axios
      .get(url2m + cod)
      .then(function(response) {
        maniFicha = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });

    for (let item = 0; item < maniFicha.length; item++) {
      await axios
        .get(url3m + maniFicha[item].codmanif)
        .then(function(response) {
          listm.push(response.data[0]);
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    for (let item = 0; item < listm.length; item++) {
      const obj = {
        codmanif: listm[item].codmanif,
        nombre: listm[item].nombre,
        descripcion: listm[item].descripcion
      };
      listManifestacion.push(obj);
    }
    console.log(listManifestacion);

    this.setState({ maniListTable: listManifestacion });

    // evento cardiovascular
    await axios
      .get(url1 + cod)
      .then(function(response) {
        datosficha = response.data[0];
      })
      .catch(function(error) {
        console.log(error);
      });
    this.setState({
      datosficha: datosficha
    });

    await axios
      .get(url2e + cod)
      .then(function(response) {
        eventoFicha = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });

    for (let item = 0; item < eventoFicha.length; item++) {
      await axios
        .get(url3e + eventoFicha[item].codeventocardio)
        .then(function(response) {
          liste.push(response.data[0]);
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    for (let item = 0; item < liste.length; item++) {
      const obj = {
        codeventocardio: liste[item].codeventocardio,
        nombre: liste[item].nombre
      };
      listEvento.push(obj);
    }
    console.log(listEvento);

    this.setState({ eventListTable: listEvento });

    // fames

    await axios
      .get(url2 + cod)
      .then(function(response) {
        famesFicha = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });

    for (let item = 0; item < famesFicha.length; item++) {
      await axios
        .get(url3 + famesFicha[item].codfame)
        .then(function(response) {
          listf.push(response.data[0]);
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    for (let item = 0; item < listf.length; item++) {
      const obj = {
        codfame: listf[item].codfame,
        nombre: listf[item].nombre,
        descripcion: listf[item].descripcion,
        fameDesde: famesFicha[item].fameDesde,
        fameHasta: famesFicha[item].fameHasta
      };
      listFame.push(obj);
    }
    console.log(listFame);

    this.setState({ famesListTable: listFame });
  }
  onCancelDelete = function() {
    this.setState({
      confirmCancel: !this.state.confirmCancel,
      confirmDelete: !this.state.confirmDelete
    });
  };

  alertDelete() {
    this.setState({ confirmDelete: !this.state.confirmDelete });
  }

  alertCancel = function() {
    this.setState({
      confirmCancel: !this.state.confirmCancel
    });
  };

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

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + " " + monthNames[monthIndex] + " " + year;
  }
  render() {
    return (
      <Container style={{ marginTop: 20 }}>
        <Card style={{ backgroundColor: "#F9FCFB" }}>
          <CardHeader style={{ backgroundColor: "#133E7C", color: "white" }}>
            <h3>Datos de la Ficha HA</h3>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <FormGroup>
                  <Label>
                    <strong>Fecha Inicio de los Síntomas:</strong>
                  </Label>
                  <p>
                    {this.formatDate(
                      new Date(this.state.datosficha.iniciosint)
                    )}
                  </p>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>
                    <strong>Forma de Inicio:</strong>
                  </Label>
                  <p>{this.state.datosficha.formainic}</p>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label>
                    <strong>APF Reumáticos de Interés:</strong>
                  </Label>
                  <p>{this.state.datosficha.apf}</p>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label>
                    <strong>APF CV:</strong>
                  </Label>
                  <p>{this.state.datosficha.apfcv}</p>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label>
                    <strong>APP de Fractura:</strong>
                  </Label>
                  <p>{this.state.datosficha.appfractura}</p>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>
                    <strong>APFs de Fractura:</strong>
                  </Label>
                  <p>{this.state.datosficha.apffractura}</p>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label>
                    <strong>Protesis Articulares - Sitio:</strong>
                  </Label>
                  <p>{this.state.datosficha.protesissitio}</p>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label>
                    <strong>Protesis Articulares - Fecha:</strong>
                  </Label>
                  <p>{this.state.datosficha.protefecha}</p>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label>
                    <strong>APF de Neoplasias:</strong>
                  </Label>
                  <p>{this.state.datosficha.apfneoplasias}</p>
                </FormGroup>
              </Col>
            </Row>
            <Row style={{ marginBottom: 20 }}>
              <Col>
                <h5>Evento Cardiovascular</h5>
                <Card style={{ padding: 10 }}>
                  <Row>
                    <Col>
                      <BootstrapTable
                        keyField="codeventocardio"
                        data={this.state.eventListTable}
                        columns={this.state.columnsEvent}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>

              <Col>
                <h5>Manifestaciones Extra Articulares</h5>
                <Card style={{ padding: 10 }}>
                  <Row>
                    <Col>
                      <BootstrapTable
                        keyField="codmanif"
                        data={this.state.maniListTable}
                        columns={this.state.columnsMani}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>

            <Row style={{ marginBottom: 20 }}>
              <Col>
                <h5>APF-Comorbilidades</h5>
                <Card style={{ padding: 10 }}>
                  <Row>
                    <Col>
                      <BootstrapTable
                        keyField="codenfermedad"
                        data={this.state.comorListTable}
                        columns={this.state.columnsComor}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <Row style={{ marginBottom: 20 }}>
              <Col>
                <h5>Fames</h5>
                <Card style={{ padding: 10 }}>
                  <Row>
                    <Col>
                      <BootstrapTable
                        keyField="codfame"
                        data={this.state.famesListTable}
                        columns={this.state.columnsFames}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>

            <Row style={{ marginBottom: 20 }}>
              <Card style={{ padding: 20, marginLeft: 20 }}>
                <Row>
                  <Col xs="6">
                    <Row>
                      <Col>
                        <FormGroup check>
                          <input
                            disabled
                            checked={this.state.datosficha.sedentarismo}
                            type="checkbox"
                            value={this.state.datosficha.sedentarismo}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label check>
                        <strong>Sedentarismo</strong>
                      </Label>
                    </Row>
                  </Col>

                  <Col xs="6">
                    <Row>
                      <Col>
                        <FormGroup check>
                          <input
                            disabled
                            checked={this.state.datosficha.actifisica}
                            type="checkbox"
                            value={this.state.datosficha.actifisica}
                          />
                          <Label check>
                            <strong>Actividad Física</strong>
                          </Label>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>

              <Col>
                <Card style={{ padding: 20 }}>
                  <Row>
                    <Col>
                      <FormGroup check>
                        <input
                          disabled
                          checked={this.state.datosficha.extabaq}
                          type="checkbox"
                          value={this.state.datosficha.extabaq}
                        />
                        <Label check>
                          <strong>Ex Tabaquista:</strong>
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup check>
                        <input
                          disabled
                          checked={this.state.datosficha.tabaquismo}
                          type="checkbox"
                          value={this.state.datosficha.tabaquismo}
                        />
                        <Label check>
                          <strong>Tabaquisimo:</strong>
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>
                          <strong>Fecha Inicio:</strong>
                        </Label>
                        <p>{this.state.datosficha.tabaqfecha}</p>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>
                          <strong>N° paq/año:</strong>
                        </Label>
                        <p>{this.state.datosficha.tabnumero}</p>
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
                        <Label>
                          <strong>Menarca:</strong>
                        </Label>
                        <p>{this.state.datosficha.menarca}</p>
                      </FormGroup>
                    </Col>
                    <hr marginLeft={50} />
                    <Col>
                      <FormGroup>
                        <Label>
                          <strong>Menopausia:</strong>
                        </Label>
                        <p>{this.state.datosficha.menopausia}</p>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>
                          <strong>Edad de Inicio de Actividad Sexual:</strong>
                        </Label>
                        <p>{this.state.datosficha.edadvidasex}</p>
                      </FormGroup>
                    </Col>

                    <Col>
                      <FormGroup check>
                        <input
                          disabled
                          checked={this.state.datosficha.hisjospost}
                          type="checkbox"
                          value={this.state.datosficha.hisjospost}
                        />
                        <Label check>
                          <strong>Hijos después del diagnóstico de AR</strong>
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>
                          <strong>Gestas:</strong>
                        </Label>
                        <p>{this.state.datosficha.gestas}</p>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>
                          <strong>Parto:</strong>
                        </Label>
                        <p>{this.state.datosficha.partos}</p>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>
                          <strong>Cesáreas:</strong>
                        </Label>
                        <p>{this.state.datosficha.cesareas}</p>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>
                          <strong>Abortos:</strong>
                        </Label>
                        <p>{this.state.datosficha.abortos}</p>
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
                        <Label>
                          <strong>FR(+):</strong>
                        </Label>
                        <p>{this.state.datosficha.factorreuma_pos}</p>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>
                          <strong>FR(-):</strong>
                        </Label>
                        <p>{this.state.datosficha.factorreuma_neg}</p>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Label>
                        <strong>Nivel/VR:</strong>
                      </Label>
                      <p>{this.state.datosficha.factorreuma_nivel}</p>
                    </Col>
                  </Row>
                </Card>
              </Col>

              <Col>
                <Card style={{ padding: 20, marginLeft: 20, marginRight: 20 }}>
                  <Row>
                    <Col>
                      <Label>
                        <strong>ACPA (+):</strong>
                      </Label>
                      <p>{this.state.datosficha.acpa_pos}</p>
                    </Col>
                    <Col>
                      <Label>
                        <strong>ACPA (-):</strong>
                      </Label>
                      <p>{this.state.datosficha.acpa_neg}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Label>
                        <strong>Nivel/VR:</strong>
                      </Label>
                      <p>{this.state.datosficha.acpa_nivel}</p>
                    </Col>
                  </Row>
                </Card>
              </Col>

              <Col>
                <Card style={{ padding: 20, marginBottom: 20 }}>
                  <Row>
                    <Col>
                      <Label>
                        <strong>ANA (+):</strong>
                      </Label>
                      <p>{this.state.datosficha.ana_pos}</p>
                    </Col>
                    <Col>
                      <Label>
                        <strong>ANA (-):</strong>
                      </Label>
                      <p>{this.state.datosficha.ana_neg}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Label>
                        <strong>Dilución/Patrón:</strong>
                      </Label>
                      <p>{this.state.datosficha.ana_patron}</p>
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
                          disabled
                          checked={this.state.datosficha.rxmanos}
                          type="checkbox"
                          value={this.state.datosficha.rxmanos}
                        />
                        <strong>RX Manos</strong>
                      </FormGroup>
                    </Col>
                    <Col>
                      <Row>
                        <FormGroup>
                          <Label>
                            <strong>Fecha de RX Manos:</strong>
                          </Label>
                          <p>{this.state.datosficha.rxmanosfecha}</p>
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
                          disabled
                          checked={this.state.datosficha.rxpies}
                          type="checkbox"
                          value={this.state.datosficha.rxpies}
                        />
                        <Label check>
                          <strong>RX Pies</strong>
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <Row>
                        <FormGroup>
                          <Label>
                            <strong>Fecha de RX Pies:</strong>
                          </Label>
                          <p>{this.state.datosficha.rxpiesfecha}</p>
                        </FormGroup>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </CardBody>
        </Card>

        <FormGroup>
          <Link
            to={`/menu_ficha/${this.state.datosficha.codficha}/ficha_edit/${
              this.state.datosficha.codficha
            }`}
          >
            <Button color="success" style={{ marginTop: 20 }}>
              Modificar
            </Button>
          </Link>
          {"      "}
          <Button
            onClick={this.alertDelete}
            color="danger"
            style={{ marginTop: 20 }}
          >
            Eliminar
            <SweetAlert
              warning
              showCancel
              allowEscape
              show={this.state.confirmDelete}
              confirmBtnText="Sí, Eliminar Orden de Estudio"
              cancelBtnText="Cancelar"
              confirmBtnBsStyle="danger"
              cancelBtnBsStyle="default"
              title="Are you sure?"
              onConfirm={this.handleDelete}
              onCancel={this.onCancelDelete}
            >
              ¿Estas seguro de Eliminar la Orden de Estudio?
            </SweetAlert>
          </Button>
        </FormGroup>
      </Container>
    );
  }
}

//export default FichaView;
export default withRouter(FichaView);
