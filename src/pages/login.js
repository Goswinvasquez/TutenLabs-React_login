import React, { useState } from "react";
import "../style/Login.css";
import ReactDOM from "react-dom";
import Lista from "./lista";
import { BrowserRouter as Router } from "react-router-dom";


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  state = {
    loading: true,
    error: null,
  };

  handleLogin = async (e) => {
    e.preventDefault();
    const email = document.getElementsByClassName("email")[0].value;
    const pass = document.getElementsByClassName("pass")[0].value;
 //   console.log(email, pass);
    try {
      const dataprueba = fetch(
        "https://dev.tuten.cl/TutenREST/rest/user/testapis%40tuten.cl",
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            app: "APP_BCK",
            email: email,
            password: pass,
          },
        }
      )
        .then((data) => data.json())
        .then((data) => {
          console.log(data);
          if (data.count === 0) {
            ReactDOM.render(
              <div className="alert alert-danger" id="UserNotExist">
                El usuario/Password introducido no existe.
              </div>,
              document.getElementById("info")
            );
          } else {
            ReactDOM.render(
              <Router>
                <Lista />
              </Router>,
              document.getElementById("root")
            );
          }
        })
        .catch(err => {
          console.log(err) // Handle errors
          ReactDOM.render(
            <div className="alert alert-danger" id="UserNotExist">
              El usuario/Password introducido no existe.
            </div>,
            document.getElementById("info")
          );         
        });

      console.log(dataprueba);
    } catch (error) {
      console.log("error", error);
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    return (
      <div className="login-wrapper">
        <div className="g-form-container">
          <div className="g-form">
            <form className="g-form" onSubmit={this.handleLogin}>
              <h1 className='h1-titulo'>BIENVENIDO</h1>
              <label className="form-label">
                <p className='p-titulo'>
                  <strong>USUARIO</strong> (testapis@tuten.cl)
                </p>
                <input
                  type="text"
                  placeholder="Ingrese correo"
                  className="email"
                />
              </label>
              <label className="form-label">
              <p className='p-titulo'>
                  <strong>CONTRASEÑA</strong> (1234)
                </p>
                <input
                  type="password"
                  placeholder="Ingrese contraseña"
                  className="pass"
                />
              </label>
              <div>
                <button
                  type="submit"
                  onSubmit={this.handleLogin}
                  className="btn btn-primary"
                >
                  INGRESAR
                </button>
              </div>
            </form>
            <div className='alert-msg' id="info"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
