import React, { Component } from "react";
import NavBar from "./components/navbar";
import Home from "./components/home";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Ficha from "./components/ficha/fichaForm";
import Consulta from "./components/consulta/consultaForm";
import BuscarFicha from "./components/ficha/buscarFicha";
import FichaView from "./components/ficha/fichaView";
import FichaEdit from "./components/ficha/fichaEdit";
import Panolab from "./components/panolab/panolabForm";
import PanolabView from "./components/panolab/panolabView";
import MenuFicha from "./components/ficha/menuficha";
import ConsultaView from "./components/consulta/consultaView";
import NavBarMenu from "./components/navbar";
import OrdenEstudio from "./components/ordenestudio/ordenestudioForm";
import OrdenEstudioView from "./components/ordenestudio/ordenestudioView";
import MenuPrincipal from "./components/principal";
import ListaEstudios from "./components/laboratorio/estudios";
import BuscarPaciente from "./components/laboratorio/buscarPaciente";
import Turnos from "./components/laboratorio/turnos";
import MenuLab from "./components/laboratorio/menuLab";
import OrdenEstudioViewLab from "./components/laboratorio/ordenestudioViewLab";
import Login from "./components/Login";
import "antd/dist/antd.css";
import "rsuite/dist/styles/rsuite.min.css";
class App extends Component {
  render() {
    return (
      <div>
        <div className="content" style={{ marginTop: 60 }}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route
              path="/lista_estudios/:codficha"
              exact
              component={ListaEstudios}
            />
            <Route path="/turnos/" exact component={Turnos} />
            <Route path="/menu_lab/" exact component={MenuLab} />
            <Route path="/buscar_paciente/" exact component={BuscarPaciente} />

            <Route path="/ordenestudio/:codficha" component={OrdenEstudio} />
            <Route
              path="/ordenestudio_view/:codordenestudio"
              component={OrdenEstudioView}
            />
            <Route
              path="/ordenestudio_view_lab/:codordenestudio/:codficha"
              component={OrdenEstudioViewLab}
            />

            <Route path="/ficha_edit/:codficha" component={FichaEdit} />
            <Route path="/ficha_buscar" component={BuscarFicha} />
            <Route path="/menu_ficha/:codficha" component={MenuFicha} />
            <Route path="/ficha" component={Ficha} />

            <Route path="/menu/" exact component={MenuPrincipal} />
            <Route path="/consulta/:codficha" component={Consulta} />
            <Route
              path="/consulta_view/:codconsulta/:codficha"
              component={ConsultaView} //pero esta tambien consulta no es ese el problema
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
