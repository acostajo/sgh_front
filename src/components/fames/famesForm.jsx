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

class Fame extends Component {
  constructor() {
    super();
    this.state = {
      fameForm: {
        nombre: "",
        descripcion: "",
        codusuario: 999
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  async handleAdd() {
    const fame = this.state.fameForm;
    await fetch("http://127.0.0.1:8000/api/fames/", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(fame), // data can be `string` or {object}!
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
    let fields = this.state.fameForm;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    fields[name] = value;

    this.setState({
      fameForm: fields
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Form>
              <FormGroup>
                <Label for="nombre">Nombre Fame:</Label>
                <Input
                  name="nombre"
                  id="nombre"
                  value={this.state.fameForm.nombre}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="nombre">Descripcion Fame:</Label>
                <Input
                  name="descripcion"
                  id="descripcion"
                  value={this.state.fameForm.descripcion}
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

export default Fame;
