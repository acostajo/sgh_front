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

class Estudio extends Component {
  constructor() {
    super();
    this.state = {
      estudioForm: {
        nombre: "",
        descripcion: "",
        codusuario: 999
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  async handleAdd() {
    const estudio = this.state.estudioForm;
    await fetch("http://127.0.0.1:8000/api/estudio/", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(estudio), // data can be `string` or {object}!
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

  handleChange(e) {
    const target = e.target;
    let fields = this.state.estudioForm;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    fields[name] = value;

    this.setState({
      estudioForm: fields
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Form>
              <FormGroup>
                <Label for="nombre">Estudio:</Label>
                <Input
                  name="nombre"
                  id="nombre"
                  value={this.state.estudioForm.nombre}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="nombre">Descripcion:</Label>
                <Input
                  name="descripcion"
                  id="descripcion"
                  value={this.state.estudioForm.descripcion}
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

export default Estudio;
