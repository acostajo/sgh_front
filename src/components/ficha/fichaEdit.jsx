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
import Joi from "joi-browser";
import { Modal, Alert } from "rsuite";
import axios from "axios";
import { AutoComplete } from "primereact/autocomplete";
import BootstrapTable from "react-bootstrap-table-next";
import Fame from "./../fames/famesForm";
import Comorbilidad from "./../comorbilidades/comorForm";
import EventoCardiovascular from "./../eventocardiovascular/eventocardiovascularForm";
import Manifestaciones from "./../manifestaciones/manifestaciones";
import SweetAlert from "react-bootstrap-sweetalert";
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

class FichaEdit extends Component {
  constructor() {
    super();
    this.state = {
      errores: {},
      codFichaReturn: "", //necesitamos guardar el codconsulta que retorna
      //alert
      alertCreado: false,
      ///
      toggleFame: false,
      toggleComor: false,
      toggleEvento: false,
      toggleMani: false,
      //rxmanos: true,
      aviso: false,
      visible: false,
      nroDocOriginal: 0,
      //datos correspondientes al paciente
      datosFicha: {},
      deshabilitar: false,
      deshabilitartaba: true,
      deshabilitarrxpies: true,
      deshabilitarrxmanos: true,

      eventocardioSelected: "",
      eventocardio: "",
      eventList: [],
      eventListTable: [],
      eventListTableNew: [],
      eventListTableSelected: "",
      eventListDelete: [],
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
      maniSelected: "",
      mani: "",
      maniList: [],
      maniListTable: [],
      maniListTableNew: [],
      maniListTableSelected: "",
      maniListDelete: [],
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
      comorSelected: "",
      fechaDxComor: "",
      comorbilidad: "",
      comorList: [],
      comorListTable: [],
      comorListTableNew: [],
      comorListTableSelected: "",
      comorListDelete: [],
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
      fameSelected: "",
      fame: "",
      fameDesde: "",
      fameHasta: "",
      famesList: [],
      famesListTable: [],
      famesListTableNew: [],
      famesListTableSelected: "",
      famesListDelete: [],
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
          dataField: "fechadesde",
          text: "Fecha Desde"
        },
        {
          dataField: "fechahasta",
          text: "Fecha Hasta"
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
        .label("Fecha Diagnostico no puede estar vacío"),
      fechainclusion: Joi.string()
        .required()
        .label("Fecha Inclusion no puede estar vacío"),
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
    this.handleUpdate = this.handleUpdate.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onDismissVisivle = this.onDismissVisivle.bind(this);
    this.onDismissAviso = this.onDismissAviso.bind(this);
    this.validarCedula = this.validarCedula.bind(this);
    this.toggleFame = this.toggleFame.bind(this);
    this.toggleComor = this.toggleComor.bind(this);
    this.toggleEvento = this.toggleEvento.bind(this);
    this.toggleMani = this.toggleMani.bind(this);
    this.filterEvento = this.filterEvento.bind(this);
    this.filterMani = this.filterMani.bind(this);
    this.filterFame = this.filterFame.bind(this);
    this.filterComor = this.filterComor.bind(this);
    this.eliminarEvento = this.eliminarEvento.bind(this);
    this.eliminarMani = this.eliminarMani.bind(this);
    this.eliminarFame = this.eliminarFame.bind(this);
    this.eliminarComor = this.eliminarComor.bind(this);
    this.onSelectEventoCardio = this.onSelectEventoCardio.bind(this);
    this.onChangeEventoCardio = this.onChangeEventoCardio.bind(this);
    this.onSelectMani = this.onSelectMani.bind(this);
    this.onChangeMani = this.onChangeMani.bind(this);
    this.onSelectFame = this.onSelectFame.bind(this);
    this.onChangeFame = this.onChangeFame.bind(this);
    this.onSelectComor = this.onSelectComor.bind(this);
    this.onChangeComor = this.onChangeComor.bind(this);
    this.addEventToList = this.addEventToList.bind(this);
    this.addManiToList = this.addManiToList.bind(this);
    this.addFameToList = this.addFameToList.bind(this);
    this.addComorToList = this.addComorToList.bind(this);
    this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
    this.handleDeleteMani = this.handleDeleteMani.bind(this);
    this.handleDeleteFame = this.handleDeleteFame.bind(this);
    this.handleDeleteComor = this.handleDeleteComor.bind(this);
    this.alertConfirm = this.alertConfirm.bind(this);
    this.formatDate = this.formatDate.bind(this);
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

  eliminarEvento() {
    let list = this.state.eventListTable;
    let deleteList = this.state.eventListDelete;
    //en esta parte antes de eliminar de l alista el evento metemos primero en el eventListDelete para usar despues en a la hora de eliminar en la base
    deleteList.push(
      this.state.eventListTable[this.state.eventListTableSelected]
    );
    list.splice(this.state.eventListTableSelected, 1);
    this.setState({ eventListTable: list, eventListDelete: deleteList });
    console.log(deleteList);
  }

  eliminarMani() {
    let list = this.state.maniListTable;
    let deleteListm = this.state.maniListDelete;
    deleteListm.push(
      this.state.maniListTable[this.state.maniListTableSelected]
    );

    list.splice(this.state.maniListTableSelected, 1);
    this.setState({ maniListTable: list, maniListDelete: deleteListm });
    console.log(deleteListm);
  }

  eliminarFame() {
    let list = this.state.famesListTable;
    let deleteListf = this.state.famesListDelete;
    deleteListf.push(
      this.state.famesListTable[this.state.famesListTableSelected]
    );

    list.splice(this.state.famesListTableSelected, 1);
    this.setState({ famesListTable: list, famesListDelete: deleteListf });
    console.log(deleteListf);
  }

  eliminarComor() {
    let list = this.state.comorListTable;
    let deleteListc = this.state.comorListDelete;
    deleteListc.push(
      this.state.comorListTable[this.state.comorListTableSelected]
    );
    list.splice(this.state.comorListTableSelected, 1);
    this.setState({ comorListTable: list, comorListDelete: deleteListc });
    console.log(deleteListc);
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
    console.log(listaEvent);

    this.setState({ eventList: listaEvent });
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
    await this.setState({ comorSelected: e.value });
    console.log("comorSelected" + this.state.comorSelected);
  }

  onChangeComor(e) {
    this.getComorList();
    this.setState({ comorbilidad: e.value });
  }

  addEventToList() {
    console.log(this.state.eventListTable);
    console.log(this.state.eventocardioSelected);
    let eventList = this.state.eventListTable;
    let eventListNew = this.state.eventListTableNew;
    if (this.state.eventocardioSelected === null) {
      {
        Alert.warning("El Evento Cardiovasular esta vacío", 5000); //aca no esntra puse par aprobar nomas, pero esta bien osea tiene que ser {} nomas

        return;
      }
    } else {
      for (let index = 0; index < eventList.length; index++) {
        console.log(eventList);
        if (
          eventList[index].codeventocardio ===
          this.state.eventocardioSelected.codeventocardio
        ) {
          console.log(eventList);
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
      eventListNew.push(eventocardio);

      console.log(
        "fame a ser agregado" + this.state.eventocardioSelected.nombre
      );
      this.setState({
        eventListTable: eventList,
        eventListTableNew: eventListNew,
        eventocardio: ""
      });
    }
  }

  addComorToList() {
    let comorList = this.state.comorListTable;
    let comorListNew = this.state.comorListTableNew;
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
        fechadiagnostico: this.state.comorSelected.fechaDxComor //*** si no es el mismo nombe de la ficha, no  paorque es de otro formulario luego
      };
      comorList.push(comorbilidad);
      comorListNew.push(comorbilidad);
      console.log("fame a ser agregado" + this.state.comorSelected.nombre);
      this.setState({
        comorListTable: comorList,
        comorListTableNew: comorListNew,
        comorbilidad: ""
      });
    }
  }

  addFameToList() {
    let fameList = this.state.famesListTable;
    let fameListNew = this.state.famesListTableNew;
    if (this.state.fameSelected === null) {
      {
        Alert.warning("No puedo estar vacio", 10000);
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
        fechadesde: this.state.fameSelected.fameDesde,
        fechahasta: this.state.fameSelected.fameHasta
      };
      fameList.push(fame);
      fameListNew.push(fame);
      console.log(this.state.fameSelected);
      console.log("fame a ser agregado" + this.state.fameSelected.nombre);
      this.setState({
        famesListTable: fameList,
        famesListTableNew: fameListNew,
        fame: ""
      });
    }
  }

  addManiToList() {
    let maniList = this.state.maniListTable;
    let maniListNew = this.state.maniListTableNew;
    if (this.state.maniSelected === null) {
      {
        Alert.warning("La Manifestación Articular esta vacía", 5000);
        return;
      }
    } else {
      for (let index = 0; index < maniList.length; index++) {
        if (maniList[index].codmanif === this.state.maniSelected.codmanif) {
          Alert.warning("El Manifestacion Articular ya fue agregada", 3000);
          return;
        }
      }
      const mani = {
        codmanif: this.state.maniSelected.codmanif,
        nombre: this.state.maniSelected.nombre,
        descripcion: this.state.maniSelected.descripcion
      };
      maniList.push(mani);
      maniListNew.push(mani);

      this.setState({
        maniListTable: maniList,
        maniListTableNew: maniListNew,
        mani: ""
      });
    }
  }

  handleSubmit() {
    const errors = this.validar();
    this.setState({ errores: errors || {} });
    if (errors) return;
    this.handleAdd();
  }

  async validarCedula(e) {
    const url1 = "http://127.0.0.1:8000/api/ficha?nrodocumento=";
    const value = e.target.value;
    const name = e.target.name;
    const nro = this.state.nroDocOriginal;
    let fields = this.state.datosFicha;
    fields[name] = value;

    this.setState({
      datosFicha: fields
    });

    let aviso;
    await axios
      .get(url1 + value)
      .then(function(response) {
        console.log(response.data);

        /* if ((response.data.length > 0) & (value !== "")) {
          // si pasa este es porque trajo algo, entonces tenemos que comparar, pero tenemos que comparar adentro, entonces vamos a poner asi
          if (value === nro) {
            //si el valor que metio es igual al nro que ya HTMLTableCaptionElement, entonces no tiene que hacer nada
            aviso = false;
          } else {
            // si no comrpueba que el nro de documento no exista ya
            if (response.data[0].nrodocumento === value) {
              aviso = true;
              console.log("imprime si entra aca");
            } else {
              aviso = false;
            }
          }
        } else {
          aviso = false;
          return;
        }*/

        if ((response.data.length > 0) & (value !== "")) {
          //aviso = true;
          Alert.warning(
            "El Nro de documento ya esta asociada a otra ficha...",
            10000
          );
        } else {
          //aviso = false;
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    this.setState({ aviso: aviso });
  }
  onDismissVisivle() {
    this.setState({ visible: !this.state.visible });
  }
  onDismissAviso() {
    this.setState({ aviso: !this.state.visible });
  }
  async componentWillMount() {
    this.getEventList();
    this.getManiList();
    this.getFameList();
    this.getComorList();

    const cod = this.props.match.params.codficha; // asi nomas, mas abajo vas a tener que borrarle y copiar como esta en ficha form, ahora vamos a ver como el manda
    const url2 = "http://127.0.0.1:8000/api/ficha?codficha="; //no se puede sacar de aca, osea aca es donde carga como estaban los datos ori, cierto justo pense en eso tambienvamos a rriba
    let datosficha = {};

    await fetch(url2 + cod)
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          return new Error("No se recibio la respuesta esperada ...");
        }
      })
      .then(function(response) {
        datosficha = response[0];
      })
      .catch(error => console.log(error));

    this.setState({
      datosFicha: datosficha,
      nroDocOriginal: datosficha.nrodocumento
    });

    console.log(this.state.datosFicha);

    const url1 = "http://127.0.0.1:8000/api/ficha?codficha=";
    const url2f = "http://127.0.0.1:8000/api/famesficha/?codficha=";
    const url3f = "http://127.0.0.1:8000/api/fames/?codfame=";
    const url2e = "http://127.0.0.1:8000/api/eventocardio_ficha/?codficha=";
    const url3e = "http://127.0.0.1:8000/api/eventocardio/?codeventocardio=";
    const url2m = "http://127.0.0.1:8000/api/manif/?codficha=";
    const url3m = "http://127.0.0.1:8000/api/manif_extra_art/?codmanif=";
    const url2c = "http://127.0.0.1:8000/api/comorbilidad/?codficha=";
    const url3c = "http://127.0.0.1:8000/api/enfermedad/?codenfermedad=";

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

    // fames
    await axios
      .get(url2f + cod)
      .then(function(response) {
        famesFicha = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });

    for (let item = 0; item < famesFicha.length; item++) {
      await axios
        .get(url3f + famesFicha[item].codfame)
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
        fechadesde: famesFicha[item].fechadesde,
        fechahasta: famesFicha[item].fechahasta
      };
      listFame.push(obj);
    }
    console.log(listFame);

    this.setState({ famesListTable: listFame });

    //manifestaciones

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

    //evento
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
    console.log(liste);

    for (let item = 0; item < liste.length; item++) {
      const obj = {
        codeventocardio: liste[item].codeventocardio,
        nombre: liste[item].nombre
      };
      listEvento.push(obj);
    }
    console.log(listEvento);

    this.setState({ eventListTable: listEvento });
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
    console.log(result.error);
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details)
      errors[item.path[0]] = item.context.label;
    return errors;
  };

