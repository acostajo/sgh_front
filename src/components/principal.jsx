import React, { Component } from "react";
import { FlexboxGrid, Button, Divider, Icon, Col } from "rsuite";
import { Link } from "react-router-dom";

//import "rsuite/dist/styles/rsuite.css";
import BuscarFicha from "./ficha/buscarFicha";
import { Modal } from "rsuite";

class MenuPrincipal extends Component {
  constructor(props) {
    super(props);

    this.state = { toggleListaPaciente: false };
    this.handleClick = this.handleClick.bind(this);
    this.toggleListaPaciente = this.toggleListaPaciente.bind(this);
  }
  toggleListaPaciente() {
    this.setState({
      toggleListaPaciente: !this.state.toggleListaPaciente
    });
  }

  handleClick() {}

  render() {
    const ButtonLink = props => <Button componentClass={Link} {...props} />;
    return (
      //backgroundImage: 'url(' + imgUrl + ')'
      <div>
        <FlexboxGrid align="center" style={{ marginTop: 200 }}>
          <FlexboxGrid.Item>
            <ButtonLink
              to="/ficha"
              style={{ height: 400, width: 400 }}
              onclick={this.handleClick}
            >
              <Icon
                icon="user-plus"
                style={{
                  fontSize: 190,
                  color: "#156895",
                  marginBottom: 10,
                  paddingTop: 80
                }}
              />
              <Col>
                <h3>Paciente Nuevo</h3>
              </Col>
            </ButtonLink>
          </FlexboxGrid.Item>
          <Divider vertical style={{ height: 400 }} />
          <FlexboxGrid.Item>
            <Button
              style={{ height: 400, width: 400 }}
              onClick={this.toggleListaPaciente}
            >
              <Icon
                icon="search"
                style={{
                  fontSize: 190,
                  color: "#599815",
                  marginBottom: 10,
                  paddingTop: 80
                }}
              />
              <Col>
                <h3>Busqueda de Paciente</h3>
              </Col>
            </Button>
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <Modal
          show={this.state.toggleListaPaciente}
          onHide={this.toggleListaPaciente}
        >
          <Modal.Body>
            <BuscarFicha />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default MenuPrincipal;

/*  */
