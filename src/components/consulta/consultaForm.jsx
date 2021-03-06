import React, { Component } from "react";
import manito from "./manito.jpg";
import {
  Card,
  Button,
  CardHeader,
  CardBody,
  Container,
  Row,
  ButtonGroup,
  Col,
  Form,
  FormGroup,
  Label,
  Tooltip,
  Input
} from "reactstrap";
import { Modal, InputNumber, Whisper } from "rsuite";
import { IconButton, ButtonToolbar, Icon } from "rsuite";
import axios from "axios";
import InputRange from "react-input-range";
import { withRouter } from "react-router-dom";
import { AutoComplete } from "primereact/autocomplete";
import BootstrapTable from "react-bootstrap-table-next";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "./estilos.css";
import "react-input-range/lib/css/index.css";
import EfectoAdverso from "./../efectoadverso/efectoAdversoForm";
import { Alert } from "rsuite";
import SweetAlert from "react-bootstrap-sweetalert";
///import "./../../themes/fresca.css";

class Consulta extends Component {
  constructor() {
    super();
    this.state = {
      intervalId: 0,
      show: true,
      codConsultaReturn: "", //necesitamos guardar el codconsulta que retorna
      //alert
      alertCreado: false,
      ///rangos
      CDAI_RANGO: "",
      SDAI_RANGO: "",
      DAS28_VSG_RANGO: "",
      DAS28_PCR_RANGO: "",
      datospaciente: {},
      visible: false,
      aviso: false,
      toggleEfecto: false,
      //datos correspondientes a la consulta
      edad: 0, //edad del paciente
      codconsulta: 0, //	código interno único para la ficha consulta
      codficha: "", //	código interno único para la ficha HA, para saber a qué ficha HA está asociada la ficha de consulta
      codusuario: "", //	código interno de usuario, para saber quién agrego la ficha de consulta
      fechaconsulta: "", //	fecha en la cual se emitió la consulta
      diagnostico: "", //	descripción diagnostico
      tratamientoactual: "", //	descripción tratamiento actual
      evolucion: "", //	descripción de la evolución
      limitacion: "", //	descripción de las limitaciones que posee el Paciente
      limitacionmotivo: "", //	descripción de las limitaciones que posee el Paciente
      presionarte: 0, //	medida de la presión arterial
      frescresp: 0, //	medida de la frecuencia cardíaca
      freccardia: 0, //	medida de la frecuencia respiratoria
      peso: 0, //	peso
      talla: 0.0, //	talla
      nad: 0, //	número de articulaciones dolorosas
      nat: 0, //	número de articulaciones tumefactas
      eva: 0, //	escala visual analógica
      //vgp: 0, //	valoración global del Paciente para CDAI Y SDAI
      //vgp1: 0, //	valoración global del Paciente para CDAI Y SDAI
      //vgm1: 0, //	valoración global del médico para CDAI Y SDAI
      //vgp2: 0, //	valoración global del Paciente para DAS28PCR Y DAS28VSG
      //vgm2: 0, //	valoración global del médicopara DAS28PCR Y DAS28VSG
      // crp: 0,
      //vsg: 0,
      cdai: 0, //	clinical disease activity index
      sdai: 0, //	simple disease activity index
      haq: 0, //	health assessment questionnaire
      das28pcr: 0.0, //	disease activity score 28 - proteína c reactiva
      das28vsg: 0.0, //	disease activity score 28 - velocidad de sedimentación globular
      sientepaci: "Sin Dolor", //	escala del 0 (sin dolor) al 10 (máximo dolor)
      plan: "", //	descripción del plan para el paciente
      fechacreada: 0, //	fecha de creación de la consulta
      cdairango: "",
      deshabilitar: false,
      deshabilitartaba: true,
      fechanacipaciente: "",
      suggestions: [],
      efectoSelected: null,
      efecto: "",
      efectoList: [],
      efectoListTable: [],
      efectoListTableSelected: [],
      columnsEfecto: [
        {
          dataField: "codefecad",
          hidden: true
        },
        {
          dataField: "nombre",
          text: "Nombre"
        }
      ],
      //datos para los calculos de los scores
      checksNAD: {
        checkNAD1: false,
        checkNAD2: false,
        checkNAD3: false,
        checkNAD4: false,
        checkNAD5: false,
        checkNAD6: false,
        checkNAD7: false,
        checkNAD8: false,
        checkNAD9: false,
        checkNAD10: false,
        checkNAD11: false,
        checkNAD12: false,
        checkNAD13: false,
        checkNAD14: false,
        checkNAD15: false,
        checkNAD16: false,
        checkNAD17: false,
        checkNAD18: false,
        checkNAD19: false,
        checkNAD20: false,
        checkNAD21: false,
        checkNAD22: false,
        checkNAD23: false,
        checkNAD24: false,
        checkNAD25: false,
        checkNAD26: false,
        checkNAD27: false,
        checkNAD28: false
      },
      checksNAT: {
        checkNAT1: false,
        checkNAT2: false,
        checkNAT3: false,
        checkNAT4: false,
        checkNAT5: false,
        checkNAT6: false,
        checkNAT7: false,
        checkNAT8: false,
        checkNAT9: false,
        checkNAT10: false,
        checkNAT11: false,
        checkNAT12: false,
        checkNAT13: false,
        checkNAT14: false,
        checkNAT15: false,
        checkNAT16: false,
        checkNAT17: false,
        checkNAT18: false,
        checkNAT19: false,
        checkNAT20: false,
        checkNAT21: false,
        checkNAT22: false,
        checkNAT23: false,
        checkNAT24: false,
        checkNAT25: false,
        checkNAT26: false,
        checkNAT27: false,
        checkNAT28: false
      },
      tooltipOpen: false,
      tooltipVsgOpen: false
    };
    this.toggle = this.toggle.bind(this);
    this.toggleVsg = this.toggleVsg.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    //this.onCheckNAD = this.onCheckNAD.bind(this);
    // this.onCheckNAT = this.onCheckNAT.bind(this);
    this.calcularScores = this.calcularScores.bind(this);
    this.toggleEfecto = this.toggleEfecto.bind(this);
    this.filterEfecto = this.filterEfecto.bind(this);
    this.onSelectEfecto = this.onSelectEfecto.bind(this);
    this.onChangeEfecto = this.onChangeEfecto.bind(this);
    this.addEfectoToList = this.addEfectoToList.bind(this);
    this.eliminarEfecto = this.eliminarEfecto.bind(this);
    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.handleOnSelectAll = this.handleOnSelectAll.bind(this);
    this.alertConfirm = this.alertConfirm.bind(this);
    this.handleAddEfecto = this.handleAddEfecto.bind(this);
    this.IncrementItem = this.IncrementItem.bind(this);
    this.DecreaseItem = this.DecreaseItem.bind(this);
  }

