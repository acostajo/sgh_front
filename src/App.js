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
import MenuFicha from "./components/ficha/menuficha";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar> </NavBar>{" "}
        <div className="content">
          <Switch>
            <Route path="/consulta/:codficha" component={Consulta} />
            <Route path="/ficha" component={Ficha} />
            <Route path="/ficha_view/:codpaciente" component={FichaView} />
            <Route path="/panolab/:codficha" component={Panolab} />
            <Route path="/ficha_edit/:codpaciente" component={FichaEdit} />
            <Route path="/ficha_buscar" component={BuscarFicha} />
            <Route path="/menu_ficha/:codficha" component={MenuFicha} />
            <Route path="/" component={BuscarFicha} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
