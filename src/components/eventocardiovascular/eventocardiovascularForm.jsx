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
    this.handleAdd = this.handleAdd.bind(this);
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

  async handleAdd() {
    const evento = this.state.eventocardiovascularForm;
    await fetch("http://127.0.0.1:8000/api/eventocardio/", {
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
              <Button color="success" onClick={this.handleAdd}>
                Agregar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default EventoCardiovascular;