  handleChange(e) {
    const target = e.target;
    let fields = this.state.datosFicha; // y este
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    fields[name] = value;
    this.setState({
      datosFicha: fields
    });

    if ((name === "tabnumero") & (value === "")) {
      console.log(typeof value);
      fields[name] = 0;
      console.log(typeof fields[name]);
      this.setState({
        datosFicha: fields
      });
      console.log(this.state.datosFicha.tabnumero);
    }

    /*if ((name === "rxpies") & (this.state.datosFicha.rxpies === true)) {
      fields[name] = false;
      this.setState({
        datosFicha: fields
      });
    }*/

    /*if ((name === "rxmanos") & (this.state.datosFicha.rxmanos === true)) {
      fields[name] = false;
      this.setState({
        datosFicha: fields
      });
    }*/

    if ((name === "tabaqfecha") & (value === "")) {
      fields[name] = null;
      this.setState({
        datosFicha: fields
      });
    }

    if ((name === "rxpiesfecha") & (value === "")) {
      fields[name] = null;
      this.setState({
        datosFicha: fields
      });
    }
    if ((name === "rxmanosfecha") & (value === "")) {
      fields[name] = null;
      this.setState({
        datosFicha: fields
      });
    }

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
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  async handleUpdate() {
    const cod = this.props.match.params.codficha;
    const ficha = this.state.datosFicha;
    let codficha;
    console.log(this.state.datosFicha);

    await fetch(
      "http://127.0.0.1:8000/api/ficha/" + cod + "/", ///tenemos que recuperar el codficha para meter ahi
      {
        method: "PUT", // or 'PUT'
        body: JSON.stringify(ficha), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => res.json())
      .catch(error => console.error("Error:", error))
      /*.then(response => {
        console.log("La ficha fue cargada con exito:", response);
        this.setState({ visible: true });
      });*/
      .then(response => {
        if (response.codficha !== undefined && response.codficha !== null) {
          codficha = response.codficha;
          console.log(response);
          // Alert.success("La ficha fue cargada con éxito!", 10000);
          /*if (this.setState.alertCreado === true) {
            this.props.history.push(
              "/menu_ficha/" +
                this.props.match.params.codficha +
                "/ficha_view/" +
                this.props.match.params.codficha // y con este mandas al menu de la fi
            );
          }*/
          this.setState({ alertCreado: true, codFichaReturn: codficha });
        }
      });

    this.handleAddEvento(codficha);
    this.handleAddMani(codficha);
    this.handleAddFame(codficha);
    this.handleAddComor(codficha);
    this.handleDeleteEvent(codficha); //recien aca llamamos al delete event porque no es conveniente eliminar al darle el boton de eliminar luego, recien cuando le da al boton de guardar cambios va eliminar de la base
    this.handleDeleteMani(codficha);
    this.handleDeleteFame(codficha);
    this.handleDeleteComor(codficha);
  }

  async handleDeleteEvent(codficha) {
    const urlAux1 =
      "http://127.0.0.1:8000/api/eventocardio_ficha/?codeventocardio=";
    const urlAux2 = "&codficha=";
    const urlDelete = "http://127.0.0.1:8000/api/eventocardio_ficha/";

    let listDelete = this.state.eventListDelete; //este eventListDelete cargamos mas arriba en la funcion de eliminar de la tabla
    let codevencardofic;

    for (let item = 0; item < listDelete.length; item++) {
      //iteramos sobre el listDelete
      const url =
        urlAux1 + listDelete[item].codeventocardio + urlAux2 + codficha; //este es la url para buscar el eventocardio en la tabla

      await axios
        .get(url)
        .then(function(response) {
          codevencardofic = response.data[0].codevencardofic; //este cod que trae es el que vamos a usar para el delete
        })
        .catch(function(error) {
          console.log(error);
        });

      await fetch(urlDelete + codevencardofic, { method: "DELETE" }) //aca usamos la url mas el cod que trajimos porque solo de esa forma mermite eliminar
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
        });
    }
  }

