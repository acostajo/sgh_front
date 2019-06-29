import React from "react";
import { Form, Icon, Input, Button, Spin } from "antd";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../store/actions/auth";
import { FlexboxGrid } from "rsuite";
import logo from "./logolindo.png";
import { Card, CardBody, CardImg } from "reactstrap";

const FormItem = Form.Item;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onAuth(values.userName, values.password);
        this.props.history.push("/menu/");
        console.log(this.props.onAuth(values.userName, values.password));
      }
    });
  };

  render() {
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    const { getFieldDecorator } = this.props.form;
    return (
      <FlexboxGrid justify="center">
        <div style={{ width: "300px" }}>
          <h3>Iniciar Sesión</h3>
          {errorMessage}
          {this.props.loading ? (
            <Spin indicator={antIcon} />
          ) : (
            <Card
              style={{
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
              }}
            >
              <CardImg
                top
                width="100%"
                src={logo}
                style={{
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  backgroundColor: "#07689F",
                  color: "white"
                }}
              />

              <CardBody>
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <FormItem>
                    {getFieldDecorator("userName", {
                      rules: [
                        { required: true, message: "Ingrese un usuario!" }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="user"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        placeholder="Usuario"
                      />
                    )}
                  </FormItem>

                  <FormItem>
                    {getFieldDecorator("password", {
                      rules: [
                        { required: true, message: "Ingrese la contraseña!" }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="lock"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        type="password"
                        placeholder="Contraseña"
                      />
                    )}
                  </FormItem>

                  <FormItem>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ marginRight: "10px" }}
                    >
                      Acceder
                    </Button>
                    <a style={{ marginRight: "10px" }}>Olvido su Contraseña?</a>
                  </FormItem>
                </Form>
              </CardBody>
            </Card>
          )}
        </div>
      </FlexboxGrid>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm);
