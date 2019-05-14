import React, { Component } from "react";
import { FlexboxGrid, Button, Divider, Icon, Col } from "rsuite";
import { Link } from "react-router-dom";

//import "rsuite/dist/styles/rsuite.css";

class MenuPrincipal extends Component {
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
              to="/ficha"
              style={{ height: 400, width: 400 }}
              onClick={this.handleClick}
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
            <ButtonLink to="/ficha_buscar" style={{ height: 400, width: 400 }}>
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
            </ButtonLink>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </div>
    );
  }
}

export default MenuPrincipal;

/*  */
