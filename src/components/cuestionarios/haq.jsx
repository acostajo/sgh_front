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

class Haq extends Component {
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
              <strong>
                Health Assessment Questionnaires - (Cuestionario de evaluación
                de salud)
              </strong>
            </h2>
            <hr />
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <Label>
              1) Vestirse  solo,  incluyendo  abrocharse  los  botones  y 
              atarse los cordones de los zapatos? 
            </Label>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Sin dificultad</option>
              <option>Con alguna dificultad </option>
              <option>Con mucha dificultad</option>
              <option>Incapaz de hacerlo </option>
            </Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <Label>2) Enjabonarse la cabeza? </Label>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Sin dificultad</option>
              <option>Con alguna dificultad </option>
              <option>Con mucha dificultad</option>
              <option>Incapaz de hacerlo </option>
            </Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <Label>3) Levantarse de una silla sin brazos? </Label>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Sin dificultad</option>
              <option>Con alguna dificultad </option>
              <option>Con mucha dificultad</option>
              <option>Incapaz de hacerlo </option>
            </Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <Label>4) Acostarse y levantarse de la cama?  </Label>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Sin dificultad</option>
              <option>Con alguna dificultad </option>
              <option>Con mucha dificultad</option>
              <option>Incapaz de hacerlo </option>
            </Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <Label>5) Cortar un filete de carne?   </Label>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Sin dificultad</option>
              <option>Con alguna dificultad </option>
              <option>Con mucha dificultad</option>
              <option>Incapaz de hacerlo </option>
            </Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <Label>6) Abrir un cartón de leche nuevo?    </Label>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Sin dificultad</option>
              <option>Con alguna dificultad </option>
              <option>Con mucha dificultad</option>
              <option>Incapaz de hacerlo </option>
            </Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <Label>7) Servirse la bebida?   </Label>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Sin dificultad</option>
              <option>Con alguna dificultad </option>
              <option>Con mucha dificultad</option>
              <option>Incapaz de hacerlo </option>
            </Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <Label>8) Caminar fuera de casa por un terreno llano?  </Label>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Sin dificultad</option>
              <option>Con alguna dificultad </option>
              <option>Con mucha dificultad</option>
              <option>Incapaz de hacerlo </option>
            </Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <Label>9) Subir cinco escalones?   </Label>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Sin dificultad</option>
              <option>Con alguna dificultad </option>
              <option>Con mucha dificultad</option>
              <option>Incapaz de hacerlo </option>
            </Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <Label>10) Lavarse y secarse todo el cuerpo?   </Label>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Sin dificultad</option>
              <option>Con alguna dificultad </option>
              <option>Con mucha dificultad</option>
              <option>Incapaz de hacerlo </option>
            </Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <Label>11) Sentarse y levantarse del retrete?   </Label>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Sin dificultad</option>
              <option>Con alguna dificultad </option>
              <option>Con mucha dificultad</option>
              <option>Incapaz de hacerlo </option>
            </Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <Label>12) Ducharse?   </Label>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Sin dificultad</option>
              <option>Con alguna dificultad </option>
              <option>Con mucha dificultad</option>
              <option>Incapaz de hacerlo </option>
            </Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <Label>
              13) Recoger un paquete de azúcar de 1 Kg de una estantería 
              colocada por encima de su cabeza?  
            </Label>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Sin dificultad</option>
              <option>Con alguna dificultad </option>
              <option>Con mucha dificultad</option>
              <option>Incapaz de hacerlo </option>
            </Input>
          </Col>
        </Row>

        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <Label>14) Agacharse y recoger ropa del suelo? </Label>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Sin dificultad</option>
              <option>Con alguna dificultad </option>
              <option>Con mucha dificultad</option>
              <option>Incapaz de hacerlo </option>
            </Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <Label>15) Abrir la puerta de un coche? </Label>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Sin dificultad</option>
              <option>Con alguna dificultad </option>
              <option>Con mucha dificultad</option>
              <option>Incapaz de hacerlo </option>
            </Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <Label>
              16) Abrir tarros cerrados que ya antes habían sido abiertos?  
            </Label>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Sin dificultad</option>
              <option>Con alguna dificultad </option>
              <option>Con mucha dificultad</option>
              <option>Incapaz de hacerlo </option>
            </Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <Label>17) Abrir y cerrar los grifos? </Label>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Sin dificultad</option>
              <option>Con alguna dificultad </option>
              <option>Con mucha dificultad</option>
              <option>Incapaz de hacerlo </option>
            </Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <Label>18) Hacer los recados y las compras?  </Label>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Sin dificultad</option>
              <option>Con alguna dificultad </option>
              <option>Con mucha dificultad</option>
              <option>Incapaz de hacerlo </option>
            </Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col xs="8" lg="8" md="8">
            <Label>19) Entrar y salir de un coche?  </Label>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Sin dificultad</option>
              <option>Con alguna dificultad </option>
              <option>Con mucha dificultad</option>
              <option>Incapaz de hacerlo </option>
            </Input>
          </Col>
        </Row>
        <Row style={{ marginBottom: 30 }}>
          <Col xs="8" lg="8" md="8">
            <Label>
              20) Hacer tareas de casa como barrer o lavar los platos?  
            </Label>
          </Col>
          <Col xs="4" lg="4" md="4">
            <Input type="select">
              <option>Sin dificultad</option>
              <option>Con alguna dificultad </option>
              <option>Con mucha dificultad</option>
              <option>Incapaz de hacerlo </option>
            </Input>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>
              Señale para qué actividades necesita la ayuda de otra persona:
            </h3>
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
                <Input type="checkbox" /> Levantarse
              </Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" /> Comer
              </Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" /> Higiene personal 
              </Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" /> Caminar Pasear
              </Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" /> Alcanzar 
              </Label>
            </FormGroup>
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

export default Haq;
