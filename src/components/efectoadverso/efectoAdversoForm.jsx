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

class EfectoAdverso extends Component {
  constructor() {
    super();
    this.state = {
      efectoAdversoForm: {
        nombre: "",
        codusuario: 999
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    let fields = this.state.efectoAdversoForm;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    fields[name] = value;

    this.setState({
      efectoAdversoForm: fields
    });
  }

  async handleAdd() {
    const efecto = this.state.efectoAdversoForm;
    await fetch("http://127.0.0.1:8000/api/efecto_adverso/", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(efecto), // data can be `string` or {object}!
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
                <Label for="nombre">Nombre Efecto Adverso:</Label>
                <Input
                  name="nombre"
                  id="nombre"
                  value={this.state.efectoAdversoForm.nombre}
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

export default EfectoAdverso;
