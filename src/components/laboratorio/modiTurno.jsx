import React, { Component } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

class ModiTurno extends Component {
  constructor() {
    super();
    this.state = {
      datosOrdenEstudio: {},
      datosTurno: [],
      datosTurnoDist: [],
      datosTurnoDistSelect: [],
      turnoAgregar: {},
      archivo: {},
      turno: "",
      fechaTurno: "",
      numeroTruno: "",
      horarioTurno: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.onSelectTurno = this.onSelectTurno.bind(this);
    this.onSelectNumTurno = this.onSelectNumTurno.bind(this);
    this.update = this.update.bind(this);
  }

  onSelectTurno(value, item, event) {
    var list = this.state.datosTurnoDist;
    var list2 = this.state.datosTurno.filter(item => {
      return item.fechaturno === this.state.fechaTurno;
    });
    var listTurnos = [];

    var turnos = list.filter(item => {
      return item.turno === value;
    });

    for (let i = 0; i < turnos.length; i++) {
      const obj = {
        label: turnos[i].desturno,
        value: turnos[i]
      };
      if (list2.length === 0) {
        listTurnos.push(obj);
      } else {
        for (let j = 0; j < list2.length; j++) {
          if (obj.value.codturnodist !== list2[j].codturnodist) {
            listTurnos.push(obj);
          }
        }
      }
    }
    this.setState({ turno: value, datosTurnoDistSelect: listTurnos });
  }

  onSelectNumTurno(value, item, event) {
    const turno = {
      codturnodist: value.codturnodist,
      fechaturno: this.state.fechaTurno,
      estado: "Agendado"
    };
    this.setState({ turnoAgregar: turno });
    console.log(turno);
  }

  async update() {
    await axios
      .put(url1)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  async componentWillMount() {
    const cod = this.props.match.params.codordenestudio;
    const url1 = "http://127.0.0.1:8000/api/ordenestudio?codordenestudio=";
    const url2 = "http://127.0.0.1:8000/api/turno_dist";
    const url3 = "http://127.0.0.1:8000/api/turno";
    let datosOrdenEstudio = {};
    let datosTurnoDist = [];
    let datosTurno = [];
    //datos de la orden de estudio
    await axios
      .get(url1 + cod)
      .then(function(response) {
        datosOrdenEstudio = response.data[0];
      })
      .catch(function(error) {
        console.log(error);
      });
    //datos de la distribucion de turnos
    await axios
      .get(url2)
      .then(function(response) {
        datosTurnoDist = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    //datos de los turnos existentes
    await axios
      .get(url3)
      .then(function(response) {
        datosTurno = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    //se asignan los states
    this.setState({
      datosOrdenEstudio: datosOrdenEstudio,
      datosTurnoDist: datosTurnoDist,
      datosTurno: datosTurno
    });
    console.log(this.state.datosTurno);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col />
        </Row>
      </Container>
    );
  }
}

export default ModiTurno;