  IncrementItem = () => {
    console.log(this.state.crp);
    this.setState({ crp: this.state.crp + 1 });
  };
  DecreaseItem = () => {
    console.log(this.state.crp);
    this.setState({ crp: this.state.crp - 1 });
  };
  ToggleClick = () => {
    this.setState({ show: !this.state.show });
  };
  UpdateValue = e => {
    this.setState({ crp: e.target.value });
  };
  alertConfirm() {
    this.setState({ alertCreado: false });
    this.props.history.push(
      "/menu_ficha/" +
        parseInt(this.props.match.params.codficha) +
        "/buscar_consulta/" +
        parseInt(this.props.match.params.codficha) +
        "/consulta_view/" +
        this.state.codConsultaReturn +
        "/" +
        parseInt(this.props.match.params.codficha)
    );
  }

  handleOnSelectAll = (isSelect, rows) => {
    const ids = rows.map(r => r.id);
    if (isSelect) {
      this.setState(() => ({
        efectoListTableSelected: ids
      }));
    } else {
      this.setState(() => ({
        efectoListTableSelected: []
      }));
    }
  };

  handleOnSelect(row, isSelect) {
    console.log(isSelect);
    console.log(row);

    if (isSelect) {
      this.setState(() => ({
        efectoListTableSelected: [...this.state.efectoListTableSelected, row.id]
      }));
      return true;
    } else {
      this.setState(() => ({
        efectoListTableSelected: this.state.efectoListTableSelected.filter(
          x => x !== row.id
        )
      }));
      return true;
    }
  }

  eliminarEfecto() {
    console.log(this.state.efectoListTableSelected);
    let list = this.state.efectoListTable;
    list.splice(this.state.efectoListTableSelected, 1);
    this.setState({ efectoListTable: list });
    console.log(list);
  }

  componentDidMount() {
    this.getEfectoList();
  }

  async getEfectoList() {
    const urlEfecto = "http://127.0.0.1:8000/api/efecto_adverso/";
    let listaEfecto;
    await axios
      .get(urlEfecto)
      .then(function(response) {
        listaEfecto = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });

    this.setState({ efectoList: listaEfecto });
  }

  filterEfecto(event) {
    var results = this.state.efectoList.filter(efecto => {
      return efecto.nombre.toLowerCase().startsWith(event.query.toLowerCase());
    });

    this.setState({ suggestions: results });
  }

  async onSelectEfecto(e) {
    await this.setState({ efectoSelected: e.value }, function() {
      console.log("console 1" + this.state.efectoSelected);
    });
  }

  onChangeEfecto(e) {
    this.getEfectoList();
    this.setState({ efecto: e.value });
  }

