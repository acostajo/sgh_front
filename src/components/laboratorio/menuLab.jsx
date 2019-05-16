import React, { Component } from "react";
import { FlexboxGrid, Button, Divider, Icon, Col } from "rsuite";
import { Link } from "react-router-dom";

//import "rsuite/dist/styles/rsuite.css";

class MenuLab extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleClick = this.handleClick.bind(this);
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
              to="/buscar_paciente"
              style={{ height: 400, width: 400 }}
              onclick={this.handleClick}
            >
              <Icon
                icon="search"
                style={{
                  fontSize: 190,
                  color: "#156895",
                  marginBottom: 10,
                  paddingTop: 80
                }}
              />
              <Col>
                <h3>Buscar Paciente</h3>
              </Col>
            </ButtonLink>
          </FlexboxGrid.Item>
          <Divider vertical style={{ height: 400 }} />
          <FlexboxGrid.Item>
            <ButtonLink to="/turnos" style={{ height: 400, width: 400 }}>
              <Icon
                icon="calendar-check-o"
                style={{
                  fontSize: 190,
                  color: "#599815",
                  marginBottom: 10,
                  paddingTop: 80
                }}
              />
              <Col>
                <h3>Gestionar Turnos</h3>
              </Col>
            </ButtonLink>
          </FlexboxGrid.Item>
          <Divider vertical style={{ height: 400 }} />
          <FlexboxGrid.Item>
            <ButtonLink to="/turnos" style={{ height: 400, width: 400 }}>
              <Icon
                icon="calendar"
                style={{
                  fontSize: 190,
                  color: "#597015",
                  marginBottom: 10,
                  paddingTop: 80
                }}
              />
              <Col>
                <h3>Pendientes: 12</h3>
              </Col>
            </ButtonLink>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </div>
    );
  }
}

export default MenuLab;

/*  */
