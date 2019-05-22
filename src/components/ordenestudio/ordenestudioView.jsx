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
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
class OrdenEstudioView extends Component {
  constructor() {
    super();
    this.state = {
      datosOrdenEstudio: {},
      visible: false,
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
  }
  onDismiss() {
    this.setState({ visible: false });
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
  render() {
    return (
      <Container>
        <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
          La Orden de Estudio fue eliminada con con exito!
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
            onClick={this.handleDelete}
            color="danger"
            style={{ marginTop: 20 }}
          >
            Eliminar
          </Button>
        </FormGroup>
      </Container>
    );
  }
}

export default OrdenEstudioView;