  addEfectoToList() {
    /* console.log("efecto a ser agregado" + this.state.efectoSelected);
    if (this.state.efectoSelected !== {}) {
      const efecto = {
        codefecad: this.state.efectoSelected.codefecad,
        nombre: this.state.efectoSelected.nombre
      };
      let efectoList = this.state.efectoListTable;
      efectoList.push(efecto);
      this.setState({ efectoListTable: efectoList });
    } else {
      return;
    }*/

    let esfectoList = this.state.efectoListTable;
    if (this.state.efectoSelected === null) {
      {
        Alert.warning("El Efecto Adverso esta vacío", 5000);
        console.log("vacio");
        return;
      }
    } else {
      for (let index = 0; index < esfectoList.length; index++) {
        if (
          esfectoList[index].codefecad === this.state.efectoSelected.codefecad
        ) {
          Alert.warning("El Efecto Adverso ya fue agregado", 3000);
          return;
        }
      }
      const efecto = {
        codefecad: this.state.efectoSelected.codefecad,
        nombre: this.state.efectoSelected.nombre
      };
      esfectoList.push(efecto);
      console.log("efecto a ser agregado" + this.state.efectoSelected.nombre);
      this.setState({
        efectoListTable: esfectoList,
        efectoSelected: null,
        efecto: ""
      });
    }
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
    const consulta = {
      codficha: parseInt(this.props.match.params.codficha), //y lpara este el codficha, por eso necesitabamos que pase los dos
      codusuario: 999,
      edad: this.state.edad,
      fechaconsulta: this.state.fechaconsulta,
      diagnostico: this.state.diagnostico,
      tratamientoactual: this.state.tratamientoactual,
      evolucion: this.state.evolucion,
      limitacion: this.state.limitacion,
      limitacionmotivo: this.state.limitacionmotivo,
      presionarte: this.state.presionarte,
      frescresp: this.state.frescresp,
      freccardia: this.state.freccardia,
      peso: this.state.peso,
      talla: this.state.talla,
      nad: this.state.nad,
      nat: this.state.nat,
      eva: this.state.eva,
      vgp: this.state.vgp,
      vgp1: this.state.vgp1,
      vgp2: this.state.vgp2,
      vgm: this.state.vgm,
      vgm1: this.state.vgm1,
      vgm2: this.state.vgm2,
      crp: this.state.crp,
      vsg: this.state.vsg,
      cdai: this.state.cdai,
      sdai: this.state.sdai,
      haq: this.state.haq, //voy a ver
      das28pcr: this.state.das28pcr,
      das28vsg: this.state.das28vsg,

      CDAI_RANGO: this.state.CDAI_RANGO,
      SDAI_RANGO: this.state.SDAI_RANGO,
      DAS28_VSG_RANGO: this.state.DAS28_VSG_RANGO,
      DAS28_PCR_RANGO: this.state.DAS28_PCR_RANGO,

      sientepaci: this.state.sientepaci,
      plan: this.state.plan,
      fechacreada: this.state.fechacreada,
      fecha: this.state.datospaciente.fechanaci,

      checkNAD1: this.state.checkNAD1,
      checkNAD2: this.state.checkNAD2,
      checkNAD3: this.state.checkNAD3,
      checkNAD4: this.state.checkNAD4,
      checkNAD5: this.state.checkNAD5,
      checkNAD6: this.state.checkNAD6,
      checkNAD7: this.state.checkNAD7,
      checkNAD8: this.state.checkNAD8,
      checkNAD9: this.state.checkNAD9,
      checkNAD10: this.state.checkNAD10,
      checkNAD11: this.state.checkNAD11,
      checkNAD12: this.state.checkNAD12,
      checkNAD13: this.state.checkNAD13,
      checkNAD14: this.state.checkNAD14,
      checkNAD15: this.state.checkNAD15,
      checkNAD16: this.state.checkNAD16,
      checkNAD17: this.state.checkNAD17,
      checkNAD18: this.state.checkNAD18,
      checkNAD19: this.state.checkNAD19,
      checkNAD20: this.state.checkNAD20,
      checkNAD21: this.state.checkNAD21,
      checkNAD22: this.state.checkNAD22,
      checkNAD23: this.state.checkNAD23,
      checkNAD24: this.state.checkNAD24,
      checkNAD25: this.state.checkNAD25,
      checkNAD26: this.state.checkNAD26,
      checkNAD27: this.state.checkNAD27,
      checkNAD28: this.state.checkNAD28,

      checkNAT1: this.state.checkNAT1,
      checkNAT2: this.state.checkNAT2,
      checkNAT3: this.state.checkNAT3,
      checkNAT4: this.state.checkNAT4,
      checkNAT5: this.state.checkNAT5,
      checkNAT6: this.state.checkNAT6,
      checkNAT7: this.state.checkNAT7,
      checkNAT8: this.state.checkNAT8,
      checkNAT9: this.state.checkNAT9,
      checkNAT10: this.state.checkNAT10,
      checkNAT11: this.state.checkNAT11,
      checkNAT12: this.state.checkNAT12,
      checkNAT13: this.state.checkNAT13,
      checkNAT14: this.state.checkNAT14,
      checkNAT15: this.state.checkNAT15,
      checkNAT16: this.state.checkNAT16,
      checkNAT17: this.state.checkNAT17,
      checkNAT18: this.state.checkNAT18,
      checkNAT19: this.state.checkNAT19,
      checkNAT20: this.state.checkNAT20,
      checkNAT21: this.state.checkNAT21,
      checkNAT22: this.state.checkNAT22,
      checkNAT23: this.state.checkNAT23,
      checkNAT24: this.state.checkNAT24,
      checkNAT25: this.state.checkNAT25,
      checkNAT26: this.state.checkNAT26,
      checkNAT27: this.state.checkNAT27,
      checkNAT28: this.state.checkNAT28
    };
    let codconsulta;
    await fetch("http://127.0.0.1:8000/api/consulta/", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(consulta), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error))
      /* .then(response => {
        codconsulta = response.codconsulta;
        console.log("respuesta: ", response);
      });*/

      .then(response => {
        if (
          response.codconsulta !== undefined &&
          response.codconsulta !== null
        ) {
          codconsulta = response.codconsulta; //aca le agarramos cuando te responde ya
          console.log(response); //viste q hay se pasa el codconsulta q viene de aca digamos
          this.setState({ alertCreado: true, codConsultaReturn: codconsulta }); //aca vas aponerle en vez de este un this.setState({alertCreado: true}), ese alertCreado va ser tu state y la funcion que va tener aca
          /* this.props.history.push(
            "/consulta_view/" + this.props.match.params.codconsulta // si lo mismo es, si pero tenemos que poner tooodo el path como esta aca
          );*/ // esto pero tipo se va a la pag sin mostrar ese mensje, ya que al darle ok se vaya a la view o algo asi? si, ok vamos aver como
        }
      });

    console.log(this.state.alertCreado);
    this.handleAddEfecto(codconsulta);
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  toggleVsg() {
    this.setState({
      tooltipVsgOpen: !this.state.tooltipVsgOpen
    });
  }

