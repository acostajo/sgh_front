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

class Comorbilidad extends Component {
  constructor() {
    super();
    this.state = {
      comorForm: {
        nombre: "",
        codusuario: 999
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  async handleAdd() {
    const comorbilidad = this.state.comorForm;
    await fetch("http://127.0.0.1:8000/api/enfermedad/", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(comorbilidad), // data can be `string` or {object}!
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
    let fields = this.state.comorForm;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    fields[name] = value;

    this.setState({
      comorForm: fields
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Form>
              <FormGroup>
                <Label for="nombre">Nombre Comorbilidad:</Label>
                <Input
                  name="nombre"
                  id="nombre"
                  value={this.state.comorForm.nombre}
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

export default Comorbilidad;
