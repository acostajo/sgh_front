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
  Label
} from "reactstrap";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import SweetAlert from "react-bootstrap-sweetalert";
import { Alert } from "rsuite";
import { withRouter } from "react-router-dom";
class OrdenEstudioView extends Component {
  constructor() {
    super();
    this.state = {
      datosOrdenEstudio: {},
      visible: false,
      showDeclarative: false,
      confirmDelete: false,
      confirmCancel: false,
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
          text: "Descripción"
        }
      ]
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onCancelDelete = this.onCancelDelete.bind(this);
    this.alertDelete = this.alertDelete.bind(this);
    this.alertCancel = this.alertCancel.bind(this);
  }
  onDismiss() {
    this.setState({ visible: false });
  }

  async handleDelete() {
    const cod = this.props.match.params.codordenestudio; //direccto accedes, yaa, y eso nomas es, que te falta ahora?
    const url1 = "http://127.0.0.1:8000/api/ordenestudio/" + cod + "/";
    const response = await axios.delete(url1);
    if (response.status === 204) {
      Alert.success("La Orden de Estudio ha sido eliminada con éxito"); //con este avisascmenta nomas, ok
      this.props.history.push(
        "/menu_ficha/" +
          this.props.match.params.codficha +
          "/ficha_view/" +
          this.props.match.params.codficha // y con este mandas al menu de la fi
      );
    }
  }

  async componentWillMount() {
    const cod = this.props.match.params.codordenestudio;
    console.log(this.props.match.params.codordenestudio);
    const url1 = "http://127.0.0.1:8000/api/ordenestudio?codordenestudio=";
    let datosOrdenEstudio = {};

    console.log(cod);
    await axios
      .get(url1 + cod)
      .then(function(response) {
        console.log(response.data[0]);
        datosOrdenEstudio = response.data[0];
      })
      .catch(function(error) {
        console.log(error);
      });

    this.setState({
      datosOrdenEstudio: datosOrdenEstudio
    });
    console.log(this.state.datosOrdenEstudio); //trae bien, trae bien? el cod digo no el contenido

    //tipo estudio
    const url2 = "http://127.0.0.1:8000/api/ordenestudio/?codordenestudio=";
    const url3 = "http://127.0.0.1:8000/api/estudio/?codestudio=";

    let estudioOrden = {};
    let liste = [];
    let listEstudio = [];

    await axios
      .get(url2 + cod)
      .then(function(response) {
        estudioOrden = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });

    for (let item = 0; item < estudioOrden.length; item++) {
      await axios
        .get(url3 + estudioOrden[item].codestudio)
        .then(function(response) {
          liste.push(response.data[0]);
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    for (let item = 0; item < liste.length; item++) {
      const obj = {
        codestudio: liste[item].codestudio,
        nombre: liste[item].nombre,
        descripcion: liste[item].descripcion
      };
      listEstudio.push(obj);
    }
    console.log(listEstudio);

    this.setState({ estudioListTable: listEstudio });
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
              </Row>
              <Row style={{ marginBottom: 20 }}>
                <Col>
                  <h5>Tipo Estudio</h5>
                  <Card style={{ padding: 10 }}>
                    <Row>
                      <Col>
                        <BootstrapTable
                          keyField="codestudio"
                          data={this.state.estudioListTable}
                          columns={this.state.columnsEstudio}
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>

              <Row>
                <Col>
                  <FormGroup>
                    <Label>
                      <strong>Observación:</strong>
                    </Label>
                    <p>{this.state.datosOrdenEstudio.observacion}</p>
                  </FormGroup>
                </Col>{" "}
              </Row>
            </Form>
          </CardBody>
        </Card>

        <FormGroup>
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
          {"      "}
          <Button
            onClick={this.props.history.goBack}
            appearance="primary"
            style={{ marginTop: 20 }}
          >
            Atras
          </Button>
        </FormGroup>
      </Container>
    );
  }
}

export default OrdenEstudioView;