  async handleAddEfecto(codconsulta) {
    const list = this.state.efectoListTable; //este hay que cambiarle
    for (let item = 0; item < list.length; item++) {
      let efecto = {
        codconsulta: codconsulta,
        codefecad: list[item].codefecad
      };

      await fetch("http://127.0.0.1:8000/api/efecto_adverso_consulta/", {
        method: "POST", // or 'PUT'
        body: JSON.stringify(efecto), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .catch(error => console.error("Error:", error))
        .then(response => {
          console.log(response);
        });
    }
  }

  toggleEfecto() {
    this.setState({
      toggleEfecto: !this.state.toggleEfecto
    });
  }

  async componentWillMount() {
    const url1 = "http://127.0.0.1:8000/api/ficha?codficha=";
    let datopaciente = {};
    await axios
      .get(url1 + this.props.match.params.codficha) //para este necesitamos el codpaciente
      .then(function(response) {
        console.log(response.data[0]);
        datopaciente = response.data[0];
      })
      .catch(function(error) {
        console.log(error);
      });
    this.setState({ datospaciente: datopaciente });

    //calcular
    var hoy = new Date();
    var cumpleanos = new Date(this.state.datospaciente.fechanaci);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();

    if (hoy.getDate() < cumpleanos.getDate()) {
      edad--;
    }
    this.setState({ edad: edad });
    console.log(this.props.match.params.codficha);
  }

  onRadioBtnClick(rSelected) {
    this.setState({ sientepaci: rSelected });
  }

  /*onCheckNAD(e) {
    const target = e.target;
    //let fields = this.state.checksNAD;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

   // fields[name] = value;

    this.setState({
      datosFicha: fields
    });
    console.log(this.state.checksNAD);
  }*/

  onCheckNAT(e) {
    const target = e.target;
    let fields = this.state.checksNAT;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    fields[name] = value;

    this.setState({
      datosFicha: fields
    });
    console.log(this.state.checksNAT);
  }

  calcularScores() {
    let countNAD = 0;
    let countNAT = 0;
    let SDAI_RANGO = "";
    let CDAI_RANGO = "";
    let DAS28_PCR_RANGO = "";
    let DAS28_VSG_RANGO = "";
    const checksNAD = Object.values(this.state.checksNAD);
    const checksNAT = Object.values(this.state.checksNAT);

    /* for (const prop in checksNAD) {
      if (this.state.checkNAD1 === true || this.state.checkNAD2 === true) {
        countNAD = countNAD + 1;
      }
    }*/
    /* console.log(countNAD);
    for (const prop in checksNAT) {
      if (checksNAT[prop] === true) {
        countNAT = countNAT + 1;
      }
    }*/

    if (this.state.checkNAD1 === true) {
      countNAD = countNAD + 1;
    }
    if (this.state.checkNAD2 === true) {
      countNAD = countNAD + 1;
    }
    if (this.state.checkNAD3 === true) {
      countNAD = countNAD + 1;
    }
    if (this.state.checkNAD4 === true) {
      countNAD = countNAD + 1;
    }
    if (this.state.checkNAD5 === true) {
      countNAD = countNAD + 1;
    }
    if (this.state.checkNAD6 === true) {
      countNAD = countNAD + 1;
    }
    if (this.state.checkNAD7 === true) {
      countNAD = countNAD + 1;
    }
    if (this.state.checkNAD8 === true) {
      countNAD = countNAD + 1;
    }
    if (this.state.checkNAD9 === true) {
      countNAD = countNAD + 1;
    }
    if (this.state.checkNAD10 === true) {
      countNAD = countNAD + 1;
    }
    if (this.state.checkNAD11 === true) {
      countNAD = countNAD + 1;
    }
    if (this.state.checkNAD12 === true) {
      countNAD = countNAD + 1;
    }
    if (this.state.checkNAD13 === true) {
      countNAD = countNAD + 1;
    }
    if (this.state.checkNAD14 === true) {
      countNAD = countNAD + 1;
    }
    if (this.state.checkNAD15 === true) {
      countNAD = countNAD + 1;
    }
    if (this.state.checkNAD16 === true) {
      countNAD = countNAD + 1;
    }
    if (this.state.checkNAD17 === true) {
      countNAD = countNAD + 1;
    }
    if (this.state.checkNAD18 === true) {
      countNAD = countNAD + 1;
    }
    if (this.state.checkNAD19 === true) {
      countNAD = countNAD + 1;
    }
    if (this.state.checkNAD20 === true) {
      countNAD = countNAD + 1;
    }
    if (this.state.checkNAD21 === true) {
      countNAD = countNAD + 1;
    }
    if (this.state.checkNAD22 === true) {
      countNAD = countNAD + 1;
    }
    if (this.state.checkNAD23 === true) {
      countNAD = countNAD + 1;
    }
    if (this.state.checkNAD24 === true) {
      countNAD = countNAD + 1;
    }
    if (this.state.checkNAD25 === true) {
      countNAD = countNAD + 1;
    }
    if (this.state.checkNAD26 === true) {
      countNAD = countNAD + 1;
    }
    if (this.state.checkNAD27 === true) {
      countNAD = countNAD + 1;
    }
    if (this.state.checkNAD28 === true) {
      countNAD = countNAD + 1;
    }

    if (this.state.checkNAT1 === true) {
      countNAT = countNAT + 1;
    }
    if (this.state.checkNAT2 === true) {
      countNAT = countNAT + 1;
    }
    if (this.state.checkNAT3 === true) {
      countNAT = countNAT + 1;
    }
    if (this.state.checkNAT4 === true) {
      countNAT = countNAT + 1;
    }
    if (this.state.checkNAT5 === true) {
      countNAT = countNAT + 1;
    }
    if (this.state.checkNAT6 === true) {
      countNAT = countNAT + 1;
    }
    if (this.state.checkNAT7 === true) {
      countNAT = countNAT + 1;
    }
    if (this.state.checkNAT8 === true) {
      countNAT = countNAT + 1;
    }
    if (this.state.checkNAT9 === true) {
      countNAT = countNAT + 1;
    }
    if (this.state.checkNAT10 === true) {
      countNAT = countNAT + 1;
    }
    if (this.state.checkNAT11 === true) {
      countNAT = countNAT + 1;
    }
    if (this.state.checkNAT12 === true) {
      countNAT = countNAT + 1;
    }
    if (this.state.checkNAT13 === true) {
      countNAT = countNAT + 1;
    }
    if (this.state.checkNAT14 === true) {
      countNAT = countNAT + 1;
    }
    if (this.state.checkNAT15 === true) {
      countNAT = countNAT + 1;
    }
    if (this.state.checkNAT16 === true) {
      countNAT = countNAT + 1;
    }
    if (this.state.checkNAT17 === true) {
      countNAT = countNAT + 1;
    }
    if (this.state.checkNAT18 === true) {
      countNAT = countNAT + 1;
    }
    if (this.state.checkNAT19 === true) {
      countNAT = countNAT + 1;
    }
    if (this.state.checkNAT20 === true) {
      countNAT = countNAT + 1;
    }
    if (this.state.checkNAT21 === true) {
      countNAT = countNAT + 1;
    }
    if (this.state.checkNAT22 === true) {
      countNAT = countNAT + 1;
    }
    if (this.state.checkNAT23 === true) {
      countNAT = countNAT + 1;
    }
    if (this.state.checkNAT24 === true) {
      countNAT = countNAT + 1;
    }
    if (this.state.checkNAT25 === true) {
      countNAT = countNAT + 1;
    }
    if (this.state.checkNAT26 === true) {
      countNAT = countNAT + 1;
    }
    if (this.state.checkNAT27 === true) {
      countNAT = countNAT + 1;
    }
    if (this.state.checkNAT28 === true) {
      countNAT = countNAT + 1;
    }

    //formula para cdai = NAD28 + NAT28 + VGP + VGM
    const CDAI = countNAT + countNAD + this.state.vgm1 + this.state.vgp1;

    if (CDAI.toFixed(2) <= 2.8) {
      CDAI_RANGO = "Remisión";
      console.log(CDAI_RANGO); //entra bien aca en remision, check
    }
    if (CDAI.toFixed(2) > 2.8 && CDAI.toFixed(2) <= 10) {
      CDAI_RANGO = "Baja Actividad";
    }
    if (CDAI.toFixed(2) > 10 && CDAI.toFixed(2) <= 22) {
      //aca esta el problem, viste que pregunta si esta entre 10 y 22 y si no le cambia
      CDAI_RANGO = "Actividad Moderada";
    }
    if (CDAI.toFixed(2) > 22) {
      //asi deberia quedar verdad, osea mayores a 22 = alta
      CDAI_RANGO = "Alta Actividad";
    }

    //formula para el SDAI: NAD28 + NAT28 + VGP + VGM + PCR (en mg/dl)
    const SDAI =
      countNAT + countNAD + this.state.vgm1 + this.state.vgp1 + this.state.crp;

    if (SDAI.toFixed(2) <= 3.3) {
      SDAI_RANGO = "Remisión";
    }
    if (SDAI.toFixed(2) > 3.3 && SDAI.toFixed(2) <= 11) {
      SDAI_RANGO = "Baja Actividad";
    }
    if (SDAI.toFixed(2) > 11 && SDAI.toFixed(2) <= 26) {
      SDAI_RANGO = "Actividad Moderada";
    }
    if (SDAI.toFixed(2) > 26) {
      SDAI_RANGO = "Alta Actividad";
    }

    //formula para el DAS28-PCR: 0,56 x √NAD28 + 0,28 x √NAT28 + 0,36 x ln(PCR +1) + 0,014 x VGP + 0,96

    const DAS28_PCR =
      0.56 * Math.sqrt(countNAD) +
      0.28 * Math.sqrt(countNAT) +
      0.36 * Math.log(this.state.crp + 1) +
      0.014 * this.state.vgp2 +
      0.96;
    console.log(Math.sqrt(countNAD));
    console.log(Math.sqrt(countNAT));
    console.log(this.state.crp);
    console.log(this.state.vgp2);
    if (DAS28_PCR.toFixed(2) <= 2.6) {
      DAS28_PCR_RANGO = "Remisión";
    }
    if (DAS28_PCR.toFixed(2) > 2.6 && DAS28_PCR.toFixed(2) <= 3.2) {
      DAS28_PCR_RANGO = "Baja Actividad";
    }
    if (DAS28_PCR.toFixed(2) > 3.2 && DAS28_PCR.toFixed(2) <= 5.1) {
      DAS28_PCR_RANGO = "Actividad Moderada";
    }
    if (DAS28_PCR.toFixed(2) > 5.1) {
      DAS28_PCR_RANGO = "Alta Actividad";
    }

    // formula para DAS28-VSG: 0,56 x √NAD28 + 0,28 x √NAT28 + 0,70 x ln(VSG) + 0,014 x VGP
    const DAS28_VSG =
      0.56 * Math.sqrt(countNAD) +
      0.28 * Math.sqrt(countNAT) +
      0.7 * Math.log(this.state.vsg) +
      0.014 * this.state.vgp2;

    if (DAS28_VSG.toFixed(2) <= 2.6) {
      DAS28_VSG_RANGO = "Remisión";
    }
    if (DAS28_VSG.toFixed(2) > 2.6 && DAS28_VSG.toFixed(2) <= 3.2) {
      DAS28_VSG_RANGO = "Baja Actividad";
    }
    if (DAS28_VSG.toFixed(2) > 3.2 && DAS28_VSG.toFixed(2) <= 5.1) {
      DAS28_VSG_RANGO = "Actividad Moderada";
    }
    if (DAS28_VSG.toFixed(2) > 5.1) {
      DAS28_VSG_RANGO = "Alta Actividad";
    }

    this.setState({
      nad: countNAD,
      nat: countNAT,
      cdai: CDAI.toFixed(2),
      sdai: SDAI.toFixed(2),
      das28pcr: DAS28_PCR.toFixed(2),
      das28vsg: DAS28_VSG.toFixed(2),
      CDAI_RANGO: CDAI_RANGO,
      SDAI_RANGO: SDAI_RANGO,
      DAS28_VSG_RANGO: DAS28_VSG_RANGO,
      DAS28_PCR_RANGO: DAS28_PCR_RANGO
    });
    console.log(CDAI_RANGO); //aca toma otro valor q esta mal, ok vamos a mirar, aca cambia
  }
  scroll() {
    let intervalId = setInterval(
      this.scrollStep.bind(this),
      this.props.delayInMs
    );
    //store the intervalId inside the state,
    //so we can use it later to cancel the scrolling
    this.setState({ intervalId: intervalId });
  }
  scrollStep() {
    if (window.scrollY === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.scrollY - this.props.scrollStepInPx);
  }
  render() {
    return (
      <Container style={{ marginTop: 20 }}>
        <Card style={{ backgroundColor: "#F9FCFB" }}>
          <CardHeader style={{ backgroundColor: "#07689F" }}>
            <h2 style={{ backgroundColor: "#07689F", color: "#FFFFFF" }}>
              Datos Consulta
            </h2>
          </CardHeader>
          <CardBody>
            <Form>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="edad">Edad</Label>
                    <Input
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.edad}
                      name="edad"
                      id="edad"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="fechaconsulta">Fecha de Consulta</Label>

                    <Input
                      type="date"
                      onChange={this.handleChange}
                      value={this.state.fechaconsulta}
                      name="fechaconsulta"
                      id="fechaconsulta"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="diagnostico">Diagnóstico</Label>
                    <Input
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.diagnostico}
                      name="diagnostico"
                      id="diagnostico"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="tratamientoactual">Tratamiento Actual</Label>
                    <Input
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.tratamientoactual}
                      name="tratamientoactual"
                      id="tratamientoactual"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="evolucion">Evolución</Label>
                    <Input
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.evolucion}
                      name="evolucion"
                      id="evolucion"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="limitacion">Limitación</Label>
                    <Input
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.limitacion}
                      name="limitacion"
                      id="limitacion"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="limitacionmotivo">Motivo</Label>
                    <Input
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.limitacionmotivo}
                      name="limitacionmotivo"
                      id="limitacionmotivo"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ marginBottom: 20 }}>
                <Col>
                  <h5>Efectos Adversos</h5>
                  <Card style={{ padding: 10 }}>
                    <Row style={{ marginBottom: 10 }}>
                      <Col>
                        <AutoComplete
                          value={this.state.efecto}
                          suggestions={this.state.suggestions}
                          completeMethod={this.filterEfecto}
                          field="nombre"
                          size={35}
                          placeholder="Efecto Adverso"
                          minLength={1}
                          onChange={this.onChangeEfecto}
                          onSelect={this.onSelectEfecto}
                        />

                        <Button
                          color="primary"
                          onClick={this.addEfectoToList}
                          style={{ marginLeft: 5 }}
                        >
                          Agregar
                        </Button>
                        <Button
                          color="success"
                          onClick={this.toggleEfecto}
                          style={{ marginLeft: 5 }}
                        >
                          Nuevo Efecto
                        </Button>
                      </Col>
                      <Modal
                        show={this.state.toggleEfecto}
                        onHide={this.toggleEfecto}
                      >
                        <Modal.Body>
                          <EfectoAdverso />
                        </Modal.Body>
                      </Modal>
                    </Row>
                    <Row>
                      <Col>
                        <BootstrapTable
                          keyField="codefecad"
                          data={this.state.efectoListTable}
                          columns={this.state.columnsEfecto}
                          selectRow={{
                            mode: "radio",
                            clickToSelect: true,
                            onSelect: (row, isSelect, rowIndex, e) => {
                              console.log("row.id" + row.codefecad);
                              console.log("isSelect" + isSelect);
                              console.log("rowIndex" + rowIndex);
                              this.setState({
                                efectoListTableSelected: rowIndex
                              });
                            }
                          }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button color="danger" onClick={this.eliminarEfecto}>
                          Eliminar
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
              <Card style={{ padding: 10, marginBottom: 20 }}>
                <Row>
                  <Col>
                    <h5>Examen Físico</h5>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="presionarte">PA</Label>
                      <Input
                        type="number"
                        onChange={this.handleChange}
                        value={this.state.presionarte}
                        name="presionarte"
                        id="presionarte"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="frescresp">FC</Label>
                      <Input
                        type="number"
                        onChange={this.handleChange}
                        value={this.state.frescresp}
                        name="frescresp"
                        id="frescresp"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="freccardia">FR</Label>
                      <Input
                        type="number"
                        onChange={this.handleChange}
                        value={this.state.freccardia}
                        name="freccardia"
                        id="freccardia"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="peso">Peso</Label>
                      <Input
                        type="number"
                        onChange={this.handleChange}
                        value={this.state.peso}
                        name="peso"
                        id="peso"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="talla">Talla</Label>
                      <Input
                        type="number"
                        onChange={this.handleChange}
                        value={this.state.talla}
                        name="talla"
                        id="talla"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Card>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="eva">EVA</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.eva}
                      name="eva"
                      id="eva"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="haq">HAQ</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.haq}
                      name="haq"
                      id="haq"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <h5>¿Como se siente el Paciente?</h5>
                    <ButtonGroup>
                      <Button
                        color="secondary"
                        onClick={() => this.onRadioBtnClick("Sin dolor")}
                        active={this.state.rSelected === "Sin dolor"}
                      >
                        Sin dolor
                      </Button>
                      <Button
                        color="azul"
                        onClick={() => this.onRadioBtnClick("Dolor leve")}
                        active={this.state.rSelected === "Dolor leve"}
                      >
                        Dolor leve
                      </Button>
                      <Button
                        color="amarillo"
                        backgroundColor="#ffc107"
                        onClick={() => this.onRadioBtnClick("Dolor moderado")}
                        active={this.state.rSelected === "Dolor moderado"}
                      >
                        Dolor moderado
                      </Button>
                      <Button
                        color="verdes"
                        onClick={() => this.onRadioBtnClick("Dolor severo")}
                        active={this.state.rSelected}
                      >
                        Dolor severo
                      </Button>
                      <Button
                        color="celeste"
                        onClick={() => this.onRadioBtnClick("Dolor muy severo")}
                        active={this.state.rSelected}
                      >
                        Dolor muy severo
                      </Button>
                      <Button
                        color="rojo"
                        onClick={() => this.onRadioBtnClick("Máximo dolor")}
                        active={this.state.rSelected}
                      >
                        Máximo dolor
                      </Button>
                    </ButtonGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ marginBottom: 10 }}>
                <Col>
                  <FormGroup>
                    <h5>Datos para los Scores</h5>
                    <Row>
                      <Col>
                        <Card
                          style={{
                            textAlign: "center",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 10
                          }}
                        >
                          <Row style={{}}>
                            <Col>
                              <h6>NAD</h6>
                            </Col>
                            <Col>
                              <h6>NAT</h6>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className="contenedorPrincipal">
                                <img
                                  src={manito}
                                  width="500"
                                  height="300"
                                  alt=""
                                />
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customCheck"
                                  checked=""
                                />
                                <input
                                  class="custom-control-input"
                                  type="checkbox"
                                  className="checkBox1"
                                  name="checkNAD1"
                                  value={this.state.checksNAD.checkNAD1}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox2"
                                  name="checkNAD2"
                                  value={this.state.checksNAD.checkNAD2}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox3"
                                  name="checkNAD3"
                                  value={this.state.checksNAD.checkNAD3}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox4"
                                  name="checkNAD4"
                                  value={this.state.checksNAD.checkNAD4}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox5"
                                  name="checkNAD5"
                                  value={this.state.checksNAD.checkNAD5}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox6"
                                  name="checkNAD6"
                                  value={this.state.checksNAD.checkNAD6}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox7"
                                  name="checkNAD7"
                                  value={this.state.checksNAD.checkNAD7}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox8"
                                  name="checkNAD8"
                                  value={this.state.checksNAD.checkNAD8}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox9"
                                  name="checkNAD9"
                                  value={this.state.checksNAD.checkNAD9}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox10"
                                  name="checkNAD10"
                                  value={this.state.checksNAD.checkNAD10}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox11"
                                  name="checkNAD11"
                                  value={this.state.checksNAD.checkNAD11}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox12"
                                  name="checkNAD12"
                                  value={this.state.checksNAD.checkNAD12}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox13"
                                  name="checkNAD13"
                                  value={this.state.checksNAD.checkNAD13}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox14"
                                  name="checkNAD14"
                                  value={this.state.checksNAD.checkNAD14}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox15"
                                  name="checkNAD15"
                                  value={this.state.checksNAD.checkNAD15}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox16"
                                  name="checkNAD16"
                                  value={this.state.checksNAD.checkNA16}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox17"
                                  name="checkNAD17"
                                  value={this.state.checksNAD.checkNAD17}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox18"
                                  name="checkNAD18"
                                  value={this.state.checksNAD.checkNAD18}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox19"
                                  name="checkNAD19"
                                  value={this.state.checksNAD.checkNAD19}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox20"
                                  name="checkNAD20"
                                  value={this.state.checksNAD.checkNAD20}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox21"
                                  name="checkNAD21"
                                  value={this.state.checksNAD.checkNAD21}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox22"
                                  name="checkNAD22"
                                  value={this.state.checksNAD.checkNAD22}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox23"
                                  name="checkNAD23"
                                  value={this.state.checksNAD.checkNAD23}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox24"
                                  name="checkNAD24"
                                  value={this.state.checksNAD.checkNAD24}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox25"
                                  name="checkNAD25"
                                  value={this.state.checksNAD.checkNAD25}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox26"
                                  name="checkNAD26"
                                  value={this.state.checksNAD.checkNAD26}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox27"
                                  name="checkNAD27"
                                  value={this.state.checksNAD.checkNAD27}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox28"
                                  name="checkNAD28"
                                  value={this.state.checksNAD.checkNAD28}
                                  onChange={this.handleChange}
                                />
                              </div>
                            </Col>
                            <Col>
                              <div className="contenedorPrincipal">
                                <img
                                  src={manito}
                                  width="500"
                                  height="300"
                                  alt=""
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox1"
                                  name="checkNAT1"
                                  value={this.state.checksNAT.checkNAT1}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox2"
                                  name="checkNAT2"
                                  value={this.state.checksNAT.checkNAT2}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox3"
                                  name="checkNAT3"
                                  value={this.state.checksNAT.checkNAT3}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox4"
                                  name="checkNAT4"
                                  value={this.state.checksNAT.checkNAT4}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox5"
                                  name="checkNAT5"
                                  value={this.state.checksNAT.checkNAT5}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox6"
                                  name="checkNAT6"
                                  value={this.state.checksNAT.checkNAT6}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox7"
                                  name="checkNAT7"
                                  value={this.state.checksNAT.checkNAT7}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox8"
                                  name="checkNAT8"
                                  value={this.state.checksNAT.checkNAT8}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox9"
                                  name="checkNAT9"
                                  value={this.state.checksNAT.checkNAT9}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox10"
                                  name="checkNAT10"
                                  value={this.state.checksNAT.checkNAT10}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox11"
                                  name="checkNAT11"
                                  value={this.state.checksNAT.checkNAT11}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox12"
                                  name="checkNAT12"
                                  value={this.state.checksNAT.checkNAT12}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox13"
                                  name="checkNAT13"
                                  value={this.state.checksNAT.checkNAT13}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox14"
                                  name="checkNAT14"
                                  value={this.state.checksNAT.checkNAT14}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox15"
                                  name="checkNAT15"
                                  value={this.state.checksNAT.checkNAT15}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox16"
                                  name="checkNAT16"
                                  value={this.state.checksNAT.checkNA16}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox17"
                                  name="checkNAT17"
                                  value={this.state.checksNAT.checkNAT17}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox18"
                                  name="checkNAT18"
                                  value={this.state.checksNAT.checkNAT18}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox19"
                                  name="checkNAT19"
                                  value={this.state.checksNAT.checkNAT19}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox20"
                                  name="checkNAT20"
                                  value={this.state.checksNAT.checkNAT20}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox21"
                                  name="checkNAT21"
                                  value={this.state.checksNAT.checkNAT21}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox22"
                                  name="checkNAT22"
                                  value={this.state.checksNAT.checkNAT22}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox23"
                                  name="checkNAT23"
                                  value={this.state.checksNAT.checkNAT23}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox24"
                                  name="checkNAT24"
                                  value={this.state.checksNAT.checkNAT24}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox25"
                                  name="checkNAT25"
                                  value={this.state.checksNAT.checkNAT25}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox26"
                                  name="checkNAT26"
                                  value={this.state.checksNAT.checkNAT26}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox27"
                                  name="checkNAT27"
                                  value={this.state.checksNAT.checkNAT27}
                                  onChange={this.handleChange}
                                />
                                <input
                                  type="checkbox"
                                  className="checkBox28"
                                  name="checkNAT28"
                                  value={this.state.checksNAT.checkNAT28}
                                  onChange={this.handleChange}
                                />
                              </div>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ marginBottom: 20 }}>
                <Col>
                  <Card style={{ padding: 20 }}>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label>CRP</Label>

                          <InputNumber
                            postfix="mg/l"
                            max={100}
                            min={0}
                            onChange={value => this.setState({ crp: value })}
                            value={this.state.crp}
                            placeholder="0 - 100"
                            name="crp"
                            id="crp"
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label>VSG</Label>
                          <InputNumber
                            postfix="mm/h"
                            max={200}
                            min={0}
                            onChange={value => this.setState({ vsg: value })}
                            value={this.state.vsg}
                            placeholder="0 - 200"
                            name="vsg"
                            id="vsg"
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
                      <FormGroup>
                        <Col>Variables para CDAI y SDAI</Col>
                      </FormGroup>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label>VGP</Label>
                          <InputNumber
                            max={10}
                            min={0}
                            onChange={value => this.setState({ vgp1: value })}
                            value={this.state.vgp1}
                            placeholder="0 - 10"
                            name="vgp1"
                            id="vgp1"
                          />
                        </FormGroup>
                      </Col>

                      <Col>
                        <FormGroup>
                          <Label>VGM</Label>
                          <InputNumber
                            max={10}
                            min={0}
                            onChange={value => this.setState({ vgm1: value })}
                            value={this.state.vgm1}
                            placeholder="0 - 10"
                            name="vgm1"
                            id="vgm1"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Card>
                </Col>

                <Col>
                  <Card style={{ padding: 20 }}>
                    <Row>
                      <FormGroup>
                        <Col>Variables para DAS28-PCR y DAS28-VSG</Col>
                      </FormGroup>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label>VGM</Label>
                          <InputNumber
                            max={100}
                            min={0}
                            onChange={value => this.setState({ vgm2: value })}
                            value={this.state.vgm2}
                            placeholder="0 - 100"
                            name="vgm2"
                            id="vgm2"
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label>VGP</Label>
                          <InputNumber
                            max={100}
                            min={0}
                            onChange={value => this.setState({ vgp2: value })}
                            value={this.state.vgp2}
                            placeholder="0 - 100"
                            name="vgp2"
                            id="vgp2"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
              <Row style={{ marginBottom: 20 }}>
                <Col>
                  <Card style={{ padding: 20, textAlign: "center" }}>
                    <h4>CDAI</h4>
                    <h1
                      style={{
                        color: "blue"
                      }}
                    >
                      {this.state.cdai}
                    </h1>
                    <h3
                      style={{
                        color: "blue"
                      }}
                    >
                      {this.state.CDAI_RANGO}
                    </h3>
                  </Card>
                </Col>
                <Col>
                  <Card style={{ padding: 20, textAlign: "center" }}>
                    <h4>SDAI</h4>
                    <h1
                      style={{
                        color: "green"
                      }}
                    >
                      {this.state.sdai}
                    </h1>
                    <h3
                      style={{
                        color: "green"
                      }}
                    >
                      {this.state.SDAI_RANGO}
                    </h3>
                  </Card>
                </Col>
                <Col>
                  <Card style={{ padding: 20, textAlign: "center" }}>
                    <h4>DAS28-PCR</h4>
                    <h1
                      style={{
                        color: "orange"
                      }}
                    >
                      {this.state.das28pcr}
                    </h1>
                    <h3
                      style={{
                        color: "orange"
                      }}
                    >
                      {this.state.DAS28_PCR_RANGO}
                    </h3>
                  </Card>
                </Col>
                <Col>
                  <Card style={{ padding: 20, textAlign: "center" }}>
                    <h4>DAS28-VSG</h4>
                    <h1
                      style={{
                        color: "violet"
                      }}
                    >
                      {this.state.das28vsg}
                    </h1>
                    <h3
                      style={{
                        color: "violet"
                      }}
                    >
                      {this.state.DAS28_VSG_RANGO}
                    </h3>
                  </Card>
                </Col>
              </Row>

              <Row>
                <Col>
                  <FormGroup>
                    <Label for="plan">Plan</Label>
                    <Input
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.plan}
                      name="plan"
                      id="plan"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
        <Button
          onClick={this.handleAdd}
          color="primary"
          style={{ marginTop: 20 }}
        >
          Agregar
        </Button>
        <SweetAlert
          success
          onConfirm={this.alertConfirm}
          show={this.state.alertCreado}
        >
          Consulta agregada con éxito!
        </SweetAlert>
        {"      "}
        <Button
          type="button"
          color="calcularscore"
          onClick={this.calcularScores}
          style={{ marginTop: 20 }}
        >
          {" "}
          Calcular Scores
        </Button>
        {"      "}
        <Button
          onClick={this.props.history.goBack}
          appearance="primary"
          style={{ marginTop: 20 }}
        >
          Atras
        </Button>

        <Icon
          href="#"
          id="scroll"
          className="scroll"
          style={{ marginLeft: 700, color: "#07689F", background: "white" }}
          onClick={event => {
            event.preventDefault();
            this.scroll();
          }}
          icon="angle-double-up"
          size="4x"
        />
      </Container>
    );
  }
}

export default Consulta;
