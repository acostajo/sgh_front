import React, { Component } from "react";
import { Container, Row, Col, Input } from "reactstrap";
import { Timeline, TimelineEvent } from "react-event-timeline";
import { Icon } from "rsuite";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

class Resumen extends Component {
  constructor() {
    super();
    this.state = {
      datosFicha: {},
      datosConsulta: [],
      datosPanolab: [],
      datosOrden: [],
      dataTimeLine: [],
      dataTimeLineAux: [],
      dataCdaiSdai: [],
      dataDas28: []
    };
    this.compare = this.compare.bind(this);
    this.getConsultas = this.getConsultas.bind(this);
  }

  async componentWillMount() {
    //const cod = this.props.match.params.codconsulta;
    const cod = this.props.match.params.codficha;
    const url1 = "http://127.0.0.1:8000/api/ficha?codficha=";
    let datosFicha = {};

    await axios
      .get(url1 + cod)
      .then(function(response) {
        datosFicha = response.data[0];
      })
      .catch(function(error) {
        console.log(error);
      });

    this.setState({
      datosFicha: datosFicha
    });
    this.getConsultas();
    this.getPanolabs();
    this.getOrdenes();
  }

  async getConsultas() {
    const cod = this.props.match.params.codficha;
    const url1 = "http://127.0.0.1:8000/api/consulta/?codficha=";
    let datosConsulta = [];
    let dataTimeLine = this.state.dataTimeLine;
    let aux = this.state.dataTimeLineAux;
    let data1 = this.state.dataCdaiSdai;
    let data2 = this.state.dataDas28;

    await axios
      .get(url1 + cod)
      .then(function(response) {
        datosConsulta = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    console.log("datosConsulta", datosConsulta);

    for (let i = 0; i < datosConsulta.length; i++) {
      const date = new Date(datosConsulta[i].fechaconsulta);
      const element = {
        tipo: "Consulta",
        fecha: date.toLocaleDateString(),
        fechaComp: date,
        titulo: datosConsulta[i].limitacion,
        contenido: datosConsulta[i].diagnostico,
        icono: "stethoscope",
        style: { color: "#3c763d" }
      };
      dataTimeLine.push(element);
      aux.push(element);
      const grafico1 = {
        fecha: date.toLocaleDateString(),
        cdai: datosConsulta[i].cdai,
        sdai: datosConsulta[i].sdai
      };
      data1.push(grafico1);

      const grafico2 = {
        fecha: date.toLocaleDateString(),
        das28vsg: datosConsulta[i].das28vsg,
        das28pcr: datosConsulta[i].das28pcr
      };
      data2.push(grafico2);
    }
    console.log(data2);
    this.setState({
      dataTimeLine: dataTimeLine,
      dataTimeLineAux: aux,
      datosConsulta: datosConsulta,
      dataCdaiSdai: data1,
      dataDas28: data2
    });
  }

  async getPanolabs() {
    const cod = this.props.match.params.codficha;
    const url1 = "http://127.0.0.1:8000/api/panolab/?codficha=";
    let datosPanolab = [];
    let dataTimeLine = this.state.dataTimeLine;
    let aux = this.state.dataTimeLineAux;

    await axios
      .get(url1 + cod)
      .then(function(response) {
        datosPanolab = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });

    for (let i = 0; i < datosPanolab.length; i++) {
      const date = new Date(datosPanolab[i].fechapanolab);
      const element = {
        tipo: "Panoramica de Laboratorio",
        fecha: date.toLocaleDateString(),
        fechaComp: date,
        titulo: "Panoramica de Laboratorio",
        contenido: datosPanolab[i].observacion,
        icono: "flask",
        style: { color: "#563d7c" }
      };
      dataTimeLine.push(element);
      aux.push(element);
    }
    this.setState({ dataTimeLine: dataTimeLine, dataTimeLineAux: aux });
  }

  async getOrdenes() {
    const cod = this.props.match.params.codficha;
    const url1 = "http://127.0.0.1:8000/api/ordenestudio/?codficha=";
    let datosOrden = [];
    let dataTimeLine = this.state.dataTimeLine;
    let aux = this.state.dataTimeLineAux;

    await axios
      .get(url1 + cod)
      .then(function(response) {
        datosOrden = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });

    for (let i = 0; i < datosOrden.length; i++) {
      const date = new Date(datosOrden[i].fechaordenestudio);
      const element = {
        tipo: "Orden de Estudio",
        fecha: date.toLocaleDateString(),
        fechaComp: date,
        titulo: datosOrden[i].estado,
        contenido: datosOrden[i].observacion,
        icono: "file-text-o",
        style: { color: "#337ab7" }
      };
      dataTimeLine.push(element);
      aux.push(element);
    }
    this.setState({ dataTimeLine: dataTimeLine, dataTimeLineAux: aux });
  }

  compare(a, b) {
    if (a.fechaComp < b.fechaComp) {
      return 1;
    }
    if (a.fechaComp > b.fechaComp) {
      return -1;
    }
    return 0;
  }

  render() {
    const order = this.state.dataTimeLine.sort(this.compare);
    const data = this.state.dataCdaiSdai;
    console.log(data);

    return (
      <Row style={{ margin: 10 }}>
        <Col lg="4" md="4" sm="4">
          <div className="border rounded" style={{ padding: 10 }}>
            <h3>Historial</h3>{" "}
            <Input
              type="select"
              onChange={e => {
                var aux = this.state.dataTimeLineAux;
                switch (e.target.value) {
                  case "Últimos 3 meses":
                    var maxDate = new Date(aux[0].fechaComp);
                    var minDate = new Date(
                      maxDate.setMonth(maxDate.getMonth() - 3)
                    );
                    console.log(minDate);
                    var list = aux.filter(element => {
                      return element.fechaComp >= minDate;
                    });
                    this.setState({ dataTimeLine: list });
                    break;

                  case "Últimos 6 meses":
                    var maxDate = new Date(aux[0].fechaComp);
                    var minDate = new Date(
                      maxDate.setMonth(maxDate.getMonth() - 6)
                    );
                    console.log(minDate);
                    var list = aux.filter(element => {
                      return element.fechaComp >= minDate;
                    });
                    this.setState({ dataTimeLine: list });
                    break;

                  case "Último año":
                    var maxDate = new Date(aux[0].fechaComp);
                    var minDate = new Date(
                      maxDate.setMonth(maxDate.getMonth() - 12)
                    );
                    console.log(minDate);
                    var list = aux.filter(element => {
                      return element.fechaComp >= minDate;
                    });
                    this.setState({ dataTimeLine: list });
                    break;

                  case "Todos":
                    this.setState({ dataTimeLine: aux });
                    break;
                  default:
                    break;
                }
              }}
            >
              <option>Todos</option>
              <option>Últimos 3 meses</option>
              <option>Últimos 6 meses</option>
              <option>Último año</option>
            </Input>
            <Timeline>
              {order.map(item => (
                <TimelineEvent
                  key={Math.floor(Math.random() * 100000)}
                  title={item.tipo}
                  createdAt={item.fecha}
                  iconColor={item.style.color}
                  icon={<Icon icon={item.icono} style={item.style} />}
                >
                  {item.contenido}
                </TimelineEvent>
              ))}
            </Timeline>
          </div>
        </Col>
        <Col lg="8" md="8" sm="8">
          <div className="border rounded">
            <Row>
              <LineChart
                width={600}
                height={300}
                data={this.state.datosConsulta}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="fechaconsulta" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="cdai"
                  stroke="blue"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="sdai" stroke="green" />
              </LineChart>
            </Row>
            <Row>
              <LineChart
                width={600}
                height={300}
                data={this.state.datosConsulta}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="fechaconsulta" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="das28pcr"
                  stroke="orange"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="das28vsg" stroke="violet" />
              </LineChart>
            </Row>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Resumen;
