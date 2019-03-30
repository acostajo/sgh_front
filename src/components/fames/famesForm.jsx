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
        codusuario: 999
      }
    };
    this.handleChange = this.handleChange.bind(this);
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
              <Button color="success">Agregar</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Fame;
