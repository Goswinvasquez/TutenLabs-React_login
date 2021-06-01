import React, { useState } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../style/Login.css";

function dateFormatter(cell, row) {
  if (typeof cell !== "object") {
    cell = new Date(cell);
  }

  return `${("0" + cell.getDate()).slice(-2)}/${(
    "0" +
    (cell.getMonth() + 1)
  ).slice(-2)}/${cell.getFullYear()}`;
}

function subjectFormatter1(cell, row) {
  return cell.firstName + " " + cell.lastName;
}

function subjectFormatter2(cell, row) {
  return cell.streetAddress;
}

class Lista extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null });

    //   console.log(email, pass);
    try {
      const dataprueba = fetch(
        "https://dev.tuten.cl:443/TutenREST/rest/user/contacto%40tuten.cl/bookings?current=true ",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            app: "APP_BCK",
            adminemail: "testapis@tuten.cl",
            email: "contacto@tuten.cl",
            token: "testapis@tuten.clpbdqilbgdf5pa6fhtidhae7fup",
          },
        }
      )
        .then((data) => data.json())
        .then((data) => {
          console.log(data);

          this.setState({
            data: data,
          });
        })
        .catch((err) => {
          console.log(err); // Handle errors
        });
    } catch (error) {
      console.log("error", error);
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    const listado = this.state.data;
    return (
      <div className="container">
        <div className="col-lg-12">
          <BootstrapTable
            ref="table"
            striped={true}
            hover={true}
            data={listado}
            wrapperClasses="table-responsive"
          >
            <TableHeaderColumn
              ref="bookingId"
              dataField="bookingId"
              filter={{ type: "TextFilter", placeholder: "bookingId" }}
              isKey={true}
              dataAlign="center"
              dataSort={true}
              width="100"
              tdStyle={{ whiteSpace: "normal", wordWrap: "break-word" }}
            >
              BookingId
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="tutenUserClient"
              dataFormat={subjectFormatter1}
              width="120"
              tdStyle={{ whiteSpace: "normal", wordWrap: "break-word" }}
            >
              Cliente
            </TableHeaderColumn>
            <TableHeaderColumn
              ref="bookingTime"
              dataField="bookingTime"
              dataFormat={dateFormatter}
              width="100"
              dataAlign="center"
              tdStyle={{ whiteSpace: "normal", wordWrap: "break-word" }}
            >
              Fecha de Creaacion
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="tutenUserProfessional"
              dataFormat={subjectFormatter2}
              width="250"
              tdStyle={{ whiteSpace: "normal", wordWrap: "break-word" }}
            >
              Direccion
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="bookingPrice"
              filter={{ type: "TextFilter", placeholder: "precio" }}
              width="80"
              dataAlign="center"
              tdStyle={{ whiteSpace: "normal", wordWrap: "break-word" }}
            >
              Precio
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    );
  }
}

export default Lista;