  async handleDeleteFame(codficha) {
    const urlAux1f = "http://127.0.0.1:8000/api/famesficha/?codfame=";
    const urlAux2f = "&codficha=";
    const urlDeletef = "http://127.0.0.1:8000/api/famesficha/";

    let listDelete = this.state.famesListDelete; //este eventListDelete cargamos mas arriba en la funcion de eliminar de la tabla
    let codfameficha;

    for (let item = 0; item < listDelete.length; item++) {
      //iteramos sobre el listDelete
      const url = urlAux1f + listDelete[item].codfame + urlAux2f + codficha; //este es la url para buscar el eventocardio en la tabla

      await axios
        .get(url)
        .then(function(response) {
          codfameficha = response.data[0].codfameficha; //este cod que trae es el que vamos a usar para el delete
        })
        .catch(function(error) {
          console.log(error);
        });

      await fetch(urlDeletef + codfameficha, { method: "DELETE" }) //aca usamos la url mas el cod que trajimos porque solo de esa forma mermite eliminar
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
        });
    }
  }

  async handleDeleteComor(codficha) {
    const urlAux1c = "http://127.0.0.1:8000/api/comorbilidad/?codenfermedad=";
    const urlAux2c = "&codficha=";
    const urlDeletec = "http://127.0.0.1:8000/api/comorbilidad/";

    let listDelete = this.state.comorListDelete; //este eventListDelete cargamos mas arriba en la funcion de eliminar de la tabla
    let codcomor;

    for (let item = 0; item < listDelete.length; item++) {
      //iteramos sobre el listDelete
      const url =
        urlAux1c + listDelete[item].codenfermedad + urlAux2c + codficha; //este es la url para buscar el eventocardio en la tabla

      await axios
        .get(url)
        .then(function(response) {
          codcomor = response.data[0].codcomor; //este cod que trae es el que vamos a usar para el delete
        })
        .catch(function(error) {
          console.log(error);
        });

      await fetch(urlDeletec + codcomor, { method: "DELETE" }) //aca usamos la url mas el cod que trajimos porque solo de esa forma mermite eliminar
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
        });
    }
  }

  async handleDeleteMani(codficha) {
    const urlAux1m = "http://127.0.0.1:8000/api/manif/?codmanif=";
    const urlAux2m = "&codficha=";
    const urlDeletem = "http://127.0.0.1:8000/api/manif/";

    let listDelete = this.state.maniListDelete; //este eventListDelete cargamos mas arriba en la funcion de eliminar de la tabla
    let codmanifficha;

    for (let item = 0; item < listDelete.length; item++) {
      //iteramos sobre el listDelete
      const url = urlAux1m + listDelete[item].codmanif + urlAux2m + codficha; //este es la url para buscar el eventocardio en la tabla

      await axios
        .get(url)
        .then(function(response) {
          codmanifficha = response.data[0].codmanifficha; //este cod que trae es el que vamos a usar para el delete
        })
        .catch(function(error) {
          console.log(error);
        });

      await fetch(urlDeletem + codmanifficha, { method: "DELETE" }) //aca usamos la url mas el cod que trajimos porque solo de esa forma mermite eliminar
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
        });
    }
  }

  async handleAddComor(codficha) {
    const list = this.state.comorListTableNew;
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
      "se imprime la lista de eventos a cargar" + this.state.eventListTableNew
    );
    const list = this.state.eventListTableNew;

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
    const list = this.state.famesListTableNew;

    for (let item = 0; item < list.length; item++) {
      let fame = {
        codficha: codficha,
        codfame: list[item].codfame,
        fechadesde: list[item].fechadesde,
        fechahasta: list[item].fechahasta
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
    const list = this.state.maniListTableNew;

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

  formatDate(date) {
    var monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "April",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
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
          <CardHeader style={{ backgroundColor: "#07689F", color: "white" }}>
            <h2>Datos Personales</h2>
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
                    onChange={this.validarCedula}
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
                    <option>Soltero/o</option>
                    <option>Casado/o</option>
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
          <CardHeader style={{ backgroundColor: "#133E7C", color: "white" }}>
            <h3>Datos de la Ficha HA</h3>
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
                      <Button onClick={this.eliminarEvento}>Eliminar</Button>
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
                      <Button onClick={this.eliminarMani}>Eliminar</Button>
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
                      <Button onClick={this.eliminarComor}>Eliminar</Button>
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
                      <Button onClick={this.eliminarFame}>Eliminar</Button>
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
                      <input
                        type="checkbox"
                        checked={this.state.datosFicha.sedentarismo}
                        onChange={this.handleChange}
                        value={this.state.datosFicha.sedentarismo}
                        name="sedentarismo"
                        id="sedentarismo"
                      />
                      <Row>
                        <Label check>Sedentarismo</Label>
                      </Row>
                    </FormGroup>
                  </Col>

                  <Col>
                    <FormGroup check>
                      <input
                        type="checkbox"
                        checked={this.state.datosFicha.actifisica}
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
                        <input
                          type="checkbox"
                          onChange={this.handleChange}
                          checked={this.state.datosFicha.extabaq}
                          value={this.state.datosFicha.extabaq}
                          name="extabaq"
                          id="extabaq"
                        />
                        <Row>
                          {" "}
                          <Label check>Ex Tabaquista</Label>{" "}
                        </Row>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup check>
                        <input
                          type="checkbox"
                          checked={this.state.datosFicha.tabaquismo}
                          onChange={this.handleChange}
                          value={this.state.datosFicha.tabaquismo}
                          name="tabaquismo"
                          id="tabaquismo"
                        />
                        <Row>
                          {" "}
                          <Label check>Tabaquista</Label>{" "}
                        </Row>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="tabaqfecha">Fecha Inicio</Label>
                        <Input
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
                        <input
                          type="number"
                          onChange={this.handleChange}
                          onFocus={event => event.target.select()}
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
                        <input
                          disabled={this.state.deshabilitar}
                          type="checkbox"
                          checked={this.state.datosFicha.hisjospost}
                          onChange={this.handleChange}
                          value={this.state.datosFicha.hisjospost}
                          name="hisjospost"
                          id="hisjospost"
                        />
                        <Label check>Hijos después del diagnóstico de AR</Label>
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
                    <Col>
                      <FormGroup>
                        <Label for="factorreuma_pos">FR (+)</Label>
                        <Input
                          type="text"
                          onChange={this.handleChange}
                          value={this.state.datosFicha.factorreuma_pos}
                          name="factorreuma_pos"
                          id="factorreuma_pos"
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="factorreuma_neg">FR (-)</Label>
                        <Input
                          type="text"
                          onChange={this.handleChange}
                          value={this.state.datosFicha.factorreuma_neg}
                          name="factorreuma_neg"
                          id="factorreuma_neg"
                        />
                      </FormGroup>
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
                    <Col>
                      <FormGroup>
                        <Label for="acpa_pos">ACPA (+)</Label>
                        <Input
                          type="text"
                          onChange={this.handleChange}
                          value={this.state.datosFicha.acpa_pos}
                          name="acpa_pos"
                          id="acpa_pos"
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="acpa_neg">ACPA (-)</Label>
                        <Input
                          type="text"
                          onChange={this.handleChange}
                          value={this.state.datosFicha.acpa_neg}
                          name="acpa_neg"
                          id="acpa_neg"
                        />
                      </FormGroup>
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
                    <Col>
                      <FormGroup>
                        <Label for="ana_pos">ANA (+)</Label>
                        <Input
                          type="text"
                          onChange={this.handleChange}
                          value={this.state.datosFicha.ana_pos}
                          name="ana_pos"
                          id="ana_pos"
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="ana_neg">ANA (-)</Label>
                        <Input
                          type="text"
                          onChange={this.handleChange}
                          value={this.state.datosFicha.ana_neg}
                          name="ana_neg"
                          id="ana_neg"
                        />
                      </FormGroup>
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
                        <input
                          type="checkbox"
                          checked={this.state.datosFicha.rxmanos}
                          onChange={this.handleChange}
                          value={this.state.datosFicha.rxmanos}
                          name="rxmanos"
                          id="rxmanos"
                        />
                        <Label check>RX Manos </Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <Row>
                        <FormGroup>
                          <Label for="rxmanosfecha">Fecha de RX Manos</Label>
                          <Input
                            type="date"
                            onChange={this.handleChange}
                            value={this.state.datosFicha.rxmanosfecha}
                            name="rxmanosfecha"
                            id="rxmanosfecha"
                          />
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
                          type="checkbox"
                          checked={this.state.datosFicha.rxpies}
                          onChange={this.handleChange}
                          value={this.state.datosFicha.rxpies}
                          name="rxpies"
                          id="rxpies"
                        />
                        <Label check>RX Pies </Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <Row>
                        <FormGroup>
                          <Label for="rxpiesfecha">Fecha de RX Pies</Label>
                          <Input
                            type="date"
                            onChange={this.handleChange}
                            value={this.state.datosFicha.rxpiesfecha}
                            name="rxpiesfecha"
                            id="rxpiesfecha"
                          />
                        </FormGroup>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </CardBody>
        </Card>

        <Button
          onClick={this.handleUpdate}
          color="primary"
          style={{ marginTop: 20 }}
        >
          Guardar Cambios
        </Button>
        <SweetAlert
          success
          onConfirm={this.alertConfirm}
          show={this.state.alertCreado}
        >
          Ficha HA modificada con éxito!
        </SweetAlert>
      </Container>
    );
  }
}

export default FichaEdit;
