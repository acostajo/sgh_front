import React from "react";
import { Link } from "react-router-dom";

const Modulos = () => {
  return (
    <div>
      <Link to="/ficha_buscar">Modulo Pacientes</Link>
      <Link to="/laboratorio">Laboratorio</Link>
    </div>
  );
};

export default Modulos;
