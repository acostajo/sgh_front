import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Card,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Input
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import blank_pic from "./blank_pic.png";
import axios from "axios";
import { Panel, Fade } from "rsuite";
import { Alert, Icon } from "rsuite";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

class BuscarFicha extends Component {
  constructor() {
    super();
    this.state = {
      parametro: "", //aca no falta nrodocumento, no porque yao le pasa el 1 que le ponemos osea , moira nomas
      nombre: "",
      apellido: "",
      tipoBusqueda: "Nro. Documento",
      datosficha: [],
      fadeIn: false,
      alert: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState(
      {
        [name]: value
      },
      () => {
        console.log("new state", this.state);
      }
    );
    console.log(this.state.parametro);
  }

  filterMani(event) {
    var results = this.state.maniList.filter(mani => {
      return mani.nombre.toLowerCase().startsWith(event.query.toLowerCase());
    });

    this.setState({ suggestions: results });
  }

  async handleSearch() {
    const url = "http://127.0.0.1:8000/api/ficha/";

    const parametro = this.state.parametro;
    var listado;
    var fichas;

    switch (this.state.tipoBusqueda) {
      case "Nro. Documento":
        await axios
          .get(url)
          .then(function(response) {
            listado = response.data;
            console.log(listado);
          })
          .catch(function(error) {
            console.log(error);
          });

        fichas = listado.filter(item => {
          //return item.nrodocumento === parametro;
          return item.nrodocumento
            .toLowerCase()
            .startsWith(parametro.toLowerCase());
        });

        if (fichas.length === 0) {
          Alert.warning(
            "No se encontró el Paciente con ese Nro. Documento",
            5000
          );
        } else {
          //aviso = false;
        }
        console.log(fichas);
        this.setState({ datosficha: fichas, parametro: "" });
        break;

      case "Nombre":
        await axios
          .get(url)
          .then(function(response) {
            listado = response.data;
          })
          .catch(function(error) {
            console.log(error);
          });
        fichas = listado.filter(item => {
          return item.nombres.toLowerCase().startsWith(parametro.toLowerCase());
        });

        if (fichas.length === 0) {
          Alert.warning("No se encontró el Paciente con ese Nombre", 5000);
        } else {
          //aviso = false;
        }

        console.log(fichas);
        this.setState({ datosficha: fichas, parametro: "" });
        break;

      case "Apellido":
        await axios
          .get(url)
          .then(function(response) {
            listado = response.data;
          })
          .catch(function(error) {
            console.log(error);
          });
        fichas = listado.filter(item => {
          return item.apellidos
            .toLowerCase()
            .startsWith(parametro.toLowerCase());
        });

        if (fichas.length === 0) {
          Alert.warning("No se encontró el Paciente con ese Apellido", 5000);
        } else {
          //aviso = false;
        }
        console.log(fichas);
        this.setState({ datosficha: fichas, parametro: "" });
        break;
    }

    console.log(this.state.tipoBusqueda);

    //aca validamos que metodo de busqueda se esta usando
  }

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

    var day = date.getUTCDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + " " + monthNames[monthIndex] + " " + year;
  }
  render() {
    let list = this.state.datosficha;

    return (
      <Container>
        <Row style={{ marginBottom: 20 }}>
          <Col>
            <h3>Búsqueda de Paciente</h3>
          </Col>
        </Row>
        <Row>
          <Col xs="4">
            <FormGroup>
              <Input
                type="text"
                onChange={this.handleChange}
                value={this.state.parametro}
                name="parametro"
                id="parametro"
              />
            </FormGroup>
          </Col>
          <Col xs="2.5">
            <FormGroup>
              <Input
                type="select"
                onChange={this.handleChange}
                value={this.state.tipoBusqueda}
                name="tipoBusqueda"
                id="tipoBusqueda"
              >
                <option>Nro. Documento</option>
                <option>Nombre</option>
                <option>Apellido</option>
              </Input>
            </FormGroup>
          </Col>
          <Col>
            <Button
              onClick={this.handleSearch}
              style={{
                marginRight: 10,
                backgroundColor: "#007bff",
                color: "white"
              }}
            >
              Buscar
            </Button>
          </Col>
        </Row>

        <hr />
        <Container>
          {list.map(item => (
            <div
              style={{
                borderLeft: "5px solid",
                marginBottom: 15,
                padding: 10,
                borderLeftColor: "#007bff",
                borderRadius: "5px",
                borderTop: "0.5px solid",
                borderRight: "0.5px solid",
                borderBottom: "0.5px solid",
                borderTopColor: "#eee",
                borderRightColor: "#eee",
                borderBottomColor: "#eee"
                // color: "#eee"
              }}
            >
              <Row key={item.codficha}>
                <List
                  style={{
                    width: "100%",
                    maxWidth: 500
                  }}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar src={blank_pic} alt="..." />
                    </ListItemAvatar>

                    <ListItemText
                      primary={
                        <Link
                          style={{
                            color: "#007bff",
                            textDecoration: "none",
                            "&:hover": {
                              textDecoration: "none"
                            }
                          }}
                          to={`/menu_ficha/${item.codficha}/ficha_view/${
                            item.codficha
                          }`}
                        >
                          <h4>
                            {item.nombres} {item.apellidos}{" "}
                          </h4>
                          <Icon
                            icon="angle-double-right"
                            size="2x"
                            style={{ float: "right" }}
                          />
                        </Link>
                      }
                      secondary={
                        <React.Fragment>
                          <Col>
                            <Typography
                              component="span"
                              variant="body2"
                              style={{ display: "inline" }}
                              color="textPrimary"
                            >
                              Nro. Documento:
                            </Typography>
                            {item.nrodocumento}
                          </Col>
                          <Col>
                            <Typography
                              component="span"
                              variant="body2"
                              style={{ display: "inline" }}
                              color="textPrimary"
                            >
                              Fecha de Inclusión:
                            </Typography>
                            {this.formatDate(new Date(item.fechainclusion))}
                          </Col>
                          <Col>
                            <Typography
                              component="span"
                              variant="body2"
                              style={{ display: "inline" }}
                              color="textPrimary"
                            >
                              Forma Inicio:
                            </Typography>
                            {item.formainic}
                          </Col>
                          <Col>
                            <Typography
                              component="span"
                              variant="body2"
                              style={{ display: "inline" }}
                              color="textPrimary"
                            >
                              Fecha Diagnóstico:
                            </Typography>
                            {this.formatDate(new Date(item.fechadiagnos))}
                          </Col>
                          <Col>
                            <Typography
                              component="span"
                              variant="body2"
                              style={{ display: "inline" }}
                              color="textPrimary"
                            >
                              Diagnóstico:
                            </Typography>
                            {item.diagnostico}
                          </Col>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </List>
              </Row>
            </div>
          ))}
        </Container>
      </Container>
    );
  }
}

export default BuscarFicha;
