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

class Mbg extends Component {
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
              <strong>Metrica de Bienestar Global</strong>
            </h2>
            <hr />
          </Col>
        </Row>
        <Row
          style={{ marginBottom: 20, marginTop: 20, justifyContent: "center" }}
        >
          <Col>
            <h6>
              <strong>1. En general, ¿diría usted que su salud es:</strong>
            </h6>
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" /> Vestirse, asearse
              </Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" /> Excelente
              </Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" /> Muy buena
              </Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" /> Buena
              </Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" /> Regular
              </Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" /> Mala
              </Label>
            </FormGroup>
          </Col>
        </Row>

        <Row
          style={{ marginBottom: 20, marginTop: 20, justifyContent: "center" }}
        >
          <Col>
            <h6>
              <strong>
                2. Las siguientes preguntas se refieren a actividades que usted
                podría hacer durante un día normal. ¿Su estado de salud actual
                lo limita en estas actividades? Si es así, ¿cuánto? :
              </strong>
            </h6>
          </Col>
        </Row>

        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <p>
              a-) Actividades intensas, tales como correr, levantar objetos
              pesados, participar en deportes agotadores
            </p>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Sí, me limita mucho </option>
              <option>Sí, me limita un poco </option>
              <option>No, no me limita para nada </option>
            </Input>
          </Col>
        </Row>

        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <p>
              b-) Actividades moderadas, tales como mover una mesa, empujar una
              aspiradora, barrer, bailar o andar en bicicleta
            </p>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Sí, me limita mucho </option>
              <option>Sí, me limita un poco </option>
              <option>No, no me limita para nada </option>
            </Input>
          </Col>
        </Row>

        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <p>c-) Levantar o llevar las bolsas de las compras</p>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Sí, me limita mucho </option>
              <option>Sí, me limita un poco </option>
              <option>No, no me limita para nada </option>
            </Input>
          </Col>
        </Row>

        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <p>d-) Subir varios pisos por la escalera</p>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Sí, me limita mucho </option>
              <option>Sí, me limita un poco </option>
              <option>No, no me limita para nada </option>
            </Input>
          </Col>
        </Row>

        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <p>e-) Subir un piso por la escalera</p>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Sí, me limita mucho </option>
              <option>Sí, me limita un poco </option>
              <option>No, no me limita para nada </option>
            </Input>
          </Col>
        </Row>

        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <p>f-) Agacharse, arrodillarse o ponerse en cuclillas</p>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Sí, me limita mucho </option>
              <option>Sí, me limita un poco </option>
              <option>No, no me limita para nada </option>
            </Input>
          </Col>
        </Row>

        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <p>g-) Caminar más de un kilómetro</p>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Sí, me limita mucho </option>
              <option>Sí, me limita un poco </option>
              <option>No, no me limita para nada </option>
            </Input>
          </Col>
        </Row>

        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <p>h-) Caminar varios cientos de metros</p>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Sí, me limita mucho </option>
              <option>Sí, me limita un poco </option>
              <option>No, no me limita para nada </option>
            </Input>
          </Col>
        </Row>

        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <p>i-) Caminar cien metros</p>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Sí, me limita mucho </option>
              <option>Sí, me limita un poco </option>
              <option>No, no me limita para nada </option>
            </Input>
          </Col>
        </Row>

        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <p>j-) Bañarse o vestirse</p>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Sí, me limita mucho </option>
              <option>Sí, me limita un poco </option>
              <option>No, no me limita para nada </option>
            </Input>
          </Col>
        </Row>

        <Row
          style={{ marginBottom: 20, marginTop: 20, justifyContent: "center" }}
        >
          <Col>
            <h6>
              <strong>
                3. Durante las últimas 4 semanas, ¿cuánto tiempo ha tenido usted
                alguno de los siguientes problemas con su trabajo u otras
                actividades diarias normales a causa de su salud física?
              </strong>
            </h6>
          </Col>
        </Row>

        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <p>
              a-) ¿Ha disminuido usted el tiempo que dedicaba al trabajo u otras
              actividades?
            </p>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Siempre </option>
              <option>Casi siempre </option>
              <option>Algunas veces</option>
              <option>Casi Nunca</option>
              <option>Nunca</option>
            </Input>
          </Col>
        </Row>

        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <p>
              b-) ¿Ha logrado hacer menos de lo que usted hubiera querido hacer?
            </p>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Siempre </option>
              <option>Casi siempre </option>
              <option>Algunas veces</option>
              <option>Casi Nunca</option>
              <option>Nunca</option>
            </Input>
          </Col>
        </Row>

        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <p>
              c-) ¿Se ha visto limitado en el tipo de trabajo u otras
              actividades?
            </p>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Siempre </option>
              <option>Casi siempre </option>
              <option>Algunas veces</option>
              <option>Casi Nunca</option>
              <option>Nunca</option>
            </Input>
          </Col>
        </Row>

        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <p>
              d-) ¿Ha tenido dificultades en realizar su trabajo u otras
              actividades (por ejemplo, le ha costado más esfuerzo)?
            </p>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Siempre </option>
              <option>Casi siempre </option>
              <option>Algunas veces</option>
              <option>Casi Nunca</option>
              <option>Nunca</option>
            </Input>
          </Col>
        </Row>

        <Row
          style={{ marginBottom: 20, marginTop: 20, justifyContent: "center" }}
        >
          <Col>
            <h6>
              <strong>
                4. Durante las últimas 4 semanas, ¿cuánto tiempo ha tenido usted
                alguno de los siguientes problemas con su trabajo u otras
                actividades diarias normales a causa de algún problema emocional
                (como sentirse deprimido o ansioso)?
              </strong>
            </h6>
          </Col>
        </Row>

        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <p>
              a-) ¿Ha disminuido usted el tiempo que dedicaba al trabajo u otras
              actividades?
            </p>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Siempre </option>
              <option>Casi siempre </option>
              <option>Algunas veces</option>
              <option>Casi Nunca</option>
              <option>Nunca</option>
            </Input>
          </Col>
        </Row>

        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <p>
              b-) ¿Ha logrado hacer menos de lo que usted hubiera querido hacer?
            </p>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Siempre </option>
              <option>Casi siempre </option>
              <option>Algunas veces</option>
              <option>Casi Nunca</option>
              <option>Nunca</option>
            </Input>
          </Col>
        </Row>

        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <p>
              c-) ¿Ha hecho el trabajo u otras actividades con menos cuidado de
              lo usual?
            </p>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Siempre </option>
              <option>Casi siempre </option>
              <option>Algunas veces</option>
              <option>Casi Nunca</option>
              <option>Nunca</option>
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

export default Mbg;
