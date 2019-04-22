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

class Manifestaciones extends Component {
  constructor() {
    super();
    this.state = {
      maniForm: {
        nombre: "",
        descripcion: "",
        codusuario: 999
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    let fields = this.state.maniForm;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    fields[name] = value;

    this.setState({
      maniForm: fields
    });
  }

  async handleAdd() {
    const manif = this.state.maniForm;
    await fetch("http://127.0.0.1:8000/api/manif_extra_art/", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(manif), // data can be `string` or {object}!
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
                <Label for="nombre">Nombre Manifestacion:</Label>
                <Input
                  name="nombre"
                  id="nombre"
                  value={this.state.maniForm.nombre}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="nombre">Descripcion Manifestacion:</Label>
                <Input
                  name="descripcion"
                  id="descripcion"
                  value={this.state.maniForm.descripcion}
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

export default Manifestaciones;
