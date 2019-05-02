import React, { Component } from "react";
import NavBar from "./components/navbar";
import Home from "./components/home";
import { Route, Switch } from "react-router-dom";
import Ficha from "./components/ficha/fichaForm";
import Consulta from "./components/consulta/consultaForm";
import BuscarFicha from "./components/ficha/buscarFicha";
import FichaView from "./components/ficha/fichaView";
import FichaEdit from "./components/ficha/fichaEdit";
import Panolab from "./components/panolab/panolabForm";
import PanolabView from "./components/panolab/panolabView";
import MenuFicha from "./components/ficha/menuficha";
import ConsultaView from "./components/consulta/consultaView";
import Modulos from "./components/modulos";
import SideNavMenu from "./components/sidenab";
import NavBarMenu from "./components/navbar";
import OrdenEstudio from "./components/ordenestudio/ordenestudioForm";
import OrdenEstudioView from "./components/ordenestudio/ordenestudioView";
import MenuPrincipal from "./components/principal";
import {
  Sidebar,
  Sidenav,
  Dropdown,
  Nav,
  Navbar,
  Icon,
  Container,
  Header,
  Content
} from "rsuite";

class App extends Component {
  render() {
    return (
      <div>
        <NavBarMenu />

        <div className="content" style={{ marginTop: 60 }}>
          <Switch>
            <Route path="/consulta/:codficha" component={Consulta} />
            <Route
              path="/consulta_view/:codconsulta"
              component={ConsultaView}
            />
            <Route path="/ordenestudio/:codficha" component={OrdenEstudio} />
            <Route
              path="/ordenestudio_view/:codconsulta"
              component={OrdenEstudioView}
            />
            <Route path="/panolab/:codficha" component={Panolab} />
            <Route
              path="/panolab_view/:codpanolab/:codficha"
              component={PanolabView}
            />
            <Route path="/ficha_view/:codpaciente" component={FichaView} />
            <Route path="/ficha_edit/:codficha" component={FichaEdit} />
            <Route path="/ficha_buscar" component={BuscarFicha} />
            <Route path="/menu_ficha/:codficha" component={MenuFicha} />
            <Route path="/ficha" component={Ficha} />
            <Route path="/modulos" exact component={MenuPrincipal} />
            <Route path="/" exact component={MenuPrincipal} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
