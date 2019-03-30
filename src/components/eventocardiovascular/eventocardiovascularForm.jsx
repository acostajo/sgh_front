import React, { Component } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

class EventoCardiovascular extends Component {
  constructor() {
    super();
    this.state = {
      eventocardiovascularForm: {
        nombre: "",
        codusuario: 999
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    let fields = this.state.eventocardiovascularForm;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    fields[name] = value;

    this.setState({
      eventocardiovascularForm: fields
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Form>
              <FormGroup>
                <Label for="nombre">Nombre Evento Cardiovascular:</Label>
                <Input
                  name="nombre"
                  id="nombre"
                  value={this.state.eventocardiovascularForm.nombre}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button color="success">Agregar</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default EventoCardiovascular;
