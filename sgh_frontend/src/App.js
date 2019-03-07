import React, { Component } from "react";
import NavBar from "./components/navbar";
import Home from "./components/home";
import { Route, Switch } from "react-router-dom";
import Ficha from "./components/fichaForm";
import Consulta from "./components/consultaform";
import BuscarFicha from "./components/buscarFicha";
import FichaView from "./components/fichaView";
import FichaEdit from "./components/fichaEdit";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar> </NavBar>{" "}
        <div className="content">
          <Switch>
            <Route path="/consulta" component={Consulta} />
            <Route path="/ficha" component={Ficha} />
            <Route path="/ficha_view/:codpaciente" component={FichaView} />
            <Route path="/ficha_edit/:codpaciente" component={FichaEdit} />
            <Route path="/ficha_buscar" component={BuscarFicha} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
