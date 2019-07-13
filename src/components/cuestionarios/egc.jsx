import React, { Component } from "react";
import {
  Row,
  Col,
  Input,
  Label,
  Container,
  Button,
  FormGroup
} from "reactstrap";

class Egc extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
        <Row
          style={{ marginBottom: 20, marginTop: 20, justifyContent: "center" }}
        >
          <Col>
            <h2>
              <strong>Escala global de cambios</strong>
            </h2>
            <hr />
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <Label>
              <strong>Bienestar físico </strong>
            </Label>
            <p>
              Se refiere al modo en que Ud. siente su cuerpo. Incluye síntomas
              tales como dolor, malestar, nauseas y cansancio.
            </p>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Mucho mejor</option>
              <option>Un poco mejor</option>
              <option>Igual </option>
              <option>Un poco peor  </option>
              <option>Mucho peor </option>
            </Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <Label>
              <strong>Bienestar Social y Familiar </strong>
            </Label>
            <p>
              Esto refleja como se siente Ud. acerca de sus amistades y sus
              relaciones familiares. El bienestar social y familiar abarca
              muchas cosas tales como sentirse distante de amigos y familiares,
              tener una buena relación sexual o cómo es la comunicación acerca
              de su enfermedad.
            </p>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Mucho mejor</option>
              <option>Un poco mejor</option>
              <option>Igual </option>
              <option>Un poco peor  </option>
              <option>Mucho peor </option>
            </Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <Label>
              <strong> Bienestar Emocional </strong>
            </Label>
            <p>
              Se refiere a sentimientos personales tales como tristeza,
              nerviosismo o preocupaciones acerca de su enfermedad. También se
              refiere a sentimientos positivos tales como estar orgulloso de
              cómo está haciendo frente a su problema de salud.
            </p>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Mucho mejor</option>
              <option>Un poco mejor</option>
              <option>Igual </option>
              <option>Un poco peor  </option>
              <option>Mucho peor </option>
            </Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <Label>
              <strong> Bienestar Funcional </strong>
            </Label>
            <p>
              Esto se refiere a en qué medida puede Ud. hacer cosas que son
              parte de su vida cotidiana. Algunos ejemplos son: poder trabajar,
              tanto dentro como fuera de la casa, disfrutar de las cosas que
              acostumbra a hacer para entretenerse, dormir bien y sentirse
              satisfecha de su vida diaria.
            </p>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Mucho mejor</option>
              <option>Un poco mejor</option>
              <option>Igual </option>
              <option>Un poco peor  </option>
              <option>Mucho peor </option>
            </Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <Label>
              <strong> Calidad de vida en general </strong>
            </Label>
            <p>
              Esto se refiere a qué medida puede Ud. hacer cosas que son parte
              de su vida cotidiana. Algunos ejemplos son: poder trabajar, tanto
              dentro como fuera de la casa, disfrutar de las cosas que
              acostumbra a hacer para entretenerse, dormir bien y sentirse
              satisfecha de su vida diaria.
            </p>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Mucho mejor</option>
              <option>Un poco mejor</option>
              <option>Igual </option>
              <option>Un poco peor  </option>
              <option>Mucho peor </option>
            </Input>
          </Col>
        </Row>
        <Row style={{ marginTop: 40, marginBottom: 40 }}>
          <Col>
            <Button color="success">Agregar Cuestionario</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Egc;
