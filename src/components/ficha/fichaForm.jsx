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
import { Modal, Alert } from "rsuite";
import axios from "axios";
import Joi from "joi-browser";
import { AutoComplete } from "primereact/autocomplete";
import BootstrapTable from "react-bootstrap-table-next";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import Fame from "./../fames/famesForm";
import Comorbilidad from "./../comorbilidades/comorForm";
import EventoCardiovascular from "./../eventocardiovascular/eventocardiovascularForm";
import Manifestaciones from "./../manifestaciones/manifestaciones";
import SweetAlert from "react-bootstrap-sweetalert";
import { withRouter } from "react-router-dom";

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 150,
      width: 2,
      borderleft: 1
    }}
  />
);

class Ficha extends Component {
  constructor() {
    super();
    this.state = {
      codFichaReturn: "", //necesitamos guardar el codconsulta que retorna
      //alert
      alertCreado: false,
      errores: {},
      visible: false,
      aviso: false,
      toggleFame: false,
      toggleComor: false,
      toggleEvento: false,
      toggleMani: false,
      //datos correspondientes al paciente
      datosFicha: {
        codusuario: null, //#código interno de usuario, para saber quién agrego la ficha
        nombres: "", //#nombres completos del paciente
        apellidos: "", //#apellidos completos del paciente
        tipodocumento: "Cédula de Identidad", //#tipo de documento
        nrodocumento: "", //#cédula de identidad del paciente
        sexo: "F", // #sexo del paciente
        fechainclusion: "", // #fecha de inclusión del paciente
        procedencia: "", //#procedencia del paciente
        nacionalidad: "Paraguayo/a", // #nacionalidad del paciente
        escolaridad: "Escolar Media", // #escolaridad del paciente
        diagnostico: "", //#diagnóstico inicial del paciente
        fechadiagnos: "", // #fecha del diagnostico
        fechanaci: "", //#fecha de nacimiento del paciente
        estadocivil: "Soltero/a", //#estado civil del paciente
        profesion: "", // #profesión del paciente
        telefono: "", // #número de teléfono del paciente
        codpatron: null, //#código interno único para anapatron, para saber que patron tiene asociada la ficha HA
        nhc: "", // #número de historial clínico, código externo de la ficha, por el cual se manejan los usuarios
        iniciosint: null, //#Fecha en el que el Paciente empezó a notar síntomas
        formainic: "Mono", //#Descripción de los síntomas del paciente
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
        tabnumero: null, //#Número  de paquetes que fuma/fumo por dia
        extabaq: false, //#Si fue fumador
        menarca: null, // #Edad de primera menstruación
        menopausia: null, // #Edad de menopausia
        edadvidasex: null, //#A los cuantos años comenzó a tener actividad sexual
        gestas: null, //#Cantidad de gestas
        partos: null, //#Cantidad de partos
        cesareas: null, //#Cantidad de Cesáreas
        abortos: null, //#Cantidad de abortos
        hisjospost: false, //#sí o no, tuvo hijos
        factorreuma_pos: "", //#factor reumatoide
        factorreuma_neg: "", //#factor reumatoide
        factorreuma_nivel: "", //#factor reumatoide
        acpa_pos: "", // #anticuerpos antipéptidos cíclicos citrulinados
        acpa_neg: "", // #anticuerpos antipéptidos cíclicos citrulinados
        acpa_nivel: "", // #anticuerpo antinuclear
        ana_pos: "", //ANA patron
        ana_neg: "", //ANA patron
        ana_patron: "", //ANA patron
        rxmanos: false, //#erecciones sí o no
        rxmanosfecha: null, //#la fecha que tuvo las erecciones ----------> wtf erecciones hei
        rxpies: false, //#erecciones sí o no
        rxpiesfecha: null //#la fecha que tuvo las erecciones
      },
      deshabilitar: false,
      deshabilitartaba: true,
      deshabilitarrxpies: true,
      deshabilitarrxmanos: true,
      suggestions: [],
      fameSelected: null,
      fame: "",
      fameDesde: "",
      fameHasta: "",
      famesList: [],
      famesListTable: [],
      famesListTableSelected: "",
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
          dataField: "famedesde",
          text: "Fecha Desde"
        },
        {
          dataField: "famehasta",
          text: "Fecha Hasta"
        }
      ],
      comorSelected: null,
      fechaDxComor: "",
      comorbilidad: "",
      comorList: [],
      comorListTable: [],
      comorListTableSelected: "",
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
      ],
      eventocardioSelected: null,
      eventocardio: "",
      eventList: [],
      eventListTable: [],
      eventListTableSelected: "",
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
      maniSelected: null,
      mani: "",
      maniList: [],
      maniListTable: [],
      maniListTableSelected: "",
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
      ]
    };
    this.schema = {
      nombres: Joi.string()
        .required()
        .label("Nombres no puede estar vacío"),
      apellidos: Joi.string()
        .required()
        .label("Apellidos no puede estar vacío"),
      nhc: Joi.number()
        .required()
        .label("NHC no puede estar vacío"),
      fechadiagnos: Joi.string()
        .required()
        .label("Fecha Diagnóstico no puede estar vacío"),
      fechainclusion: Joi.string()
        .required()
        .label("Fecha Inclusión no puede estar vacío"),
      diagnostico: Joi.string()
        .required()
        .label("Diagnostico no puede estar vacío"),
      nrodocumento: Joi.number()
        .required()
        .label("Nro de Documento no puede estar vacío"),
      fechanaci: Joi.string()
        .required()
        .label("Fecha de Nacimiento no puede estar vacío")
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleAddComor = this.handleAddComor.bind(this);
    this.onDismissVisivle = this.onDismissVisivle.bind(this);
    this.onDismissAviso = this.onDismissAviso.bind(this);
    this.validarCedula = this.validarCedula.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleFame = this.toggleFame.bind(this);
    this.toggleComor = this.toggleComor.bind(this);
    this.toggleEvento = this.toggleEvento.bind(this);
    this.toggleMani = this.toggleMani.bind(this);
    this.filterFame = this.filterFame.bind(this);
    this.filterComor = this.filterComor.bind(this);
    this.filterEvento = this.filterEvento.bind(this);
    this.filterMani = this.filterMani.bind(this);
    this.onSelectFame = this.onSelectFame.bind(this);
    this.onChangeFame = this.onChangeFame.bind(this);
    this.onSelectComor = this.onSelectComor.bind(this);
    this.onChangeComor = this.onChangeComor.bind(this);
    this.onSelectEventoCardio = this.onSelectEventoCardio.bind(this);
    this.onChangeEventoCardio = this.onChangeEventoCardio.bind(this);
    this.onSelectMani = this.onSelectMani.bind(this);
    this.onChangeMani = this.onChangeMani.bind(this);
    this.addFameToList = this.addFameToList.bind(this);
    this.addComorToList = this.addComorToList.bind(this);
    this.addEventToList = this.addEventToList.bind(this);
    this.addManiToList = this.addManiToList.bind(this);
    this.eliminarFame = this.eliminarFame.bind(this);
    this.eliminarMani = this.eliminarMani.bind(this);
    this.eliminarComor = this.eliminarComor.bind(this);
    this.eliminarEvento = this.eliminarEvento.bind(this);
    this.alertConfirm = this.alertConfirm.bind(this);
  }

  alertConfirm() {
    this.setState({ alertCreado: false });
    console.log(this.state.codFichaReturn);
    this.props.history.push(
      "/menu_ficha/" +
        this.state.codFichaReturn +
        "/ficha_view/" +
        this.state.codFichaReturn
    );
  }

  eliminarFame() {
    console.log(this.state.famesListTableSelected);
    let list = this.state.famesListTable;
    list.splice(this.state.famesListTableSelected, 1);
    this.setState({ famesListTable: list });
    console.log(list);
  }

  eliminarMani() {
    console.log(this.state.maniListTableSelected);
    let list = this.state.maniListTable;
    list.splice(this.state.maniListTableSelected, 1);
    this.setState({ maniListTable: list });
    console.log(list);
  }

  eliminarComor() {
    console.log(this.state.comorListTableSelected);
    let list = this.state.comorListTable;
    list.splice(this.state.comorListTableSelected, 1);
    this.setState({ comorListTable: list });
    console.log(list);
  }

  eliminarEvento() {
    console.log(this.state.eventListTableSelected);
    let list = this.state.eventListTable;
    list.splice(this.state.eventListTableSelected, 1);
    this.setState({ eventListTable: list });
    console.log(list);
  }

  componentDidMount() {
    this.getFameList();
    this.getComorList();
    this.getEventList();
    this.getManiList();
  }

  async getFameList() {
    const urlFame = "http://127.0.0.1:8000/api/fames/";
    let listaFame;
    await axios
      .get(urlFame)
      .then(function(response) {
        listaFame = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });

    this.setState({ famesList: listaFame });
  }

  async getComorList() {
    const urlComor = "http://127.0.0.1:8000/api/enfermedad/";
    let listaComor;
    await axios
      .get(urlComor)
      .then(function(response) {
        listaComor = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });

    this.setState({ comorList: listaComor });
  }

  async getEventList() {
    const urlEvent = "http://127.0.0.1:8000/api/eventocardio/";
    let listaEvent;
    await axios
      .get(urlEvent)
      .then(function(response) {
        listaEvent = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });

    this.setState({ eventList: listaEvent });
  }

  async getManiList() {
    const urlMani = "http://127.0.0.1:8000/api/manif_extra_art/";
    let listaMani;
    await axios
      .get(urlMani)
      .then(function(response) {
        listaMani = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });

    this.setState({ maniList: listaMani });
  }

  filterFame(event) {
    var results = this.state.famesList.filter(fame => {
      return fame.nombre.toLowerCase().startsWith(event.query.toLowerCase());
    });

    this.setState({ suggestions: results });
  }

  filterComor(event) {
    var results = this.state.comorList.filter(comor => {
      return comor.nombre.toLowerCase().startsWith(event.query.toLowerCase());
    });

    this.setState({ suggestions: results });
  }

  filterEvento(event) {
    var results = this.state.eventList.filter(evento => {
      return evento.nombre.toLowerCase().startsWith(event.query.toLowerCase());
    });

    this.setState({ suggestions: results });
  }

  filterMani(event) {
    var results = this.state.maniList.filter(mani => {
      return mani.nombre.toLowerCase().startsWith(event.query.toLowerCase());
    });

    this.setState({ suggestions: results });
  }

  async onSelectFame(e) {
    await this.setState({ fameSelected: e.value }, function() {
      console.log("console 1" + this.state.fameSelected);
    });
  }

  onChangeFame(e) {
    this.getFameList();
    this.setState({ fame: e.value });
  }

  async onSelectComor(e) {
    await this.setState({ comorSelected: e.value }, function() {
      console.log("console 1" + this.state.comorSelected);
    });
  }

  onChangeComor(e) {
    this.getComorList();
    this.setState({ comorbilidad: e.value });
  }

  async onSelectEventoCardio(e) {
    await this.setState({ eventocardioSelected: e.value }, function() {
      console.log("console 1" + this.state.eventocardioSelected);
    });
    console.log("console 2" + this.state.eventocardioSelected);
  }

  onChangeEventoCardio(e) {
    this.getEventList();
    this.setState({ eventocardio: e.value });
  }

  async onSelectMani(e) {
    await this.setState({ maniSelected: e.value }, function() {
      console.log("console 1" + this.state.maniSelected);
    });
    console.log("console 2" + this.state.maniSelected);
  }

  onChangeMani(e) {
    this.getManiList();
    this.setState({ mani: e.value });
  }

  addFameToList() {
    let fameList = this.state.famesListTable;
    if (this.state.fameSelected === null) {
      {
        Alert.warning("El Fame no puedo estar vacio", 10000);
        return;
      }
    } else {
      for (let index = 0; index < fameList.length; index++) {
        if (fameList[index].codfame === this.state.fameSelected.codfame) {
          Alert.warning("El Fame ya fue agregado", 3000);
          return;
        }
      }
      const fame = {
        codfame: this.state.fameSelected.codfame,
        nombre: this.state.fameSelected.nombre,
        descripcion: this.state.fameSelected.descripcion,
        famedesde: this.state.fameDesde,
        famehasta: this.state.fameHasta
      };
      fameList.push(fame);
      console.log(this.state.fameSelected);
      console.log("fame a ser agregado" + this.state.fameSelected.nombre);
      this.setState({ famesListTable: fameList, fameSelected: null, fame: "" });
    }
  }

  addComorToList() {
    console.log(this.state.comorSelected);
    let comorList = this.state.comorListTable;
    if (this.state.comorSelected === null) {
      {
        Alert.warning("El APF esta vacío", 5000);
        return;
      }
    } else {
      for (let index = 0; index < comorList.length; index++) {
        if (
          comorList[index].codenfermedad ===
          this.state.comorSelected.codenfermedad
        ) {
          Alert.warning("El APF ya fue agregado", 3000);
          return;
        }
      }
      const comorbilidad = {
        codenfermedad: this.state.comorSelected.codenfermedad,
        nombre: this.state.comorSelected.nombre,
        fechadiagnostico: this.state.fechaDxComor //*** si no es el mismo nombe de la ficha, no  paorque es de otro formulario luego
      };
      comorList.push(comorbilidad);
      console.log(
        "comorbilidad a ser agregado" +
          this.state.comorSelected.nombre +
          this.state.fechaDxComor
      );
      this.setState({
        comorListTable: comorList,
        comorSelected: null,
        comorbilidad: ""
      });
    }
  }

  addEventToList() {
    console.log(this.state.eventocardioSelected);
    let eventList = this.state.eventListTable;
    if (this.state.eventocardioSelected === null) {
      {
        Alert.warning("El Evento Cardiovasular esta vacío", 5000); //aca no esntra puse par aprobar nomas, pero esta bien osea tiene que ser {} nomas

        return;
      }
    } else {
      for (let index = 0; index < eventList.length; index++) {
        if (
          eventList[index].codeventocardio ===
          this.state.eventocardioSelected.codeventocardio
        ) {
          {
            Alert.warning("El Evento Cardiovasular ya fue agregado", 3000);

            return;
          }
        }
      }
      const eventocardio = {
        codeventocardio: this.state.eventocardioSelected.codeventocardio,
        nombre: this.state.eventocardioSelected.nombre
      };
      eventList.push(eventocardio);
      console.log(
        "fame a ser agregado" + this.state.eventocardioSelected.nombre
      );
      this.setState({
        eventListTable: eventList,
        eventocardioSelected: null,
        eventocardio: ""
      });
    }
  }

  addManiToList() {
    let maniList = this.state.maniListTable;
    if (this.state.maniSelected === null) {
      {
        Alert.warning("La Manifestación Articular esta vacía", 5000);
        return;
      }
    } else {
      for (let index = 0; index < maniList.length; index++) {
        if (maniList[index].codmanif === this.state.maniSelected.codmanif) {
          {
            Alert.warning("La Manifestación Articular ya fue agregada", 3000);
            return;
          }
        }
      }
      const mani = {
        codmanif: this.state.maniSelected.codmanif,
        nombre: this.state.maniSelected.nombre,
        descripcion: this.state.maniSelected.descripcion
      };
      maniList.push(mani);
      console.log("fame a ser agregado" + this.state.maniSelected.nombre);
      this.setState({ maniListTable: maniList, maniSelected: null, mani: "" });
    }
  }

  async validarCedula(e) {
    const url1 = "http://127.0.0.1:8000/api/ficha?nrodocumento=";
    let error = false;
    if (this.state.datosFicha.nrodocumento === "") {
      Alert.warning("El Nro de documento no puede estar vacío...", 5000);
      return !error;
    } else {
      await axios
        .get(url1 + this.state.datosFicha.nrodocumento)
        .then(function(response) {
          if (response.data.length > 0) {
            //aviso = true;
            Alert.warning(
              "El Nro de documento ya esta asociada a otra ficha...",
              5000
            );

            error = !error;
          } else {
            //aviso = false;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      return error;
    }
  }

  onDismissVisivle() {
    this.setState({ visible: !this.state.visible });
  }
  onDismissAviso() {
    //this.setState({ aviso: !this.state.visible });
  }

  handleChange(e) {
    const target = e.target;
    let fields = this.state.datosFicha;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    fields[name] = value;

    this.setState({
      datosFicha: fields
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
      this.setState({ deshabilitartaba: !this.state.deshabilitartaba });
    } else if ((name === "tabaquismo") & (value === false)) {
      this.setState({
        deshabilitartaba: !this.state.deshabilitartaba,
        tabaqfecha: "",
        tabnumero: ""
      });
    }

    if ((name === "rxpies") & (value === true)) {
      this.setState({ deshabilitarrxpies: !this.state.deshabilitarrxpies });
    } else if ((name === "rxpies") & (value === false)) {
      this.setState({
        deshabilitarrxpies: !this.state.deshabilitarrxpies,
        rxpiesfecha: ""
      });
    }

    if ((name === "rxmanos") & (value === true)) {
      this.setState({ deshabilitarrxmanos: !this.state.deshabilitarrxmanos });
    } else if ((name === "rxmanos") & (value === false)) {
      this.setState({
        deshabilitarrxmanos: !this.state.deshabilitarrxmanos,
        rxmanosfecha: ""
      });
    }
  }

  validar = () => {
    const result = Joi.validate(
      {
        nombres: this.state.datosFicha.nombres,
        apellidos: this.state.datosFicha.apellidos,
        nhc: this.state.datosFicha.nhc,
        fechadiagnos: this.state.datosFicha.fechadiagnos,
        fechainclusion: this.state.datosFicha.fechainclusion,
        diagnostico: this.state.datosFicha.diagnostico,
        nrodocumento: this.state.datosFicha.nrodocumento,
        fechanaci: this.state.datosFicha.fechanaci
      },
      this.schema,
      {
        abortEarly: false
      }
    );

    if (!result.error) return null;

    console.log(result);
    const errors = {};
    for (let item of result.error.details)
      errors[item.path[0]] = item.context.label;
    return errors;
  };

  async handleSubmit() {
    const errors = this.validar();
    const validarCedula = await this.validarCedula();
    this.setState({ errores: errors || {} });
    if (validarCedula) {
      console.log("no pasa la validacion de cedula   " + validarCedula);
      return;
    }
    if (errors) {
      console.log("no pasa la validacion de los campos");
      return;
    }
    this.handleAdd();
  }

  async handleAdd() {
    const ficha = this.state.datosFicha;
    let codficha;
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
        if (response.codficha !== undefined && response.codficha !== null) {
          codficha = response.codficha;
          console.log(response);
          this.setState({ alertCreado: true, codFichaReturn: codficha });
          // Alert.success("La ficha fue cargada con éxito!", 10000);
        }
      });

    this.handleAddComor(codficha);
    this.handleAddEvento(codficha);
    this.handleAddMani(codficha);
    this.handleAddFame(codficha);

    this.setState({ visible: !this.state.visible });
  }

  async handleAddComor(codficha) {
    const list = this.state.comorListTable;
    for (let item = 0; item < list.length; item++) {
      let comor = {
        codficha: codficha,
        codenfermedad: list[item].codenfermedad,
        fechadiagnostico: list[item].fechadiagnostico
      };

      await fetch("http://127.0.0.1:8000/api/comorbilidad/", {
        method: "POST", // or 'PUT'
        body: JSON.stringify(comor), // data can be `string` or {object}!
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

  async handleAddEvento(codficha) {
    console.log(
      "se imprime la lista de eventos a cargar" + this.state.eventListTable
    );
    const list = this.state.eventListTable;

    for (let item = 0; item < list.length; item++) {
      let evento = {
        codficha: codficha,
        codeventocardio: list[item].codeventocardio
      };

      await fetch("http://127.0.0.1:8000/api/eventocardio_ficha/", {
        method: "POST", // or 'PUT'
        body: JSON.stringify(evento), // data can be `string` or {object}!
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

  async handleAddFame(codficha) {
    const list = this.state.famesListTable;

    for (let item = 0; item < list.length; item++) {
      let fame = {
        codficha: codficha,
        codfame: list[item].codfame,
        fechadesde: list[item].famedesde,
        fechahasta: list[item].famehasta
      };

      await fetch("http://127.0.0.1:8000/api/famesficha/", {
        method: "POST", // or 'PUT'
        body: JSON.stringify(fame), // data can be `string` or {object}!
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

  async handleAddMani(codficha) {
    const list = this.state.maniListTable;

    for (let item = 0; item < list.length; item++) {
      let mani = {
        codficha: codficha,
        codmanif: list[item].codmanif
      };

      await fetch("http://127.0.0.1:8000/api/manif/", {
        method: "POST", // or 'PUT'
        body: JSON.stringify(mani), // data can be `string` or {object}!
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

  //aca vamos a hacer la funcion del toggle, osea que va a mostrat y esconder

  toggleFame() {
    this.setState({
      toggleFame: !this.state.toggleFame
    });
  }

  toggleComor() {
    this.setState({
      toggleComor: !this.state.toggleComor
    });
  }

  toggleEvento() {
    this.setState({
      toggleEvento: !this.state.toggleEvento
    });
  }

  toggleMani() {
    this.setState({
      toggleMani: !this.state.toggleMani
    });
  }

  // When the user clicks on the button, scroll to the top of the document
  topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  render() {
    return (
      <Container>
        <Form>
          <Card style={{ backgroundColor: "#F9FCFB" }}>
            <CardHeader style={{ backgroundColor: "#07689F" }}>
              <h2 style={{ backgroundColor: "#07689F", color: "#FFFFFF" }}>
                Datos Personales
              </h2>
            </CardHeader>

            <CardBody>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="nombres">Nombres</Label>
                    <Input
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.datosFicha.nombres}
                      name="nombres"
                      id="nombres"
                    />
                    <Label style={{ color: "red", fontSize: 12 }}>
                      {this.state.errores.nombres}
                    </Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="apellidos">Apellidos</Label>
                    <Input
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.datosFicha.apellidos}
                      name="apellidos"
                      id="apellidos"
                    />
                    <Label style={{ color: "red", fontSize: 12 }}>
                      {this.state.errores.apellidos}
                    </Label>
                  </FormGroup>
                </Col>

                <Col>
                  <FormGroup>
                    <Label for="nhc">NHC</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.datosFicha.nhc}
                      name="nhc"
                      id="nhc"
                    />
                    <Label style={{ color: "red", fontSize: 12 }}>
                      {this.state.errores.nhc}
                    </Label>
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
                      value={this.state.datosFicha.fechainclusion}
                      name="fechainclusion"
                      id="fechainclusion"
                    />
                    <Label style={{ color: "red", fontSize: 12 }}>
                      {this.state.errores.fechainclusion}
                    </Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="tipodocumento">Tipo Documento</Label>
                    <Input
                      type="select"
                      onChange={this.handleChange}
                      value={this.state.datosFicha.tipodocumento}
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
                      onChange={this.handleChange}
                      value={this.state.datosFicha.nrodocumento}
                      name="nrodocumento"
                      id="nrodocumento"
                    />
                    <Label style={{ color: "red", fontSize: 12 }}>
                      {this.state.errores.nrodocumento}
                    </Label>
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
                      value={this.state.datosFicha.procedencia}
                      name="procedencia"
                      id="procedencia"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="fechanaci">Fecha de Nacimiento</Label>
                    <Input
                      type="date"
                      onChange={this.handleChange}
                      value={this.state.datosFicha.fechanaci}
                      name="fechanaci"
                      id="fechanaci"
                    />
                    <Label style={{ color: "red", fontSize: 12 }}>
                      {this.state.errores.fechanaci}
                    </Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="telefono">Teléfono</Label>
                    <Input
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.datosFicha.telefono}
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
                      type="select"
                      onChange={this.handleChange}
                      value={this.state.datosFicha.nacionalidad}
                      name="nacionalidad"
                      id="nacionalidad"
                    >
                      <option>Paraguaya/o</option>
                      <option>Argentina/o</option>
                      <option>Brasilero/a</option>
                      <option>Otro</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="estadocivil">Estado Civil</Label>
                    <Input
                      type="select"
                      onChange={this.handleChange}
                      value={this.state.datosFicha.estadocivil}
                      name="estadocivil"
                      id="estadocivil"
                    >
                      <option>Soltero/a</option>
                      <option>Casado/a</option>
                      <option>Viudo/a</option>
                      <option>Unido/a</option>
                      <option>Separado/a</option>
                      <option>Divorciado/a</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="sexo">Sexo</Label>
                    <Input
                      type="select"
                      name="sexo"
                      onChange={this.handleChange}
                      value={this.state.datosFicha.sexo}
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
                      type="select"
                      onChange={this.handleChange}
                      value={this.state.datosFicha.escolaridad}
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
                      value={this.state.datosFicha.profesion}
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
                      value={this.state.datosFicha.diagnostico}
                      name="diagnostico"
                      id="diagnostico"
                    />
                    <Label style={{ color: "red", fontSize: 12 }}>
                      {this.state.errores.diagnostico}
                    </Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="fechadiagnos">Fecha de Dx</Label>
                    <Input
                      type="date"
                      onChange={this.handleChange}
                      value={this.state.datosFicha.fechadiagnos}
                      name="fechadiagnos"
                      id="fechadiagnos"
                    />
                    <Label style={{ color: "red", fontSize: 12 }}>
                      {this.state.errores.fechadiagnos}
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <hr />

          <Card style={{ backgroundColor: "#F9FCFB" }}>
            <CardHeader style={{ backgroundColor: "#07689F" }}>
              <h2 style={{ backgroundColor: "#07689F", color: "#FFFFFF" }}>
                Ficha Epidemiológica
              </h2>
            </CardHeader>

            <CardBody>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="iniciosint">Fecha Inicio de los Síntomas</Label>
                    <Input
                      type="date"
                      onChange={this.handleChange}
                      value={this.state.datosFicha.iniciosint}
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
                      value={this.state.datosFicha.formainic}
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
                      value={this.state.datosFicha.apf}
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
                      value={this.state.datosFicha.apfcv}
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
                      value={this.state.datosFicha.appfractura}
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
                      value={this.state.datosFicha.apffractura}
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
                      value={this.state.datosFicha.protesissitio}
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
                      value={this.state.datosFicha.protefecha}
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
                      value={this.state.datosFicha.apfneoplasias}
                      name="apfneoplasias"
                      id="apfneoplasias"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row style={{ marginBottom: 20 }}>
                <Col xs="6">
                  <h5>Eventos Cardiovasculares</h5>
                  <Card style={{ padding: 10 }}>
                    <Row style={{ marginBottom: 10 }}>
                      <Col>
                        <AutoComplete
                          value={this.state.eventocardio}
                          suggestions={this.state.suggestions}
                          completeMethod={this.filterEvento}
                          field="nombre"
                          size={35}
                          placeholder="Evento Cardiovascular"
                          minLength={1}
                          onChange={this.onChangeEventoCardio}
                          onSelect={this.onSelectEventoCardio}
                        />

                        <Button
                          color="primary"
                          onClick={this.addEventToList}
                          style={{ marginLeft: 5 }}
                        >
                          Agregar
                        </Button>
                        <Button
                          color="success"
                          onClick={this.toggleEvento}
                          style={{ marginLeft: 5 }}
                        >
                          Nuevo
                        </Button>
                      </Col>
                      <Modal
                        show={this.state.toggleEvento}
                        onHide={this.toggleEvento}
                      >
                        <Modal.Body>
                          <EventoCardiovascular />
                        </Modal.Body>
                      </Modal>
                    </Row>
                    <Row>
                      <Col>
                        <BootstrapTable
                          keyField="codeventocardio"
                          data={this.state.eventListTable}
                          columns={this.state.columnsEvent}
                          selectRow={{
                            mode: "radio",
                            clickToSelect: true,
                            onSelect: (row, isSelect, rowIndex, e) => {
                              console.log("row.id" + row.codeventocardio);
                              console.log("isSelect" + isSelect);
                              console.log("rowIndex" + rowIndex);
                              this.setState({
                                eventListTableSelected: rowIndex
                              });
                            }
                          }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button color="danger" onClick={this.eliminarEvento}>
                          Eliminar
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>

                <Col xs="6">
                  <h5>Manifestaciones Extra Articulares</h5>
                  <Card style={{ padding: 10 }}>
                    <Row style={{ marginBottom: 10 }}>
                      <Col>
                        <AutoComplete
                          value={this.state.mani}
                          suggestions={this.state.suggestions}
                          completeMethod={this.filterMani}
                          field="nombre"
                          size={35}
                          placeholder="Manifestación Extra Articular"
                          minLength={1}
                          onChange={this.onChangeMani}
                          onSelect={this.onSelectMani}
                        />

                        <Button
                          color="primary"
                          onClick={this.addManiToList}
                          style={{ marginLeft: 5 }}
                        >
                          Agregar
                        </Button>
                        <Button
                          color="success"
                          onClick={this.toggleMani}
                          style={{ marginLeft: 5 }}
                        >
                          Nuevo
                        </Button>
                      </Col>
                      <Modal
                        show={this.state.toggleMani}
                        onHide={this.toggleMani}
                      >
                        <Modal.Body>
                          <Manifestaciones />
                        </Modal.Body>
                      </Modal>
                    </Row>
                    <Row>
                      <Col>
                        <BootstrapTable
                          keyField="codmanif"
                          data={this.state.maniListTable}
                          columns={this.state.columnsMani}
                          selectRow={{
                            mode: "radio",
                            clickToSelect: true,
                            onSelect: (row, isSelect, rowIndex, e) => {
                              console.log("row.id" + row.codmanif);
                              console.log("isSelect" + isSelect);
                              console.log("rowIndex" + rowIndex);
                              this.setState({
                                maniListTableSelected: rowIndex
                              });
                            }
                          }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button color="danger" onClick={this.eliminarMani}>
                          Eliminar
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
              <Row style={{ marginBottom: 20 }}>
                <Col>
                  <h5>APF-Comorbilidades</h5>
                  <Card style={{ padding: 10 }}>
                    <Row style={{ marginBottom: 10 }}>
                      <Col>
                        <AutoComplete
                          value={this.state.comorbilidad}
                          suggestions={this.state.suggestions}
                          completeMethod={this.filterComor}
                          field="nombre"
                          size={35}
                          placeholder="Comorbilidad"
                          minLength={1}
                          onChange={this.onChangeComor}
                          onSelect={this.onSelectComor}
                        />
                      </Col>
                      <Col>
                        <Input
                          type="date"
                          onChange={e => {
                            this.setState({ fechaDxComor: e.target.value });
                          }}
                          value={this.state.fechaDxComor}
                          name="fechaDxComor"
                          id="fechaDxComor"
                        />
                      </Col>
                      <Col>
                        <Button
                          color="primary"
                          onClick={this.addComorToList}
                          style={{ marginLeft: 5 }}
                        >
                          Agregar
                        </Button>
                        <Button
                          color="success"
                          onClick={this.toggleComor}
                          style={{ marginLeft: 5 }}
                        >
                          Nuevo
                        </Button>
                      </Col>
                      <Modal
                        show={this.state.toggleComor}
                        onHide={this.toggleComor}
                      >
                        <Modal.Body>
                          <Comorbilidad />
                        </Modal.Body>
                      </Modal>
                    </Row>
                    <Row>
                      <Col>
                        <BootstrapTable
                          keyField="codenfermedad"
                          data={this.state.comorListTable}
                          columns={this.state.columnsComor}
                          selectRow={{
                            mode: "radio",
                            clickToSelect: true,
                            onSelect: (row, isSelect, rowIndex, e) => {
                              console.log("row.id" + row.codenfermedad);
                              console.log("isSelect" + isSelect);
                              console.log("rowIndex" + rowIndex);
                              this.setState({
                                comorListTableSelected: rowIndex
                              });
                            }
                          }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button color="danger" onClick={this.eliminarComor}>
                          Eliminar
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>

              <Row style={{ marginBottom: 20, marginTop: 20 }}>
                <Col>
                  <h5>Fames</h5>
                  <Card style={{ padding: 10 }}>
                    <Row style={{ marginBottom: 10 }}>
                      <Col>
                        <Label>Fármaco</Label>
                        <AutoComplete
                          value={this.state.fame}
                          suggestions={this.state.suggestions}
                          completeMethod={this.filterFame}
                          field="nombre"
                          size={25}
                          placeholder="Fames"
                          minLength={1}
                          onChange={this.onChangeFame}
                          onSelect={this.onSelectFame}
                        />
                      </Col>
                      <Col>
                        <Label>Desde</Label>
                        <Input
                          type="date"
                          onChange={e => {
                            this.setState({ fameDesde: e.target.value });
                          }}
                          value={this.state.fameDesde}
                          name="fameDesde"
                          id="fameDesde"
                          style={{ width: 180 }}
                        />
                      </Col>
                      <Col>
                        <Label>Hasta</Label>
                        <Input
                          type="date"
                          style={{ width: 180 }}
                          onChange={e => {
                            this.setState({ fameHasta: e.target.value });
                          }}
                          value={this.state.fameHasta}
                          name="fameHasta"
                          id="fameHasta"
                        />
                      </Col>
                      <Col>
                        <Button
                          color="primary"
                          onClick={this.addFameToList}
                          style={{ margin: 5 }}
                        >
                          Agregar
                        </Button>
                        <Button
                          color="success"
                          onClick={this.toggleFame}
                          style={{ margin: 5 }}
                        >
                          Nuevo
                        </Button>
                      </Col>
                      <Modal
                        show={this.state.toggleFame}
                        onHide={this.toggleFame}
                      >
                        <Modal.Body>
                          <Fame />
                        </Modal.Body>
                      </Modal>
                    </Row>
                    <Row>
                      <Col>
                        <BootstrapTable
                          keyField="codfame"
                          data={this.state.famesListTable}
                          columns={this.state.columnsFames}
                          selectRow={{
                            mode: "radio",
                            clickToSelect: true,
                            onSelect: (row, isSelect, rowIndex, e) => {
                              console.log("row.id" + row.codfame);
                              console.log("isSelect" + isSelect);
                              console.log("rowIndex" + rowIndex);
                              this.setState({
                                famesListTableSelected: rowIndex
                              });
                            }
                          }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button color="danger" onClick={this.eliminarFame}>
                          Eliminar
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
              <Row style={{ marginBottom: 20 }}>
                <Card style={{ padding: 20, marginLeft: 20 }}>
                  <Row>
                    <Col>
                      <FormGroup check>
                        <Input
                          type="checkbox"
                          onChange={this.handleChange}
                          value={this.state.datosFicha.sedentarismo}
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
                          value={this.state.datosFicha.actifisica}
                          name="actifisica"
                          id="actifisica"
                        />
                        <Label check>Actividad Física</Label>
                      </FormGroup>
                    </Col>
                  </Row>
                </Card>

                <Col>
                  <Card style={{ padding: 20 }}>
                    <Row>
                      <Col>
                        <FormGroup check>
                          <Input
                            type="checkbox"
                            onChange={this.handleChange}
                            value={this.state.datosFicha.extabaq}
                            name="extabaq"
                            id="extabaq"
                          />
                          <Label check>Ex Tabaquista</Label>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup check>
                          <Input
                            type="checkbox"
                            onChange={this.handleChange}
                            value={this.state.datosFicha.tabaquismo}
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
                            value={this.state.datosFicha.tabaqfecha}
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
                            value={this.state.datosFicha.tabnumero}
                            name="tabnumero"
                            id="tabnumero"
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
                            value={this.state.datosFicha.menarca}
                            name="menarca"
                            id="menarca"
                          />
                        </FormGroup>
                      </Col>

                      <Col>
                        <FormGroup>
                          <Label for="menopausia">Menopausia</Label>
                          <Input
                            disabled={this.state.deshabilitar}
                            type="number"
                            onChange={this.handleChange}
                            value={this.state.datosFicha.menopausia}
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
                            value={this.state.datosFicha.edadvidasex}
                            name="edadvidasex"
                            id="edadvidasex"
                          />
                        </FormGroup>
                      </Col>

                      <Col>
                        <FormGroup check>
                          <Input
                            disabled={this.state.deshabilitar}
                            type="checkbox"
                            onChange={this.handleChange}
                            value={this.state.datosFicha.hisjospost}
                            name="hisjospost"
                            id="hisjospost"
                          />
                          <Label check>
                            Hijos después del diagnóstico de AR
                          </Label>
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
                            value={this.state.datosFicha.gestas}
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
                            value={this.state.datosFicha.partos}
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
                            value={this.state.datosFicha.cesareas}
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
                            value={this.state.datosFicha.abortos}
                            name="abortos"
                            id="abortos"
                          />
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
                      <Col style={{ paddingLeft: 40 }}>
                        <FormGroup>
                          <Input
                            type="checkbox"
                            onChange={this.handleChange}
                            value={this.state.datosFicha.factorreuma_pos}
                            name="factorreuma_pos"
                            id="factorreuma_pos"
                          />
                          <Label for="factorreuma_pos">FR (+)</Label>
                        </FormGroup>
                      </Col>
                      <Col style={{ paddingLeft: 40 }}>
                        <FormGroup>
                          <Input
                            type="checkbox"
                            onChange={this.handleChange}
                            value={this.state.datosFicha.factorreuma_neg}
                            name="factorreuma_neg"
                            id="factorreuma_neg"
                          />
                          <Label for="factorreuma_neg">FR (-)</Label>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Label for="factorreuma_valor">Valor</Label>
                        <Input
                          type="text"
                          onChange={this.handleChange}
                          value={this.state.datosFicha.factorreuma_nivel}
                          name="factorreuma_valor"
                          id="factorreuma_valor"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Label for="factorreuma_nivel">Nivel/VR</Label>
                        <Input
                          type="text"
                          onChange={this.handleChange}
                          value={this.state.datosFicha.factorreuma_nivel}
                          name="factorreuma_nivel"
                          id="factorreuma_nivel"
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>

                <Col>
                  <Card
                    style={{
                      padding: 20,
                      marginLeft: 20,
                      marginRight: 20
                    }}
                  >
                    <Row>
                      <Col style={{ paddingLeft: 40 }}>
                        <FormGroup>
                          <Input
                            type="checkbox"
                            onChange={this.handleChange}
                            value={this.state.datosFicha.acpa_pos}
                            name="acpa_pos"
                            id="acpa_pos"
                          />
                          <Label for="acpa_pos">ACPA (+)</Label>
                        </FormGroup>
                      </Col>
                      <Col style={{ paddingLeft: 40 }}>
                        <FormGroup>
                          <Input
                            type="checkbox"
                            onChange={this.handleChange}
                            value={this.state.datosFicha.acpa_neg}
                            name="acpa_neg"
                            id="acpa_neg"
                          />{" "}
                          <Label for="acpa_neg">ACPA (-)</Label>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Label for="acpa_valor">Valor</Label>
                        <Input
                          type="text"
                          onChange={this.handleChange}
                          value={this.state.datosFicha.acpa_nivel}
                          name="acpa_valor"
                          id="acpa_valor"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Label for="acpa_nivel">Nivel/VR</Label>
                        <Input
                          type="text"
                          onChange={this.handleChange}
                          value={this.state.datosFicha.acpa_nivel}
                          name="acpa_nivel"
                          id="acpa_nivel"
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>

                <Col>
                  <Card style={{ padding: 20, marginBottom: 20 }}>
                    <Row>
                      <Col style={{ paddingLeft: 40 }}>
                        <FormGroup>
                          <Input
                            type="checkbox"
                            onChange={this.handleChange}
                            value={this.state.datosFicha.ana_pos}
                            name="ana_pos"
                            id="ana_pos"
                          />
                          <Label for="ana_pos">ANA (+)</Label>
                        </FormGroup>
                      </Col>
                      <Col style={{ paddingLeft: 40 }}>
                        <FormGroup>
                          <Input
                            type="checkbox"
                            onChange={this.handleChange}
                            value={this.state.datosFicha.ana_neg}
                            name="ana_neg"
                            id="ana_neg"
                          />
                          <Label for="ana_pos">ANA (+)</Label>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Label for="ana_patron">Valor</Label>
                        <Input
                          type="text"
                          onChange={this.handleChange}
                          value={this.state.datosFicha.ana_valor}
                          name="ana_patron"
                          id="ana_patron"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Label for="ana_patron">Dilución/Patrón</Label>
                        <Input
                          type="select"
                          onChange={this.handleChange}
                          value={this.state.datosFicha.ana_patron}
                          name="ana_patron"
                          id="ana_patron"
                        >
                          <option>Nuclear Homogéneo</option>
                          <option>Nuclear Moteado o Puntillado Fino</option>
                          <option>Nuclear Moteado Grueso</option>
                          <option>Nucleolar</option>
                          <option>Centromérico</option>
                        </Input>
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
                          <Input
                            type="checkbox"
                            onChange={this.handleChange}
                            value={this.state.datosFicha.rxmanos}
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
                            disabled={this.state.deshabilitarrxmanos}
                            type="date"
                            onChange={this.handleChange}
                            value={this.state.datosFicha.rxmanosfecha}
                            name="rxmanosfecha"
                            id="rxmanosfecha"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label for="desrxmanos">Descripcion</Label>
                          <Input
                            disabled={this.state.deshabilitarrxmanos}
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.datosFicha.desrxmanos}
                            name="desrxmanos"
                            id="desrxmanos"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col>
                  <Card style={{ padding: 20 }}>
                    <Row>
                      <Col>
                        <FormGroup check>
                          <Input
                            type="checkbox"
                            onChange={this.handleChange}
                            value={this.state.datosFicha.rxpies}
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
                            disabled={this.state.deshabilitarrxpies}
                            type="date"
                            onChange={this.handleChange}
                            value={this.state.datosFicha.rxpiesfecha}
                            name="rxpiesfecha"
                            id="rxpiesfecha"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label for="desrxpies">Descripcion</Label>
                          <Input
                            disabled={this.state.deshabilitarrxpies}
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.datosFicha.desrxpies}
                            name="desrxpies"
                            id="desrxpies"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Button
            onClick={this.handleSubmit}
            color="primary"
            style={{ marginTop: 20 }}
          >
            Crear
          </Button>
          <SweetAlert
            success
            onConfirm={this.alertConfirm}
            show={this.state.alertCreado}
          >
            Ficha HA agregada con éxito!
          </SweetAlert>
        </Form>
      </Container>
    );
  }
}

export default withRouter(Ficha);
